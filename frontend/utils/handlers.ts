import { enqueueSnackbar } from "notistack";

type severity =
    | "default"
    | "error"
    | "success"
    | "warning"
    | "info"
    | undefined;

/**
 * The function `messageHandler` takes a message and severity as parameters and enqueues a snackbar
 * with the given message and severity.
 * @param {string} message - The `message` parameter is a string that represents the message you want
 * to display in the snackbar. It can be any text or information that you want to communicate to the
 * user.
 * @param {severity} severity - The severity parameter is used to indicate the level of severity or
 * importance of the message. It can have one of the following values:
 */
export const messageHandler = (message: string, severity: severity) => {
    enqueueSnackbar(message, { variant: severity });
};
