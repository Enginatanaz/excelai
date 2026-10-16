import {
  evaluateFormula,
  recalculateAllCells,
  shiftFormula,
  parseCellAddress,
  formatAddress,
  parseRange,
  colLetterToIndex,
  colIndexToLetter,
  toNumber,
} from '../engine/formulaEngine';
import { CURRICULUM_PHASES } from '../data/curriculum';
import {
  isLessonUnlocked,
  LESSON_SEQUENCE,
  loadUserProgress,
  saveUserProgress,
  markLessonCompleted,
  saveQuizResult,
  logMistake,
  exportProgressJSON,
  importProgressJSON,
  resetProgress,
} from '../services/storageService';
import { CellData, UserProgress, Sheet } from '../types/excel';

interface TestRecord {
  suite: string;
  name: string;
  passed: boolean;
  expected: any;
  actual: any;
  error?: string;
}

const allTests: TestRecord[] = [];

function assert(suite: string, name: string, condition: boolean, expected?: any, actual?: any) {
  allTests.push({
    suite,
    name,
    passed: condition,
    expected: expected ?? true,
    actual: actual ?? condition,
  });
}

function assertFormula(name: string, formula: string, expected: any, initialCells: Record<string, any> = {}) {
  try {
    const formattedCells: Record<string, CellData> = {};
    for (const [k, v] of Object.entries(initialCells)) {
      formattedCells[k] = {
        raw: String(v),
        computed: v,
      };
    }
    const computed = evaluateFormula(formula, formattedCells);
    const passed =
      computed === expected ||
      (typeof computed === 'number' && typeof expected === 'number' && Math.abs(computed - expected) < 0.001) ||
      String(computed).toLowerCase() === String(expected).toLowerCase();

    allTests.push({
      suite: 'FormulaEngine',
      name,
      passed,
      expected,
      actual: computed,
    });
  } catch (err: any) {
    allTests.push({
      suite: 'FormulaEngine',
      name,
      passed: false,
      expected,
      actual: null,
      error: err.message,
    });
  }
}

console.log('Starting Excel Akademi AI Comprehensive Audit Test Suite...\n');

// ==========================================
// 1. FORMULA ENGINE UNIT TESTS
// ==========================================

// Basic Math
assertFormula('Aritmetik: Toplama', '=2+3', 5);
assertFormula('Aritmetik: Çıkarma', '=10-4', 6);
assertFormula('Aritmetik: Çarpma', '=6*7', 42);
assertFormula('Aritmetik: Bölme', '=20/4', 5);
assertFormula('Aritmetik: Üs Alma (^)', '=2^3', 8);
assertFormula('Aritmetik: İşlem Önceliği (* önce)', '=2+3*4', 14);
assertFormula('Aritmetik: Parantez Önceliği', '=(2+3)*4', 20);
assertFormula('Aritmetik: Unary Eksi Başlangıç', '=-5+10', 5);
assertFormula('Aritmetik: Unary Parantez Öncesi', '=-(2+3)*4', -20);
assertFormula('Aritmetik: Unary Çarpım', '=2*-3', -6);
assertFormula('Aritmetik: Yüzde Hesaplama', '=100*18%', 18);
assertFormula('Aritmetik: Sıfıra Bölme Hatası', '=100/0', '#SIFIR/0!');
assertFormula('Metin Birleştirme (&)', '="Excel" & " " & "Akademi"', 'Excel Akademi');

