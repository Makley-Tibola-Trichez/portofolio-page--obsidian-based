import { LucideProps, FolderOpen, FolderClosed, File } from 'lucide-react';

type TreeViewIconProps = {
  hasChildren?: boolean;
  isOpen?: boolean;
  size?: LucideProps['size'];
};
export function FilesTreeIcon({
  hasChildren,
  isOpen,
  size,
}: TreeViewIconProps) {
  if (hasChildren && isOpen) {
    return <FolderOpen size={size} />;
  }

  if (hasChildren) {
    return <FolderClosed size={size} />;
  }

  return <File size={size} />;
}
