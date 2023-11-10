import { Button, IconButton, Snackbar } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function AlertSnackbar(props: { message: string }) {
  const [open, setOpen] = useState(false);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={props.message} action={action} />
    </div>
  );
}

export const Status = (props: { success: boolean; loading: boolean; error: string | null }) => {
  return (
    <div className="status">
      {props.loading && <AlertSnackbar message="Loading..." />}
      {props.error && <AlertSnackbar message="Error! Please try again later." />}
      {props.success && <AlertSnackbar message="Success!" />}
      {props.loading && !props.error && !props.success && <div></div>}
    </div>
  );
};
