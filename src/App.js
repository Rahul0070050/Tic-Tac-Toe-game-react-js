import React from 'react';
import Playground from './component/Playground';
import { useGlobalContest } from './Context';
import './style.css';

function App() {
  const { start, won, startGame } = useGlobalContest();
  return (
    <section className="container" >
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        {/* {won} */}
        {start ? < Playground /> : <div className="start"><h1>Start the game</h1><br /> <button onClick={startGame}>Start</button></div>}
      </main>
    </section >
  );
}

export default App;
