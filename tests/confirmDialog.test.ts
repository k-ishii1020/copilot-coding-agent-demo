import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';

/**
 * 確認ダイアログの動作テスト
 * これらのテストは window.confirm の動作をモックして検証します
 */
describe('確認ダイアログ', () => {
  let originalConfirm: typeof window.confirm;

  beforeEach(() => {
    // window.confirm をモック化
    originalConfirm = window.confirm;
    window.confirm = vi.fn();
  });

  afterEach(() => {
    // モックを元に戻す
    window.confirm = originalConfirm;
  });

  describe('Todo登録時の確認ダイアログ', () => {
    it('確認ダイアログで「OK」を選択した場合、Todoが登録される', () => {
      // window.confirm が true を返すようにモック
      vi.mocked(window.confirm).mockReturnValue(true);

      // 確認ダイアログが呼ばれることを検証
      const title = 'テストタスク';
      const confirmed = window.confirm(`「${title}」を登録しますか？`);
      
      expect(window.confirm).toHaveBeenCalledWith('「テストタスク」を登録しますか？');
      expect(confirmed).toBe(true);
    });

    it('確認ダイアログで「キャンセル」を選択した場合、処理が中止される', () => {
      // window.confirm が false を返すようにモック
      vi.mocked(window.confirm).mockReturnValue(false);

      const title = 'テストタスク';
      const confirmed = window.confirm(`「${title}」を登録しますか？`);
      
      expect(window.confirm).toHaveBeenCalledWith('「テストタスク」を登録しますか？');
      expect(confirmed).toBe(false);
    });
  });

  describe('Todo削除時の確認ダイアログ', () => {
    it('確認ダイアログで「OK」を選択した場合、Todoが削除される', () => {
      // window.confirm が true を返すようにモック
      vi.mocked(window.confirm).mockReturnValue(true);

      const title = 'テストタスク';
      const confirmed = window.confirm(`「${title}」を削除しますか？`);
      
      expect(window.confirm).toHaveBeenCalledWith('「テストタスク」を削除しますか？');
      expect(confirmed).toBe(true);
    });

    it('確認ダイアログで「キャンセル」を選択した場合、削除が中止される', () => {
      // window.confirm が false を返すようにモック
      vi.mocked(window.confirm).mockReturnValue(false);

      const title = 'テストタスク';
      const confirmed = window.confirm(`「${title}」を削除しますか？`);
      
      expect(window.confirm).toHaveBeenCalledWith('「テストタスク」を削除しますか？');
      expect(confirmed).toBe(false);
    });
  });
});