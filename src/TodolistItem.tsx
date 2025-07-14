import { ChangeEvent } from "react";
import { Task, Todolist } from "./App";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";
import { containerSx } from "./TodolistItem.styles";
import { getListItemSx } from "./TodolistItem.styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

type FilterValues = "all" | "active" | "completed";

type Props = {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export const TodolistItem = ({
  todolist: { id, title, filter },
  tasks,
  deleteTask,
  createTask,
  changeTaskStatus,
  changeTaskTitle,
  changeFilter,
  deleteTodolist,
  changeTodolistTitle,
}: Props) => {
  const changeFilterHandler = (id: string, filter: FilterValues) => {
    changeFilter(id, filter);
  };

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  const createTaskHandler = (title: string) => {
    createTask(id, title);
  };

  const changeTaskTitleHandler = (taskId: string, title: string) => {
    changeTaskTitle(id, taskId, title);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(id, title);
  };

  const onAllClickHandler = () => changeFilterHandler(id, "all");
  const onActiveClickHandler = () => changeFilterHandler(id, "active");
  const onCompletedClickHandler = () => changeFilterHandler(id, "completed");

  const listItems = tasks.map((task) => {
    const deleteTaskHandler = () => deleteTask(id, task.id);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked;
      changeTaskStatus(id, task.id, newStatusValue);
    };
    return (
      <ListItem
        key={task.id}
        sx={getListItemSx(task.isDone)}
      >
        <div>
          <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
          <EditableSpan
            value={task.title}
            onChange={(title) => changeTaskTitleHandler(task.id, title)}
          />
        </div>
        <IconButton onClick={deleteTaskHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  const tasksList = tasks.length ? (
    <List>{listItems}</List>
  ) : (
    <span>Your tasks list is empty!</span>
  );

  return (
    <div className="TodolistItemMain">
      <Box sx={{ display: "flex" }}>
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <IconButton onClick={deleteTodolistHandler} size={"small"}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <CreateItemForm onCreateItem={createTaskHandler} />
      {tasksList}
      <Box sx={containerSx}>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          color={"inherit"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "text"}
          color={"primary"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          color={"secondary"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
