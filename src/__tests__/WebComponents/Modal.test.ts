import { screen, getRoles, within, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '../../components/webcomponents/Modal';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const getShadowRootAsHtmlElement = () => document.querySelector('my-modal')!.shadowRoot! as unknown as HTMLElement;
const getShadowRoot = () => document.querySelector('my-modal')!.shadowRoot!;
/* eslint-enable @typescript-eslint/no-non-null-assertion */

describe('機能', () => {
  beforeEach(() => (document.body.innerHTML = ''));

  test('マウントすると自動的に「aria-modal=true」と「role=dialog」が付与される', () => {
    document.body.innerHTML = '<my-modal></my-modal>';
    expect(document.querySelector('my-modal')?.getAttribute('aria-modal')).toEqual('true');
    expect(getRoles(document.body)).toHaveProperty('dialog');
  });

  test('「aria-label=モーダルタイトルです」を付与すると、モーダルのタイトルが「モーダルタイトルです」になる', () => {
    document.body.innerHTML = '<my-modal aria-label=モーダルタイトルです></my-modal>';
    const container = getShadowRootAsHtmlElement();
    expect(within(container).getByRole('heading', { name: 'モーダルタイトルです' })).toBeInTheDocument();
  });

  test('子要素がコンテンツとして表示される', () => {
    document.body.innerHTML = '<my-modal>子要素</my-modal>';
    expect(screen.getByText('子要素')).toBeInTheDocument();
  });

  test('opened属性を付与するとモーダルが表示される', () => {
    let container: ShadowRoot;

    document.body.innerHTML = '<my-modal></my-modal>';
    container = getShadowRoot();
    expect(container.querySelector('.ModalDialog')).not.toHaveClass('ModalDialog-opened');

    document.body.innerHTML = '<my-modal opened></my-modal>';
    container = getShadowRoot();
    expect(container.querySelector('.ModalDialog')).toHaveClass('ModalDialog-opened');
  });

  test('✖️ボタンをクリックするとモーダルが閉じる', async () => {
    document.body.innerHTML = '<my-modal opened></my-modal>';
    const container = getShadowRootAsHtmlElement();

    userEvent.click(within(container).getByRole('button', { name: '閉じる' }));
    await waitFor(() => {
      expect(container.querySelector('.ModalDialog')).not.toHaveClass('ModalDialog-opened');
    });
  });

  test('モーダル外の背景（バックドロップ）をクリックするとモーダルが閉じる', async () => {
    document.body.innerHTML = '<my-modal opened></my-modal>';
    const container = getShadowRoot();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    userEvent.click(container.querySelector('.ModalDialog_backdrop')!);
    await waitFor(() => {
      expect(container.querySelector('.ModalDialog')).not.toHaveClass('ModalDialog-opened');
    });
  });

  test('キーボードのESCキーを押下するとモーダルが閉じる', async () => {
    document.body.innerHTML = '<my-modal opened></my-modal>';
    const container = getShadowRoot();

    userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(container.querySelector('.ModalDialog')).not.toHaveClass('ModalDialog-opened');
    });
  });

  test('モーダルが閉じても「aria-label=タイトル」属性と、モーダルタイトルはDOMに残る', async () => {
    document.body.innerHTML = '<my-modal aria-label=タイトル opened></my-modal>';
    const container = getShadowRoot();
    const sRHtmlContainer = getShadowRootAsHtmlElement();

    userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(container.querySelector('.ModalDialog')).not.toHaveClass('ModalDialog-opened');
    });

    expect(document.querySelector('my-modal')).toHaveAttribute('aria-label');
    expect(within(sRHtmlContainer).queryByText('タイトル')).toBeInTheDocument();
  });

  test('static属性が無いモーダルが閉じるとコンテンツが空になる', async () => {
    document.body.innerHTML = '<my-modal opened>コンテンツ</my-modal>';
    const container = getShadowRoot();

    userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(container.querySelector('.ModalDialog')).not.toHaveClass('ModalDialog-opened');
    });

    expect(screen.queryByText('コンテンツ')).not.toBeInTheDocument();
  });

  test('static属性が有るモーダルが閉じるとコンテンツはDOMに残る', async () => {
    document.body.innerHTML = '<my-modal opened static>コンテンツ</my-modal>';
    const container = getShadowRoot();

    userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(container.querySelector('.ModalDialog')).not.toHaveClass('ModalDialog-opened');
    });

    expect(screen.getByText('コンテンツ')).toBeInTheDocument();
  });

  test('モーダルを開くと✖️ボタンがフォーカスされている', () => {
    document.body.innerHTML = '<my-modal opened></my-modal>';
    const container = getShadowRoot();

    expect(container.activeElement).toBe(container.querySelector('[aria-label="閉じる"]'));
  });

  test('キーボードのTabキーを押下すると、モーダル内の次のtabbableなエレメントがフォーカスされる', async () => {
    document.body.innerHTML = '<my-modal opened aria-label=モーダル><button>ボタン</button></my-modal>';

    // todo
    // 本来は1回目のタブ移動でモーダル内のエレメントにフォーカスが当たるのだが、テスト環境だとmy-modalにフォーカスが当たってしまう
    // タブキー押下によるフォーカス移動は一応テストできているが調査・修正したい
    userEvent.tab();
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: 'モーダル' })).toHaveFocus();
    });

    userEvent.tab();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'ボタン' })).toHaveFocus();
    });
  });

  test('キーボードのTabキーとShiftキーを同時に押下すると、モーダル内の前のtabbableなエレメントがフォーカスされる', async () => {
    document.body.innerHTML = `
      <my-modal opened>
        <div>
          <label>ラベル<input></label>
        </div>
        <button>ボタン</button>
      </my-modal>
    `;

    userEvent.tab();

    userEvent.tab();
    await waitFor(() => {
      expect(screen.getByLabelText('ラベル')).toHaveFocus();
    });

    userEvent.tab();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'ボタン' })).toHaveFocus();
    });

    userEvent.tab({ shift: true });
    await waitFor(() => {
      expect(screen.getByLabelText('ラベル')).toHaveFocus();
    });
  });
  // タブ移動によりshadowDOM.activeElementが変更されることはテスト環境でも確認できているが
  // 想定外な動作（タブ押下に対してフォーカスの移動が大幅に遅れている）をしているため要調査
  test.todo(
    'モーダル内の最後（最下部）のtabbableなエレメントがフォーカスされている時に、キーボードのTabキーを押下すると、✖️ボタンにフォーカスが戻る'
  );
  test.todo(
    '✖️ボタンがフォーカスされている時に、TabキーとShiftキーを同時に押下すると、モーダル内の最後（最下部）のtabbableなエレメントがフォーカスされる'
  );
});
