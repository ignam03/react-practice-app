import { Button } from "@mui/material";
import { useState } from "react";
import DialogConfirm from "../DialogConfirm/DialogConfirm";
import TaskForm from "../TaskForm/TaskForm";

type UserActionsProps = {
  row: any;
};

const UserAction: React.FC<UserActionsProps> = ({ row }) => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idTask, setIdTask] = useState<string | null>(null);
  const handleOpenEdit = ({ id }: { id: string | null }) => {
    setOpenEdit(true);
    setIdTask(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = (id: string) => {
    setOpenDelete(true);
    setIdTask(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  console.log("user action");

  return (
    <>
      <Button
        color="success"
        variant="contained"
        sx={{ margin: 1 }}
        onClick={(e: any) => handleOpenEdit(row)}
      >
        Edit
      </Button>
      <Button
        sx={{ margin: 1 }}
        color="error"
        variant="contained"
        onClick={() => handleOpenDelete(row.id)}
      >
        Delete
      </Button>
      <DialogConfirm
        open={openDelete}
        idTask={idTask}
        handleClose={handleCloseDelete}
      />
      <TaskForm open={openEdit} handleClose={handleCloseEdit} idTask={idTask} />
    </>
  );
};

export default UserAction;
