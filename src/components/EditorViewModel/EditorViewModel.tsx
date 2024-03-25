import { useEditorModel } from "./EditorModel";
import { EditorView } from "./EditorView";

export const EditorViewModel = ({ children }: React.PropsWithChildren) => (
  <EditorView {...useEditorModel()}>{children}</EditorView>
);
