import { LANGUAGE } from "../utils/enums";

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
    arguments: string[];
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
    lengthOfArray: number[];
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
    functionName: "function1",
    arguments: ["arg1", "arg2"],
    argumentsTypes: [
        {
            python: "int",
            cpp: "int",
            c: "int",
            java: "int",
            javascript: "int"
        },
        {
            python: "int",
            cpp: "int",
            c: "int",
            java: "int",
            javascript: "int"
        }
    ],
    expectedOutput: "expectedOutput",
    lengthOfArray: [2]
};
