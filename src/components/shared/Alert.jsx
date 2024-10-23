import React, { useEffect, useState } from 'react';
import { Portal } from '@radix-ui/react-portal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Alert({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete your data from our servers.',
  onCancel,
  onContinue,
  children,
}) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const handleCancel = () => {
    setResult('cancel');
    closeDialog();
    if (onCancel) onCancel();
  };

  const handleContinue = () => {
    setResult('continue');
    closeDialog();
    if (onContinue) onContinue();
  };

  useEffect(() => {
    if (!open) {
      const timeoutId = setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [open]);

  return (
    <>
      <Portal>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Portal>
      {typeof children === 'function' ? children(openDialog, result) : children}
    </>
  );
}
