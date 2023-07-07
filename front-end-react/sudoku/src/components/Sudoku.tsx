import { useQuery } from "react-query"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SudokuCell } from "./SudokuCell.tsx";
import { integerDivide } from "../functions/math.ts";

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
}

export const Sudoku = ({diff, rerender, endGame}:SudokuProps) => {
    const {data, isLoading, isError, status, refetch}= useQuery(["puzzle", diff], fetchUsers)
    // console.log(diff, rerender);
    const [sudokuGrid, updateGrid] = useState([0,0,0,0,0,0,0,0,0].map(x => [0,0,0,0,0,0,0,0,0]))
    const [disabledGrid, updateDisableGrid] = useState([false, false, false, false, false, false, false, false, false].map(x => [false, false, false, false, false, false, false, false, false]))
    const [count, updateCount] = useState(0);
    const [selectedCell, updateSelectedCell] = useState([-1,-1]);
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
                updateGrid(tempgrid);
                updateDisableGrid(tempDisGrid);
                updateSelectedCell([-1,-1]);
            }
            
        }
    }, [diff, rerender, isLoading])

    useEffect(()=>{
        if(count===81){
            console.log('yay')
            endGame();
        }
    }, [count])

    const changeSudoku = (rowId, colId) => ({nativeEvent}) =>{
        // console.log(nativeEvent.data);
        let cleanData = nativeEvent.data?.replace(/[^0-9]/g,'')
        updateGrid(prev => prev.map((row, rid) => row.map(
            (col, cid) => (rowId===rid && colId===cid) ? parseInt(cleanData) : prev[rid][cid]
            )
        ));
        
        if(cleanData){
            updateCount(prev => prev + 1);
        }
        // console.log(rowId, colId, newGrid[rowId][colId])
    } 

    const onClick = (rowId, colId) => () => {
        console.log(rowId, colId);
        updateSelectedCell([rowId, colId])
    }


    // console.log(selectedCell);

    return (
    <>
        <div className="max-w-sm mx-auto ">
            <h1>Sudoku</h1>
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
                                    onClick={onClick(rowId, colId)}
                                    disabled={disabledGrid[rowId][colId]}
                                    />
                                );
                            })}
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    </>
    
    );
}