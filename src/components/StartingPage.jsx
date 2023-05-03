import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";

const StartingPage = ({
  name,
  setName,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  noOfQuestions,
  setNoOfQuestions
}) => {
  const [requiredText, setRequiredText] = useState(
    "Please fill out all required fields."
  );

  const navigate = useNavigate();

  const startQuiz = () => {
    if (!name || !category || !difficulty || noOfQuestions === "0") {
      const required = document.querySelector(".required");
      required.classList.add("show");
    } else if (noOfQuestions < 0) {
      setRequiredText("Value must be greater than or equal to 1.");
      const required = document.querySelector(".required");
      required.classList.add("show");
    } else if (noOfQuestions > 50) {
      setRequiredText("Value must be less than or equal to 50.");
      const required = document.querySelector(".required");
      required.classList.add("show");
    } else {
      navigate("/quiz-page");
    }
  };

  return (
    <div className="page starting-page">
      <h1>Quiz App.</h1>
      <div className="quiz-setting">
        <div className="form">
          <div className="required">{requiredText}</div>

          <TextField
            id="outlined-basic"
            value={name}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Select Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {Categories.map((cat) => {
                return (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Difficulty
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="Select Difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem value={"easy"}>Easy</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"hard"}>Hard</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            type="number"
            value={noOfQuestions}
            label="Number of questions"
            variant="outlined"
            onChange={(e) => setNoOfQuestions(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={startQuiz}
            size="large"
          >
            Start Quiz
          </Button>
        </div>
        <img
          src="./images/coding.png"
          alt="quiz-illustration"
          className="quiz-logo"
        />
      </div>
    </div>
  );
};

export default StartingPage;
