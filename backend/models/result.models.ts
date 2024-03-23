import mongoose from "mongoose";

/** result model */

const resultSchema = new mongoose.Schema({
    result : { type : Array, default : []},
    attempts : { type : Number, default : 0},
    points : { type : Number, default : 0},
    achieved : { type : String, default : ''},
    createdAt : { type : Date, default : Date.now}
});

const Result = mongoose.model('Result', resultSchema);

export default Result;