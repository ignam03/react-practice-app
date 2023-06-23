import { useFormik } from "formik";
import { Task } from "../../types/task";
import { useNotification } from "../../context/notification.context";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { TaskValidate } from "../../utils/validateForm";
import useApiService from "../../api/useApiService";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../hooks/useTask";

type Props = {
  open: boolean;
  handleClose: () => void;
  idTask: string | null;
};

const TypeTask = [
  {
    id: "HOME",
    name: "HOME",
  },
  {
    id: "WORK",
    name: "HOME",
  },
  {
    id: "HOME",
    name: "SPORT",
  },
];
const TaskForm = ({ open, handleClose, idTask }: Props) => {
  const { getError, getSuccess } = useNotification();
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { createNewTask } = useApiService();
  const { fetchTaskById } = useTask();

  const taskEdit = () => {
    const task = fetchTaskById(idTask);
    setTaskData(task);
    setLoading(true);
    console.log(setTaskData);
  };

  const formik = useFormik<Task>({
    initialValues: {
      name: "",
      description: "",
      loadDate: "",
      taskType: "",
      active: false,
    },
    validationSchema: TaskValidate,
    onSubmit: (values: Task) => {
      createNewTask(values)
        .then((t) => {
          getSuccess("Task Created");
          setTimeout(() => setLoading(false), 500);
          navigate("/to-do-list");
        })
        .catch((error: any) => {
          getError("Error: " + error);
        });
    },
  });

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Container maxWidth="sm">
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: "100vh" }}
            >
              <Grid item>
                <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                  <Button onClick={handleClose}>
                    <CloseIcon></CloseIcon>
                  </Button>
                  <Typography
                    variant="h4"
                    sx={{ mt: 1, mb: 1, textAlign: "center" }}
                  >
                    Edit Task
                  </Typography>
                  <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                      name="name"
                      margin="normal"
                      fullWidth
                      type="text"
                      label="task Name"
                      sx={{ mt: 2, mb: 1.5 }}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                      name="description"
                      margin="normal"
                      fullWidth
                      type="text"
                      label="description"
                      sx={{ mt: 1.5, mb: 2.5 }}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                    <TextField
                      name="loadDate"
                      margin="normal"
                      fullWidth
                      type="date"
                      sx={{ mt: 1.5, mb: 2.5 }}
                      value={formik.values.loadDate}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.loadDate &&
                        Boolean(formik.errors.loadDate)
                      }
                      helperText={
                        formik.touched.loadDate && formik.errors.loadDate
                      }
                    />
                    <FormControl fullWidth>
                      <InputLabel id="taskType">Type Task</InputLabel>
                      <Select
                        labelId="taskType"
                        name="taskType"
                        id="taskType"
                        label="Type Task"
                        value={formik.values.taskType}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={"HOME"}>Home</MenuItem>
                        <MenuItem value={"WORK"}>Work</MenuItem>
                        <MenuItem value={"SPORT"}>Sport</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{ mt: 1.5, mb: 3 }}
                    >
                      Save changes
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </Modal>
    </div>
  );
};

export default TaskForm;
