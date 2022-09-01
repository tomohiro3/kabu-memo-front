// TODO
// emotionとReactのバージョンを上げてから、css propsでバグが発生しているので調査

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AsideLabelTextField } from '../../components/__old__/AsideLabelTextField';

const initialState = '';
const prefix = '¥';

describe.skip('<AsideLabelText /> in numeric mode', () => {
  const Wrapper = ({ prefix }: { prefix?: '¥' }) => {
    const [state, setState] = React.useState(initialState);
    return (
      <>
        <div data-testid="state-test">{state}</div>
        <AsideLabelTextField
          labelText="test"
          variant="outlined"
          mode="numeric"
          id="test"
          prefix={prefix}
          value={state}
          position="center"
          onChange={(v) => setState(v)}
        />
      </>
    );
  };

  describe(`prefix(${prefix})なしの場合`, () => {
    beforeEach(() => render(<Wrapper />));

    describe('入力値がNaNの場合', () => {
      test.each`
        value
        ${'hoge'}
        ${'!?@#$^%&'}
        ${'テスト'}
      `('入力値($value)は表示せず、stateも更新されない', ({ value }) => {
        userEvent.type(screen.getByLabelText('test'), value);
        expect(screen.getByLabelText('test')).not.toHaveValue(value);
        expect(within(screen.getByTestId('state-test')).getByText(initialState)).toBeInTheDocument();
      });
    });

    describe('整数部が４桁未満の場合', () => {
      test.each`
        value
        ${'0'}
        ${'100'}
        ${'-100'}
        ${'100.000000'}
        ${'100.0012300'}
      `('入力値($value)が表示され、入力値($value)がstateにセットされる', ({ value }) => {
        userEvent.type(screen.getByLabelText('test'), value);
        screen.debug();
        expect(screen.getByLabelText('test')).toHaveValue(value);
        expect(within(screen.getByTestId('state-test')).getByText(value)).toBeInTheDocument();
      });
    });

    describe('整数部が４桁以上の場合', () => {
      test.each`
        value                 | expected
        ${'1000'}             | ${'1,000'}
        ${'-1000000'}         | ${'-1,000,000'}
        ${'1000000000'}       | ${'1,000,000,000'}
        ${'1000000.000'}      | ${'1,000,000.000'}
        ${'-1000000.0012300'} | ${'-1,000,000.0012300'}
      `(
        '入力値($value)をカンマで桁区切りした値($expected)が表示され、入力値($value)がstateにセットされる',
        ({ value, expected }) => {
          userEvent.type(screen.getByLabelText('test'), value);
          expect(screen.getByLabelText('test')).toHaveValue(expected);
          expect(within(screen.getByTestId('state-test')).getByText(value)).toBeInTheDocument();
        }
      );
    });
  });

  describe(`prefix(${prefix})ありの場合`, () => {
    beforeEach(() => render(<Wrapper prefix={prefix} />));

    describe('入力値がNaNの場合', () => {
      test.each`
        value
        ${'hoge'}
        ${'!?@#$^%&'}
        ${'テスト'}
      `('入力値($value)は表示せず、stateも更新されない', ({ value }) => {
        userEvent.type(screen.getByLabelText('test'), value);
        expect(screen.getByLabelText('test')).not.toHaveValue(value);
        expect(within(screen.getByTestId('state-test')).getByText(initialState)).toBeInTheDocument();
      });
    });

    describe('整数部が４桁未満の場合', () => {
      test.each`
        value            | expected
        ${'0'}           | ${`${prefix}0`}
        ${'100'}         | ${`${prefix}100`}
        ${'-100'}        | ${`-${prefix}100`}
        ${'100.000000'}  | ${`${prefix}100.000000`}
        ${'100.0012300'} | ${`${prefix}100.0012300`}
      `(`prefix付き入力値(${prefix}$value)が表示され、入力値($value)がstateにセットされる`, ({ value, expected }) => {
        userEvent.type(screen.getByLabelText('test'), value);
        expect(screen.getByLabelText('test')).toHaveValue(expected);
        expect(within(screen.getByTestId('state-test')).getByText(value)).toBeInTheDocument();
      });
    });

    describe('整数部が４桁以上の場合', () => {
      test.each`
        value                 | expected
        ${'1000'}             | ${`${prefix}1,000`}
        ${'-1000000'}         | ${`-${prefix}1,000,000`}
        ${'1000000000'}       | ${`${prefix}1,000,000,000`}
        ${'1000000.000'}      | ${`${prefix}1,000,000.000`}
        ${'-1000000.0012300'} | ${`-${prefix}1,000,000.0012300`}
      `(
        `prefix付き入力値(${prefix}$value)をカンマで桁区切りした値($expected)が表示され、入力値($value)がstateにセットされる`,
        ({ value, expected }) => {
          userEvent.type(screen.getByLabelText('test'), value);
          expect(screen.getByLabelText('test')).toHaveValue(expected);
          expect(within(screen.getByTestId('state-test')).getByText(value)).toBeInTheDocument();
        }
      );
    });
  });
});
