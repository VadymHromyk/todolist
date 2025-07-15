import { useReducer, useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { CreateItemForm } from "./CreateItemForm";
import { containerSx } from "./TodolistItem.styles";
import { NavButton } from "./NavButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "./model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC,
  tasksReducer,
} from "./model/tasks-reducer";

type FilterValues = "all" | "active" | "completed";

type ThemeMode = "dark" | "light";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = {
  [key: string]: Task[];
};
// export type Tasks = Record<string, Task[]>

const startStateTodolists: Todolist[] = [
  { id: "todolistId1", title: "What to learn", filter: "all" },
  { id: "todolistId2", title: "What to buy", filter: "all" },
];

const startStateTasks: TasksState = {
  todolistId1: [
    { id: "1", title: "CSS", isDone: false },
    { id: "2", title: "JS", isDone: true },
    { id: "3", title: "React", isDone: false },
  ],
  todolistId2: [
    { id: "1", title: "bread", isDone: false },
    { id: "2", title: "milk", isDone: true },
    { id: "3", title: "tea", isDone: false },
  ],
};

export const App = () => {
  const [todolists, dispatchToTodolists] = useReducer(
    todolistsReducer,
    startStateTodolists
  );
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, startStateTasks);

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatchToTasks(deleteTaskAC({ todolistId, taskId }));
  };
  const createTask = (todolistId: string, title: string) => {
    dispatchToTasks(createTaskAC({ todolistId, title }));
  };
  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatchToTasks(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };
  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatchToTasks(changeTaskTitleAC({ todolistId, taskId, title }));
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatchToTodolists(changeTodolistFilterAC({ todolistId, filter }));
  };
  const deleteTodolist = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };
  const createTodolistHandler = (title: string) => {
    const action = createTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC({ todolistId, title }));
  };

  const changeMode = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light");
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "#087EA4",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: "30px" }}>
        <Toolbar>
          <Container maxWidth={"lg"} sx={containerSx}>
            <IconButton color="inherit" edge="start">
              <MenuIcon />
            </IconButton>
            <div>
              <NavButton color="inherit">Login</NavButton>
              <NavButton color="inherit">Logout</NavButton>
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch color={"default"} onChange={changeMode} />
            </div>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth={"lg"}>
        <Grid container sx={{ mb: "30px" }}>
          <CreateItemForm onCreateItem={createTodolistHandler} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map((todolist) => {
            const getFilteredTasks = () => {
              switch (todolist.filter) {
                case "active":
                  return tasks[todolist.id].filter((task) => !task.isDone);
                case "completed":
                  return tasks[todolist.id].filter((task) => task.isDone);
                default:
                  return tasks[todolist.id];
              }
            };
            return (
              <Grid key={todolist.id}>
                <Paper elevation={3} sx={{ p: "10px 20px 20px 20px" }}>
                  <TodolistItem
                    todolist={todolist}
                    tasks={getFilteredTasks()}
                    deleteTask={deleteTask}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    deleteTodolist={deleteTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};
