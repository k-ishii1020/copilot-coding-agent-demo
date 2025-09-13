import { TodoItem } from './types.js';

/**
 * LocalStorage キー定義
 */
const STORAGE_KEY = 'demo_todos_v1';

/**
 * localStorage から Todo の配列を読み込む。
 * 破損している場合は空配列を返す。
 */
export function loadTodos(): TodoItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isTodoItem);
  } catch {
    return [];
  }
}

/**
 * Todo 配列を localStorage に保存
 */
export function saveTodos(todos: TodoItem[]): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

/**
 * 単純な型ガード
 */
function isTodoItem(value: any): value is TodoItem { // eslint-disable-line @typescript-eslint/no-explicit-any
  return value && typeof value === 'object' && typeof value.id === 'string';
}

/**
 * テスト用: すべて削除
 */
export function clearTodos(): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
