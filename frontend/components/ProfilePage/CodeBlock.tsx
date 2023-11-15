import React, { FC } from "react";
import { Box } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
    code: string;
    language: string;
}
 
const CodeBlock: FC<CodeBlockProps> = ({ code, language }) => {
    const formattedCode = code.slice(1, -1)
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"');
    return (
        <Box
            sx={{
                height: "100%",
                overflow: "auto",
            }}
        >
            <SyntaxHighlighter
                language={language || "plaintext"}
                style={tomorrow}
                wrapLines
                wrapLongLines
                customStyle={{
                    height: "100%",
                }}
            >
                {formattedCode}
            </SyntaxHighlighter>
        </Box>
    );
};

export default CodeBlock;
