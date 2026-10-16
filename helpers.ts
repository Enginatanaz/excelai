import { WorkbookData } from '../types/excel';

export function createTableSheet(
  sheetId: string,
  sheetName: string,
  headers: string[],
  rows: (string | number)[][],
  columnWidths?: Record<string, number>
): WorkbookData {
  const cells: Record<string, any> = {};

  // Headers in row 1
  headers.forEach((h, colIdx) => {
    const colLetter = String.fromCharCode(65 + colIdx);
    const addr = `${colLetter}1`;
    cells[addr] = {
      raw: h,
      computed: h,
      format: {
        bold: true,
        bgColor: '#047857', // emerald 700
        textColor: '#FFFFFF',
        align: 'center',
        border: 'all',
      },
    };
  });

  // Data in rows 2..
  rows.forEach((row, rowIdx) => {
    const rowNum = rowIdx + 2;
    row.forEach((val, colIdx) => {
      const colLetter = String.fromCharCode(65 + colIdx);
      const addr = `${colLetter}${rowNum}`;
      const isNum = typeof val === 'number';
      cells[addr] = {
        raw: String(val),
        computed: val,
        format: {
          align: isNum ? 'right' : 'left',
          border: 'all',
          numberFormat: isNum && val > 1000 ? 'currency' : 'general',
        },
      };
    });
  });

  return {
    activeSheetId: sheetId,
    sheets: [
      {
        id: sheetId,
        name: sheetName,
        cells,
        columnWidths: columnWidths || { A: 140, B: 130, C: 120, D: 140, E: 120 },
      },
    ],
  };
}
