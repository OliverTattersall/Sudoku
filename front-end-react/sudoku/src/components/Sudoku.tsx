import { useQuery } from "react-query"
import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchUsers = async ({queryKey}) => {
    const [_, diff] = queryKey;
    // const res = await fetch("https://sudoku-api-django.vercel.app/puzzle/");
    // return res.json();
    console.log(diff)
    return await axios.get("https://sudoku-api-django.vercel.app/puzzle/?difficulty="+diff);
}

const SudokuCell = ({highlighted = false, value, onChange, onClick}) => {

    // console.log(highlighted);
    return (
        <td className={"border-2 border-slate-400 " + (highlighted ? "bg-red-500/50" : "")}>
            <div className="w-12 h-12">
                <textarea className={" h-full w-full resize-none text-center " + (highlighted ? "bg-red-500/50" : "")} 
                value={value} 
                onChange={onChange} 
                onClick={onClick}
                />
                
            </div>
            
        </td>
    );

}

interface SudokuProps {
    diff: string
    rerender: boolean
}

export const Sudoku = ({diff, rerender}:SudokuProps) => {
    const {data, isLoading, isError, status}= useQuery(["puzzle", diff], fetchUsers)
    console.log(diff, rerender);
    const [sudokuGrid, updateGrid] = useState([0,0,0,0,0,0,0,0,0].map(x => [0,0,0,0,0,0,0,0,0]))
    const [selectedCell, updateSelectedCell] = useState([-1,-1]);
    useEffect(()=>{
        console.log('triggered');
        if(!isLoading){
            if(diff!==''){
                let tempgrid= data?.data[diff].split(',')
                for(let i = 0; i < 9; i++){
                    tempgrid[i] = tempgrid[i].split('').map(x => parseInt(x))
                }

                console.log(tempgrid)
                updateGrid(tempgrid);
                updateSelectedCell([-1,-1]);
            }
            
        }
    }, [diff, rerender])

    const changeSudoku = (rowId, colId) => ({nativeEvent}) =>{
        let cleanData = nativeEvent.data.replace(/[^0-9]/g,'')
        // let newGrid = sudokuGrid;
        // newGrid[rowId][colId] = parseInt(cleanData);
        updateGrid(prev => prev.map((row, rid) => row.map((col, cid) => (rowId===rid && colId===cid) ? parseInt(cleanData) : prev[rid][cid])
        ));
        // console.log(rowId, colId, newGrid[rowId][colId])
    } 

    const onClick = (rowId, colId) => () => {
        console.log(rowId, colId);
        updateSelectedCell([rowId, colId])
    }

    const integerDivide = (num, div) => Math.floor(num/div);

    console.log(selectedCell);

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