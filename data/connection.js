import { MongoClient } from "mongodb";

const uri = ""

const client = new MongoClient(uri)

let instance = null

// TODO: investigar sobre asincronismo en JavaScript
// para que es el async, como se usan promesas y para que sirve el await
export default async function getConnection() {
    if (instance == null) {
        try {
            instance = await client.connect()
        } catch (error) {
            console.log(error.message)
        }
    }
}