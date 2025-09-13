import { createTodo, deleteTodo, listTodos, toggleTodo } from './todoService.js';
import { saveTodos } from './storage.js';
import type { TodoItem } from './types.js';

// DOM 要素取得は DOMContentLoaded 後でも安全だが、モジュール先頭で取得しても index.html 下部読み込みのため現状問題はない。
// 念のため存在チェックを含めた初期化関数を用意。
const form = document.getElementById('todo-form') as HTMLFormElement | null;
const input = document.getElementById('todo-input') as HTMLInputElement | null;
const listEl = document.getElementById('todo-list') as HTMLUListElement | null;
const emptyMessage = document.getElementById('empty-message') as HTMLParagraphElement | null;
const toolbar = document.querySelector('.toolbar');
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.filter-btn'));
const clearCompletedBtn = document.getElementById('clear-completed') as HTMLButtonElement | null;

type Filter = 'all' | 'active' | 'completed';
let currentFilter: Filter = 'all';

function render(): void {
  let todos = listTodos();
  switch (currentFilter) {
    case 'active':
      todos = todos.filter(t => !t.completed);
      break;
    case 'completed':
      todos = todos.filter(t => t.completed);
      break;
    default:
      break;
  }
  if (!listEl || !emptyMessage) return;
  listEl.innerHTML = '';
  emptyMessage.style.display = todos.length === 0 ? 'block' : 'none';
  for (const t of todos) listEl.appendChild(renderItem(t));
}

function renderItem(todo: TodoItem): HTMLLIElement {
  const li = document.createElement('li');
  li.dataset.id = todo.id;
  if (todo.completed) li.classList.add('completed');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    render();
  });

  const span = document.createElement('span');
  span.className = 'title';
  span.textContent = todo.title;

  const delBtn = document.createElement('button');
  delBtn.textContent = '削除';
  delBtn.className = 'delete-btn';
  delBtn.addEventListener('click', () => {
    deleteTodo(todo.id);
    render();
  });

  li.append(checkbox, span, delBtn);
  return li;
}

function init() {
  if (!form || !input) return;
  // フィルタボタン
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter as Filter;
      filterButtons.forEach(b => b.classList.toggle('active', b === btn));
      render();
    });
  });
  // 完了済み一括削除
  clearCompletedBtn?.addEventListener('click', () => {
    const todos = listTodos();
    const active = todos.filter(t => !t.completed);
    saveTodos(active as TodoItem[]);
    render();
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;
    createTodo({ title });
    input.value = '';
    render();
  });
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
