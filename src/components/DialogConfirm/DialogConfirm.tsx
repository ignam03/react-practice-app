import { useNotification } from "../../context/notification.context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useTask } from "../../hooks/useTask";

type Props = {
  open: boolean;
  handleClose: () => void;
  idTask: string | null;
};

const DialogConfirm = ({ open, handleClose, idTask }: Props) => {
  const { getError, getSuccess } = useNotification();
  const { deleteTaskList } = useTask();

  const deleteTaskId = () => {
    try {
      deleteTaskList(idTask);
      getSuccess("Task Deleted");
    } catch (error) {
      getError("Error deleting task");
    }
  };

  return (
    <div>
      <Button variant="outlined">Delete Task</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Desea eliminar la tarea?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Desea eliminar la tarea?
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                deleteTaskId();
              }}
              disableElevation
              autoFocus
            >
              Delete
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogConfirm;
