
import { useEffect, useState } from 'react';
import './App.css';

const WINNING_COMPS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

const INITIAL_STATE = new Array(9).fill("")

enum Player{
  X = "X",
  O = "O"
}

enum Status{
  Playing = "PLAYING",
  Draw = "DRAW",
  XWon = "XWON",
  OWon = "OWON",
}

let contX = 0;
let contO = 0;

function App() {
  
  const [turn, setTurn] = useState<Player>(Player.X);
  const [cells, setCells] = useState<(Player | "")[]>(INITIAL_STATE)
  const [status, setStatus] = useState<Status>(Status.Playing);

  function handleClick(index: number) {

    if(status !== Status.Playing) return;

    const draft = [...cells];
    if(draft[index] === "") {
      draft[index] = turn;
      setTurn((turn) => (turn === Player.X ?  Player.O : Player.X));
      setCells(draft);
    }
  }

  function handleReset () {
    setCells(INITIAL_STATE);
    setStatus(Status.Playing);
  }

  useEffect(() => {

    let winner: Player | undefined;

    for( let player of [Player.X, Player.O] ){
     const hasWon = WINNING_COMPS.some((comp) => comp.every((cell) => player === cells[cell])) 
        

    if(hasWon) {
      winner = player;
    }

    
    };

    if(winner === Player.X){
      setStatus(Status.XWon);
      contX === contX++;
      
    }else if(winner === Player.O){
      setStatus(Status.OWon);
      contO === contO++;

    }else if(cells.every((cell) => [Player.O, Player.X].includes(cell as any))){
      setStatus(Status.Draw);
    }

    }, [cells]);


  return (
    
   <main>
     <h1 className='tittle'>TIC TAC TOE</h1>

     <p className='turn'>Turn: {turn}</p>
     <div className='puntaje'>
     <p className='winCont'>Player 1: {contX} </p>
     <p className='winCont'>Player 2: {contO} </p>
     </div>
      <div className='boardCenter'>
      
    <div className='board'>
      {cells.map((cell,index) => (
        <div key={index} className="cell" onClick={() => handleClick(index)}>
          {cell}
        </div>
      ))}
    </div>
    </div>
        {status !== Status.Playing && (
        <section className='message' >
          <article  role="alert">
          {status === Status.Draw &&  "Draw!"}
          {status === Status.XWon && "Player 1 Won!"}
          {status === Status.OWon && "Player 2 Won!"}
        </article>
        <div>
        <button className='button' onClick={handleReset}>
          Restart
        </button>
        </div>
        </section>
    )}
   </main>
  )
}

export default App;