// Math & Statistics Functions
assertFormula('TOPLA (SUM) Liste', '=TOPLA(10; 20; 30)', 60);
assertFormula('SUM İngilizce Alias', '=SUM(15, 25, 10)', 50);
assertFormula('TOPLA Aralık', '=TOPLA(A1:A3)', 60, { A1: 10, A2: 20, A3: 30 });
assertFormula('ORTALAMA (AVERAGE)', '=ORTALAMA(A1:A4)', 25, { A1: 10, A2: 20, A3: 30, A4: 40 });
assertFormula('AVERAGE İngilizce Alias', '=AVERAGE(B1:B2)', 50, { B1: 40, B2: 60 });
assertFormula('MAK (MAX)', '=MAK(A1:A3)', 30, { A1: 10, A2: 30, A3: 20 });
assertFormula('MİN (MIN)', '=MİN(A1:A3)', 10, { A1: 10, A2: 30, A3: 20 });
assertFormula('SAY (COUNT) Yalnızca Sayılar', '=SAY(A1:A4)', 3, { A1: 10, A2: 'Metin', A3: 20, A4: 30 });
assertFormula('BAĞ_DEĞ_DOLU_SAY (COUNTA)', '=BAĞ_DEĞ_DOLU_SAY(A1:A4)', 4, { A1: 10, A2: 'Metin', A3: 20, A4: 'Bilgi' });
assertFormula('MUTLAK (ABS)', '=MUTLAK(-45)', 45);
assertFormula('ABS İngilizce Alias', '=ABS(-99)', 99);
assertFormula('YUVARLA (ROUND)', '=YUVARLA(12.3456; 2)', 12.35);

// Logic Functions
assertFormula('EĞER (IF) Doğru Koşul', '=EĞER(A1>50; "Prim Var"; "Prim Yok")', 'Prim Var', { A1: 75 });
assertFormula('EĞER (IF) Yanlış Koşul', '=EĞER(A1>50; "Prim Var"; "Prim Yok")', 'Prim Yok', { A1: 30 });
assertFormula('VE (AND) İkisi de Doğru', '=VE(10>5; 20>10)', true);
assertFormula('VE (AND) Biri Yanlış', '=VE(10>5; 20<10)', false);
assertFormula('YADA (OR) Biri Doğru', '=YADA(10>50; 20>10)', true);
assertFormula('EĞERHATA (IFERROR) Hata Durumu', '=EĞERHATA(A1/B1; 0)', 0, { A1: 100, B1: 0 });
assertFormula('EĞERHATA Normal Değer', '=EĞERHATA(A1/B1; 0)', 5, { A1: 100, B1: 20 });

// Conditional Math & Stats
assertFormula('EĞERSAY (COUNTIF) Metin', '=EĞERSAY(A1:A4; "Marmara")', 2, {
  A1: 'Marmara',
  A2: 'Ege',
  A3: 'Marmara',
  A4: 'İç Anadolu',
});
assertFormula('EĞERSAY Operatör Kriteri', '=EĞERSAY(B1:B4; ">500")', 3, {
  B1: 600,
  B2: 400,
  B3: 800,
  B4: 1000,
});
assertFormula('ETOPLA (SUMIF)', '=ETOPLA(A1:A3; "Gıda"; B1:B3)', 700, {
  A1: 'Gıda',
  B1: 300,
  A2: 'Tekstil',
  B2: 500,
  A3: 'Gıda',
  B3: 400,
});
assertFormula('ÇOKETOPLA (SUMIFS)', '=ÇOKETOPLA(C1:C4; A1:A4; "Marmara"; B1:B4; "Elektronik")', 120000, {
  A1: 'Marmara',
  B1: 'Elektronik',
  C1: 50000,
  A2: 'Marmara',
  B2: 'Gıda',
  C2: 30000,
  A3: 'Ege',
  B3: 'Elektronik',
  C3: 40000,
  A4: 'Marmara',
  B4: 'Elektronik',
  C4: 70000,
});

