import {
  Box,
  Container,
  Button,
  TextField,
  CircularProgress,
  ButtonGroup,
} from "@mui/material";
import { Header } from "../../../components";
import { useEffect, useMemo, useState } from "react";
import { Task } from "../../../types/task";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { useNotification } from "../../../context/notification.context";
import moment from "moment";
import UserAction from "../../../components/UserAction/UserActions";
import { useTask } from "../../../hooks/useTask";

const TodoPage = () => {
  const [active, setActive] = useState(true);
  const [name, setName] = useState("");
  const { getError, getSuccess } = useNotification();
  const { tasks, submitTask, deleteAll, deleTaskSelected } = useTask();
  const [loading, setLoading] = useState(false);
  const [ids, setIds] = useState<any>([]);
  // const [taskList, setTaskList] = useState<any>([]);

  const columns = [
      { field: "id", headerName: "Id", width: 220 },
      { field: "name", headerName: "Name", width: 170 },
      { field: "description", headerName: "Description", width: 170 },
      {
        field: "loadDate",
        headerName: "LoadDate",
        width: 200,
        renderCell: (params: any) =>
          moment(params.row.loadDate).format("DD/MM/YYYY"),
      },
      {
        field: "taskType",
        headerName: "TaskType",
        width: 170,
        // type: "singleSelect",
        // valeOptions: ["Home", "Work", "Sport"],
        // editable: true,
      },
      {
        field: "pending?",
        headerName: "Pending",
        width: 170,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 170,
        sortable: false,
        // renderCell: ({ row }: any) => <UserAction row={row} />,
        renderCell:UserAction
      },
    ]

  const createTask = async () => {
    try {
      const taskWithName: Task = {
        name: name,
        description: "",
        loadDate: "",
        taskType: "",
        active: false,
      };
      submitTask(taskWithName);
      getSuccess("Task created successfully");
    } catch (error) {
      getError(`Failed to create task: ${error}`);
    }
  };

  const deleteAllTasks = async () => {
    try {
      deleteAll();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTasksSelected = async () => {
    try {
      deleTaskSelected(ids);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectionModelChange = (selectionModel: GridRowId[]) => {
    const selectedIDs = selectionModel.map((id) => id.toString());
    setIds(selectedIDs);
  };

  return (
    <>
      <Box>
        <Container maxWidth="xl" sx={{ mt: 9 }}>
          <Header
            title="To do list"
            description="Add new Task"
            element={
              <div>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  value={name}
                  label="New ToDo"
                  variant="outlined"
                  onChange={(e) => {
                    e.preventDefault();
                    if (e.target.value.length > 0) {
                      setActive(false);
                    } else {
                      setActive(true);
                    }
                    setName(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  disabled={active}
                  onClick={() => createTask()}
                >
                  add new Task
                </Button>
              </div>
            }
          />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <div style={{ height: 400, width: "100%", textAlign: "center" }}>
                <DataGrid
                  columns={columns}
                  rows={tasks}
                  getRowId={(row) => row.id}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                  })}
                  pageSizeOptions={[5, 10, 20]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={handleSelectionModelChange}
                />
              </div>
              <ButtonGroup
                fullWidth
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                sx={{ mr: 3, py: 2 }}
              >
                <Button fullWidth onClick={deleteTasksSelected}>
                  Delete done Tasks
                </Button>
                <Button fullWidth onClick={deleteAllTasks}>
                  Delete All Tasks
                </Button>
              </ButtonGroup>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default TodoPage;
