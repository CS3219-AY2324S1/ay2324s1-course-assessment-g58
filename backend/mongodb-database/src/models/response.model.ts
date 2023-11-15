import mongoose, { Types } from "mongoose";

export interface IResponse extends mongoose.Document {
    _id: Types.ObjectId;
    response: string;
    status: string;
    dateTime: string;
    language: string;
}

export const ResponseSchema = new mongoose.Schema({

    response: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    dateTime: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
});

const ResponseModel = mongoose.model<IResponse>("Response", ResponseSchema);

export default ResponseModel;