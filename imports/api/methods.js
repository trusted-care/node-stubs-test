import { StorageCollection } from './storage'

// Meteor method, which stores a number into the database
Meteor.methods({
    storeNumber: async function (number) {
        const _id = await StorageCollection.insertAsync({
            number: number,
        })

        if (Meteor.isServer) {
            await new Promise((resolve) => setTimeout(resolve, 5000))
        }

        const amountOfStorages = await StorageCollection.find().countAsync()

        return amountOfStorages
    },
    storeNumberSync: function (number) {
        console.log(`Storing number ${number}`)

        // if (Meteor.isClient) {
        //     return number + 50
        // }

        // if (Meteor.isServer) {
        //     // await new Promise((resolve) => setTimeout(resolve, 5000))
        // }

        return number + 1
    },
})
