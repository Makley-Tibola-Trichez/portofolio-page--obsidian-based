import { AppProps } from "next/app";
import "../styles/tailwind.css";
import { EditorViewModel } from "./editorViewModel/editorViewModel";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EditorViewModel>
      <Component {...pageProps} />
    </EditorViewModel>
  );
}
