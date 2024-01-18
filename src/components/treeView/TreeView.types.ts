export type FilesTreeData = {
  title: string;
  fileName?: string;
  children?: FilesTreeData[];
};

export type FilesTreeProps = {
  onOpenFile?: (itemName: string) => void;
  data: FilesTreeData[];
  style?: React.CSSProperties;
  level?: number;
};
