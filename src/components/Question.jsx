import React from 'react'

function Question({question}) {
   const answers = question.allAnswers.map(answer => (
      <div 
         key={answer.id}
         className="answer"
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