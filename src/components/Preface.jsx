import React, { useContext } from 'react'

import {Context} from '../Context'

function Preface() {
   const {startQuiz, apiData} = useContext(Context)

   function chooseButtonRender(loaded) {
      return loaded

         ? <button 
            className="preface__btn"
            onClick={startQuiz}
         >
            Start Quiz
         </button>

         : <button 
            className="preface__btn grey-bcg"
         >
            Loading...
         </button>
   }
   
   return(
      <section className="preface">

         <h1>Quizzical</h1>

         <p className="preface__subheading">
            Choose one right answer per question
         </p>

         { chooseButtonRender(apiData) }
         
      </section>
   )
}

export default Preface