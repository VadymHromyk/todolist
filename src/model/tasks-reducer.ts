import { v1 } from "uuid";
import type { TasksState } from "../App";
import {
  CreateTodolistAction,
  DeleteTodolistAction,
} from "./todolists-reducer";

const initialState: TasksState = {};

export const tasksReducer = (
  state: TasksState = initialState,
  action: Actions
): TasksState => {
  switch (action.type) {
    case "create_todolist": {
      return {
        ...state,
        [action.payload.todolistId]: [],
      };
    }
    case "delete_todolist": {
      const newState = { ...state };
      delete newState[action.payload.todolistId];
      return newState;
    }
    case "delete_task": {
      const newTasks = state[action.payload.todolistId].filter(
        (t) => t.id !== action.payload.taskId
      );
      return { ...state, [action.payload.todolistId]: newTasks };
    }
    case "create_task": {
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      return {
        ...state,
        [action.payload.todolistId]: [
          newTask,
          ...state[action.payload.todolistId],
        ],
      };
    }
    case "change_task_status": {
      const newTasks = state[action.payload.todolistId].map((t) =>
        t.id === action.payload.taskId
          ? { ...t, isDone: action.payload.isDone }
          : t
      );
      return {
        ...state,
        [action.payload.todolistId]: newTasks,
      };
    }
    case "change_task_title": {
      const newTasks = state[action.payload.todolistId].map((t) =>
        t.id === action.payload.taskId
          ? { ...t, title: action.payload.title }
          : t
      );
      return {
        ...state,
        [action.payload.todolistId]: newTasks,
      };
    }
    default:
      return state;
  }
};

export const deleteTaskAC = (payload: {
  todolistId: string;
  taskId: string;
}) => {
  return { type: "delete_task", payload } as const;
};
export const createTaskAC = (payload: {
  todolistId: string;
  title: string;
}) => {
  return { type: "create_task", payload } as const;
};
export const changeTaskStatusAC = (payload: {
  todolistId: string;
  taskId: string;
  isDone: boolean;
}) => {
  return { type: "change_task_status", payload } as const;
};
export const changeTaskTitleAC = (payload: {
  todolistId: string;
  taskId: string;
  title: string;
}) => {
  return { type: "change_task_title", payload } as const;
};

export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>;
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>;

type Actions =
  | CreateTodolistAction
  | DeleteTodolistAction
  | DeleteTaskAction
  | CreateTaskAction
  | ChangeTaskStatusAction
  | ChangeTaskTitleAction;
