import { useQuery } from "react-query"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SudokuCell } from "./SudokuCell";
import { integerDivide } from "../functions/math";
import { checkGrid, solveSudoku } from "../functions/sudoku";
import { ToastContainer, toast } from "react-toastify";

const fetchUsers = async ({queryKey}) => {
    const [_, diff] = queryKey;
    // const res = await fetch("https://sudoku-api-django.vercel.app/puzzle/");
    // return res.json();
    console.log(diff)
    return await axios.get("https://sudoku-api-django.vercel.app/puzzle/?difficulty="+diff);
}

interface SudokuProps {
    diff: string
    rerender: boolean
    endGame: Function
    resumeGame: Function
}

export const Sudoku = ({diff, rerender, endGame, resumeGame}:SudokuProps) => {
    const {data, isLoading, isError, status, refetch}= useQuery(["puzzle", diff], fetchUsers)
    // console.log(diff, rerender);
    const [sudokuGrid, updateSudokuGrid] = useState([0,0,0,0,0,0,0,0,0].map(x => [0,0,0,0,0,0,0,0,0]))
    const [disabledGrid, updateDisableGrid] = useState([false, false, false, false, false, false, false, false, false].map(x => [false, false, false, false, false, false, false, false, false]))
    const [errorGrid, updateErrorGrid] = useState([false, false, false, false, false, false, false, false, false].map(x => [false, false, false, false, false, false, false, false, false]));
    const [count, updateCount] = useState(0);
    const [errorCount, updateErrorCount] = useState(0);
    const [selectedCell, updateSelectedCell] = useState([-1,-1]);
    const [showedSolution, updateShowedSolution] = useState(false);
    useEffect(()=>{
        console.log('triggered');
        if(diff!==''){
            refetch();
        }
        if(!isLoading){
            if(diff!==''){
                let tempgrid= data?.data[diff].split(',')
                let tempDisGrid = [];
                let tempcount = 0;
                for(let i = 0; i < 9; i++){
                    
                    tempgrid[i] = tempgrid[i].split('').map(x => parseInt(x))
                    tempDisGrid.push( tempgrid[i].map(x => !!x) );
                    tempcount += tempgrid[i].reduce((x, y) => x + !!y, 0)
                }
                
                // console.log(tempgrid, tempcount)
                updateCount(tempcount);
                updateSudokuGrid(tempgrid);
                updateDisableGrid(tempDisGrid);
                updateSelectedCell([-1,-1]);
                updateShowedSolution(false);
                updateErrorGrid([false, false, false, false, false, false, false, false, false].map(x => [false, false, false, false, false, false, false, false, false]))
            }
            
        }
    }, [diff, rerender, isLoading])

    useEffect(()=>{
        if(count===81){
            
            let message = '';
            const {tempcount, errorGrid:tempError} = checkGrid(sudokuGrid);
            updateSelectedCell([-1,-1])
            updateErrorCount(tempcount);
            if(!tempcount && !showedSolution){

                toast('Nice Job!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })

                console.log('yay');
            }else if(tempcount){
                toast.error('There seems to be a couple errors :(', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                console.log("boo");
                updateErrorGrid(tempError);
            }
            console.log(message, count)
            endGame();
        }else{
            resumeGame();
        }
    }, [count])
    // console.log(count)

    const changeSudoku = (rowId, colId) => ({nativeEvent}) =>{
        // console.log(nativeEvent.data);
        let cleanData = nativeEvent.data?.replace(/[^0-9]/g,'')
        updateSudokuGrid(prev => prev.map((row, rid) => row.map(
            (col, cid) => (rowId===rid && colId===cid) ? parseInt(cleanData) : prev[rid][cid]
            )
        ));
        
        if(cleanData){
            if(errorGrid[rowId][colId]){

            }
        }

        let tempcount = 0;
        for(let row:number = 0; row < 9; row++){
            for(let col:number = 0; col < 9; col++){
                if(sudokuGrid[row][col]){
                    tempcount++;
                }
            }
        }
        if(sudokuGrid[rowId][colId]){
            if(!cleanData){
                tempcount--;
            }
        }else{
            if(cleanData){
                tempcount++;
            }
        }
        updateCount(tempcount);
        
        // console.log(rowId, colId, newGrid[rowId][colId])
    } 

    const onSquareClick = (rowId, colId) => () => {
        console.log(rowId, colId);
        updateSelectedCell([rowId, colId])
    }

    const clearError = () => {
        updateSudokuGrid(prev => prev.map((row, rid) => row.map(
            (col, cid) => errorGrid[rid][cid] && !disabledGrid[rid][cid] ? 0 : prev[rid][cid]
        )))
        updateErrorGrid([false, false, false, false, false, false, false, false, false].map(x => [false, false, false, false, false, false, false, false, false]));
        updateErrorCount(0);

    }

    const showSolution = ()=>{
        const answerGrid:number[][] = solveSudoku(sudokuGrid);
        updateSudokuGrid(prev => prev.map((row, rid) => row.map
            ((col, cid) => prev[rid][cid] = answerGrid[rid][cid]
        )));
        updateCount(81);
        updateShowedSolution(true);
    }
    // console.log(selectedCell);

    return (
    <>
        {/* <div className="max-w-lg mx-auto "> */}
        <ToastContainer />
            <table className="border-collapse">
                <tbody>
                    {sudokuGrid.map((row, rowId) => {
                        return (<tr className="">
                            {row.map((col, colId) => {
                                return (
                                    <SudokuCell 
                                    highlighted={rowId === selectedCell[0] 
                                        || colId === selectedCell[1] 
                                        || (integerDivide(rowId,3) === integerDivide(selectedCell[0],3) 
                                        && integerDivide(colId,3) === integerDivide(selectedCell[1],3))} 
                                    value={sudokuGrid[rowId][colId]} 
                                    onChange={changeSudoku(rowId, colId)}
                                    onClick={onSquareClick(rowId, colId)}
                                    disabled={disabledGrid[rowId][colId]}
                                    error={errorGrid[rowId][colId]}
                                    />
                                );
                            })}
                        </tr>);
                    })}
                </tbody>
            </table>
            {errorCount ? 
            <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={clearError}
            >Clear error boxes</button>
            : null}
            {diff ? 
            <button 
            className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={showSolution}
            >Show Solution</button>
            : null
            }
            
        {/* </div> */}
    </>
    
    );
}