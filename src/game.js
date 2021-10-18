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
        //console.log(squares);
        //When you actually win this does not tirgger as squares has the turn before. So you update squares at the end with the winning move and then the calculateWinner in 
        //render decides there is a winner and the next time you try to click it fires and you get GameOver. 
        if (calculateWinner(squares) || squares[i]) {
          //console.log("GameOver");
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
      //Challenge 4: Add a toggle button that lets you sort the moves in either ascending or descending order.
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
        const  winner  = calculateWinner(current.squares);
        let tie = false; 
        //console.log(winner);
        //need to be careful for wins on the last turn of the game with this
        //console.log(this.state.stepNumber);
        //challenge 5: When no one wins, display a message about the result being a draw.
        if(( this.state.stepNumber === 9 && !winner )){
          //console.log("Tie Game");
          tie = true;
        }
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
          status = 'Winner: ' + winner.winner;
        } 
        if (tie){
          status = 'Tie!'
        } 
        if (!winner && !tie)
         {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        //Challenge 5: When someone wins, highlight the three squares that caused the win.
        //had to pass winner && winner.winningLine as just passing winner.winningLine kept throwing a null error
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                winner = {winner && winner.winningLine}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.state.ascending ? moves : moves.slice().reverse()}</ol>
            <button onClick={() => this.handleHistoryToggle()}>Toggle</button>
            {tie ? <button onClick={() => this.setState({
            history: [{
                squares: Array(9).fill(null),
                location: null,
            }],
            //Keep track which step/move we are viewing
            stepNumber: 0,
            xIsNext: true,
            ascending: true,
             }) }>Reset</button> 
            : null}
          </div>
        </div>
      );
    }
  }



  function calculateWinner(squares) {
    //console.log(squares);
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
      //console.log(a);
      //console.log(squares[a]);
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //Challenge 5: When someone wins, highlight the three squares that caused the win. Need to return who won and the winning line to pass it down
        //console.log(lines[i]);
        return { 
          winner: squares[a],
          winningLine: lines[i],
        }
        
      }
    }
    return null;
  }


export default Game