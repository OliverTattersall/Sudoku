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