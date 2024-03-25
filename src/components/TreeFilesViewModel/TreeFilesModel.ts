import { useState, useMemo } from "react";
import {
  FilesTreeData,
  FilesTreeProps,
  UseTreeFilesModelProps,
} from "./TreeFiles.types";

export const useTreeFilesModel = ({
  data,
  onOpenFile,
}: UseTreeFilesModelProps) => {
  const [toggled, _setToggled] = useState<Set<string>>(new Set());
  const orderedTree = useMemo(() => {
    return data.sort((a, b) => {
      if (a.children && !b.children) return -1;

      if (!a.children && b.children) return 1;

      return 0;
    });
  }, [data]);

  const handleClickItem = (item: FilesTreeData) => {
    if (item.children && toggled.has(item.name)) {
      toggled.delete(item.name);
      _setToggled(new Set(toggled));
    } else if (item.children) {
      _setToggled((c) => new Set(c.add(item.name)));
    } else {
      onOpenFile?.(item.path);
    }
  };

  return {
    orderedTree,
    toggled,
    handleClickItem,
    onOpenFile,
  };
};
