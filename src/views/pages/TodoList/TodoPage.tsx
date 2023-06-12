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
import useApiService from "../../../api/useApiService";
import { DataGrid } from "@mui/x-data-grid";
import { useNotification } from "../../../context/notification.context";
import moment from "moment";
import UserAction from "../../../components/UserAction/UserActions";

const TodoPage = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any>([]);
  const [name, setName] = useState("");
  const { getError, getSuccess } = useNotification();
  const { fetchTasks, createNewTask } = useApiService();

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then((task) => {
        setTasks(task);
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const createTask = async () => {
    const taskWithName: Task = {
      name: name,
      description: "",
      loadDate: "",
      taskType: "",
      active: false,
    };
    await createNewTask(taskWithName)
      .then((t) => {
        setTasks([...tasks, t]);
        getSuccess("Task Created");
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error: any) => {
        getError("Error: " + error);
      });
  };

  const columns = useMemo(
    () => [
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
        type: "singleSelect",
        valeOptions: ["Home", "Work", "Sport"],
        editable: true,
      },
      {
        field: "active",
        headerName: "Active",
        width: 170,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 170,
        sortable: false,
        renderCell: ({ row }: { row: any }) => <UserAction row={row} />,
      },
    ],
    []
  );

  return (
    <>
      <Box>
        <Container maxWidth="xl" sx={{ mt: 9 }}>
          <Header
            title="To do list"
            description="Add new Task"
            element={
              <>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="New ToDo"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  disabled={false}
                  onClick={() => createTask()}
                >
                  add new Task
                </Button>
              </>
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
                />
              </div>
              <ButtonGroup
                fullWidth
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                sx={{ mr: 3, py: 2 }}
              >
                <Button fullWidth>Delete done Tasks</Button>
                <Button fullWidth>Delete All Tasks</Button>
              </ButtonGroup>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default TodoPage;
