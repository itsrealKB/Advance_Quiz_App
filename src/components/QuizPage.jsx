import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = ({
  name,
  setName,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  noOfQuestions,
  setNoOfQuestions,
  score,
  setScore
}) => {
  const URL = `https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!name || !category || !noOfQuestions || !difficulty) {
      navigate("/");
    }
  }, [name]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await axios.get(URL);
      const questions = data.results.map((question) => ({
        ...question,
        answers: [question.correct_answer, ...question.incorrect_answers].sort(
          () => Math.random() - 0.5
        )
      }));
      setQuestions(questions);
    };
    fetchQuestions();
  }, []);

  const checkCorrect = (ans) => {
    if (ans === questions[currentQuestion].correct_answer && !clicked) {
      setScore((prevScore) => prevScore + 1);
    }
    setClicked(true);
    setSelected(ans);
  };

  const nextQuest = () => {
    if (clicked) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((currentQuest) => currentQuest + 1);
        setClicked(false);
      } else {
        navigate("/ending-page");
      }
    } else {
      const buttons = document.querySelectorAll(".option-btn");
      buttons.forEach((button) => {
        button.classList.add("vibrate");
      });

      setTimeout(() => {
        const buttons = document.querySelectorAll(".option-btn");
        buttons.forEach((button) => {
          button.classList.remove("vibrate");
        });
      }, 500);
    }
  };

  const skipQuest = () => {
    if (currentQuestion < questions.length - 1) {
      if (!clicked) {
        setCurrentQuestion((currentQuest) => currentQuest + 1);
      } else {
        return currentQuestion;
      }
    } else {
      navigate("/ending-page");
    }
  };

  const reset = () => {
    setScore(0);
    setCurrentQuestion(0);
    setClicked(false);
  };

  const quit = () => {
    setName("");
    setCategory("");
    setDifficulty("");
    setNoOfQuestions("10");
    setClicked(false);
    navigate("/");
  };

  const handleSelect = (ans) => {
    if (
      selected === ans &&
      selected === questions[currentQuestion].correct_answer
    ) {
      return "right";
    } else if (
      selected === ans &&
      selected !== questions[currentQuestion].correct_answer
    ) {
      return "wrong";
    } else if (ans === questions[currentQuestion].correct_answer) {
      return "right";
    }
  };

  return (
    <div className="page quiz-page">
      <h2 className="name">Welcome, {name}</h2>
      {questions.length === 0 ? (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      ) : (
        <div className="quiz-sec">
          <div className="quiz-details">
            <p className="details">{questions[currentQuestion].category}</p>
            <p className="details">Score : {score}</p>
          </div>
          <div className="quiz-card">
            <p className="question-count">
              Question : {currentQuestion + 1} / {noOfQuestions}.
            </p>
            <p
              className="question details"
              dangerouslySetInnerHTML={{
                __html: questions[currentQuestion].question
              }}
            />
            <div className="options">
              {questions[currentQuestion].answers.map((ans) => {
                return (
                  <button
                    dangerouslySetInnerHTML={{ __html: ans }}
                    key={ans}
                    onClick={() => checkCorrect(ans)}
                    className={`option-btn ${clicked && handleSelect(ans)}`}
                  />
                );
              })}
            </div>
            <div className="functional">
              <Button
                variant="contained"
                style={{ backgroundColor: "crimson" }}
                onClick={quit}
                size="large"
              >
                Quit
              </Button>

              <Button
                variant="contained"
                onClick={skipQuest}
                color="primary"
                size="large"
              >
                Skip
              </Button>
              <Button
                variant="contained"
                onClick={nextQuest}
                color="primary"
                size="large"
              >
                Next
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={reset}
                size="large"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
