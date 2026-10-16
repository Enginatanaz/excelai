import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { LessonTask, Sheet, Lesson } from '../../types/excel';
import { logMistake } from '../../services/storageService';

interface TaskPanelProps {
  tasks: LessonTask[];
  currentTaskIndex: number;
  onTaskChange: (index: number) => void;
  sheet: Sheet;
  onTaskCompleted: (taskIndex: number) => void;
  onOpenQuiz: () => void;
  hasQuiz: boolean;
  lessonId: string;
  lesson?: Lesson;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({
  tasks,
  currentTaskIndex,
  onTaskChange,
  sheet,
  onTaskCompleted,
  onOpenQuiz,
  hasQuiz,
  lessonId,
  lesson,
}) => {
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showPedagogicalDetails, setShowPedagogicalDetails] = useState<boolean>(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const currentTask = tasks[currentTaskIndex] || tasks[0];
  const allTasksCompleted = tasks.every((t) => t.isCompleted);

  // Validate student action in current task
  const handleCheckAction = () => {
    if (!currentTask) return;
    const { targetCell, expectedValue, expectedFormulaKeywords, errorMessage, successMessage } =
      currentTask.validation;

    const cell = sheet.cells[targetCell];

    // Check if cell has been touched
    if (!cell || (cell.raw === '' && cell.computed === null)) {
      setValidationStatus('error');
      setStatusMessage(`${targetCell} hücresi henüz boş. Lütfen talimattaki işlemi uygulayın.`);
      return;
    }

    // Check formula keywords if required
    if (expectedFormulaKeywords && expectedFormulaKeywords.length > 0) {
      const rawUpper = cell.raw.toUpperCase();
      const hasKeywords = expectedFormulaKeywords.some((kw) => rawUpper.includes(kw.toUpperCase()));
      if (!hasKeywords) {
        setValidationStatus('error');
        const msg = errorMessage || `${targetCell} hücresinde beklenen fonksiyon kullanılmadı.`;
        setStatusMessage(msg);
        logMistake({
          lessonId,
          cellAddress: targetCell,
          userFormula: cell.raw,
          errorType: 'Eksik veya Hatalı Fonksiyon',
          advice: `${targetCell} hücresinde ${expectedFormulaKeywords.join(' veya ')} fonksiyonu bekleniyor.`,
        });
        return;
      }
    }

    // Check if cell computed value produced an Excel calculation error
    if (
      typeof cell.computed === 'string' &&
      cell.computed.startsWith('#') &&
      (!expectedValue || !String(expectedValue).startsWith('#'))
    ) {
      setValidationStatus('error');
      const errDetail = `${targetCell} hücresindeki formülünüz ${cell.computed} hatası üretti.`;
      setStatusMessage(`${errDetail} Lütfen sözdizimini, parantezleri ve başvuru aralıklarını kontrol edin.`);
      logMistake({
        lessonId,
        cellAddress: targetCell,
        userFormula: cell.raw,
        errorType: `Excel Hatası (${cell.computed})`,
        advice: `${targetCell} hücresinde ${cell.computed} hatası oluştu. Formülün yazımını ve argüman ayracı olarak noktalı virgül (;) kullanıldığını doğrulayın.`,
      });
      return;
    }

    // Check computed value
    if (expectedValue !== undefined) {
      const isMatch =
        String(cell.computed).trim().toLowerCase() === String(expectedValue).trim().toLowerCase() ||
        Number(cell.computed) === Number(expectedValue);

      if (!isMatch) {
        setValidationStatus('error');
        const msg = errorMessage || `Hesaplanan sonuç (${cell.computed}) beklenen değer ile uyuşmuyor.`;
        setStatusMessage(msg);
        logMistake({
          lessonId,
          cellAddress: targetCell,
          userFormula: cell.raw,
          errorType: 'Yanlış Sonuç',
          advice: `Hesaplanan: ${cell.computed}, Beklenen: ${expectedValue}. Hücre aralığını ve formülü kontrol edin.`,
        });
        return;
      }
    }

    // Validation success!
    setValidationStatus('success');
    setStatusMessage(successMessage || 'Harika! Görevi başarıyla tamamladınız.');
    onTaskCompleted(currentTaskIndex);
  };

  const handleNextStep = () => {
    setValidationStatus('idle');
    setStatusMessage('');
    setHintLevel(0);
    if (currentTaskIndex < tasks.length - 1) {
      onTaskChange(currentTaskIndex + 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-neutral-200 rounded-lg shadow-xs overflow-hidden">
      {/* 1. Header */}
      <div className="p-3.5 border-b border-neutral-200 bg-neutral-50/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-700 flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-neutral-900 leading-tight">
                Uygulama & Görev Kontrolü
              </h2>
              <p className="text-[11px] text-neutral-500">
                Adım {currentTaskIndex + 1} / {tasks.length}
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
            {allTasksCompleted ? 'Tüm Görevler Bitti' : 'Uygulama Devam Ediyor'}
          </span>
        </div>
      </div>

      {/* 2. Task Checklist Overview */}
      <div className="p-3 border-b border-neutral-200 bg-neutral-50/40">
        <div className="space-y-1.5">
          {tasks.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => {
                setValidationStatus('idle');
                onTaskChange(idx);
              }}
              className={`flex items-center justify-between p-2 rounded-md text-xs cursor-pointer transition-colors ${
                currentTaskIndex === idx
                  ? 'bg-emerald-50 border border-emerald-300 font-semibold text-emerald-900'
                  : t.isCompleted
                  ? 'bg-white text-neutral-700 hover:bg-neutral-100'
                  : 'text-neutral-500 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {t.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full border text-[10px] flex items-center justify-center shrink-0 ${
                      currentTaskIndex === idx
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-neutral-300 text-neutral-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                )}
                <span className="truncate max-w-[200px]">Görev {idx + 1}: {t.targetCell}</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400 font-normal">
                {t.isCompleted ? 'Tamamlandı' : 'Bekliyor'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Active Task Details */}
      <div className="flex-1 p-4 overflow-y-auto excel-scrollbar">
        {currentTask && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  Şu Anki Göreviniz
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 font-mono text-xs font-semibold text-neutral-800">
                  Hücre: {currentTask.targetCell}
                </span>
              </div>
              <p className="text-xs font-medium text-neutral-800 leading-relaxed bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                {currentTask.instruction}
              </p>
            </div>

            {/* Validation Feedback Banner */}
            {validationStatus === 'success' && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Tebrikler!</p>
                  <p className="text-[11px] mt-0.5">{statusMessage}</p>
                </div>
              </div>
            )}

            {validationStatus === 'error' && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Kontrol Sonucu</p>
                  <p className="text-[11px] mt-0.5">{statusMessage}</p>
                </div>
              </div>
            )}

            {/* 3-Tier Progressive Hints */}
            <div className="border border-neutral-200 rounded-lg p-3 bg-neutral-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kademeli İpuçları</span>
                </div>
                {hintLevel < 3 && (
                  <button
                    onClick={() => setHintLevel((prev) => Math.min(3, prev + 1))}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-medium cursor-pointer"
                  >
                    + {hintLevel === 0 ? 'İpucu İste' : 'Sonraki İpucu'}
                  </button>
                )}
              </div>

              {hintLevel === 0 ? (
                <p className="text-[11px] text-neutral-500">
                  Zorlandığınızda tıklayarak mantıksal yönlendirme veya tam formül yardımını açabilirsiniz.
                </p>
              ) : (
                <div className="space-y-2 text-xs">
                  {hintLevel >= 1 && currentTask.hints[0] && (
                    <div className="p-2 rounded bg-white border border-neutral-200 text-neutral-700 text-[11px]">
                      <span className="font-bold text-neutral-900">Seviye 1 (Kavram):</span>{' '}
                      {currentTask.hints[0]}
                    </div>
                  )}
                  {hintLevel >= 2 && currentTask.hints[1] && (
                    <div className="p-2 rounded bg-white border border-neutral-200 text-neutral-700 text-[11px]">
                      <span className="font-bold text-neutral-900">Seviye 2 (Yapı):</span>{' '}
                      {currentTask.hints[1]}
                    </div>
                  )}
                  {hintLevel >= 3 && currentTask.hints[2] && (
                    <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-mono">
                      <span className="font-sans font-bold text-neutral-900">Seviye 3 (Çözüm):</span>{' '}
                      {currentTask.hints[2]}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pedagogical Details: Common Mistakes & Success Criteria */}
            {lesson && (
              <div className="border border-neutral-200 rounded-lg p-3 bg-neutral-50/70 space-y-2">
                <div
                  onClick={() => setShowPedagogicalDetails(!showPedagogicalDetails)}
                  className="flex items-center justify-between text-xs font-semibold text-neutral-800 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ders Kazanım Kriterleri & Yaygın Hatalar</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-normal">
                    {showPedagogicalDetails ? 'Gizle' : 'Göster'}
                  </span>
                </div>

                {showPedagogicalDetails && (
                  <div className="pt-2 border-t border-neutral-200/80 space-y-2.5 text-[11px]">
                    {lesson.primaryGoal && (
                      <div className="p-2 rounded bg-white border border-neutral-200 text-neutral-700">
                        <span className="font-bold text-emerald-800">Ana Öğrenme Hedefi: </span>
                        <span>{lesson.primaryGoal}</span>
                      </div>
                    )}

                    {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                      <div className="p-2 rounded bg-white border border-neutral-200 text-neutral-700">
                        <span className="font-bold text-neutral-900">Gerekli Ön Bilgi: </span>
                        <span>{lesson.prerequisites.join(', ')}</span>
                      </div>
                    )}

                    {lesson.successCriteria && (
                      <div className="p-2 rounded bg-emerald-50/60 border border-emerald-200 text-emerald-950 space-y-1">
                        <span className="font-bold text-emerald-900">Başarı Ölçütleri: </span>
                        <span className="text-neutral-700">{lesson.successCriteria}</span>
                      </div>
                    )}

                    {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                      <div className="p-2 rounded bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
                        <span className="font-bold text-amber-900">Sık Yapılan Hatalar & Uyarılar:</span>
                        <ul className="list-disc pl-4 space-y-0.5 text-neutral-700">
                          {lesson.commonMistakes.map((mistake, idx) => (
                            <li key={idx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Bottom Action Bar */}
      <div className="p-3.5 border-t border-neutral-200 bg-neutral-50 space-y-2">
        <button
          onClick={handleCheckAction}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>İşlemi Kontrol Et</span>
        </button>

        {currentTask?.isCompleted && currentTaskIndex < tasks.length - 1 && (
          <button
            onClick={handleNextStep}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>Sonraki Adıma Geç</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        {allTasksCompleted && hasQuiz && (
          <button
            onClick={onOpenQuiz}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer animate-pulse"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mini Sınava Başla (%80 Geçme Eşiği)</span>
          </button>
        )}
      </div>
    </div>
  );
};