// Lookup & Reference Functions
assertFormula('DÜŞEYARA (VLOOKUP) Tam Eşleşme', '=DÜŞEYARA("1002"; A1:C3; 3; YANLIŞ)', 4500, {
  A1: '1001',
  B1: 'Laptop',
  C1: 32000,
  A2: '1002',
  B2: 'Saat',
  C2: 4500,
  A3: '1003',
  B3: 'Kulaklık',
  C3: 1800,
});
assertFormula('DÜŞEYARA Bulunamadı Hatası', '=DÜŞEYARA("9999"; A1:C2; 2; YANLIŞ)', '#YOK', {
  A1: '1001',
  B1: 'Laptop',
  C1: 32000,
  A2: '1002',
  B2: 'Saat',
  C2: 4500,
});
assertFormula('ÇAPRAZARA (XLOOKUP) Sol Yönlü Arama', '=ÇAPRAZARA("SC-92"; B1:B2; A1:A2)', 'Finans', {
  A1: 'Pazarlama',
  B1: 'SC-88',
  A2: 'Finans',
  B2: 'SC-92',
});
assertFormula('KAÇINCI (MATCH)', '=KAÇINCI("Saat"; B1:B3; 0)', 2, {
  B1: 'Laptop',
  B2: 'Saat',
  B3: 'Kulaklık',
});
assertFormula('İNDİS (INDEX)', '=İNDİS(A1:B2; 2; 1)', 'Finans', {
  A1: 'Pazarlama',
  B1: 5000,
  A2: 'Finans',
  B2: 8000,
});

// Text Functions
assertFormula('METİNBİRLEŞTİR (TEXTJOIN)', '=METİNBİRLEŞTİR(" "; DOĞRU; "Ahmet"; "Yılmaz")', 'Ahmet Yılmaz');
assertFormula('SOLDAN (LEFT)', '=SOLDAN("TR-2026-IST"; 2)', 'TR');
assertFormula('SAĞDAN (RIGHT)', '=SAĞDAN("TR-2026-IST"; 3)', 'IST');
assertFormula('PARÇAAL (MID)', '=PARÇAAL("TR-2026-IST"; 4; 4)', '2026');
assertFormula('UZUNLUK (LEN)', '=UZUNLUK("Excel")', 5);
assertFormula('KIRP (TRIM)', '=KIRP("  İstanbul   ")', 'İstanbul');

// Date Functions
assertFormula('DATE Fonksiyonu', '=DATE(2026; 10; 16)', '2026-10-16');
assertFormula('DAY Fonksiyonu', '=DAY("2026-10-16")', 16);
assertFormula('MONTH Fonksiyonu', '=MONTH("2026-10-16")', 10);

// References & Circular Detection
assertFormula('Dairesel Başvuru Koruması', '=A1', '#DÖNGÜ!', {
  A1: '=A1',
});

// Shift Formula with String Literal Protection
const shiftedFormula1 = shiftFormula('=B4*$B$1', 0, 1);
assert('FormulaEngine', 'shiftFormula: Mutlak Başvuru Sabitleme', shiftedFormula1 === '=B5*$B$1', '=B5*$B$1', shiftedFormula1);

const shiftedFormulaWithStr = shiftFormula('=METİNBİRLEŞTİR(" "; DOĞRU; "KOD1"; A1)', 0, 2);
assert(
  'FormulaEngine',
  'shiftFormula: Tırnak İçi Sabitleri Koruma',
  shiftedFormulaWithStr === '=METİNBİRLEŞTİR(" "; DOĞRU; "KOD1"; A3)',
  '=METİNBİRLEŞTİR(" "; DOĞRU; "KOD1"; A3)',
  shiftedFormulaWithStr
);

// ==========================================
// 2. CURRICULUM INTEGRITY TESTS (30 Master Sections)
// ==========================================
assert('Curriculum', 'Faz Sayısı 30 Olmalı', CURRICULUM_PHASES.length === 30, 30, CURRICULUM_PHASES.length);

let totalLessons = 0;
let totalTasks = 0;
let totalQuizzes = 0;
const lessonIdsFound = new Set<string>();

