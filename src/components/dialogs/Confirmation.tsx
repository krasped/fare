import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

export interface DialogProps  {
  title: string;
  description: string;
  confirmTitle: string;
  cancelTitle: string;
  isOpen: boolean;
  handleConfirm: (isConfirm: boolean) => void
}

const ConfirmationDialog = (
  {title, isOpen, description, confirmTitle = "Agree", cancelTitle = "Disagree", handleConfirm}: DialogProps) => {
  
    return (
    <Dialog onClose={() => handleConfirm(false)} open={isOpen}>
              <DialogTitle>{title}</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  {description}
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button color="warning" onClick={() => handleConfirm(false)}>
                  {cancelTitle}
                </Button>

                <Button onClick={() => handleConfirm(true)} autoFocus>
                  {confirmTitle}
                </Button>
              </DialogActions>
            </Dialog>
  )
}

export default ConfirmationDialog;
