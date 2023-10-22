import { LANGUAGE } from "../utils/enums";

export type questionTemplate = {
    language: string;
    starterCode: string;
    driverCode: string | null;
};

export type variableTypes = {
    python: string;
    cpp: string;
    c: string;
    java: string;
    javascript: string;
};

export type questionFunction = {
    name: string;
    returnType: variableTypes;
};

export type questionCall = {
    functionName: string;
    arguments: string[];
    argumentsTypes: variableTypes[];
    expectedOutput: string;
    lengthOfArray: number[] | null;
};

type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    templates: questionTemplate[];
    functions: questionFunction[];
    calls: questionCall[];

};

export default Question;

// Default question template
export const defaultQuestionTemplates: questionTemplate[] = [
    {
        language: LANGUAGE.PYTHON,
        starterCode: `# Write your code here`,
        driverCode: null
    },
    {
        language: LANGUAGE.CPP,
        starterCode: `// Write your code here`,
        driverCode: null
    },
    {
        language: LANGUAGE.C,
        starterCode: `// Write your code here`,
        driverCode: null
    },
    {
        language: LANGUAGE.JAVA,
        starterCode: `// Write your code here`,
        driverCode: null
    },
    {
        language: LANGUAGE.JAVASCRIPT,
        starterCode: `// Write your code here`,
        driverCode: null
    }
];

// Default question call
export const defaultQuestionCall: questionCall = 
{
    functionName: "foo",
    arguments: ["1"],
    argumentsTypes: [
        {
            python: "int",
            cpp: "int",
            c: "int",
            java: "int",
            javascript: "int"
        }
    ],
    expectedOutput: "1",
    lengthOfArray: []
};
