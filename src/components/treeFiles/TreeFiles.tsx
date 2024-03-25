"use client";
import { Fragment, useMemo, useState } from "react";
import { Button } from "../../@/components/ui/button";
import { FilesTreeData, FilesTreeProps } from "./TreeFiles.types";
import { FilesTreeIcon } from "./TreeFilesIcon";

export function FilesTree({
  data,
  style,
  level = 1,
  onOpenFile,
}: FilesTreeProps) {
  const [_toggled, _setToggled] = useState<Set<string>>(new Set());
  const _orderedTree = useMemo(() => {
    return data.sort((a, b) => {
      if (a.children && !b.children) return -1;

      if (!a.children && b.children) return 1;

      return 0;
    });
  }, [data]);

  const handleClickItem = (item: FilesTreeData) => {
    if (item.children && _toggled.has(item.name)) {
      _toggled.delete(item.name);
      _setToggled(new Set(_toggled));
    } else if (item.children) {
      _setToggled((c) => new Set(c.add(item.name)));
    } else {
      onOpenFile?.(item.path);
    }
  };
  return (
    <>
      {_orderedTree.map((item) => (
        <Fragment key={item.path}>
          <Button
            variant={"transparent"}
            size={"sm"}
            className={"flex w-full justify-start"}
            onClick={() => handleClickItem(item)}
          >
            <span className={"flex gap-2 items-end"} style={style}>
              <FilesTreeIcon size={18} hasChildren={Boolean(item.children)} />
              {item.name}
            </span>
          </Button>
          <div className="ease-in-out">
            {item.children && _toggled.has(item.path) ? (
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
