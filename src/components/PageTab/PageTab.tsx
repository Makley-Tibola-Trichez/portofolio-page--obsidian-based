import clsx from 'clsx';
import { X } from 'lucide-react';
import { Button } from '../../@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../@/components/ui/tooltip';

type PageTabProps = {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (active: boolean) => void;
  onClose?: () => void;
};

export default function PageTab({
  children,
  isActive,
  onClick,
  onClose,
}: PageTabProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={clsx(
              'mt-2 rounded-t p-1 group',
              isActive && 'bg-tab-active'
            )}
          >
            <div
              onAuxClick={onClose}
              className={clsx(
                'rounded w-fit select-none flex hover:text-gray-300',
                !isActive && 'text-gray-400 hover:bg-tab-hover',
                isActive && 'text-gray-300'
              )}
              onClick={() => onClick?.(!isActive)}
            >
              <div className="max-w-40 truncate px-2">{children}</div>
              <Button
                size="iconXs"
                variant={'transparent'}
                onClick={onClose}
                className={clsx(
                  'invisible group-hover:visible',
                  isActive && 'visible'
                )}
              >
                <X size={14} />
              </Button>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
