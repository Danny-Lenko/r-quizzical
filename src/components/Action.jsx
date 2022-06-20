import React, { useContext } from 'react'

import {Context} from '../Context'
import Question from './Question'
import { ReactComponent as BlobOne } from '../images/action-blob1.svg'
import { ReactComponent as BlobTwo } from '../images/action-blob2.svg'

function Action() {
   const {
      questions, 
      checkAnswers, 
      correctAnswers,
      answersChecked,
      playAgain
   } = useContext(Context)

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

   const allQuestions = questions.map((question, i) => (
      <Question question={question} key={question.id} i={i}/>
   ))

   return(
      <div className="action">
         {allQuestions}
         { chooseButtonToRender(answersChecked) }

         <BlobOne className="blob1" />
         <BlobTwo className="blob2" />
      </div>
   )
}

export default Action