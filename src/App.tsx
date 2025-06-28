import { useState } from "react";
import "./App.css";
import { TodolistItem } from "./TodolistItem";
import { v1 } from "uuid";
import { CreateItemForm } from "./CreateItemForm";

type FilterValues = "all" | "active" | "completed";

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

  return (
    <div className="app">
      <CreateItemForm onCreateItem={createTodolistHandler} />
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
          <TodolistItem
            key={todolist.id}
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
        );
      })}
    </div>
  );
};
