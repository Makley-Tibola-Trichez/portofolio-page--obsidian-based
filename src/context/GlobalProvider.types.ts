import { PropsWithChildren } from 'react';

export type GlobalContextValues = {
  openedFiles: Set<string>;
  handleOpenFile(name: string): void;
  handleCloseFile(name: string): void;
  markdownContent: string;
  focusedFile: string | undefined;
  setFocusedFile: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type GlobalProviderProps = PropsWithChildren;
