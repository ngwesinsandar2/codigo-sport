import DialogLayout from '@/components/shared/dialogs/DialogLayout';
import { IUseDialogReturn } from '@/hooks/useDialog';
import { Button } from '../../ui/button';

interface IConfirmDialogProps {
  dialog: IUseDialogReturn;
  handleConfirm: () => void;
  confirmContent?: {
    description: string;
    title: string;
    actionButtonText?: string;
  };
}

export default function ConfirmDialog({
  dialog,
  handleConfirm,
  confirmContent
}: IConfirmDialogProps) {
  return (
    <DialogLayout
      dialog={dialog}
      dialogTitle={confirmContent?.title || ''}
      customOpenChangeFunc={() => {
        dialog.closeDialog();
      }}
      dialogFooter={
        <div className="flex gap-2 items-center">
          <Button
            variant={'ghost'}
            onClick={dialog.closeDialog}
          >
            Cancel
          </Button>
          <Button
            variant={'destructive'}
            onClick={handleConfirm}
          >
            {confirmContent?.actionButtonText || 'Delete'}
          </Button>
        </div>
      }
    >
      <p>{confirmContent?.description}</p>
    </DialogLayout>
  );
}
