import React from "react";

export default function Question(props) {


    const allAnswers = props.question.allAnswers.map(item => {

        const styles = {
            backgroundColor: item.isHeld ? 'green' : 'white'
        }

        return (

            <div className="Answer"
             key={item.id}
             onClick={() => props.holdAnswer(item.id)}
             style={styles}
        >
            {item.answer}
        </div>

        )

    })


    return(

        <section className="Question">

            <h3 className="Question__ask">
                {props.question.ask}
            </h3>

            <div className="Question__options">

                {allAnswers}

            </div>

        </section>

    )
}