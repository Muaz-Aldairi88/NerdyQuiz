import { useSelector } from "react-redux";
import FetchButton from "./FetchButton";
import RetryButton from "./RetryButton";
import ResetButton from "./ResetButton";

function ScoreView() {

  const score = useSelector((state) => state.score);
  const questions = useSelector((state) => state.questions);

  return (
    <div className="border border-2">
      <h3 className="row justify-content-center m-3 p-3">
        Final Score: {score} / {questions.length}
      </h3>
      <div className="row justify-content-center m-5">
        <RetryButton/>
        <FetchButton buttonText="Fetch new questions" />
        <ResetButton/>
      </div>
    </div>
  );
}

export default ScoreView;
