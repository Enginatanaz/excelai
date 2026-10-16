import {
  evaluateFormula,
  recalculateAllCells,
  shiftFormula,
  parseCellAddress,
  formatAddress,
  parseRange,
  colLetterToIndex,
  colIndexToLetter,
} from '../engine/formulaEngine';
import { CellData } from '../types/excel';

interface TestResult {
  name: string;
  category: string;
  passed: boolean;
  expected: any;
  actual: any;
  error?: string;
}

const results: TestResult[] = [];

function assertFormula(name: string, category: string, formula: string, expected: any, initialCells: Record<string, any> = {}) {
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

    results.push({
      name,
      category,
      passed,
      expected,
      actual: computed,
    });
  } catch (err: any) {
    results.push({
      name,
      category,
      passed: false,
      expected,
      actual: null,
      error: err.message,
    });
  }
}

// 1. Basic Math & Stats Tests
assertFormula('TOPLA Basic', 'Math', '=TOPLA(10; 20; 30)', 60);
assertFormula('SUM English Alias', 'Math', '=SUM(15, 25, 10)', 50);
assertFormula('TOPLA Range', 'Math', '=TOPLA(A1:A3)', 60, { A1: 10, A2: 20, A3: 30 });
assertFormula('ORTALAMA Range', 'Stats', '=ORTALAMA(A1:A4)', 25, { A1: 10, A2: 20, A3: 30, A4: 40 });
assertFormula('AVERAGE Alias', 'Stats', '=AVERAGE(B1:B2)', 50, { B1: 40, B2: 60 });
assertFormula('MAK Test', 'Stats', '=MAK(A1:A3)', 30, { A1: 10, A2: 30, A3: 20 });
assertFormula('MİN Test', 'Stats', '=MİN(A1:A3)', 10, { A1: 10, A2: 30, A3: 20 });
assertFormula('SAY (COUNT) Numbers', 'Stats', '=SAY(A1:A4)', 3, { A1: 10, A2: 'Metin', A3: 20, A4: 30 });
assertFormula('BAĞ_DEĞ_DOLU_SAY (COUNTA)', 'Stats', '=BAĞ_DEĞ_DOLU_SAY(A1:A4)', 4, { A1: 10, A2: 'Metin', A3: 20, A4: 'Bilgi' });

// 2. Logic Tests (EĞER / IF)
assertFormula('EĞER True Condition', 'Logic', '=EĞER(A1>50; "Prim Var"; "Prim Yok")', 'Prim Var', { A1: 75 });
assertFormula('EĞER False Condition', 'Logic', '=EĞER(A1>50; "Prim Var"; "Prim Yok")', 'Prim Yok', { A1: 30 });
assertFormula('EĞER Comparison >=', 'Logic', '=EĞER(B1>=C1; "%10 Prim"; "%0 Prim")', '%10 Prim', { B1: 60000, C1: 60000 });
assertFormula('IF English Alias', 'Logic', '=IF(10>5, 100, 0)', 100);
assertFormula('VE (AND) True', 'Logic', '=VE(10>5; 20>10)', true);
assertFormula('VE (AND) False', 'Logic', '=VE(10>5; 20<10)', false);
assertFormula('YADA (OR) True', 'Logic', '=YADA(10>50; 20>10)', true);
assertFormula('EĞERHATA with Error', 'Logic', '=EĞERHATA(A1/B1; 0)', 0, { A1: 100, B1: 0 });
assertFormula('EĞERHATA with Normal Value', 'Logic', '=EĞERHATA(A1/B1; 0)', 5, { A1: 100, B1: 20 });

