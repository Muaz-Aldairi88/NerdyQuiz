import { useSelector } from 'react-redux';
import './App.css';
import QuizSettings from './components/QuizSettings';
import Question from './components/Question';
import ScoreView from './components/ScoreView';



function App() {
  const questions=useSelector((state) => state.questions);
  const questionIndex=useSelector((state) => state.questionIndex);
  
  let component;
  if (questions.length && questionIndex + 1 <= questions.length) {
    component = <Question />
  } else if (!questions.length) {
    component = <QuizSettings />
  } else {
    component = <ScoreView />
  }

  return (
      <div className="container mt-5">
        <h1 class="row justify-content-center m-5" >Nerdy Quiz</h1>
        {component}
      </div>
  );
}

export default App;