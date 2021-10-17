import React from "react";
import Square from './square'
import './index.css';



class Board extends React.Component {


    renderSquare(i){
        return <Square 
        key = {i}
        value={this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}/>
    }

//challenge 3: Rewrite Board to use two loops to make the squares instead of hardcoding them.
//making a helper function so you can build how ever big board you want, but just has default values fro tic-tac-toe becuase most likely
//We would need to change calculateWinner code if we wanted to play connect 4, etc
/*
Try one didn't for
    createGameBoardLoop(cols = 3 , rows = 3){
        console.log(cols);
        console.log(rows);
        //let game = []; 
        for(let col = 0; col < cols; col++){
            for(let row = 0; row < rows; row++){
                console.log('I am here');
                this.renderSquare(col+row);
            }
        }
    }
*/
    //challenge 3: Rewrite Board to use two loops to make the squares instead of hardcoding them.
    //cannot just put for loops in JSX easily so building an array of react elements and then just returning that in return of render
    //Still alot of hard coding...

    render(){
        let board = [];
        let k = 0;
        for(let c = 0; c < 3; c++){
            let row = [];
            for(let r = 0 ; r < 3; r++){
                row.push(this.renderSquare(3*c+r)); 
            }
            k++;
            board.push(<div key = {k} className="board-row">{row}</div>);
        }
        
        //console.log(board);
        return (
            <div>
                {board}
            </div>
        )
    }
}


export default Board