// 3. Conditional Calculations (ETOPLA, ÇOKETOPLA, EĞERSAY, ÇOKEĞERSAY)
assertFormula('EĞERSAY Text Match', 'Conditional', '=EĞERSAY(A1:A4; "Marmara")', 2, {
  A1: 'Marmara',
  A2: 'Ege',
  A3: 'Marmara',
  A4: 'İç Anadolu',
});
assertFormula('EĞERSAY Operator Criteria', 'Conditional', '=EĞERSAY(B1:B4; ">500")', 3, {
  B1: 600,
  B2: 400,
  B3: 800,
  B4: 1000,
});
assertFormula('ETOPLA Criteria', 'Conditional', '=ETOPLA(A1:A3; "Gıda"; B1:B3)', 700, {
  A1: 'Gıda',
  B1: 300,
  A2: 'Tekstil',
  B2: 500,
  A3: 'Gıda',
  B3: 400,
});
assertFormula('ÇOKETOPLA Multi-Criteria', 'Conditional', '=ÇOKETOPLA(C1:C4; A1:A4; "Marmara"; B1:B4; "Elektronik")', 120000, {
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

// 4. Lookup & Reference Tests (DÜŞEYARA, ÇAPRAZARA, İNDİS, KAÇINCI)
assertFormula('DÜŞEYARA Exact Match', 'Lookup', '=DÜŞEYARA("1002"; A1:C3; 3; YANLIŞ)', 4500, {
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
assertFormula('DÜŞEYARA Not Found', 'Lookup', '=DÜŞEYARA("9999"; A1:C2; 2; YANLIŞ)', '#YOK', {
  A1: '1001',
  B1: 'Laptop',
  C1: 32000,
  A2: '1002',
  B2: 'Saat',
  C2: 4500,
});
assertFormula('ÇAPRAZARA Leftward Lookup', 'Lookup', '=ÇAPRAZARA("SC-92"; B1:B2; A1:A2)', 'Finans', {
  A1: 'Pazarlama',
  B1: 'SC-88',
  A2: 'Finans',
  B2: 'SC-92',
});
assertFormula('KAÇINCI (MATCH)', 'Lookup', '=KAÇINCI("Saat"; B1:B3; 0)', 2, {
  B1: 'Laptop',
  B2: 'Saat',
  B3: 'Kulaklık',
});
assertFormula('İNDİS (INDEX)', 'Lookup', '=İNDİS(A1:B2; 2; 1)', 'Finans', {
  A1: 'Pazarlama',
  B1: 5000,
  A2: 'Finans',
  B2: 8000,
});

// 5. Text & String Functions
assertFormula('METİNBİRLEŞTİR', 'Text', '=METİNBİRLEŞTİR(" "; DOĞRU; "Ahmet"; "Yılmaz")', 'Ahmet Yılmaz');
assertFormula('SOLDAN (LEFT)', 'Text', '=SOLDAN("TR-2026-IST"; 2)', 'TR');
assertFormula('SAĞDAN (RIGHT)', 'Text', '=SAĞDAN("TR-2026-IST"; 3)', 'IST');
assertFormula('PARÇAAL (MID)', 'Text', '=PARÇAAL("TR-2026-IST"; 4; 4)', '2026');
assertFormula('UZUNLUK (LEN)', 'Text', '=UZUNLUK("Excel Akademi")', 13);
assertFormula('KIRP (TRIM)', 'Text', '=KIRP("  İstanbul   Ofisi  ")', 'İstanbul Ofisi');
assertFormula('Concatenation & Operator', 'Text', '="Net: " & 1500 & " TL"', 'Net: 1500 TL');

// 6. Arithmetic & Cell References
assertFormula('Relative Math', 'Arithmetic', '=A1*B1+C1', 250, { A1: 20, B1: 10, C1: 50 });
assertFormula('Division By Zero Error', 'Arithmetic', '=A1/B1', '#SIFIR/0!', { A1: 100, B1: 0 });
assertFormula('Parentheses Math', 'Arithmetic', '=(A1-B1)*C1-D1', 30000, {
  A1: 150,
  B1: 90,
  C1: 1000,
  D1: 30000,
});

// 7. Reference Shift Test
const shiftedFormula = shiftFormula('=B4*$B$1', 0, 1);
const shiftedPassed = shiftedFormula === '=B5*$B$1';
results.push({
  name: 'shiftFormula Absolute Reference Retention',
  category: 'References',
  passed: shiftedPassed,
  expected: '=B5*$B$1',
  actual: shiftedFormula,
});

// Summary
const totalTests = results.length;
const passedTests = results.filter((r) => r.passed).length;
const failedTests = results.filter((r) => !r.passed);

console.log(JSON.stringify({
  totalTests,
  passedTests,
  successRate: ((passedTests / totalTests) * 100).toFixed(1) + '%',
  failures: failedTests,
}, null, 2));
