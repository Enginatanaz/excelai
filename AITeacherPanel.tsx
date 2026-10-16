import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  MessageSquare,
  BookOpen,
  Send,
  Zap,
  HelpCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { TeachingStep, CellData } from '../../types/excel';
import { voiceEngine, VoiceStatus, VoicePlaybackMetrics } from '../../engine/voiceEngine';

interface AITeacherPanelProps {
  lessonTitle: string;
  lessonConcept: string;
  steps: TeachingStep[];
  activeStepIndex: number;
  onStepChange: (index: number) => void;
  selectedCell: string;
  selectedCellData: CellData | null;
  taskInstruction?: string;
  mistakeHistory?: any[];
}

interface ChatMessage {
  id: string;
  sender: 'student' | 'teacher';
  text: string;
  timestamp: string;
}

export const AITeacherPanel: React.FC<AITeacherPanelProps> = ({
  lessonTitle,
  lessonConcept,
  steps,
  activeStepIndex,
  onStepChange,
  selectedCell,
  selectedCellData,
  taskInstruction,
  mistakeHistory,
}) => {
  const [mode, setMode] = useState<'listen' | 'chat'>('listen');
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [playbackMetrics, setPlaybackMetrics] = useState<VoicePlaybackMetrics | null>(null);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1.0);
  const [selectedVoice, setSelectedVoice] = useState<string>('Kore');
  const [questionInput, setQuestionInput] = useState<string>('');
  const [isAsking, setIsAsking] = useState<boolean>(false);
  // Varied pedagogical opening greetings
  const getDynamicGreeting = (title: string, concept: string, stepTitle?: string) => {
    const greetings = [
      `Hoş geldin! Bu derste "${title}" konusunu derinlemesine ele alıyoruz. ${concept} üzerine yoğunlaşacağız. Çalışma tablosundaki her hücre seçimini ve formülü anlık olarak takip ediyorum.`,
      `Harika bir dersle devam ediyoruz: "${title}". Mantığını kavrayabilmen için adım adım gideceğiz. Şu an "${stepTitle || 'Giriş'}" aşamasındasın. Takıldığın her detayı bana sorabilirsin.`,
      `Selam! Bugün birlikte "${title}" yeteneğini pratiğe döküyoruz. ${concept}. Tabloda yapacağın denemeleri inceliyor olacağım; hazırsan başlayalım!`,
    ];
    // Deterministic selection based on title length
    const idx = (title.length + (stepTitle?.length || 0)) % greetings.length;
    return greetings[idx];
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'm1',
      sender: 'teacher',
      text: getDynamicGreeting(lessonTitle, lessonConcept, steps[activeStepIndex]?.title),
      timestamp: 'Şimdi',
    },
  ]);

  // Update teacher greeting when lesson changes
  useEffect(() => {
    setChatMessages([
      {
        id: 'msg_' + Date.now(),
        sender: 'teacher',
        text: getDynamicGreeting(lessonTitle, lessonConcept, steps[activeStepIndex]?.title),
        timestamp: 'Şimdi',
      },
    ]);
  }, [lessonTitle]);

  const activeStep = steps[activeStepIndex] || steps[0];

  // Subscribe to voice teacher state
  useEffect(() => {
    const unsubscribe = voiceEngine.subscribe((status, metrics) => {
      setVoiceStatus(status);
      if (metrics) setPlaybackMetrics(metrics);
    });
    return () => {
      unsubscribe();
      voiceEngine.stop();
    };
  }, []);

  // Update voice settings
  const handleSpeedChange = (rate: number) => {
    setVoiceSpeed(rate);
    voiceEngine.setPlaybackRate(rate);
  };

  const handleVoiceChange = (voice: string) => {
    setSelectedVoice(voice);
    voiceEngine.setVoice(voice);
  };

  // Play narration of active step
  const handlePlayStepNarration = () => {
    if (!activeStep) return;
    voiceEngine.speak(activeStep.speechText, activeStep.id);
  };

  const handlePauseResume = () => {
    if (voiceStatus === 'playing') {
      voiceEngine.pause();
    } else if (voiceStatus === 'paused') {
      voiceEngine.resume();
    }
  };

  const handleStop = () => {
    voiceEngine.stop();
  };

  // Ask Teacher question in Mod B
  const handleAskQuestion = async (customPrompt?: string) => {
    const q = (customPrompt || questionInput).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'student',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setQuestionInput('');
    setIsAsking(true);

    try {
      const response = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          lessonTitle,
          lessonConcept,
          selectedCell,
          cellValue: selectedCellData?.computed ?? 'Boş',
          cellFormula: selectedCellData?.raw ?? 'Boş',
          taskInstruction,
          mistakeHistory,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const teacherMsg: ChatMessage = {
          id: 'tch_' + Date.now(),
          sender: 'teacher',
          text: data.answer || 'Sorunuz başarıyla incelendi.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, teacherMsg]);

        // Automatically read aloud teacher's response
        voiceEngine.speak(teacherMsg.text);
      } else {
        throw new Error('Yanıt alınamadı');
      }
    } catch (e) {
      const errMsg: ChatMessage = {
        id: 'tch_' + Date.now(),
        sender: 'teacher',
        text: `Seçili olan ${selectedCell} hücresi için: Formül başlangıcında = işaretini unutmayın ve Türkçe Excel de argümanları noktalı virgül (;) ile ayırın.`,
        timestamp: 'Şimdi',
      };
      setChatMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  // Prefetch active step audio in the background for zero-latency click-to-play
  useEffect(() => {
    if (activeStep?.speechText) {
      voiceEngine.prefetch(activeStep.speechText);
    }
  }, [activeStep?.speechText]);

  return (
    <div className="flex flex-col h-full bg-white border border-neutral-200 rounded-lg shadow-xs overflow-hidden">
      {/* 1. Header with Mode Selector */}
      <div className="p-3.5 border-b border-neutral-200 bg-neutral-50/70">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-neutral-900 leading-tight">
                Yapay Zekâ Öğretmeni
              </h2>
              <p className="text-[11px] text-neutral-500">Doğal Türkçe Sesli Anlatım</p>
            </div>
          </div>

          {/* Clean Audio Status Indicator */}
          {voiceStatus === 'playing' ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100/80 text-[11px] text-emerald-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Anlatım Dinleniyor</span>
            </div>
          ) : voiceStatus === 'preparing' ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/80 text-[11px] text-amber-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span>Ses Hazırlanıyor...</span>
            </div>
          ) : null}
        </div>

        {/* Mode Toggle Bar */}
        <div className="grid grid-cols-2 p-1 bg-neutral-200/70 rounded-lg gap-1">
          <button
            onClick={() => setMode('listen')}
            className={`flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'listen'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ders Dinleme Modu</span>
          </button>

          <button
            onClick={() => setMode('chat')}
            className={`flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-md transition-all ${
              mode === 'chat'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Canlı Öğretmen Modu</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Area */}
      {mode === 'listen' ? (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto excel-scrollbar">
          {/* Step Selector Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
            {steps.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => {
                  voiceEngine.stop();
                  onStepChange(idx);
                }}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeStepIndex === idx
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Adım {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-neutral-900 mb-2">
              {activeStep?.title}
            </h3>

            <div className="text-xs text-neutral-700 leading-relaxed space-y-2 mb-4 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
              <p>{activeStep?.explanation}</p>
            </div>

            {/* Target Cell & Formula Cue */}
            {activeStep?.targetCell && (
              <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="text-emerald-900 font-medium">Hedef Çalışma Hücresi:</span>
                <span className="px-2 py-0.5 rounded bg-white text-emerald-800 font-mono font-bold border border-emerald-300">
                  {activeStep.targetCell}
                </span>
              </div>
            )}

            {activeStep?.suggestedFormula && (
              <div className="mb-4 p-2.5 rounded-lg bg-neutral-900 text-white font-mono text-xs flex items-center justify-between">
                <span className="text-neutral-400 font-sans text-[11px]">Önerilen Formül:</span>
                <span className="text-emerald-400 font-bold">{activeStep.suggestedFormula}</span>
              </div>
            )}

            {/* Proactive Mistake / Feedback Observation */}
            {mistakeHistory && mistakeHistory.length > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs animate-in fade-in">
                <div className="flex items-center justify-between text-amber-900 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Öğretmen Gözlemi ({mistakeHistory[mistakeHistory.length - 1]?.errorType})
                  </span>
                  <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-amber-200">
                    {mistakeHistory[mistakeHistory.length - 1]?.cellAddress}
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {mistakeHistory[mistakeHistory.length - 1]?.advice}
                </p>
                <button
                  onClick={() => {
                    setMode('chat');
                    handleAskQuestion(
                      `${mistakeHistory[mistakeHistory.length - 1]?.cellAddress} hücresindeki ${mistakeHistory[mistakeHistory.length - 1]?.errorType} sorununu ve doğru formülü açıklar mısın?`
                    );
                  }}
                  className="mt-2 text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 underline cursor-pointer"
                >
                  Öğretmene Bu Hatayı Canlı Sor →
                </button>
              </div>
            )}
          </div>

          {/* Teacher Voice Control Deck */}
          <div className="mt-auto pt-3 border-t border-neutral-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              {/* Play / Listen Button */}
              <button
                onClick={
                  voiceStatus === 'playing' || voiceStatus === 'paused'
                    ? handlePauseResume
                    : handlePlayStepNarration
                }
                disabled={voiceStatus === 'preparing'}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                {voiceStatus === 'preparing' ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Ses Hazırlanıyor...</span>
                  </>
                ) : voiceStatus === 'playing' ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-white" />
                    <span>Dersi Duraklat</span>
                  </>
                ) : voiceStatus === 'paused' ? (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Devam Ettir</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Öğretmeni Dinle</span>
                  </>
                )}
              </button>

              {/* Stop Button */}
              {voiceStatus !== 'idle' && (
                <button
                  onClick={handleStop}
                  title="Durdur"
                  className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Audio Speed & Voice Controls */}
            <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
              <div className="flex items-center gap-1">
                <span>Hız:</span>
                {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handleSpeedChange(rate)}
                    className={`px-1.5 py-0.5 rounded ${
                      voiceSpeed === rate
                        ? 'bg-emerald-100 text-emerald-800 font-bold'
                        : 'hover:bg-neutral-100'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <span>Ses:</span>
                <select
                  value={selectedVoice}
                  onChange={(e) => handleVoiceChange(e.target.value)}
                  className="bg-transparent font-medium text-neutral-700 focus:outline-hidden"
                >
                  <option value="Kore">Kore (Doğal Öğretmen)</option>
                  <option value="Zephyr">Zephyr (Dinamik)</option>
                  <option value="Puck">Puck (Berrak)</option>
                  <option value="Fenrir">Fenrir (Resmi)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mod B: Canlı Öğretmen Modu */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 excel-scrollbar bg-neutral-50/50">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'student' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-lg text-xs leading-relaxed ${
                    msg.sender === 'student'
                      ? 'bg-emerald-700 text-white rounded-br-none'
                      : 'bg-white text-neutral-800 border border-neutral-200 shadow-2xs rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="text-[10px] text-neutral-400 mt-0.5 px-1">
                  {msg.sender === 'student' ? 'Sen' : 'Öğretmen'} · {msg.timestamp}
                </span>
              </div>
            ))}

            {isAsking && (
              <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-neutral-200 text-xs text-neutral-500 w-fit">
                <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span>Öğretmen çalışma alanınızı inceliyor...</span>
              </div>
            )}
          </div>

          {/* Quick Questions Strip */}
          <div className="p-2 border-t border-neutral-200 bg-white">
            <p className="text-[10px] text-neutral-400 font-medium mb-1.5 px-1">Öğretmene Hızlı Sor:</p>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 excel-scrollbar">
              <button
                onClick={() =>
                  handleAskQuestion(
                    `Şu an seçili olan ${selectedCell} hücresindeki veriyi ve formülü kontrol eder misin?`
                  )
                }
                className="px-2.5 py-1 text-[11px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md whitespace-nowrap transition-colors font-medium border border-emerald-200"
              >
                {selectedCell} hücresini kontrol et
              </button>
              <button
                onClick={() => handleAskQuestion(`Bu derste "${lessonTitle}" için formül mantığını ve püf noktalarını açıklar mısın?`)}
                className="px-2.5 py-1 text-[11px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md whitespace-nowrap transition-colors"
              >
                Formül mantığı nedir?
              </button>
              <button
                onClick={() => handleAskQuestion('Türkçe Excel de argümanları ayırırken ve aralık belirtirken nelere dikkat etmeliyim?')}
                className="px-2.5 py-1 text-[11px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md whitespace-nowrap transition-colors"
              >
                Sözdizimi ve noktalı virgül kuralı
              </button>
              <button
                onClick={() => handleAskQuestion('Bu adım için gerçek hayattan bir iş senaryosu ve basit bir örnek verir misin?')}
                className="px-2.5 py-1 text-[11px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md whitespace-nowrap transition-colors"
              >
                İş hayatı örneği ver
              </button>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-2.5 border-t border-neutral-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Öğretmene bir şey sorun (örn. Bu formülde neden hata aldım?)"
                className="flex-1 h-8 px-3 text-xs bg-neutral-100 border border-neutral-200 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={!questionInput.trim() || isAsking}
                className="w-8 h-8 flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
