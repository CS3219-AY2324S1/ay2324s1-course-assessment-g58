import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Typography } from '@mui/material';

interface CodeBlockProps {
    language?: string;
    value: string;
}

interface ModalContentProps {
    text: string;
}

const ModalContent = ({ text }: ModalContentProps) => {
    // This regex now allows for an optional language identifier
    const codeBlockRegex = /```(\w+)?\s*([\s\S]+?)```|([\s\S]+?)(?=```|$)/gm;
    const matches = Array.from(text.matchAll(codeBlockRegex));

    return (
        <>
            {matches.map((match, index) => {
                // Check for code block with or without a language
                if (match[1] || match[2]) {
                    // This is a code block, default language to 'plaintext' if not provided
                    return (
                        <SyntaxHighlighter
                            key={index}
                            language={match[1] || 'plaintext'}
                            style={tomorrow}
                        >
                            {match[2]}
                        </SyntaxHighlighter>
                    );
                } else {
                    // This is plain text
                    return (
                        <Typography key={index} variant="body1" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {match[3]}
                        </Typography>
                    );
                }
            })}
        </>
    );
};

export default ModalContent;
