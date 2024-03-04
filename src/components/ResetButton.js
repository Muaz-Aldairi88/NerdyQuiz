import { useDispatch } from "react-redux";

const ResetButton = () => {

    const dispatch=useDispatch();

  // method to reset the quiz
    const reSet = () => {
        dispatch({
            type: "SET_QUESTIONS",
            payload: [],
        });
        dispatch({
            type: "SET_SCORE",
            payload: 0,
        });
    };
    return(
        <button className="btn btn-secondary" onClick={reSet}>Back to settings</button>
    );
};
export default ResetButton;
