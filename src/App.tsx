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
import { v1 } from "uuid";

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

export type Tasks = {
  [key: string]: Task[];
};
// export type Tasks = Record<string, Task[]>

export const App = () => {
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);

  const [tasks, setTasks] = useState<Tasks>({});

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const deleteTask = (todolistId: string, taskId: string) => {
    const todolistTasks = tasks[todolistId];
    const newTodolistTasks = todolistTasks.filter((task) => task.id !== taskId);
    setTasks({ ...tasks, [todolistId]: newTodolistTasks });
  };

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    const newTodolistTasks = tasks[todolistId].map((task) =>
      task.id === taskId ? { ...task, isDone } : task
    );
    setTasks({ ...tasks, [todolistId]: newTodolistTasks });
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, title } : t
      ),
    });
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatchToTodolists(changeTodolistFilterAC({ todolistId, filter }));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatchToTodolists(deleteTodolistAC(todolistId));
  };

  const createTodolistHandler = (title: string) => {
    const action = createTodolistAC(title);
    dispatchToTodolists(action);
    setTasks({ ...tasks, [action.payload.todolistId]: [] });
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
