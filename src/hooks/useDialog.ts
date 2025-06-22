import { useState } from 'react';

export interface IUseDialogReturn {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export default function useDialog(): IUseDialogReturn {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return {
    isOpen,
    openDialog,
    closeDialog
  };
}
