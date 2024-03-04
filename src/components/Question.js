import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RetryButton from "./RetryButton";
import ResetButton from "./ResetButton";

//decode the text sent from the API
const decodeHTML = function (html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function Question() {

  // access the state in the redux store
  const score = useSelector((state) => state.score);
  const encodedQuestions = useSelector((state) => state.questions);
  const questionIndex = useSelector((state) => state.questionIndex);

  //to store the decoded Questions
  const [questions, setQuestions] = useState([]);
  //to store all answers (correct/uncorrect) in one array
  const [questionOptions, setQuestionOptions] = useState([]);
  // to check if the user has selected an answer
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  // to store the selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const question = questions[questionIndex];
  const correctAnswer = question && question.correct_answer;

  const dispatch = useDispatch();

  //decode the text sent from the API
  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });
    setQuestions(decodedQuestions);
  }, [encodedQuestions]);

  // storing the correct answer and uncorrect answers together in QuestionOptions
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );
    setQuestionOptions(answers);
  }, [question]);

  // handle the user answer 
  const handleUserAnswer = (event) => {

    setIsAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);

    // update the score if the answer is the correct one
    if (event.target.textContent === correctAnswer) {
      dispatch({
        type: "SET_SCORE",
        payload: score + 1,
      });
    }
    // if the question is not the final one, move onto the next question
    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setIsAnswerSelected(false);
        setSelectedAnswer(null);
        dispatch({
          type: "SET_QUESTION_INDEX",
          payload: questionIndex + 1,
        });
      }, 2500);
    }
  };

  // apply styling to show the user the correct answer before moving to the next question
  const applyStyleToShowCorrectAnswer = option => {
    if (!isAnswerSelected) {
      return ``;
    }
    if (option === correctAnswer) {
      return `correct`
    }
    if (option === selectedAnswer) {
      return `selected`
    }
  }
  
  if (!question) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-around mb-3">
        <div>Question {questionIndex + 1}</div>
        <div> Score: {score} / {questions.length}</div>
      </div>
      <div className="border border-2">
        <h3 className="row justify-content-center m-5">{question.question}</h3>
        <div className="row g-1 text-center p-4">
        {questionOptions.map((option, i) => (
          <div className=" option col-6 border">
            <div key={i} style={{padding:15}} onClick={handleUserAnswer} className={applyStyleToShowCorrectAnswer(option)}>{option}</div>
          </div> 
        ))}
        </div>
      </div>
      <div class="d-grid gap-2 col-6 mx-auto mt-5">
        <RetryButton/>
        <ResetButton/>
      </div>  
    </div>
  );
}
export default Question;
