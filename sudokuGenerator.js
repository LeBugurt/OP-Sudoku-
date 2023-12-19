import {GRID_SIZE} from "./utilities.js"
import {arrayTemplates} from "./tamplates.js";

export function generateSudoku() {
    const sudoku = createEmptyGrid();
    resolveSudoku(sudoku);
    return removeCells(sudoku);
}

export function createEmptyGrid_() {
    return new Array(GRID_SIZE).fill(null).map(() => {
        return new Array(GRID_SIZE).fill(null).map(() => {
            return {
                value: null,
                figure: null,
            }
        })
    })
}

function createEmptyGrid() {
    const numbers = getRandomNumbers();
    return arrayTemplates[numbers[0] % 7];
}

export function findEmptyCell(grid) {
    for (let row = 0; row < GRID_SIZE; row++)
        for (let colum = 0; colum < GRID_SIZE; colum++) {
            if(grid[row][colum].value === null) return{row,colum};
        }

    return null;
}

function getRandomNumbers() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = numbers.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }
    return numbers;
}


function resolveSudoku(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return true;

    const numbers = getRandomNumbers();

    for (let  i = 0; i < numbers.length; i++) {
        if (validate(grid, emptyCell.row, emptyCell.colum, numbers[i])) {
            grid[emptyCell.row][emptyCell.colum].value = numbers[i];

            if (resolveSudoku(grid))
                return true;

            grid[emptyCell.row][emptyCell.colum].value = null;
        }
    }
    return false;
}

function validate(grid, row, column, value) {
    return validateColumn(grid, row, column, value)
        && validateRow(grid, row, column, value)
        && validateFigure(grid, row, column, value);
}

function validateColumn(grid, row, column, value) {
    for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
        if (grid[iRow][column].value === value && iRow !== row) return false;
    }
    return true;
}

function validateRow(grid, row, column, value) {
    for (let iColumn = 0; iColumn < GRID_SIZE; iColumn++) {
        if (grid[row][iColumn].value === value && iColumn !== column) return false;
    }
    return true;
}

function validateFigure(grid, row, column, value) {
    for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
        for (let iColum = 0; iColum < GRID_SIZE; iColum++) {
            if (grid[iRow][iColum].figure === grid[row][column].figure && grid[iRow][iColum].value === value) {
                    return false;
            }
        }
    }

    return true;
}

function removeCells(grid) {
    const DIFFICULTY = 30;
    const resultGrid = [...grid].map(row => [...row]);

    let i = 0;
    while (i < DIFFICULTY) {
        let row = Math.floor(Math.random() * GRID_SIZE);
        let column = Math.floor(Math.random() * GRID_SIZE);
        if (resultGrid[row][column].value !== null) {
            resultGrid[row][column].value = null;
            i++;
        }
    }

    return resultGrid;
}