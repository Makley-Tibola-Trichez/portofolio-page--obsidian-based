import { useEditorModel } from "./editorModel";
import { EditorView } from "./editorView";

export const EditorViewModel = ({ children }: React.PropsWithChildren) => (
  <EditorView {...useEditorModel()}>{children}</EditorView>
);
