import React, {useEffect} from "react";
import Preface from "./Preface"
import Action from "./Action"
import {nanoid} from 'nanoid'


export default function App() {

    const [start, setStart] = React.useState(false)
    const [question, setQuestion] = React.useState([])

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => setQuestion(data.results[0]))
    }, [])

    // console.log(question)

    function startQuiz() {
        setStart(true)

        setQuestion(prevState => {

            const random = Math.floor(Math.random() * 4)
            const answers = [...prevState.incorrect_answers]
            answers.splice(random, 0, prevState.correct_answer)

            const allAnswers = answers.map(item => ({
                answer: item,
                isHeld: false,
                id: nanoid()
            }))

            return {
                ask: prevState.question,
                cor: prevState.correct_answer,
                allAnswers: allAnswers
            }
        })

    }

    function holdAnswer(id) {
        setQuestion(prevState => {
            const allAnswers = prevState.allAnswers.map(answer => (
                answer.id === id
                    ? {...answer, isHeld: !answer.isHeld}
                    : {...answer, isHeld: false}
            ))
            return {...prevState, allAnswers: allAnswers}
        })
        // console.log(question)
    }

    function checkAnswers() {
        setQuestion(prevState => {
            const allAnswers = prevState.allAnswers.map(answer => (
                answer.id === id
                    ? {...answer, isHeld: !answer.isHeld}
                    : {...answer, isHeld: false}
            ))
            return {...prevState, allAnswers: allAnswers}
        })
    }

    return(
        <main className="App">

            {
                start

                    ? <Action
                        question={question}
                        holdAnswer={holdAnswer}
                        checkAnswers={checkAnswers}
                    />

                    : <Preface
                        startQuiz={startQuiz}
                    />
            }

        </main>

    )
}





// React.useEffect(() => {
//
//     setQuestions(apiData.map(item => {
//         const random = Math.floor(Math.random() * 3)
//         item.incorrect_answers.splice(random, 0, item.correct_answer)
//
//         return {
//             ask: item.question,
//             answers: item.incorrect_answers,
//             correct: item.correct_answer,
//             isHeld: false,
//             id: nanoid()
//         }
//     }))
//
// }, [apiData])