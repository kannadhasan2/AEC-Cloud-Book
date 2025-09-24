import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [shuffledQuiz, setShuffledQuiz] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null); // store clicked option

  // Shuffle function
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    fetch("https://skp-hackathon.vercel.app/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data);
        setShuffledQuiz(shuffleArray(data)); // shuffle questions once
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const parseOptions = (options) => {
    if (Array.isArray(options)) return options;
    if (typeof options === "string") {
      try {
        return JSON.parse(options);
      } catch (e) {
        return options.split(",").map((opt) => opt.trim());
      }
    }
    return [];
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);

    if (option === shuffledQuiz[currentQ].answer) setScore(score + 1);

    // Move to next question after 1 second
    setTimeout(() => {
      const nextQ = currentQ + 1;
      if (nextQ < shuffledQuiz.length) setCurrentQ(nextQ);
      else setFinished(true);
      setSelectedOption(null);
    }, 1000);
  };

  const submitQuiz = () => {
    setFinished(true);
  };

  const restartQuiz = () => {
    setShuffledQuiz(shuffleArray(quizData)); // reshuffle on restart
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    setSelectedOption(null);
  };

  if (loading) return <div className="quiz-container">Loading...</div>;
  if (!quizData.length) return <div className="quiz-container">No quiz data available</div>;

  return (
    <>
      <Navbar />
      <div className="quiz-main-container">
        <div className="quiz-container">
          {!finished ? (
            <>
              <h2 className="question">{shuffledQuiz[currentQ].question}</h2>
              <div className="options">
                {parseOptions(shuffledQuiz[currentQ].options).map((option, idx) => {
                  let className = "option-btn";

                  if (selectedOption) {
                    if (option === shuffledQuiz[currentQ].answer) className += " correct";
                    else if (option === selectedOption && option !== shuffledQuiz[currentQ].answer) className += " wrong";
                  }

                  return (
                    <button
                      key={idx}
                      className={className}
                      onClick={() => !selectedOption && handleAnswer(option)}
                      disabled={!!selectedOption}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="progress">
                Question {currentQ + 1} of {shuffledQuiz.length}
              </div>
              <button className="submit-btn" onClick={submitQuiz}>
                Submit Quiz
              </button>
            </>
          ) : (
            <div className="result">
              <h2>Quiz Finished!</h2>
              <p>
                You scored <b>{score}</b> out of {shuffledQuiz.length}
              </p>
              <button className="restart-btn" onClick={restartQuiz}>
                Restart Quiz
              </button>
            </div>
          )}
        </div>
        <div className="score-display">Score: {score}</div>
      </div>
    </>
  );
}
