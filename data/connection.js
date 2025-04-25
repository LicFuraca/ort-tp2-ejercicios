import { MongoClient } from "mongodb";

const url = "mongodb+srv://admin:tp2@cluster0.3bm3a.azure.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url)

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
    return instance
}