import React, { useContext } from 'react'

import {Context} from '../Context'
import Question from './Question'

function Action() {
   const {
      questions, 
      checkAnswers, 
      correctAnswers,
      answersChecked,
      playAgain
   } = useContext(Context)

   // console.log(questions)
   // console.log(correctAnswers)

   function chooseButtonToRender(inputState) {
      return inputState

         ? <div className="btn-container">
            <p className="result-msg">
               You scored {correctAnswers}/5 correct answers
            </p>
            <button 
               className="action__btn"
               onClick={playAgain}
            >
               Play again
            </button>
         </div>

         : <button
            className="action__btn"
            onClick={checkAnswers}
         >
            Check answers
         </button>
   }

   const allQuestions = questions.map(question => (
      <Question question={question} key={question.id}/>
   ))

   return(
      <div className="action">
         {allQuestions}
         { chooseButtonToRender(answersChecked) }
      </div>
   )
}

export default Action