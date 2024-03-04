import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FetchButton from "./FetchButton";

const QuizSettings = () => {
  // to store Trivia categories fetched from Trivia API
  const [quizCategories, setQuizCategories] = useState(null);

  // to access the state (questions' settings) in the redux store
  const questionsCategory = useSelector((state) => state.quizSettings.category);
  const questionsDifficulty = useSelector(
    (state) => state.quizSettings.difficulty
  );
  const questionsType = useSelector((state) => state.quizSettings.type);
  const numberOfQuestions = useSelector(
    (state) => state.quizSettings.number_of_questions
  );
  const loadingStatus = useSelector(
    (state) => state.quizSettings.loading_status
  );

  // to update the state in the redux store
  const dispatch = useDispatch();

  // to fetch Trivia categories API
  useEffect(() => {
    // Trivia Categories API
    const triviaCategoriesApiUrl = `https://opentdb.com/api_category.php`;

    handleLoadingStatus(true);

    //fetching Trivia categories and storing them in quizCategories
    fetch(triviaCategoriesApiUrl)
      .then((response) => response.json())
      .then((response) => {
        setQuizCategories(response.trivia_categories);
        handleLoadingStatus(false);
      });
  }, [setQuizCategories]);

  // method to handle loading status
  const handleLoadingStatus = (value) => {
    dispatch({
      type: "CHANGE_LOADING_STATUS",
      payload: value,
    });
  };

  // dispatch questions category
  const handleQuestionsCategory = (e) => {
    dispatch({
      type: "CHANGE_QUESTIONS_CATEGORY",
      payload: e.target.value,
    });
  };

  // dispatch questions difficulty
  const handleQuestionsDifficulty = (e) => {
    dispatch({
      type: "CHANGE_QUESTIONS_DIFFICULTY",
      payload: e.target.value,
    });
  };

  // dispatch questions type
  const handleQuestionsType = (e) => {
    dispatch({
      type: "CHANGE_QUESTIONS_TYPE",
      payload: e.target.value,
    });
  };

  // dispatch questions amount
  const handleQuestionsAmount = (e) => {
    dispatch({
      type: "CHANGE_QUESTIONS_AMOUNT",
      payload: e.target.value,
    });
  };

  if (!loadingStatus) {
    return (
      <div class="d-grid gap-2 col-6 mx-auto mt-2 p-5 border border-2">
        <h2 class="row justify-content-center m-1 p-2">Quiz Settings</h2>
        <div>
          <h4 class="row justify-content-center m-1 p-2">Select Questions Category: </h4>
          <select class="form-select form-select-lg mb-3" value={questionsCategory} onChange={handleQuestionsCategory}>
            <option value="">All</option>
            {quizCategories &&
              quizCategories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <h4 class="row justify-content-center m-1 p-2">Select Questions Difficulty:</h4>
          <select class="form-select form-select-lg mb-3" value={questionsDifficulty} onChange={handleQuestionsDifficulty}>
            <option value="" key="difficulty-0">
              All
            </option>
            <option value="easy" key="difficulty-1">
              Easy
            </option>
            <option value="medium" key="difficulty-2">
              Medium
            </option>
            <option value="hard" key="difficulty-3">
              Hard
            </option>
          </select>
        </div>
        <div>
          <h4 class="row justify-content-center m-1 p-2">Select Questions Type:</h4>
          <select class="form-select form-select-lg mb-3" value={questionsType} onChange={handleQuestionsType}>
            <option value="" key="type-0">
              All
            </option>
            <option value="multiple" key="type-1">
              Multiple Choice
            </option>
            <option value="boolean" key="type-2">
              True/False
            </option>
          </select>
        </div>
        <div>
          <h4 class="row justify-content-center m-1 p-2">Select Number of Questions:</h4>
          <input class="form-control form-control-lg mb-3" value={numberOfQuestions} onChange={handleQuestionsAmount} />
        </div>
        <div class="d-grid col-6 mx-auto mt-1">
          <FetchButton buttonText="Get Started"/>
        </div>  
      </div>
    );
  }

  return <p class="row justify-content-center m-1 p-2">LOADING QUIZ SETTINGS...</p>;
};

export default QuizSettings;
