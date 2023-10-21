export type questionTemplate = {
    language: string;
    starterCode: string;
    driverCode: string | null;
};

export type questionFunction = {
    name: string;
    returnType: {
        python: string;
        cpp: string;
        c: string;
        java: string;
        javascript: string;
    };
};

export type questionCall = {
    functionName: string;
    arguments: [string];
    argumentsTypes: [
        {
            python: string;
            cpp: string;
            c: string;
            java: string;
            javascript: string;
        }
    ];
    expectedOutput: string;
    lengthOfArray: [number];
};

type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    templates: questionTemplate[] | null;
    functions: questionFunction[] | null;
    calls: questionCall[] | null;

};

export default Question;