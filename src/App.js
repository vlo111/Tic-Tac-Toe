import './App.css';
import {useState} from "react";

const calculateWinner = (squares) => {
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

const Square = ({value, handleClick}) => {
    return <div className="square" onClick={handleClick}>{value}</div>
}

const Board = () => {
    const [value, setValue] = useState(Array(9).fill(null));
    const [prev, setPrev] = useState(null);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (winner) return;

        const currentMove = prev === 'X' ? 'O' : 'X';

        const newBoard = [...value];

        newBoard[index] = currentMove;

        const newWinner = calculateWinner(newBoard);

        setWinner(newWinner);
        setPrev(currentMove);
        setValue(newBoard);
    }

    const resetGame = () => {
        setValue(Array(9).fill(null));
        setPrev(null);
        setWinner(null);
    };

    return <>
        <div className="container">
            <div className="board">
                <div className="row">
                    <Square value={value[0]} handleClick={() => handleClick(0)}/>
                    <Square value={value[1]} handleClick={() => handleClick(1)}/>
                    <Square value={value[2]} handleClick={() => handleClick(2)}/>
                </div>
                <div className="row">
                    <Square value={value[3]} handleClick={() => handleClick(3)}/>
                    <Square value={value[4]} handleClick={() => handleClick(4)}/>
                    <Square value={value[5]} handleClick={() => handleClick(5)}/>
                </div>
                <div className="row">
                    <Square value={value[6]} handleClick={() => handleClick(6)}/>
                    <Square value={value[7]} handleClick={() => handleClick(7)}/>
                    <Square value={value[8]} handleClick={() => handleClick(8)}/>
                </div>
            </div>
        </div>
        {winner && <div className="winner">Winner is {winner}</div>}
        <button onClick={resetGame}>Reset Game</button>
    </>

}

function App() {
    return (
        <div className="App">
            <Board/>
        </div>
    );
}

export default App;
