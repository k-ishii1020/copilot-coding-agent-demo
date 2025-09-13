/**
 * Todo を表す型定義
 */
export interface TodoItem {
  id: string; // UUID 形式
  title: string; // タスク名
  completed: boolean; // 完了フラグ
  createdAt: string; // ISO文字列
  updatedAt: string; // ISO文字列
}

export interface CreateTodoInput {
  title: string;
}
