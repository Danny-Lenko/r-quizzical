import React from "react";
import Preface from "./Preface"
import Action from "./Action"


export default function App() {

    const [start, setStart] = React.useState(false)


    function startQuiz() {
        setStart(true)
    }

    return(
        <main className="App">

            {
                start

                    ? <Action

                    />

                    : <Preface
                        startQuiz={startQuiz}
                    />
            }

        </main>

    )
}