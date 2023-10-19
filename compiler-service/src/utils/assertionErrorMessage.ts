export const ASSERTION_ERROR_MESSAGE_TEMPLATE = "AssertionError: Test {testNum}: Expected {expected}, but got {actual}";

export const formatErrorMessagePython = (template: String, testNum: string, expected: string, actual: string) => {
    return template
        .replace("{testNum}", testNum)
        .replace("{expected}", expected)
        .replace("{actual}", actual);
};

//TODO: handle arrays
export const formatErrorMessageC = (template: String, testNum: string, expected: string, actualType: string) => {
    let actual: string;

    switch (actualType) {
        case 'int':
            actual = "%d";
            break;
        case 'float':
            actual = "%f";
            break;
        case 'double':
            actual = "%lf";
            break;
        case 'char':
            actual = "%c";
            break;
        case 'char*':
            actual = "%s";
            break;
        case 'bool':
            actual = "%d";
            break;
        default:
            actual = "a different result"; // Handle other types or throw an error if unsupported type is passed
            break;
    }

    return template
        .replace("{testNum}", testNum)
        .replace("{expected}", expected)
        .replace("{actual}", actual);
};

export const formatErrorMessageJava = (template: string, testNum: string, expected: string) => {
    return template
        .replace("{testNum}", testNum)
        .replace("{expected}", expected)
        .replace("{actual}", "");
};

export const formatErrorMessageJavaScript = (template: string, testNum: string, expected: string) => {
    return template
        .replace("{testNum}", testNum)
        .replace("{expected}", expected)
        .replace("{actual}", "");
};
export const ASSERTION_ERROR_PATTERN = /AssertionError: Test (\d+): Expected .+, but got .+/;
