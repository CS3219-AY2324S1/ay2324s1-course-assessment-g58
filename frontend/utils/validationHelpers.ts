/**
 * @param email A given email
 * ^: Asserts the start of the string.
 * [^\s@]+: Matches one or more characters that are not whitespace or '@'.
 * @: Matches the '@' symbol.
 * [^\s@]+: Matches one or more characters that are not whitespace or '@'.
 * \.: Matches a literal dot.
 * [^\s@]+: Matches one or more characters that are not whitespace or '@'.
 * $: Asserts the end of the string.
 * @returns The test method checks if the input string matches the regular expression, and returns true if it does.
 */

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
