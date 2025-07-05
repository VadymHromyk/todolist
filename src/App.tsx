import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { v1 } from "uuid";
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
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<Tasks>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Git", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "milk", isDone: true },
      { id: v1(), title: "beer", isDone: false },
      { id: v1(), title: "juise", isDone: false },
    ],
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const deleteTask = (todolistId: string, taskId: string) => {
    const todolistTasks = tasks[todolistId];
    const newTodolistTasks = todolistTasks.filter((task) => task.id !== taskId);
    setTasks({ ...tasks, [todolistId]: newTodolistTasks });
  };

  const deleteAllTasks = (todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: [] });
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
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, filter } : todolist
      )
    );
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id != todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const createTodolistHandler = (title: string) => {
    const todolistId = v1();
    setTodolists([...todolists, { id: todolistId, title, filter: "all" }]);
    setTasks({ ...tasks, [todolistId]: [] });
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(
      todolists.map((t) => (t.id === todolistId ? { ...t, title } : t))
    );
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
      <div className="app">
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar>
            <Container maxWidth={"lg"} sx={containerSx}>
              <IconButton color="inherit" edge="start">
                <MenuIcon />
              </IconButton>
              <div>
                <NavButton color="inherit">Login</NavButton>
                <NavButton color="inherit">Logout</NavButton>
                <NavButton background={theme.palette.primary.dark}>
                  Faq
                </NavButton>
                <Switch color={"default"} onChange={changeMode} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>

        <Container maxWidth={"lg"}>
          <Grid container sx={{ mb: "30px" }}>
            <CreateItemForm onCreateItem={createTodolistHandler} />
          </Grid>

          <Grid container spacing={4}>
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
                  <Paper elevation={8} sx={{ p: "0 20px 20px 20px" }}>
                    <TodolistItem
                      todolist={todolist}
                      tasks={getFilteredTasks()}
                      deleteTask={deleteTask}
                      deleteAllTasks={deleteAllTasks}
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
      </div>
    </ThemeProvider>
  );
};
