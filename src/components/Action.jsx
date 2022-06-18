import React, { useContext } from 'react'

import {Context} from '../Context'
import Question from './Question'

function Action() {
   const {questions} = useContext(Context)

   console.log(questions)

   const allQuestions = questions.map(question => (
      <Question question={question} key={question.id}/>
   ))

   return(
      <div className="action">
         {allQuestions}
         <button className="action__btn">
            Check answers
         </button>
      </div>
   )
}

export default Action