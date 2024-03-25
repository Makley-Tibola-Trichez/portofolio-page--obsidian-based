import { AppProps } from "next/app";
import "../styles/tailwind.css";
import { EditorViewModel } from "../components/EditorViewModel/EditorViewModel";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EditorViewModel>
      <Component {...pageProps} />
    </EditorViewModel>
  );
}
