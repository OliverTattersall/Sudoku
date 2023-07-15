import { integerDivide } from "./math";

export interface answerGrid{
    tempcount:number
    errorGrid:boolean[][]
}

export const checkGrid = (sudokuGrid:number[][]):answerGrid => {
    let count:number = 0;
    let errorGrid:boolean[][] = [false, false, false, false, false, false, false, false, false].map(x => [false, false, false, false, false, false, false, false, false]);
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col ++){
            for(let i = 0; i < 9; i++){
                if(col!==i && sudokuGrid[row][col] === sudokuGrid[row][i]){
                    errorGrid[row][col] = true;
                    count++;
                    break;
                    
                }

                if(row!==i && sudokuGrid[row][col] === sudokuGrid[i][col]){
                    errorGrid[row][col] = true;
                    count++;
                    break;
                }

                if((row!==3*integerDivide(row,3) + i%3 || col!==3*integerDivide(col,3)+integerDivide(i,3)) 
                && sudokuGrid[row][col] === sudokuGrid[3*integerDivide(row,3) + i%3][3*integerDivide(col,3) + integerDivide(i,3)]){
                    errorGrid[row][col] = true;
                    count++;
                    break;
                }
            }
        }
    }

    return {tempcount:count, errorGrid:errorGrid};

}


export const solveSudoku = (sudokuGrid:number[][]) => {
    let emptySpot = open(sudokuGrid);
    let row = emptySpot[0];
    let col = emptySpot[1];

    // there is no more empty spots
    if (row === -1){
        return sudokuGrid;
    }

    for(let num = 1; num<=9; num++){
        if (possible(sudokuGrid,  col, row, num)){
            sudokuGrid[row][col] = num;
            solveSudoku(sudokuGrid);
        }
    }

    if (open(sudokuGrid)[0] !== -1)
        sudokuGrid[row][col] = 0;

    return sudokuGrid;
}



// checks if a number can be put in a specific slot
// sudoku is 9x9 2d list of numbers
const possible = (sudoku, col, row, num) => {

    // checks if the number is in the row or column
    for(let i=0;i<9;i++){
        if(sudoku[row][i]===num){
            return false
        }
        if(sudoku[i][col]===num){
            return false
        }
    }

    //checks if the number is the grid
    let x0:number = Math.floor(col/3)*3
    let y0:number = Math.floor(row/3)*3
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(sudoku[y0+i][x0+j]===num){
                return false
            }
        }
    }

    return true

}




// returns next open slot on the sudoku board, return -1, -1 if no empty slots
const open = (sudoku) => {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (sudoku[i][j] === 0) 
                return [i, j];
        }
    }
    return [-1, -1];
}

