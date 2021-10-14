import Board from './board'
import './index.css';

  //Using stateless functional components for Game to start
  const Game = () => (
    <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
    </div>
    )

//
//class Game extends React.Component {
 //   render() {
  //    return (
    //    <div className="game">
      //    <div className="game-board">
        //    <Board />
          //</div>
          //<div className="game-info">
            //<div>{/* status */}</div>
            //<ol>{/* TODO */}</ol>
          //</div>
        //</div>
      //);
   // }
  //}


export default Game