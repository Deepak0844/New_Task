import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./App.css";

const Tictactoe = () => {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isXturn, setIsXturn] = useState(true);

  const setTurn = (value) => {
    setIsXturn(value === "x" ? true : false);
  };

  const decideWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [1, 4, 7],
      [0, 3, 6],
      [2, 5, 8],
    ];

    //if winning condition present in board then we have a winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return null; //if no winner
  };

  const winner = decideWinner(board);

  const isDraw = board.every((val) => (val !== null && !winner ? true : false)); //check whether match is draw or not

  const handleClick = (index) => {
    //update only untouched box & untill no winner
    if (winner === null && !board[index]) {
      const boardCopy = [...board];
      boardCopy[index] = isXturn ? "X" : "O";
      setBoard(boardCopy);

      //toggle X turn
      setIsXturn(!isXturn);
    }
  };
  //reset the game
  const reset = () => {
    const boardCopy = [...board];
    setBoard(boardCopy);
    for (let i = 0; i < boardCopy.length; i++) {
      boardCopy[i] = null;
    }
  };
  //display who's turn
  const display = isXturn ? "X" : "O";

  const text = <p>click restart to start new game</p>;

  const [winnerL, setWinnerL] = useState([]);
  useEffect(() => {
    if (winner === "X") {
      setWinnerL((prev) => [...prev, { winner: "X" }]);
    } else if (winner === "O") {
      setWinnerL((prev) => [...prev, { winner: "O" }]);
    } else if (isDraw) {
      setWinnerL((prev) => [...prev, { winner: "draw" }]);
    }
  }, [winner, isDraw]);
  return (
    <div className="fullGame">
      <h2 className="selectTitle">Select : X or O</h2>
      <div className="selectBtn">
        <Button
          variant="contained"
          color="success"
          onClick={() => setTurn("x")}
        >
          X
        </Button>
        <Button variant="contained" color="error" onClick={() => setTurn("o")}>
          O
        </Button>
      </div>
      <hr></hr>
      {!winner && <h2>{display} Turn</h2>}
      <hr></hr>
      <div className="board">
        {board.map((val, index) => (
          <GameBox
            key={index}
            val={val}
            onPlayerClick={() => handleClick(index)}
          />
        ))}
      </div>
      {winner ? (
        <>
          <p>
            winner is<b> {winner}</b>
          </p>
          {text}
        </>
      ) : (
        isDraw && (
          <>
            {" "}
            <p>draw</p> {text}
          </>
        )
      )}
      <Button style={{ marginTop: "10px" }} variant="outlined" onClick={reset}>
        restart
      </Button>
      {winnerL.length > 0 && (
        <div className="table">
          <table>
            <tr>
              <th>game</th>
              <th>X</th>
              <th>O</th>
            </tr>
            {winnerL.map((item, index) => (
              <tr className="tb" key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.winner === "draw"
                    ? "draw"
                    : item.winner === "X"
                    ? "win"
                    : "lost"}
                </td>
                <td>
                  {item.winner === "draw"
                    ? "draw"
                    : item.winner === "O"
                    ? "win"
                    : "lost"}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

function GameBox({ onPlayerClick, val }) {
  const styles = {
    color: val === "X" ? "green" : "red",
  };
  return (
    <div style={styles} onClick={onPlayerClick} className="gameBox">
      {val}
    </div>
  );
}

export default Tictactoe;
