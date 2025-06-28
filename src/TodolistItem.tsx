import { ChangeEvent } from "react";
import { Task, Todolist } from "./App";
import { Button } from "./Button";
import "./TodolistItem.css";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";

type FilterValues = "all" | "active" | "completed";

type Props = {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  deleteAllTasks: (todolistId: string) => void;
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
  deleteAllTasks,
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

  const deleteAllTasksHandler = () => {
    deleteAllTasks(id);
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
      <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <input
          name={"inputTaskChekbox"}
          type="checkbox"
          checked={task.isDone}
          onChange={changeTaskStatusHandler}
        />
        <EditableSpan
          value={task.title}
          onChange={(title) => changeTaskTitleHandler(task.id, title)}
        />
        <Button title="X" onClick={deleteTaskHandler} />
      </li>
    );
  });

  const tasksList = tasks.length ? (
    <ul>{listItems}</ul>
  ) : (
    <span>Your tasks list is empty</span>
  );

  return (
    <div className="TodolistItemMain">
      <div className="container">
        <h3>
          <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        </h3>
        <Button title="X" onClick={deleteTodolistHandler} />
      </div>
      <CreateItemForm onCreateItem={createTaskHandler} />
      {tasksList}
      <div>
        <Button
          title="All"
          onClick={onAllClickHandler}
          className={filter === "all" ? "active-filter" : ""}
        />
        <Button
          title="Active"
          onClick={onActiveClickHandler}
          className={filter === "active" ? "active-filter" : ""}
        />
        <Button
          title="Completed"
          onClick={onCompletedClickHandler}
          className={filter === "completed" ? "active-filter" : ""}
        />
      </div>
      <div>
        <Button title="Delete all" onClick={deleteAllTasksHandler} />
      </div>
    </div>
  );
};
