import { useTreeFilesModel } from "./TreeFilesModel";

export type FilesTreeData = {
  path: string;
  name: string;
  children?: FilesTreeData[];
};

export type UseTreeFilesModelProps = {
  data: FilesTreeData[];
  onOpenFile?: (itemName: string) => void;
};

export type FilesTreeProps = ReturnType<typeof useTreeFilesModel> & {
  style?: React.CSSProperties;
  level?: number;
};
