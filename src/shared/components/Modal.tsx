import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      className='bg-white dark:bg-gray-800 text-black dark:text-white'

    >
      <DialogTitle id="modal-title" className="text-center">
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;