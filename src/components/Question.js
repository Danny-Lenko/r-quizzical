import React from "react";
import {decode} from "html-entities";


export default function Question(props) {

    const allAnswers = props.question.allAnswers.map(item => {

        const styles = {
            backgroundColor: item.isHeld ? '#D6DBF5'
                : item.correct ? '#94D7A2'
                : item.wrong ? '#F8BCBC'
                : 'white'
        }

        return (

            <div className="Answer"
                key={item.id}
                onClick={() => props.holdAnswer(item.id)}
                style={styles}
            >
                {decode(item.answer)}
            </div>

        )

    })


    return(

        <section className="Question">

            <h3 className="Question__ask">
                {decode(props.question.ask)}
            </h3>

            <div className="Question__options">

                {allAnswers}

            </div>

        </section>

    )
}