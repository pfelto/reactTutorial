import './index.css';

  //Using stateless functional components for Square to start
  const Square = ({index}) => (
    <button className = 'square'>
        {index}
    </button>
  );

/*
class Square extends React.Component {
    render() {
      return (
        <button className="square">
          {this.props.index}
        </button>
      );
    }
  }
*/
export default Square