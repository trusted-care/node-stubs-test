import { StorageCollection } from './storage'

// Meteor method, which stores a number into the database
Meteor.methods({
    storeNumber: async function (number) {
        console.log(`Storing number ${number}`)

        const _id = await StorageCollection.insertAsync({
            number: number,
        })

        console.log(`Number ${number} stored with _id ${_id}`)

        const storedNumber = await StorageCollection.findOneAsync({ _id })

        console.log(`Stored number: ${storedNumber.number}`)

        return storedNumber.number
    },
})
