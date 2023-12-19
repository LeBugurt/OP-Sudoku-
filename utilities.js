export const GRID_SIZE = 9;

export function convertIndexToPosition(i) {
    return {
        row: Math.floor(i / GRID_SIZE),
        column: i % GRID_SIZE
    }
}

export function convertPositionToIndex(row, column) {
    return row * GRID_SIZE + column;
}