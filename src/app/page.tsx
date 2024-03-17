"use client";
import { Github, Search } from "lucide-react";

import treeView from "../folder-and-file-structure.json" with { type: "json" };
import Markdown from "react-markdown";
import { Button } from "../@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../@/components/ui/resizable";
import PageTab from "../components/PageTab/PageTab";
import { FilesTree } from "../components/treeView/TreeView";
import { useFilesContext } from "../context/FileProvider";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../@/components/ui/tooltip";

export default function Home() {
  const {
    focusedFile,
    openedFiles,
    markdownContent,
    setFocusedFile,
    handleOpenFile,
    handleCloseFile,
  } = useFilesContext();
  return (
    <div className="bg-[#121212] text-[#b3b3b3] h-dvh">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={4}>
          <div className="bg-[#363636] flex ">
            <div className=" border-[#363636] border-b pl-4 flex gap-1 items-center py-1">
              <Button variant={"transparent"} size="iconSm">
                <Search size={18} />
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={"transparent"} size="iconSm">
                      <Github size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow />
                    Abrir meu GitHub
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="h-full bg-[#262626] p-4">
            <FilesTree data={treeView.data} onOpenFile={handleOpenFile} />
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-[#363636]" />

        <ResizablePanel defaultSize={100} minSize={10} className="bg-[#363636]">
          {Array.from(openedFiles).map((openedFile) => {
            return (
              <PageTab
                key={`opened-file.${openedFile}`}
                isActive={focusedFile === openedFile}
                onClick={() => setFocusedFile(openedFile)}
                onClose={() => handleCloseFile(openedFile)}
              >
                {openedFile}
              </PageTab>
            );
          })}
          {markdownContent !== null ? (
            <div className="text-white bg-[#1e1e1e] h-full p-4">
              <Markdown>{markdownContent}</Markdown>
            </div>
          ) : null}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

