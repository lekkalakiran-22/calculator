import { useState, useEffect } from "react";
import { FaHistory, FaTimes } from "react-icons/fa";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const buttons = [
    "AC", "⌫", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  const clearHistory = () => {
    setHistory([]);
  };

  // Calculate Function
  const calculate = () => {
    try {
      const expression = input.replace(/×/g, "*").replace(/÷/g, "/");

      const result = eval(expression).toString();

      setHistory((prev) => [
        `${input} = ${result}`,
        ...prev,
      ]);

      setInput(result);
    } catch {
      setInput("Error");
    }
  };

  // Button Click
  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      calculate();
    } else if (value === "%") {
      try {
        setInput((eval(input) / 100).toString());
      } catch {
        setInput("Error");
      }
    } else {
      if (input === "Error") {
        setInput(value);
      } else {
        setInput((prev) => prev + value);
      }
    }
  };

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (!isNaN(key)) {
        setInput((prev) => prev + key);
        return;
      }

      if (key === ".") {
        setInput((prev) => prev + ".");
        return;
      }

      if (["+", "-", "*", "/"].includes(key)) {
        setInput((prev) => prev + key);
        return;
      }

      if (key === "Enter") {
        event.preventDefault();
        calculate();
        return;
      }

      if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "Escape") {
        setInput("");
        return;
      }

      if (key === "%") {
        try {
          setInput((eval(input) / 100).toString());
        } catch {
          setInput("Error");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
   <div> <h1>Modern Calculator</h1>
    <div className="container">
      <div className="calculator">

        <div className="top">
          <span className="mode">Standard</span>

          <FaHistory
            className="historyIcon"
            onClick={() => setShowHistory(true)}
          />
        </div>

        <input
          className="display"
          value={input}
          readOnly
        />

        <div className="grid">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={
                btn === "0"
                  ? "zero"
                  : btn === "="
                  ? "equal"
                  : ["+", "-", "*", "/", "%"].includes(btn)
                  ? "operator"
                  : btn === "AC"
                  ? "clear"
                  : ""
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

      </div>

      <div className={`history ${showHistory ? "active" : ""}`}>

        <div className="historyHeader">
          <h2>History</h2>

          <FaTimes
            className="close"
            onClick={() => setShowHistory(false)}
          />
        </div>

        <div className="historyBody">
          {history.length === 0 ? (
            <p className="empty">No History</p>
          ) : (
            history.map((item, index) => (
              <div
                key={index}
                className="historyItem"
              >
                {item}
              </div>
            ))
          )}
        </div>

        <button
          className="clearHistory"
          onClick={clearHistory}
        >
          Clear All
        </button>

      </div>
    </div>
    </div>
  );
}

export default Calculator;