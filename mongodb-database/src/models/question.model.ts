// External dependencies
import mongoose, { Types } from "mongoose";

function arrayLimit(val: Array<any>) {
    return val.length > 0;
}

type questionTemplate = {
    language: string;
    starterCode: string;
    driverCode: string | null;
};

type variableTypes = {
    python: string;
    cpp: string;
    c: string;
    java: string;
    javascript: string;
};

type questionFunction = {
    name: string;
    returnType: variableTypes;
};

type questionCall = {
    functionName: string;
    arguments: string[];
    argumentsTypes: variableTypes[];
    expectedOutput: string;
    lengthOfArray: number[] | null;
};

export type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    templates: questionTemplate[];
    functions: questionFunction[];
    calls: questionCall[];
};

// Class Implementation
export interface IQuestion extends mongoose.Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    templates: questionTemplate[];
    functions: questionFunction[];
    calls: questionCall[];
}

// Mongoose Schema and Model
export const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    difficulty: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    templates: {
        type: [
          {
            language: {
                type: String,
                required: true,
            },
            starterCode: {
                type: String,
                required: true,
            },
            driverCode: {
                type: String,
                required: false,
            }
          },
        ],
        required: false
    },
    functions: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                returnType: {
                    python: {
                        type: String,
                        required: true,
                    },
                    cpp: {
                        type: String,
                        required: true,
                    },
                    c: {
                        type: String,
                        required: true,
                    },
                    java: {
                        type: String,
                        required: true,
                    },
                    javascript: {
                        type: String,
                        required: true,
                    },
                },
            }
        ],
        // TODO: validate this
        // validate: [arrayLimit, 'Functions array cannot be empty'],
        // required: true,
    },    
    calls: {
        type: [
            {
                functionName: {
                    type: String,
                    required: true,
                },
                arguments: {
                    type: [String],
                    required: true,
                },
                argumentsTypes: {
                    type: [
                        {
                            python: {
                                type: String,
                                required: true,
                            },
                            cpp: {
                                type: String,
                                required: true,
                            },
                            c: {
                                type: String,
                                required: true,
                            },
                            java: {
                                type: String,
                                required: true,
                            },
                            javascript: {
                                type: String,
                                required: true,
                            },
                        }
                    ],
                    required: true,
                },
                expectedOutput: {
                    type: String,
                    required: true,
                },
                lengthOfArray: {
                    type: [Number],
                    required: false,
                }
            }
        ],
        // TODO: validate this
        // validate: [arrayLimit, 'Calls array cannot be empty'],
        // required: true,
    },    
});

const QuestionModel = mongoose.model<IQuestion>("Question", QuestionSchema);

export default QuestionModel;
