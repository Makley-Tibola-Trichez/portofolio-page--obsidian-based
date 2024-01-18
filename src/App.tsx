import { PanelLeft, Search } from 'lucide-react';

import { Button } from './@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './@/components/ui/resizable';
import PageTab from './components/PageTab/PageTab';
import { FilesTree } from './components/treeView/TreeView';
import { useGlobalContext } from './context/GlobalProvider';
import Markdown from 'react-markdown';
import { data as treeViewData } from './folder-and-file-structure.json' with { type: 'json' }

function App() {
  const { handleOpenFile, openedFiles, handleCloseFile, markdownContent, focusedFile,setFocusedFile } =
    useGlobalContext();

  return (
    <div className="bg-[#121212] text-[#b3b3b3] h-dvh">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={50} minSize={2}>
          <div className="bg-[#363636] flex ">
            <div className="w-full border-[#363636] border-b pl-4 flex gap-1 items-center py-1">
              <Button variant={'transparent'} size={'iconSm'}>
                <PanelLeft size={18} />
              </Button>
              <Button variant={'transparent'} size="iconSm">
                <Search size={18} />
              </Button>
            </div>
          </div>
          <div className="h-full bg-[#262626] p-4">
            <FilesTree
              data={treeViewData}
              onOpenFile={handleOpenFile}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="bg-[#363636]" />

        <ResizablePanel defaultSize={100} minSize={10} className="bg-[#363636]">
          {Array.from(openedFiles).map((key) => {
            return (
              <PageTab
                key={`opened-file.${key}`}
                isActive={focusedFile === key}
                onClick={() => setFocusedFile(key)}
                onClose={() => handleCloseFile(key)}
              >
                {key}
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

export default App;

/**
 * Aba selecionada : #1e1e1e
 * Aba não selecionada : #363636
 * Bordas: #363636
 * Fonte Não selecionada : #b3b3b3
 * Drawer: #262626
 */
