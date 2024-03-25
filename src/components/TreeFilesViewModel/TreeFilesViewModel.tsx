"use client";
import { useTreeFilesModel } from "./TreeFilesModel";
import { TreeFilesView } from "./TreeFilesView";

type TreeFilesViewModelProps = Parameters<typeof useTreeFilesModel>[0];

export function TreeFilesViewModel(props: TreeFilesViewModelProps) {
  return <TreeFilesView {...useTreeFilesModel(props)} />;
}
