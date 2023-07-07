import React, { useEffect, useState } from "react";


export const SudokuCell = ({highlighted = false, value, onChange, onClick, disabled = false}) => {

    // console.log(highlighted);
    return (
        <td className={"border-2 border-slate-400 " + (highlighted ? "bg-red-300/30" : "")}>
            <div className="w-12 h-12">
                <textarea 
                disabled={disabled} 
                className={" h-full w-full resize-none text-center " + (highlighted ? "bg-red-300/30 " : "") + (disabled? "font-semibold" : "")} 
                value={value ? value : ''} 
                onChange={onChange} 
                onClick={onClick}
                />
                
            </div>
            
        </td>
    );

}