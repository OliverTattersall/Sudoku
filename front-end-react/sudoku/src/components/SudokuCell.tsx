import React, { ChangeEventHandler, MouseEventHandler } from "react";

interface SudokuCellProps {
    highlighted?:boolean
    value:any
    onChange:ChangeEventHandler
    onClick:MouseEventHandler
    disabled?:boolean
    error?:boolean
}

export const SudokuCell = ({highlighted = false, value, onChange, onClick, disabled = false, error = false}:SudokuCellProps) => {
    // console.log(false)
    // console.log(highlighted);
    return (
        <td className={"border-2 border-slate-400 " + (error ? "bg-red-400/60": highlighted ? "bg-cyan-400/30" :  "")}>
            <div className="w-12 h-12">
                <textarea 
                disabled={disabled} 
                className={" h-full w-full resize-none text-center " + (error ? "bg-red-400/60 ": highlighted ? "bg-cyan-400/30 " :  "") + (disabled? "font-semibold" : "")} 
                value={value ? value : ''} 
                onChange={onChange} 
                onClick={onClick}
                />
                
            </div>
            
        </td>
    );

}