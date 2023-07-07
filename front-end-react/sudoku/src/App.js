// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import { Sudoku } from './components/Sudoku.tsx';

function App() {
  const [diff, updateDiff] = useState('');
  const [rerender, setRerender] = useState(true);

  const onNewGame = (newdiff) => () => {
    console.log('hello')
    if(newdiff === diff){
      setRerender(prev => !prev);
    }else{
      updateDiff(newdiff);
    }
  }

  return (
    <>
    <h1 className="text-3xl font-bold underline max-w-sm mx-auto">
      Hello world!
    </h1>
    <div className='max-w-sm mx-auto'>
      <Sudoku diff = {diff} rerender={rerender}/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onNewGame('hard')}>Hard</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onNewGame('easy')}>Easy</button>
    </div>
    {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}

    </>
  );
}

export default App;