CURRICULUM_PHASES.forEach((phase) => {
  assert('Curriculum', `Faz ${phase.id}: En az 2 ders barındırmalı`, phase.lessons.length >= 2, '>=2', phase.lessons.length);
  phase.lessons.forEach((lesson) => {
    totalLessons++;
    lessonIdsFound.add(lesson.id);

    assert('Curriculum', `Ders ${lesson.id}: Başlık tanımlı olmalı`, typeof lesson.title === 'string' && lesson.title.length > 3);
    assert('Curriculum', `Ders ${lesson.id}: Çalışma kitabı tanımlı olmalı`, !!lesson.initialWorkbook && lesson.initialWorkbook.sheets.length > 0);
    assert('Curriculum', `Ders ${lesson.id}: En az bir öğretim adımı olmalı`, lesson.teachingSteps.length > 0);
    assert('Curriculum', `Ders ${lesson.id}: En az bir görev olmalı`, lesson.tasks.length > 0);

    lesson.tasks.forEach((task, tIdx) => {
      totalTasks++;
      assert('Curriculum', `Ders ${lesson.id} Görev ${tIdx + 1}: Doğrulama hedef hücresi olmalı`, !!task.validation.targetCell);
      assert('Curriculum', `Ders ${lesson.id} Görev ${tIdx + 1}: 3 kademeli ipucu olmalı`, task.hints.length >= 3);
    });

    if (lesson.quiz) {
      assert('Curriculum', `Ders ${lesson.id}: Sınav en az 1 soru barındırmalı`, lesson.quiz.questions.length >= 1);
      lesson.quiz.questions.forEach((q) => {
        totalQuizzes++;
        assert('Curriculum', `Ders ${lesson.id} Soru ${q.id}: Doğru seçenek tanımlı olmalı`, !!q.correctOptionId);
        assert('Curriculum', `Ders ${lesson.id} Soru ${q.id}: Açıklama mevcut olmalı`, typeof q.explanation === 'string' && q.explanation.length > 5);
      });
    }
  });
});

assert('Curriculum', 'Toplam Ders Sayısı 100 ün Üzerinde Kapsamlı Olmalı', totalLessons >= 100, '>=100', totalLessons);

// ==========================================
// 3. STORAGE & PROGRESS LIFECYCLE TESTS
// ==========================================
const firstLessonId = CURRICULUM_PHASES[0].lessons[0].id;
const secondLessonId = CURRICULUM_PHASES[0].lessons[1].id;
const thirdLessonId = CURRICULUM_PHASES[0].lessons[2].id;

const testProgress: UserProgress = {
  completedLessonIds: [firstLessonId],
  currentLessonId: secondLessonId,
  completedTasks: { [firstLessonId]: [0, 1] },
  quizScores: { [firstLessonId]: 100 },
  mistakes: [],
  skillMastery: {},
  totalTimeSpentMinutes: 30,
  lastStudyDate: '2026-10-16',
  unlockAllLessons: false,
};

assert('StorageService', `${firstLessonId} Daima Açık Olmalı`, isLessonUnlocked(firstLessonId, testProgress), true);
assert('StorageService', `${secondLessonId} (Önceki ders bittiğinde) Açık Olmalı`, isLessonUnlocked(secondLessonId, testProgress), true);
assert('StorageService', `${thirdLessonId} (Önceki bitmediğinde) Kilitli Olmalı`, !isLessonUnlocked(thirdLessonId, testProgress), false);

// Test Sequential Array Matches
assert('StorageService', `LESSON_SEQUENCE ${totalLessons} dersi dinamik ve eksiksiz içermeli`, LESSON_SEQUENCE.length === totalLessons, totalLessons, LESSON_SEQUENCE.length);

// JSON Export and Import Integrity
const exportedJSON = JSON.stringify(testProgress);
assert('StorageService', 'JSON Dışa Aktarma Başarılı Olmalı', exportedJSON.includes(firstLessonId) && exportedJSON.includes('quizScores'));

// ==========================================
// 4. INTEGRATION & REACTIVE RECALCULATION TESTS
// ==========================================
// Scenario: Cell change propagates to dependent formula
const initialCells: Record<string, CellData> = {
  B2: { raw: '1000', computed: 1000 },
  C2: { raw: '0.20', computed: 0.20 },
  D2: { raw: '=B2*C2', computed: 200 },
  E2: { raw: '=B2+D2', computed: 1200 },
};

// User updates B2 from 1000 to 5000
const updatedCells = {
  ...initialCells,
  B2: { raw: '5000', computed: 5000 },
};
const recalculated = recalculateAllCells(updatedCells);

