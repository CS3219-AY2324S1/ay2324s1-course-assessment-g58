import OpenAI from 'openai';
import { GptResponseResult } from '../types/GptResponseResult';

require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export const getGptResponse = async(content: string): Promise<GptResponseResult> => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": content}],
        });
        const returnContent = chatCompletion.choices[0].message.content;
        return {hasError: false, message: returnContent, error: null};
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error(error.status);  // e.g. 401
            console.error(error.message); // e.g. The authentication token you passed was invalid...
            console.error(error.code);  // e.g. 'invalid_api_key'
            console.error(error.type);  // e.g. 'invalid_request_error'
            return {hasError: true, message: error.message, error: error};
        } else {
            // Non-API error
            console.log(error);
            return {hasError: true, message: null, error: error};
        };
    }
};
