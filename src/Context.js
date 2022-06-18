import { nanoid } from 'nanoid'
import React, { createContext, useEffect, useState } from 'react'

const Context = createContext(null)

function ContextProvider(props) {
   const [hasStarted, setHasStarted] = useState(false)
   const [questions, setQuestions] = useState()

   useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
         .then(res => res.json())
         .then(data => setQuestions(createQuestions(data.results)))
   }, [])

   function createQuestions(rowData) {
      return rowData.map(item => ({
         id: nanoid(),
         question: item.question,
         correctAnswer: item.correct_answer,
         allAnswers: mixAnswers(item.incorrect_answers, item.correct_answer)
      }))
   }

   function mixAnswers(wrong, correct) {
      const randomIndex = Math.floor(Math.random() * 4)
      wrong.splice(randomIndex, 0, correct)
      wrong = createAnswers(wrong)
      return wrong
   }

   function createAnswers(answers) {
      return answers.map(answer => ({
         id: nanoid(),
         content: answer,
         isHeld: false
      }))
   }

   function startQuiz() {
      setHasStarted(true)
   }

   return(
      <Context.Provider value={{
         hasStarted,
         startQuiz,
         questions
      }}>
         {props.children}
      </Context.Provider>
   )
}

export {Context, ContextProvider}