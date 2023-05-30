import { useState } from "react";
import "./App.css";
import { random } from "./random.js";

function App() {
  const [randomNumber, setRandomNumber] = useState(random());
  const [inputNumber, setInputNumber] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSuccess, setSuccess] = useState(false);

  const handlePlayGame = () => {
    let inputNumberArr = inputNumber.split("").map((item) => Number(item));

    if (inputNumberArr.some((number) => isNaN(number))) {
      alert("숫자를 입력해 주세요");
      setInputNumber("");
      return;
    }

    if (inputNumberArr.length !== 4) {
      alert("네 자리 숫자를 입력해 주세요");
      setInputNumber("");
      return;
    }

    if (inputNumberArr.includes(0)) {
      alert("1~9 사이의 숫자를 입력해 주세요");
      setInputNumber("");
      return;
    }

    let inputNumberSet = new Set(inputNumberArr);
    if (inputNumberSet.size !== 4) {
      alert("입력 값에 중복이 있어요");
      setInputNumber("");
      return;
    }

    const { strike, ball } = randomNumber.reduce(
      (arr, cur, idx) => {
        if (inputNumberArr[idx] === cur) {
          return {
            ...arr,
            strike: arr.strike + 1,
          };
        }

        if (inputNumberArr.includes(cur)) {
          return {
            ...arr,
            ball: arr.ball + 1,
          };
        }
        return arr;
      },
      {
        strike: 0,
        ball: 0,
      }
    );

    if (strike === 4) {
      setSuccess(true);
      alert("정답입니다!");
      setLogs([...logs, `[ ${inputNumber} ] (축하합니다. 정답입니다!)`]);
    } else {
      setLogs([
        ...logs,
        `[ ${inputNumber} ] (strike : ${strike}, ball : ${ball})`,
      ]);
    }
    setInputNumber("");
  };

  const handleRePlayGame = () => {
    setRandomNumber(random());
    setInputNumber("");
    setLogs([]);
    setSuccess(false);
  };

  return (
    <div className="App">
      <h1>⚾ 숫자 야구 게임 ⚾</h1>
      <header> {isSuccess ? randomNumber : "_ _ _ _"} </header>

      <section>
        <input
          type="text"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          disabled={isSuccess}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              handlePlayGame();
            }
          }}
        />

        {isSuccess ? (
          <button onClick={handleRePlayGame}>다시하기</button>
        ) : (
          <button onClick={handlePlayGame}>맞춰보기</button>
        )}
      </section>

      <h2>[ 기록 ]</h2>
      <ol>
        {logs.map((log, idx) => {
          return <li key={idx}>{log}</li>;
        })}
      </ol>
    </div>
  );
}

export default App;
