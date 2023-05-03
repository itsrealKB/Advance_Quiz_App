import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import StartingPage from "./components/StartingPage";
import QuizPage from "./components/QuizPage";
import EndingPage from "./components/EndingPage";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState("10");
  const [score, setScore] = useState(0);

  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <StartingPage
                  name={name}
                  setName={setName}
                  category={category}
                  setCategory={setCategory}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  noOfQuestions={noOfQuestions}
                  setNoOfQuestions={setNoOfQuestions}
                />
              }
            />
            <Route
              path="/quiz-page"
              element={
                <QuizPage
                  name={name}
                  setName={setName}
                  category={category}
                  setCategory={setCategory}
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  noOfQuestions={noOfQuestions}
                  setNoOfQuestions={setNoOfQuestions}
                  score={score}
                  setScore={setScore}
                />
              }
            />
            <Route
              path="/ending-page"
              element={
                <EndingPage
                  score={score}
                  setScore={setScore}
                  name={name}
                  setName={setName}
                  setCategory={setCategory}
                  setDifficulty={setDifficulty}
                  setNoOfQuestions={setNoOfQuestions}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
