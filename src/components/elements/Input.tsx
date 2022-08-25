// TODO
// emotionとReactのバージョンを上げてから、jest環境でcss propsでバグが発生しているので調査
import { css } from '@emotion/react';
import NumberFormat from 'react-number-format';

export type MyInputProps = {
  id?: string;
  inputWidth?: string;
  inputHeight?: string;
  inputColor?: string;
  className?: string;
  value: string | number;
  prefix?: '¥';
  mode: 'text' | 'numeric';
  position: 'start' | 'center' | 'end';
  variant: 'filled' | 'dotted' | 'outlined';
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
};

export const MAX_LENGTH = 20;
const baseStyle = css({
  appearance: 'none',
  font: 'inherit',
  fontSize: '1rem',
  outline: 'none',
  padding: '1px 7px',
});

// todo
// variantに応じたcss/コンポネントに分割する
export function Input(props: MyInputProps) {
  const { onChange, className } = props;
  const inputStyle = css`
    ${baseStyle}
    height: ${props.inputHeight || '100%'};
    text-align: ${props.position};
    width: ${props.inputWidth || '100%'};
    clor: ${props.inputColor || 'inherit'};
    ${props.variant === 'dotted'
      ? `
              background-color: inherit;
              border: 0;
              border-bottom: 1px solid rgba(0, 0, 0, 0.42);
              border-bottom-style: dotted;
              color: #8B8B8B;
            `
      : props.variant === 'filled' || props.disabled
      ? `
              background-color: #e0e0e0; 
              border: 0;
              color: #8B8B8B;
            `
      : `
              border: 1px solid #d0d0d0;
              &:hover {
                outline: solid 1px black; 
              }
              &:focus {
                outline: solid 2px #4051b5; 
              }
            `};
  `;

  if (props.mode === 'numeric') {
    return (
      <NumberFormat
        className={className}
        css={inputStyle}
        type="text"
        id={props.id}
        maxLength={MAX_LENGTH}
        thousandSeparator
        isNumericString
        prefix={props.prefix || ''}
        value={props.value}
        onValueChange={(values) => {
          onChange && onChange(values.value);
        }}
        disabled={props.disabled}
        required={props.required}
        readOnly={props.disabled}
      />
    );
  } else
    return (
      <input
        className={className}
        css={inputStyle}
        type="text"
        id={props.id}
        value={props.value}
        onChange={
          onChange
            ? (event: React.ChangeEvent<HTMLInputElement>) => {
                onChange(event.target.value);
              }
            : undefined
        }
        disabled={props.disabled}
        required={props.required}
        readOnly={props.disabled}
      />
    );
}

export function AsideLabelTextFieldInput(props: MyInputProps & { hidden?: boolean }) {
  return (
    <Input
      css={css`
        ${!props.hidden ? 'margin-left: 10px;' : null}
      `}
      {...props}
    />
  );
}
