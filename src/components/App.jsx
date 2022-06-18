import React, {useContext} from 'react'

import {Context} from "../Context"
import Preface from './Preface'
import Action from './Action'

function App() {
    const {hasStarted} = useContext(Context)

    return (
        <main className="app">
            {
                hasStarted
                    ? <Action />
                    : <Preface />
            }
        </main>
    )
}

export default App