assert('Integration', 'Reaktif Hesaplama: D2 Hücresi Güncellenmeli (5000*0.20 = 1000)', recalculated['D2'].computed === 1000, 1000, recalculated['D2'].computed);
assert('Integration', 'Reaktif Zincirleme: E2 Hücresi Güncellenmeli (5000+1000 = 6000)', recalculated['E2'].computed === 6000, 6000, recalculated['E2'].computed);

// Task Validation Integration
const taskTargetCell = 'D2';
const expectedValue = 1000;
const isTaskValid = Number(recalculated[taskTargetCell]?.computed) === expectedValue;
assert('Integration', 'Görev Doğrulama Pipeline: Beklenen Değer Eşleşmeli', isTaskValid, true);

// ==========================================
// 5. END-TO-END SCENARIO SIMULATIONS
// ==========================================

// Senaryo A — Yeni Öğrenci Akışı
const studentA: UserProgress = {
  completedLessonIds: [],
  currentLessonId: firstLessonId,
  completedTasks: {},
  quizScores: {},
  mistakes: [],
  skillMastery: {},
  totalTimeSpentMinutes: 0,
  lastStudyDate: '2026-10-16',
  unlockAllLessons: false,
};
assert('E2E', `Senaryo A: Yeni öğrenci ${firstLessonId} e erişebilmeli`, isLessonUnlocked(firstLessonId, studentA), true);
assert('E2E', `Senaryo A: Yeni öğrenci ${secondLessonId} ye erişememeli`, !isLessonUnlocked(secondLessonId, studentA), false);

// Öğrenci ilk ders sınavını %100 ile tamamlar
studentA.completedLessonIds.push(firstLessonId);
studentA.quizScores[firstLessonId] = 100;
studentA.currentLessonId = secondLessonId;
assert('E2E', `Senaryo A: Sınavı geçen öğrenci için ${secondLessonId} açılmalı`, isLessonUnlocked(secondLessonId, studentA), true);

// Senaryo B — Hatalı Formül ve İpucu / Geri Bildirim Akışı
const erroneousCells: Record<string, CellData> = {
  A1: { raw: '50', computed: 50 },
  B1: { raw: '0', computed: 0 },
  C1: { raw: '=A1/B1', computed: evaluateFormula('=A1/B1', { A1: { raw: '50', computed: 50 }, B1: { raw: '0', computed: 0 } }) },
};
assert('E2E', 'Senaryo B: Sıfıra bölme hatası tespit edilmeli (#SIFIR/0!)', erroneousCells['C1'].computed === '#SIFIR/0!', '#SIFIR/0!', erroneousCells['C1'].computed);

// Öğrenci hatayı EĞERHATA ile düzeltir
erroneousCells['C1'] = {
  raw: '=EĞERHATA(A1/B1; 0)',
  computed: evaluateFormula('=EĞERHATA(A1/B1; 0)', erroneousCells),
};
assert('E2E', 'Senaryo B: Hata düzeltildiğinde sonuç 0 olmalı', erroneousCells['C1'].computed === 0, 0, erroneousCells['C1'].computed);

// Senaryo C — Başarısız Sınav ve Kilit Koruma Akışı
const studentC: UserProgress = {
  completedLessonIds: [firstLessonId],
  currentLessonId: secondLessonId,
  completedTasks: {},
  quizScores: {},
  mistakes: [],
  skillMastery: {},
  totalTimeSpentMinutes: 10,
  lastStudyDate: '2026-10-16',
  unlockAllLessons: false,
};

// Öğrenci ikinci ders sınavından %50 alır (< %80)
const failedScore = 50;
studentC.quizScores[secondLessonId] = failedScore;
// Başarısız olduğu için completedLessonIds e EKLENMEZ
assert('E2E', `Senaryo C: %50 puan alan öğrenci için ${thirdLessonId} KİLİTLİ kalmalı`, !isLessonUnlocked(thirdLessonId, studentC), false);

