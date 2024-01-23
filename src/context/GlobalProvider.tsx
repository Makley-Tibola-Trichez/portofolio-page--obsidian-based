'use client';
import { createContext, useContext, useState } from 'react';
import { getFile } from './GlobalProvider.server';
import {
  GlobalContextValues,
  GlobalProviderProps,
} from './GlobalProvider.types';
const GlobalContext = createContext({} as GlobalContextValues);

const _filesContentCache = new Map();

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [openedFiles, _setOpenedFiles] = useState<Set<string>>(new Set());
  const [markdownContent, _setMarkdownContent] = useState<string>('');
  const [focusedFile, setFocusedFile] = useState<string | undefined>();

  const _getFileContent = async (name: string): Promise<string> => {
    if (_filesContentCache.has(name)) {
      return _filesContentCache.get(name);
    }

    return getFile(name).catch(() => '');
  };

  const handleOpenFile = async (name: string) => {
    const _openedFiles = new Set(openedFiles.add(name));
    const _fileContent = await _getFileContent(name);

    _setOpenedFiles(_openedFiles);
    _setMarkdownContent(_fileContent);
    setFocusedFile(name);
  };

  const handleCloseFile = async (name: string) => {
    const _openedFiles = new Set(openedFiles);

    _openedFiles.delete(name);

    const _openedFilesKeys = _openedFiles.keys();

    let _nextFile = Array.from(_openedFilesKeys).at(-1);

    _setOpenedFiles(_openedFiles);

    if (!_nextFile) return;

    const _fileContent = await _getFileContent(_nextFile);

    _setMarkdownContent(_fileContent);
    setFocusedFile(_nextFile);
  };

  return (
    <GlobalContext.Provider
      value={{
        handleOpenFile,
        handleCloseFile,
        openedFiles,
        markdownContent,
        focusedFile,
        setFocusedFile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const _context = useContext(GlobalContext);

  if (!Object.entries(_context).length) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return _context;
};
