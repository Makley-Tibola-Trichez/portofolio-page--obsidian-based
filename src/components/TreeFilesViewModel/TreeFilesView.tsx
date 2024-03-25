"use client";
import { Fragment } from "react";
import { Button } from "../../@/components/ui/button";
import { FilesTreeProps } from "./TreeFiles.types";
import { useTreeFilesModel } from "./TreeFilesModel";
import { FilesTreeIcon } from "./TreeFilesViewIcon";

export function TreeFilesView({
  style,
  level = 1,
  onOpenFile,
  handleClickItem,
  orderedTree,
  toggled,
}: FilesTreeProps) {
  return (
    <>
      {orderedTree.map((item) => (
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
            {item.children && toggled.has(item.path) ? (
              <TreeFilesView
                style={{ paddingLeft: level * 16 }}
                level={level + 1}
                {...useTreeFilesModel({ data: item.children, onOpenFile })}
              />
            ) : null}
          </div>
        </Fragment>
      ))}
    </>
  );
}
