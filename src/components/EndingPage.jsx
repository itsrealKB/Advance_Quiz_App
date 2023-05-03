import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EndingPage = ({
  setName,
  setCategory,
  setDifficulty,
  setNoOfQuestions,
  score,
  setScore,
  name
}) => {
  const navigate = useNavigate();

  const goHome = () => {
    setName("");
    setCategory("");
    setDifficulty("");
    setNoOfQuestions("10");
    setScore(0);
    navigate("/");
  };

  return (
    <div className="page end-page">
      <div className="quiz-end">
        <p className="endpage-text">Quiz Ended.</p>
        <p className="endpage-text">
          Mr {name} your final score is : {score}
        </p>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={goHome}
        >
          Go To Home
        </Button>
      </div>
    </div>
  );
};

export default EndingPage;
