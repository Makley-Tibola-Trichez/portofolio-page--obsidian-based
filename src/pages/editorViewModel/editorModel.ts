import { useState } from "react";
import treeView from "../../folder-and-file-structure.json" with {
  type: "json",
};
import { useRouter } from "next/router";
const _filesContentCache = new Map();

export const useEditorModel = () => {
  const [openedFiles, _setOpenedFiles] = useState<Set<string>>(new Set());
  const [markdownContent, _setMarkdownContent] = useState<string>("");
  const [focusedFile, setFocusedFile] = useState<string | undefined>();

  const _router = useRouter();
  const _getFileContent = async (name: string): Promise<string> => {
    if (_filesContentCache.has(name)) {
      return _filesContentCache.get(name);
    }

    try {
      _router.push(`/${name}`);
      // const _file = await import(`../../markdown/${name}.mdx`);
      // console.log("_file");
      // return _file.toString();
    } catch (error) {
      return "";
    }
  };

  const handleOpenFile = async (name: string) => {
    const _openedFiles = new Set(openedFiles.add(name));
    // const _fileContent = await _getFileContent(name);
    _router.push(`/${name}`);

    // console.log(_fileContent);
    _setOpenedFiles(_openedFiles);
    // _setMarkdownContent(_fileContent);
    setFocusedFile(name);
  };

  const handleCloseFile = async (name: string) => {
    const _openedFiles = new Set(openedFiles);

    _openedFiles.delete(name);

    const _openedFilesKeys = _openedFiles.keys();

    let _nextFile = Array.from(_openedFilesKeys).at(-1);

    if (!_nextFile) {
      _nextFile = treeView.data.find(({ initialPage }) => initialPage)?.title;
    }

    if (!_nextFile) return;

    _openedFiles.add(_nextFile);

    const _fileContent = await _getFileContent(_nextFile);
    _setOpenedFiles(_openedFiles);

    // _setMarkdownContent(_fileContent);
    setFocusedFile(_nextFile);
  };

  return {
    handleOpenFile,
    handleCloseFile,
    openedFiles,
    markdownContent,
    focusedFile,
    setFocusedFile,
  };
};
