import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ConfirmationBoxProps {
  openDeleteModal: boolean;
  setOpenDeleteModal: (open: boolean) => void;
  handleDeleteBook: () => void;
}

export default function ConfirmationBox({
  openDeleteModal,
  setOpenDeleteModal,
  handleDeleteBook
}: ConfirmationBoxProps) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleConfirm = () => {
    handleDeleteBook();
    setOpenDeleteModal(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDeleteModal}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Confirm Deletion
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this book? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" onClick={handleConfirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
