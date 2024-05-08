import React, { useState, useEffect } from 'react'

export const Hello = () => {
    const [counter, setCounter] = useState(0)
    const [result, setResult] = useState(0)

    useEffect(() => {
        // Store counter value in storageCollection
        async function store() {
            try {
                const result = await Meteor.callAsync('storeNumber', counter)
                setResult(result)
            } catch (err) {
                console.error(err)
            }
        }

        store()
    }, [counter])

    const increment = () => {
        setCounter(counter + 1)
    }

    return (
        <div>
            <button onClick={increment}>Click Me</button>
            <p>You've pressed the button {counter} times.</p>
            <p>Result in db: {result}</p>
        </div>
    )
}
