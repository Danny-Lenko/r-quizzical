import React, { useContext } from 'react'
import {decode} from 'html-entities'

import {Context} from '../Context'

function Question({question, i}) {
   const {holdAnswer} = useContext(Context)
   const answers = question.allAnswers.map(answer => (
      <div 
         key={answer.id}
         className="answer"
         onClick={ () => holdAnswer(answer.id, question.question) }
         style={{background: `
            ${answer.isCorrectAnswer ? "#94D7A2"
               : answer.isCorrectAnswer === false ? "#F8BCBC"
               : answer.isHeld ? "#D6DBF5"
               : ''}
         `}}
      >
         {decode(answer.content)}
      </div>
   ))

   return(
      <>
         <section className="question">
            <h3 className="question__ask">
               {decode(question.question)}
            </h3>
            <div className="question__options">
               {answers}
            </div>
         </section>
         {i < 4 ? <hr/> : <hr style={{visibility:'hidden'}} />}
      </>
   )
}

export default Question