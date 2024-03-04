const initState = {
    quizSettings: {
        loading_status: false,
        category: "",
        difficulty: "",
        type: "",
        number_of_questions: 1,
    },
    questions:[],
    questionIndex: 0,
    score: 0
};

const Reducer = (state = initState, action) => {
    
    switch (action.type) {
        case "CHANGE_LOADING_STATUS":
        return {
            ...state,
            quizSettings: {
                ...state.quizSettings,
                loading_status: action.payload
            }
        }
        case "CHANGE_QUESTIONS_CATEGORY":
        return {
            ...state,
            quizSettings: {
                ...state.quizSettings,
                category: action.payload
            }
        }
        case "CHANGE_QUESTIONS_DIFFICULTY":
        return {
            ...state,
            quizSettings: {
                ...state.quizSettings,
                difficulty: action.payload
            }
        }
        case "CHANGE_QUESTIONS_TYPE":
        return {
            ...state,
            quizSettings: {
                ...state.quizSettings,
                type: action.payload
            }
        }
        case "CHANGE_QUESTIONS_AMOUNT":
        return {
            ...state,
            quizSettings: {
                ...state.quizSettings,
                number_of_questions: action.payload
            }
        }
        case "SET_QUESTIONS":
        return {
            ...state,
            questions: action.payload
        }
        case "SET_QUESTION_INDEX":
        return {
            ...state,
            questionIndex: action.payload
        }
        case "SET_SCORE":
        return {
            ...state,
            score: action.payload
        }
        default:
        return state
    }
}
export default Reducer