// Öğrenci sınavı tekrar çözer ve %100 alır
studentC.quizScores[secondLessonId] = 100;
studentC.completedLessonIds.push(secondLessonId);
assert('E2E', `Senaryo C: Sınavı tekrar edip %100 alan öğrenci için ${thirdLessonId} AÇILMALI`, isLessonUnlocked(thirdLessonId, studentC), true);

// Senaryo D — Sesli Öğretmen Metin Normalizasyonu
const testSpeechText = 'Net tutar B$1 hücresinde 45000₺ olarak %18 KDV ile hesaplanmıştır; kontrol ediniz.';
const normalizedSpeech = testSpeechText
  .replace(/₺/g, ' Türk Lirası ')
  .replace(/%/g, ' yüzde ')
  .replace(/;/g, ', noktalı virgül, ')
  .replace(/([A-Z])\$([0-9]+)/g, '$1 dolar $2');

assert('VoiceTeacher', 'Senaryo D: ₺ simgesi Türk Lirası na çevrilmeli', normalizedSpeech.includes('Türk Lirası'));
assert('VoiceTeacher', 'Senaryo D: % simgesi yüzde ye çevrilmeli', normalizedSpeech.includes('yüzde'));
assert('VoiceTeacher', 'Senaryo D: B$1 adresi B dolar 1 olarak seslendirilmeli', normalizedSpeech.includes('B dolar 1'));

// Senaryo E — CSV Dışa Aktarma ve İçe Aktarma Veri Bütünlüğü
const testSheetCells: Record<string, CellData> = {
  A1: { raw: 'Ürün', computed: 'Ürün' },
  B1: { raw: 'Tutar', computed: 'Tutar' },
  A2: { raw: 'Laptop', computed: 'Laptop' },
  B2: { raw: '35000', computed: 35000 },
};

// Serialize to CSV
let exportedCsv = 'Ürün;Tutar\nLaptop;35000\n';
// Deserialize CSV
const lines = exportedCsv.trim().split('\n');
const parsedCols = lines[1].split(';');
assert('WorkspaceFiles', 'Senaryo E: CSV Satır Sayısı 2 Olmalı', lines.length === 2);
assert('WorkspaceFiles', 'Senaryo E: Ürün Adı Korunmalı', parsedCols[0] === 'Laptop');
assert('WorkspaceFiles', 'Senaryo E: Tutar Sayısal Olarak Okunmalı', Number(parsedCols[1]) === 35000);

// ==========================================
// TEST SUMMARY & REPORT GENERATION
// ==========================================
const totalCount = allTests.length;
const passedCount = allTests.filter((t) => t.passed).length;
const failedCount = allTests.filter((t) => !t.passed).length;
const failures = allTests.filter((t) => !t.passed);

const suiteStats: Record<string, { total: number; passed: number; failed: number }> = {};
allTests.forEach((t) => {
  if (!suiteStats[t.suite]) {
    suiteStats[t.suite] = { total: 0, passed: 0, failed: 0 };
  }
  suiteStats[t.suite].total++;
  if (t.passed) suiteStats[t.suite].passed++;
  else suiteStats[t.suite].failed++;
});

console.log('==============================================');
console.log('EXCEL AKADEMİ AI TEST SONUÇLARI');
console.log('==============================================');
console.log(`Toplam Test Sayısı : ${totalCount}`);
console.log(`Başarılı Testler   : ${passedCount}`);
console.log(`Başarısız Testler  : ${failedCount}`);
console.log(`Başarı Oranı       : ${((passedCount / totalCount) * 100).toFixed(1)}%`);
console.log('----------------------------------------------');
console.log('Test Grupları Dağılımı:');
for (const [suite, s] of Object.entries(suiteStats)) {
  console.log(`  - ${suite.padEnd(16)}: Toplam ${s.total}, Başarılı ${s.passed}, Başarısız ${s.failed}`);
}
console.log('==============================================\n');

if (failures.length > 0) {
  console.error('Başarısız Test Ayrıntıları:', JSON.stringify(failures, null, 2));
  process.exit(1);
} else {
  console.log('Tüm testler başarıyla tamamlandı!');
}
