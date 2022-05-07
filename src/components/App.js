import React, {useEffect} from "react";
import Preface from "./Preface"
import Action from "./Action"
import {nanoid} from 'nanoid'


export default function App() {

    const [start, setStart] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [checked, setChecked] = React.useState(false)
    const [correctAnswers, setCorrectAnswers] = React.useState(0)

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, [])


    function startQuiz() {
        setStart(true)
        renderNewQuestions()
    }

    function renderNewQuestions() {

        setQuestions(prevState => prevState.map(question => {

            const random = Math.floor(Math.random() * 4)
            const answers = [...question.incorrect_answers]
            answers.splice(random, 0, question.correct_answer)

            const allAnswers = answers.map(item => ({
                answer: item,
                isHeld: false,
                correct: false,
                wrong: false,
                id: nanoid()
            }))
            const answersArr = answers.map(item => item)

            return {
                ask: question.question,
                correct: question.correct_answer,
                allAnswers: allAnswers,
                answersArr: answersArr,
                id: nanoid()
            }
        }))

    }

    function holdAnswer(choiceId, target) {

        setQuestions(prevState => prevState.map(item => {

            const newAnswers = item.allAnswers.map(answer => (

                answer.id === choiceId
                    ? {...answer, isHeld: !answer.isHeld}
                    : {...answer, isHeld: false}
            ))

            return item.answersArr.includes(target.textContent)
                ? {...item, allAnswers: newAnswers}
                : item

        }))

    }

    function checkAnswers() {

        setQuestions(prevState => prevState.map(item => {

            const allAnswers = item.allAnswers.map(answer => {

                if (answer.isHeld && answer.answer === item.correct) {
                    setCorrectAnswers(prevState => prevState + 1)
                }

                if (
                    answer.answer === item.correct
                ) {
                    return {...answer, correct: true, isHeld: false}
                }

                else if (
                    answer.isHeld && answer.answer !== item.correct
                ) {
                    return {...answer, wrong: true, isHeld: false}
                }

                else {
                    return answer
                }

            })

            return {...item, allAnswers: allAnswers}

        }))

        setChecked(true)
    }

    function playAgain() {

        setQuestions([])
        setChecked(false)
        setCorrectAnswers(0)
        fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => setQuestions(data.results))
            .then(() => renderNewQuestions())
    }


    return(
        <main className="App">

            {
                start

                    ? <Action
                        questions={questions}
                        holdAnswer={holdAnswer}
                        checkAnswers={checkAnswers}
                        checked={checked}
                        result={correctAnswers}
                        playAgain={playAgain}
                    />

                    : <Preface
                        startQuiz={startQuiz}
                    />
            }

        </main>

    )
}
