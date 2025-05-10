import { ObjectId } from "bson";
import getConnection from "./connection.js";

export async function getInventors() {
     const clientMongo = await getConnection()

     const inventors = clientMongo
     .db("sample_tp2")
     .collection("inventors")
     .find()
     .toArray()
     return inventors
}

export async function getInventor(id) {
    const clientMongo = await getConnection()
    const inventor = clientMongo.db("sample_tp2")
    .collection("inventors")
    .findOne({_id: new ObjectId(id)}
    )

    return inventor
}

// add inventor
export async function addInventor(inventor) {
    const clientMongo = await getConnection()

     const result = clientMongo
     .db("sample_tp2")
     .collection("inventors")
     .insertOne(inventor)   

     return result
}

//updateInventor
export async function updateInventor(inventor) {
    // el parametro tiene el _id (que es el que vamos actualizar)
    // las propiedades para actualizar
    const clientMongo = await getConnection()
    const query = {_id: new ObjectId(inventor._id)}
    const newValues = {
        $set: {
            first: inventor.first,
            last: inventor.last,
            year: inventor.year
        }
    }

    const result = clientMongo
     .db("sample_tp2")
     .collection("inventors")
     .updateOne(query, newValues)

     return result
}

// delete inventor
export async function deleteInventor(id) {
    const clientMongo = await getConnection()

    const result = clientMongo
     .db("sample_tp2")
     .collection("inventors")
     .deleteOne({_id: new ObjectId(id)})

     return result
}