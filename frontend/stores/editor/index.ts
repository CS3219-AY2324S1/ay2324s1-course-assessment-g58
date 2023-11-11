import { makeAutoObservable } from "mobx";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
/**
 * EditorStore stores state for the CodeEditor component
 */
class EditorStore {
    editor: editor.IStandaloneCodeEditor | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setEditor = (editor: editor.IStandaloneCodeEditor) => {
        this.editor = editor;
    };

    getEditor = (): editor.IStandaloneCodeEditor => {
        if (this.editor == undefined) {
            throw Error("Editor has not been set");
        }
        return this.editor;
    };
}

export { EditorStore };
