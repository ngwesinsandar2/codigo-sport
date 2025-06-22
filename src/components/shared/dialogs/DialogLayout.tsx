import { IUseDialogReturn } from '@/hooks/useDialog';
import { cn } from '@/lib/utils';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../ui/dialog';

interface IDialogLayoutProps {
  dialog: IUseDialogReturn;
  dialogTitle: string;
  dialogDescription?: string;
  dialogFooter?: React.ReactNode;
  children?: React.ReactNode;
  contentClassName?: string;
  containerClassName?: string;
  customOpenChangeFunc?: () => void;
}

export default function DialogLayout({
  dialog,
  dialogTitle,
  dialogDescription,
  dialogFooter,
  children,
  contentClassName,
  containerClassName,
  customOpenChangeFunc
}: IDialogLayoutProps) {
  return (
    <Dialog
      open={dialog.isOpen}
      onOpenChange={
        customOpenChangeFunc ? customOpenChangeFunc : dialog.closeDialog
      }
    >
      <DialogContent
        className={cn('max-w-[600px]', contentClassName)}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className={cn('w-full max-w-full px-6', containerClassName)}>
          <DialogHeader className="mb-4">
            <DialogTitle>{dialogTitle}</DialogTitle>
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
          </DialogHeader>
          {children}
          {dialogFooter && <DialogFooter className='mt-6'>{dialogFooter}</DialogFooter>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
