import React, { useContext } from 'react'

import {Context} from '../Context'
import Question from './Question'

function Action() {
   const {questions, checkAnswers, correctAnswers} = useContext(Context)

   // console.log(questions)
   console.log(correctAnswers)

   const allQuestions = questions.map(question => (
      <Question question={question} key={question.id}/>
   ))

   return(
      <div className="action">
         {allQuestions}
         <button 
            className="action__btn"
            onClick={checkAnswers}
         >
            Check answers
         </button>
      </div>
   )
}

export default Action