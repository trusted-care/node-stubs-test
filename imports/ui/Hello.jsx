import React, { useState, useEffect } from 'react'
import { StorageCollection } from '../api/storage'
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense'

export const Hello = () => {
    const isLoading = useSubscribe('storage')
    const [counter, setCounter] = useState(0)
    const storages = useFind(StorageCollection, [{}]) || []
    const [resultAmountFromMethod, setResultAmountFromMethod] = useState(0)

    console.log(storages.length)

    useEffect(() => {
        // Store counter value in storageCollection
        async function store() {
            try {
                Meteor.call('storeNumber', counter, (err, res) => {
                    if (err) {
                        console.error(err)
                    }
                    setResultAmountFromMethod(res)
                })
            } catch (err) {
                console.error(err)
            }
        }

        store()
    }, [counter])

    const increment = () => {
        setCounter(counter + 1)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <button onClick={increment}>Click Me</button>
            <p>You've pressed the button {counter} times.</p>
            <p>ResultAmountFromMethod: {resultAmountFromMethod}</p>
            <p>Storage Amount in db: {storages.length}</p>
        </div>
    )
}
