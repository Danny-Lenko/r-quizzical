import { nanoid } from 'nanoid'
import React, { createContext, useEffect, useState } from 'react'

const Context = createContext(null)

function ContextProvider(props) {
   const [hasStarted, setHasStarted] = useState(false)
   const [apiData, setApiData] = useState()
   const [questions, setQuestions] = useState()
   const [correctAnswers, setCorrectAnswers] = useState(0)
   const [answersChecked, setAnswersChecked] = useState(false)

   useEffect( () => fetchApiData(), [] )

   function fetchApiData() {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
         .then(res => res.json())
         .then(data => setApiData(data.results))
         .catch(err => alert(`RELOAD PAGE, ${err}`))
   }

   function startQuiz() {
      setQuestions( createQuestions(apiData) )
      setHasStarted(true)
   }

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
         isHeld: false,
         isCorrectAnswer: null
      }))
   }

   function holdAnswer(id, question) {
      const targetQuestion = questions.find(item => item.question === question)
      const targetAnswer = targetQuestion.allAnswers.find(item => item.id === id)
      
      setQuestions(prevState => prevState.map(item => (
         item.id === targetQuestion.id

            ? {...item, allAnswers: item.allAnswers.map(answer => (
               answer.id === targetAnswer.id 
                  ? {...answer, isHeld: !answer.isHeld}
                  : {...answer, isHeld: false}
            ))}

            : item
      )))
   }

   function checkAnswers() {
      setQuestions(prevState => prevState.map(item => (

         {...item, allAnswers: item.allAnswers.map(answer => {
            if (answer.isHeld && answer.content === item.correctAnswer) {
               setCorrectAnswers(prevState => prevState + 1)
            }

            if (answer.content === item.correctAnswer) {
               return {...answer, isCorrectAnswer: true}
            }

            if (answer.isHeld && answer.content !== item.correctAnswer) {
               return {...answer, isCorrectAnswer: false}
            }

            return answer
         })}

      )))

      setApiData(null)
      setAnswersChecked(true)
      fetchApiData()
   }

   function playAgain() {
      setCorrectAnswers(0)
      setAnswersChecked(false)

      if (apiData) {
         setQuestions( createQuestions(apiData) )
      } else {
         setHasStarted(false)
      }
   }

   return(
      <Context.Provider value={{
         hasStarted,
         apiData,
         startQuiz,
         questions, 
         holdAnswer,
         checkAnswers,
         correctAnswers,
         answersChecked,
         playAgain
      }}>
         {props.children}
      </Context.Provider>
   )
}

export {Context, ContextProvider}