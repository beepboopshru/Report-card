(function (root, factory) {
    "use strict";

    const formatter = factory();
    if (typeof module === "object" && module.exports) module.exports = formatter;
    if (root) root.formatArduinoCode = formatter;
}(typeof window !== "undefined" ? window : globalThis, function () {
    "use strict";

    const indentText = (level) => "  ".repeat(Math.max(0, level));

    return function formatArduinoCode(source) {
        const input = String(source ?? "").replace(/\r\n?/g, "\n").trim();
        if (!input) return "";

        const lines = [];
        const braceStack = [];
        let line = "";
        let indent = 0;
        let parenDepth = 0;
        let bracketDepth = 0;
        let state = "normal";
        let escaped = false;
        let closedBrace = false;

        const flush = () => {
            const value = line.trim();
            if (value) lines.push(`${indentText(indent)}${value}`);
            line = "";
        };

        const addSpace = () => {
            if (line && !/\s$/.test(line)) line += " ";
        };

        for (let index = 0; index < input.length; index += 1) {
            const character = input[index];
            const next = input[index + 1] || "";

            if (state === "string" || state === "character") {
                line += character;
                if (escaped) escaped = false;
                else if (character === "\\") escaped = true;
                else if ((state === "string" && character === '"') || (state === "character" && character === "'")) state = "normal";
                continue;
            }

            if (state === "line-comment") {
                if (character === "\n") {
                    flush();
                    state = "normal";
                } else line += character;
                continue;
            }

            if (state === "block-comment") {
                line += character;
                if (character === "*" && next === "/") {
                    line += next;
                    index += 1;
                    state = "normal";
                } else if (character === "\n") flush();
                continue;
            }

            if (closedBrace && !/\s/.test(character)) {
                const remaining = input.slice(index);
                if (character === ";" || character === ",") closedBrace = false;
                else if (/^(else|catch|while)\b/.test(remaining)) {
                    addSpace();
                    closedBrace = false;
                } else {
                    flush();
                    closedBrace = false;
                }
            }

            if (/\s/.test(character)) {
                if (!closedBrace) addSpace();
                continue;
            }

            if (character === "#" && !line.trim()) {
                let end = input.indexOf("\n", index);
                if (end < 0) end = input.length;
                line = input.slice(index, end).trimEnd();
                flush();
                index = end;
                continue;
            }

            if (character === "/" && next === "/") {
                addSpace();
                line += "//";
                index += 1;
                state = "line-comment";
                continue;
            }

            if (character === "/" && next === "*") {
                addSpace();
                line += "/*";
                index += 1;
                state = "block-comment";
                continue;
            }

            if (character === '"') {
                line += character;
                state = "string";
                continue;
            }

            if (character === "'") {
                line += character;
                state = "character";
                continue;
            }

            if (character === "(") {
                parenDepth += 1;
                line += character;
                continue;
            }

            if (character === ")") {
                parenDepth = Math.max(0, parenDepth - 1);
                line += character;
                continue;
            }

            if (character === "[") {
                bracketDepth += 1;
                line += character;
                continue;
            }

            if (character === "]") {
                bracketDepth = Math.max(0, bracketDepth - 1);
                line += character;
                continue;
            }

            if (character === "{") {
                const initializer = /=\s*$/.test(line);
                addSpace();
                line += character;
                flush();
                braceStack.push({ initializer, parenDepth, bracketDepth });
                indent += 1;
                continue;
            }

            if (character === "}") {
                flush();
                indent = Math.max(0, indent - 1);
                braceStack.pop();
                line = "}";
                closedBrace = true;
                continue;
            }

            if (character === ";") {
                line += character;
                if (parenDepth === 0) {
                    flush();
                    closedBrace = false;
                }
                continue;
            }

            if (character === ",") {
                line += character;
                const frame = braceStack[braceStack.length - 1];
                if (frame?.initializer && parenDepth === frame.parenDepth && bracketDepth === frame.bracketDepth) flush();
                continue;
            }

            line += character;
        }

        flush();

        const spaced = [];
        lines.forEach((current, index) => {
            const previous = spaced[spaced.length - 1] || "";
            const topLevelFunction = /^(?:void|int|long|float|double|bool|byte|char|String|unsigned\s+\w+)\s+\w+\s*\([^;]*\)\s*\{$/.test(current);
            const afterIncludeBlock = !current.startsWith("#") && previous.startsWith("#");
            if ((topLevelFunction || afterIncludeBlock) && previous) spaced.push("");
            spaced.push(current.replace(/\s+$/g, ""));
            if (current === "}" && index < lines.length - 1 && !/^\s*(else|catch|while|[;,])/.test(lines[index + 1])) spaced.push("");
        });

        return spaced.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    };
}));
