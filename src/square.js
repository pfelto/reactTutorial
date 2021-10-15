import React from "react";
import './index.css';
/*
Can try to change this later to pass it the square component. Now it is just a button event with target being button.square
const handleClick = (e) => {
    console.log(e);
}
*/
  //Using stateless functional components for Square to start
  //need to state to track X or not so using class
  //moved state to board so can make it a function again
  //we can use arrow function like here or just make it a normal function
  //function Square({value,click}){ return ( JSX ); }
  const Square = ({value, onClick }) => (
    <button 
    className = 'square' 
    onClick={onClick}>
        {value}
    </button>
  );

/*
class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
      return (
        <button className="square" 
        onClick={(e) => { 
            this.setState({value: 'X'});
            console.log(this);
            //console.log(`Clicked ${this.props.index}`);
            //handleClick(e);
        }}>
          {this.state.value}
        </button>
      );
    }
  }
  */

export default Square