import { useDispatch } from "react-redux";

const RetryButton = () => {

    const dispatch = useDispatch();

    //method to retry the same fetched questions
    const reTry = () => {
        dispatch({
            type: "SET_SCORE",
            payload: 0,
        });
        dispatch({
            type: "SET_QUESTION_INDEX",
            payload: 0,
        });
    };
    
    return(
        <button className="btn btn-secondary" onClick={reTry}>Try again</button>
    );
};
export default RetryButton;
