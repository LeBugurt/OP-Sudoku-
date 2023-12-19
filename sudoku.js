import { GRID_SIZE } from "./utilities.js";
import { generateSudoku, findEmptyCell } from "./sudokuGenerator.js";

export class Sudoku {
    constructor() {
        this.grid = generateSudoku();
    }

    getDuplicatePositions(row, column, value) {
        const duplicatesInColumn = this.getDuplicatePositionsInColumn(row, column, value)
        const duplicatesInRow = this.getDuplicatePositionsInRow(row, column, value);
        const duplicatesInFigure = this.getDuplicatePositionsInFigure(row, column, value);

        const duplicates = [...duplicatesInColumn, ...duplicatesInRow];
        duplicatesInFigure.forEach(duplicateInFigure => {
            if (duplicateInFigure.row !== row && duplicateInFigure.column !== column) duplicates.push(duplicateInFigure);
        });

        return duplicates;
    }

    getDuplicatePositionsInColumn(row, column, value) {
        const duplicates = [];
        for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
            if (this.grid[iRow][column].value === value && iRow !== row) {
                duplicates.push({ row: iRow, column });
            }
        }
        return duplicates;
    }

    getDuplicatePositionsInRow(row, column, value) {
        const duplicates = [];
        for (let iColumn = 0; iColumn < GRID_SIZE; iColumn++) {
            if (this.grid[row][iColumn].value === value && iColumn !== column) {
                duplicates.push({ row, column: iColumn });
            }
        }
        return duplicates;
    }

    getDuplicatePositionsInFigure(row, column, value) {
        const duplicates = [];
        for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
            for (let iColum = 0; iColum < GRID_SIZE; iColum++) {
                if (this.grid[iRow][iColum].figure === this.grid[row][column].figure && this.grid[iRow][iColum].value === value) {
                    duplicates.push({ row: iRow, column: iColum });
                }
            }
        }
        return duplicates;
    }

    hasEmptyCells() {
        return Boolean(findEmptyCell(this.grid));
    }
}