import Board from './board'
import React from "react";
import './index.css';

  //Using stateless functional components for Game to start
  //We are lifting all state into game so need it to be a class
/*
  const Game = () => (
    <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
    </div>
    )
*/

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: null,
            }],
            //Keep track which step/move we are viewing
            stepNumber: 0,
            xIsNext: true,
            ascending: true,
        }
    }

    handleClick(i) {
        //If we go back in time we do not want to keep the old moves that happened
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
            //try moving location into history? 
            location: i,
          }]),
          //depending on what the history looks like will tell us the step.
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
        //console.log(squares);
      }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleHistoryToggle(){
      /*
      This does not actually change the LI order just the numbers in front
      const moveList = document.getElementById('moveList');
      console.log(moveList);
      console.log(moveList.getAttribute('reversed'));
      if(!moveList.getAttribute('reversed')){
        moveList.setAttribute('reversed',true);
      } else {
        moveList.removeAttribute('reversed');
      }
      */
     /*
     you go to render and draw using a reversed history, which causes the 1 null state to be rendered last and you get a blank board. 
      const history = this.state.history.slice(0,this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const reverse = history.slice().reverse()
      console.log(history);
      console.log(current);
      console.log(squares);
      console.log(reverse);
      this.setState({
        history: reverse,
      })
      */
     //using a state value ascending and toggling it. Have to manipulate moves below as I don't want to change the history array of objects OR just apply an HTML attribute
     this.setState({
       ascending: !this.state.ascending,
     });
    }

    render() {
        //get a copy of history to use for current
        const history = this.state.history;
        //current is just the latest game state from history
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
 

        const moves = history.map((step,move) => {
            let cssClass; 
            const desc = move ? 
            //Challenge 1: Display the location for each move in the format (col, row) in the move history list.
            `Go to move # ${move} at (${(step.location%3)+1},${Math.floor(step.location/3)+1})` :
            `Go to game start`;
            //Challenge 2: Bold the currently selected item in the move list.
            if(move === this.state.stepNumber){
              cssClass = 'selected';
            }
              return (
                  <li key={move}>
                      <button  
                        className={cssClass}
                        onClick= {() => this.jumpTo(move)}>
                          {desc}
                      </button>
                  </li>
              )
        })  
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.state.ascending ? moves : moves.slice().reverse()}</ol>
            <button onClick={() => this.handleHistoryToggle()}>Toggle</button>
          </div>
        </div>
      );
    }
  }



  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


export default Game