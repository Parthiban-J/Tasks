import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

type SnackbarMessageProps = {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  handleClose: () => void;
};

const SnackbarMessage: React.FC<SnackbarMessageProps> = (props) => {
  const { open, message, severity, handleClose } = props;

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarMessage;