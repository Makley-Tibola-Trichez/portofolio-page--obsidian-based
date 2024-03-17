import { FilesProvider } from "../context/FileProvider";

import "../styles/tailwind.css";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <FilesProvider>{children}</FilesProvider>
      </body>
    </html>
  );
}
