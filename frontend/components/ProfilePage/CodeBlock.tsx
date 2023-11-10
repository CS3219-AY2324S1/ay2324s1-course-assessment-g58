import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
    code: string;
    language: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language }) => {
    return (
        <Box
            sx={{
                height: "100%",
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
                {code.slice(1, -1).replace(/\r\n/g, "\n")}
            </SyntaxHighlighter>
        </Box>
    );
};

export default CodeBlock;
