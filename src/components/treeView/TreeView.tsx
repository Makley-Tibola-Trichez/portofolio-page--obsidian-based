import { Fragment, useMemo, useState } from 'react';
import { Button } from '../../@/components/ui/button';
import { FilesTreeProps } from './TreeView.types';
import { FilesTreeIcon } from './TreeViewIcon';

export function FilesTree({
  data,
  style,
  level = 1,
  onOpenFile,
}: FilesTreeProps) {
  const _orderedData = useMemo(() => {
    return data.sort((a, b) => {
      if (a.children && !b.children) return -1;

      if (!a.children && b.children) return 1;

      return 0;
    });
  }, [data]);

  const [_toggled, _setToggled] = useState<Set<string>>(new Set());

  const handleToggle = (name: string) => {
    if (_toggled.has(name)) {
      _toggled.delete(name);
      _setToggled(new Set(_toggled));
    } else {
      _setToggled((c) => new Set(c.add(name)));
    }
  };

  return (
    <>
      {_orderedData.map((item) => (
        <Fragment key={item.title}>
          <Button
            variant={'transparent'}
            size={'sm'}
            className={'flex w-full justify-start'}
            onClick={() => {
              if (item.children) {
                handleToggle(item.title);
                return;
              }
              onOpenFile?.(item.title);
            }}
          >
            <span className={'flex gap-2 items-end'} style={style}>
              <FilesTreeIcon size={18} hasChildren={Boolean(item.children)} />
              {item.title}
            </span>
          </Button>
          <div className="ease-in-out">
            {item.children && _toggled.has(item.title) ? (
              <FilesTree
                data={item.children}
                style={{ paddingLeft: level * 16 }}
                level={level + 1}
                onOpenFile={onOpenFile}
              />
            ) : null}
          </div>
        </Fragment>
      ))}
    </>
  );
}
