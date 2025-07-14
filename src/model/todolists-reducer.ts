import type { Todolist } from "../App";
import { v1 } from "uuid";

const initialState: Todolist[] = [
  { id: "todolistId1", title: "What to learn", filter: "all" },
  { id: "todolistId2", title: "What to buy", filter: "all" },
];

type FilterValues = "all" | "active" | "completed";

export const todolistsReducer = (
  state: Todolist[] = initialState,
  action: Actions
): Todolist[] => {
  switch (action.type) {
    case "delete_todolist": {
      return state.filter(
        (todolist) => todolist.id !== action.payload.todolistId
      );
    }
    case "create_todolist": {
      return [
        ...state,
        {
          id: action.payload.todolistId,
          title: action.payload.title,
          filter: "all",
        },
      ];
    }
    case "change_todolist_title": {
      return state.map((todolist) =>
        todolist.id === action.payload.todolistId
          ? { ...todolist, title: action.payload.title }
          : todolist
      );
    }
    case "change_todolist_filter": {
      return state.map((todolist) =>
        todolist.id === action.payload.todolistId
          ? { ...todolist, filter: action.payload.filter }
          : todolist
      );
    }
  }
};

export const deleteTodolistAC = (todolistId: string) => {
  return { type: "delete_todolist", payload: { todolistId } } as const;
};
export const createTodolistAC = (title: string) => {
  const todolistId = v1();
  return { type: "create_todolist", payload: { todolistId, title } } as const;
};
export const changeTodolistTitleAC = (payload: {
  todolistId: string;
  title: string;
}) => {
  return { type: "change_todolist_title", payload } as const;
};
export const changeTodolistFilterAC = (payload: {
  todolistId: string;
  filter: FilterValues;
}) => {
  return { type: "change_todolist_filter", payload } as const;
};

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitleAction = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeTodolistFilterAction = ReturnType<
  typeof changeTodolistFilterAC
>;

type Actions =
  | DeleteTodolistAction
  | CreateTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction;
