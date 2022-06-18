import React, { useContext } from 'react'

import {Context} from '../Context'

function Question({question}) {
   const {holdAnswer} = useContext(Context)
   const answers = question.allAnswers.map(answer => (
      <div 
         key={answer.id}
         className="answer"
         onClick={ () => holdAnswer(answer.id, question.question) }
         style={{background: `${answer.isHeld ? 'green' : ''}`}}
      >
         {answer.content}
      </div>
   ))

   return(
      <section className="question">
         <h5 className="question__ask">
            {question.question}
         </h5>
         <div className="question__options">
            {answers}
         </div>
      </section>
   )
}

export default Question