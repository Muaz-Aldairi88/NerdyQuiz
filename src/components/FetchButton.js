import { useDispatch, useSelector } from 'react-redux';


function FetchButton({buttonText}) {

    // access the state (questions' settings) in the redux store
    const questionsCategory = useSelector(state => state.quizSettings.category);
    const questionsDifficulty = useSelector(state => state.quizSettings.difficulty);
    const questionsType = useSelector(state => state.quizSettings.type);
    const numberOfQuestions= useSelector(state => state.quizSettings.number_of_questions);
    const questionIndex = useSelector((state) => state.questionIndex)

    const dispatch=useDispatch();
	
    const handleFetchQuestions = async () => {
	
        // API example with all parameters: https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple

        let QuestionsApiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;

	    // add the rest of the parameters if they are selected in the settings
        if (questionsCategory.length) {
        QuestionsApiUrl = QuestionsApiUrl.concat(`&category=${questionsCategory}`)
        }
        if (questionsDifficulty.length) {
        QuestionsApiUrl = QuestionsApiUrl.concat(`&difficulty=${questionsDifficulty}`)
        }
        if (questionsType.length) {
        QuestionsApiUrl = QuestionsApiUrl.concat(`&type=${questionsType}`)
        }

        // fetch questions API
        await fetch(QuestionsApiUrl)
        .then((res) => res.json())
        .then((res) => {
        // dispatch({
        //     type:"CHANGE_LOADING_STATUS",
        //     payload: false,
        // });
            dispatch({
                type:"SET_QUESTIONS",
                payload: res.results,
            });
        });

        // to remove the already fetched questions if the player want to fetch new set of questions
        if (questionIndex > 0) {
            dispatch({
                type: 'SET_QUESTION_INDEX',
                payload: 0,
            })
            dispatch({
            type: 'SET_SCORE',
            payload: 0,
            })
        }
    }
    return(<button class="btn btn-secondary m-3" onClick={handleFetchQuestions}>{buttonText}</button>);
}
export default FetchButton;
