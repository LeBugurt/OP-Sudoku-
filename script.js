import {Sudoku} from "./sudoku.js";
import {GRID_SIZE} from "./utilities.js";
import {convertIndexToPosition, convertPositionToIndex} from "./utilities.js";

const sudoku = new Sudoku();
let cells;
let selectedCellIndex;
let selectedCell;
init();

function init() {
    initCells();
    initNumbers();
    initRemover();
    initKeyEvent();
}

function initCells() {
    cells = document.querySelectorAll('.cell');
    fillCells();
    initCellsEvent();
}

function fillCells() {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const { row, column } = convertIndexToPosition(i);

        if (sudoku.grid[row][column].value !== null) {
            cells[i].classList.add('filled');
            cells[i].innerHTML = sudoku.grid[row][column].value;
        }

        cells[i].classList.add('figureNum' + sudoku.grid[row][column].figure);
    }
}

function initCellsEvent() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => onCellClick(cell, index));
    });
}

function onCellClick(clickCell, index) {
    cells.forEach(cell => cell.classList.remove('selected'));

    if (clickCell.classList.contains('filled')) {
        selectedCellIndex = null;
        selectedCell = null;
    } else {
        selectedCellIndex = index;
        selectedCell = clickCell;
        clickCell.classList.add('selected');
    }
}

function initNumbers() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number) => {
        number.addEventListener('click', () => onNumberClick(parseInt(number.innerHTML)))
    });
}

function onNumberClick(number) {
    if (!selectedCell) return;
    if (selectedCell.classList.contains('filled')) return;

    cells.forEach(cell => cell.classList.remove( 'zoom', 'shake', 'selected'));
    selectedCell.classList.add('selected');
    setValueInSelectedCell(number);

    if (!sudoku.hasEmptyCells()) {
        setTimeout(() => winAnimation(), 500);
    }
}

function setValueInSelectedCell(value) {
    const { row, column } = convertIndexToPosition(selectedCellIndex);
    const duplicatesPositions = sudoku.getDuplicatePositions(row, column, value);
    if (duplicatesPositions.length) {
        highlightDuplicates(duplicatesPositions);
        return;
    }
    sudoku.grid[row][column] = value;
    selectedCell.innerHTML = value;
    setTimeout(() => selectedCell.classList.add('zoom'), 0);
}

function highlightDuplicates(duplicatesPositions) {
    duplicatesPositions.forEach(duplicate => {
        const index = convertPositionToIndex(duplicate.row, duplicate.column);
        setTimeout(() => cells[index].classList.add('shake'), 0);
    });
}

function initRemover() {
    const remover = document.querySelector('.remove');
    remover.addEventListener('click', () => onRemoveClick());
}

function onRemoveClick() {
    if (!selectedCell) return;
    if (selectedCell.classList.contains('filled')) return;

    cells.forEach(cell => cell.classList.remove( 'zoom', 'shake', 'selected'));
    selectedCell.classList.add('selected');
    const { row, column } = convertIndexToPosition(selectedCellIndex);
    selectedCell.innerHTML = '';
    sudoku.grid[row][column].value = null;
}

function initKeyEvent() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') {
            onRemoveClick();
        } else if (event.key >= '1' && event.key <= '9') {
            onNumberClick(parseInt(event.key));
        }
    });
}

function winAnimation() {
    cells.forEach(cell => cell.classList.remove( 'selected', 'zoom'));
    cells.forEach((cell, i) => {
        setTimeout(() => cell.classList.add('zoom'), i * 30);
    });
}