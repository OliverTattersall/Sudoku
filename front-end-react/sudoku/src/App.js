// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Sudoku } from './components/Sudoku.tsx';
import Stopwatch from './components/Stopwatch.tsx';
import { integerDivide } from './functions/math.ts';

function App() {
  const [diff, updateDiff] = useState('');
  const [rerender, setRerender] = useState(true);
  const [runningGame, updateRunning] = useState(0)
  const [finishedGame, updateFinishedGame] = useState(false);

  const onNewGame = (newdiff) => () => {
    // console.log('hello')
    updateFinishedGame(false);
    updateRunning(prev => integerDivide(prev, 2)*2+2);
    if(newdiff === diff){
      setRerender(prev => !prev);
    }else{
      updateDiff(newdiff);
    }
  }

  return (
    <>
    <h1 className="text-3xl font-bold underline max-w-sm mx-auto text-center">
      Sudoku
    </h1>
    <br/>
    <div className='max-w-lg mx-auto'>
      <div className='inline'>
        <Sudoku 
        diff = {diff} 
        rerender={rerender} 
        endGame={()=>(updateFinishedGame(true))} 
        resumeGame={()=>(updateFinishedGame(false))}/>
      </div>
      
      <div className='mx-auto content-center'>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onNewGame('beginner')}>Beginner</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onNewGame('easy')}>Easy</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onNewGame('medium')}>Medium</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onNewGame('hard')}>Hard</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onNewGame('veryhard')}>Evil</button>
        <Stopwatch running={runningGame} pause={finishedGame}/>
      </div>
      
    </div>

    </>
  );
}

export default App;
