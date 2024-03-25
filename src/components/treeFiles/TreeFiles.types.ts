export type FilesTreeData = {
  path: string;
  name: string;
  children?: FilesTreeData[];
};

export type FilesTreeProps = {
  onOpenFile?: (itemName: string) => void;
  data: FilesTreeData[];
  // style?: React.CSSProperties;
  // level?: number;
};
