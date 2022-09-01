// TODO
// emotionとReactのバージョンを上げてから、jest環境でcss propsでバグが発生しているので調査
import { css } from '@emotion/react';
import { CSSProperties } from 'react';
import { AsideLabelTextFieldInput, MyInputProps } from './Input';

type Props = {
  labelText: string | JSX.Element;
  labelSize?: 's';
  labelVariant?: 'outlined';
  style?: CSSProperties;
  hidden?: boolean;
} & MyInputProps;

export function AsideLabelTextField(props: Props) {
  const { style, className, ...others } = props;
  return (
    <div
      css={{
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        width: '100%',
      }}
      className={className}
      style={style}
    >
      <label
        css={css`
          ${props.labelVariant ? 'border: 1px solid rgba(0, 0, 0, 0.38); padding: 0 7px;' : null}
          ${props.labelSize === 's' ? 'font-size: 0.75rem;' : 'inherit;'}
          margin-right: auto;
          white-space: nowrap;
        `}
        hidden={props.hidden}
        htmlFor={props.id}
      >
        {props.labelText}
      </label>
      {/* 
        emotionは親コンポネントがcss propsを受け取るとき、className経由で子コンポネントのcss propsを上書き・追記する。
        AsideLabelTextFieldInputは既にInputのcssをカスタマイズしたコンポネントであり、css propsに変更を加えたくないので
        AsideLabelTextFieldが受け取るpropsからclassNameを除外したothersをpropsとして渡す。
      */}
      <AsideLabelTextFieldInput {...others} />
    </div>
  );
}
