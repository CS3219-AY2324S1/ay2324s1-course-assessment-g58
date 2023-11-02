import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Typography } from '@mui/material';

interface CodeBlockProps {
    language: string;
    value: string;
}

interface ModalContentProps {
    text: string;
}

const ModalContent = ({ text }: ModalContentProps) => {
    const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)```|([\s\S]*?)(?=```|$)/gm;
    const matches = Array.from(text.matchAll(codeBlockRegex));
  
    return (
        <>
            {matches.map((match, index) => {
            if (match[1]) {
                // This is a code block
                return (
                    <CodeBlock key={index} language={match[1]} value={match[2]} />
                );
            } else {
                // This is a text block
                return (
                <Typography key={index} variant="body1" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {match[0]}
                </Typography>
                );
            }
            })}
        </>
    );
  };
  
const CodeBlock = ({ language, value }: CodeBlockProps) => {
    return (
        <SyntaxHighlighter language={language} style={tomorrow}>
            {value}
        </SyntaxHighlighter>
    );
};

export default ModalContent;
