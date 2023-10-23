import { LANGUAGE } from "../utils/enums";

export type questionTemplate = {
    language: string;
    starterCode: string;
    driverCode: string | null;
};

type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
    templates: questionTemplate[];
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
