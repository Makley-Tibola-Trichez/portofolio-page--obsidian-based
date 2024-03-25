import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "@radix-ui/react-tooltip";
import { Search, Github } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../@/components/ui/resizable";
import PageTab from "../../components/PageTab/PageTab";
import { FilesTree } from "../../components/treeFiles/TreeFiles";
import { useEditorModel } from "./editorModel";
import treeView from "../../data/mdx-tree.json" with { type: "json" };

export const EditorView = ({
  focusedFile,
  openedFiles,
  markdownContent,
  setFocusedFile,
  handleOpenFile,
  handleCloseFile,
  children,
}: React.PropsWithChildren<ReturnType<typeof useEditorModel>>) => {
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
            <FilesTree data={treeView.children} onOpenFile={handleOpenFile} />
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
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
