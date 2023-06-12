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
} from "@mui/material";
import { useState } from "react";
import { TaskValidate } from "../../utils/validateForm";
import useApiService from "../../api/useApiService";
import { useNavigate } from "react-router-dom";

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
const TaskForm = () => {
  const { getError, getSuccess } = useNotification();
  // const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { createNewTask } = useApiService();

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
            <Typography variant="h4" sx={{ mt: 1, mb: 1, textAlign: "center" }}>
              Create New Task
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
                  formik.touched.loadDate && Boolean(formik.errors.loadDate)
                }
                helperText={formik.touched.loadDate && formik.errors.loadDate}
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
                Create Task
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskForm;
