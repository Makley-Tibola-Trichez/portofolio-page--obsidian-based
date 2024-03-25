import { useState } from "react";
import treeView from "../../folder-and-file-structure.json" with {
  type: "json",
};
import { useRouter } from "next/router";

export const useEditorModel = () => {
  const [openedFiles, _setOpenedFiles] = useState<Set<string>>(new Set());
  const [focusedFile, setFocusedFile] = useState<string | undefined>();

  const _router = useRouter();

  const handleOpenFile = async (name: string) => {
    const _openedFiles = new Set(openedFiles.add(name));
    _router.push(`/${name}`);

    _setOpenedFiles(_openedFiles);
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

    _setOpenedFiles(_openedFiles);

    setFocusedFile(_nextFile);
  };

  return {
    handleOpenFile,
    handleCloseFile,
    setFocusedFile,
    openedFiles,
    focusedFile,
  };
};
