import {v1} from "uuid"
import { expect, test } from "vitest"
import type {Todolist} from "../App"
import {deleteTodolistAC, todolistsReducer} from "./todolists-reducer"
 
test("correct todolist should be deleted", () => {
  const todolistId1 = v1()
  const todolistId2 = v1()
 
  const startState: Todolist[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]
    
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))
 
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})
