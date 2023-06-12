import { Button } from "@mui/material";
import { useState } from "react";
import DialogConfirm from "../DialogConfirm/DialogConfirm";

type UserActionsProps = {
  row: any;
  //   rowId: any;
  //   setRowId: any;
};

const UserAction: React.FC<UserActionsProps> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idTask, setIdTask] = useState<string | null>(null);
  const editTask = ({ id }: { id: string | number }) => {
    console.log(id);
  };
  const handleOpenDelete = (id: string) => {
    setOpenDelete(true);
    setIdTask(id);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Button
        color="success"
        variant="contained"
        sx={{ margin: 1 }}
        onClick={() => editTask(row)}
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
    </>
  );
};

export default UserAction;
