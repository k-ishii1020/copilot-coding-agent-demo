import { CreateTodoInput, TodoItem } from './types.js';
import { loadTodos, saveTodos } from './storage.js';

/**
 * UUID 風 ID 生成（簡易）
 */
function generateId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11);
}

/**
 * Todo を新規作成
 */
export function createTodo(input: CreateTodoInput): TodoItem {
  const now = new Date().toISOString();
  const todo: TodoItem = {
    id: generateId(),
    title: input.title.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now
  };
  const todos = loadTodos();
  todos.push(todo);
  saveTodos(todos);
  return todo;
}

/** 完了フラグをトグル */
export function toggleTodo(id: string): TodoItem | undefined {
  const todos = loadTodos();
  const target = todos.find((t: TodoItem) => t.id === id);
  if (!target) return undefined;
  target.completed = !target.completed;
  target.updatedAt = new Date().toISOString();
  saveTodos(todos);
  return target;
}

/** 削除 */
export function deleteTodo(id: string): boolean {
  const todos = loadTodos();
  const index = todos.findIndex((t: TodoItem) => t.id === id);
  if (index === -1) return false;
  todos.splice(index, 1);
  saveTodos(todos);
  return true;
}

/** 全取得 */
export function listTodos(): TodoItem[] {
  return loadTodos();
}
