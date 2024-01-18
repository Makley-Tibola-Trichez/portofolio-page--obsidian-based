import { createContext, useContext, useState } from 'react';
import {
  GlobalContextValues,
  GlobalProviderProps,
} from './GlobalProvider.types';
import { data  as treeViewData} from '../folder-and-file-structure.json' with { type: 'json' }
const GlobalContext = createContext({} as GlobalContextValues);

const _filesContentCache = new Map();

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [openedFiles, _setOpenedFiles] = useState<Set<string>>(new Set());
  const [markdownContent, _setMarkdownContent] = useState<string >('');
  const [focusedFile, setFocusedFile] = useState<string | undefined>();

  const handleOpenFile = async (name: string) => {
    _setOpenedFiles((c) => new Set(c.add(name)));
    if (_filesContentCache.has(name)) {
      const _text = _filesContentCache.get(name);
      if (_text === markdownContent) return;
      _setMarkdownContent(_text);
      setFocusedFile(name);
      return;
    }
    const _file = await fetch(`/markdown/${name}.md`);
    let _text: string | null = await _file.text();

    if (_text === markdownContent) return;
    if (_text.includes('doctype')) {
      _text = '';
    }

    _filesContentCache.set(name, _text);
    _setMarkdownContent(_text);
    setFocusedFile(name);
  };
  const handleCloseFile = (name: string) => {
    const _openedFiles = new Set(openedFiles);
    _openedFiles.delete(name);
    _setOpenedFiles(_openedFiles);

    //get next file
    const _nextFile = Array.from(_openedFiles)[0];
    if (!_nextFile) {
      const _firstContent = treeViewData.find((item) => !item.children );
      if (!_firstContent) return;
      
      handleOpenFile(_firstContent.title);
      return;
    }

    if (name === focusedFile) {
      handleOpenFile(_nextFile);
    }
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
