import { describe, expect, it, beforeEach } from 'vitest';
import { createTodo, listTodos, toggleTodo, deleteTodo } from '../src/todoService.js';
import { clearTodos } from '../src/storage.js';

// JSDOM が提供する localStorage を利用 (Vitest はデフォルトで jsdom 環境)

describe('todoService', () => {
  beforeEach(() => {
    clearTodos();
  });

  it('新規作成後に一覧へ反映される', () => {
    createTodo({ title: 'タスクA' });
    const list = listTodos();
    expect(list.length).toBe(1);
    expect(list[0].title).toBe('タスクA');
    expect(list[0].completed).toBe(false);
  });

  it('トグルで completed が反転する', () => {
    const t = createTodo({ title: 'Toggle' });
    const before = listTodos()[0];
    expect(before.completed).toBe(false);
    toggleTodo(t.id);
    const after = listTodos()[0];
    expect(after.completed).toBe(true);
  });

  it('削除できる', () => {
    const t1 = createTodo({ title: 'A' });
    const t2 = createTodo({ title: 'B' });
    expect(listTodos().length).toBe(2);
    deleteTodo(t1.id);
    const list = listTodos();
    expect(list.length).toBe(1);
    expect(list[0].id).toBe(t2.id);
  });
});
