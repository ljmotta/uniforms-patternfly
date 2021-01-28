import React from 'react';
import { Button, ButtonProps } from '@patternfly/react-core';
import { useForm, filterDOMProps, Override } from 'uniforms/es5';

// export type SubmitFieldProps = {
//   inputRef: undefined;
//   name: string;
//   disabled: boolean;
// } & Omit<ButtonProps, 'isDisabled'>;

export type SubmitFieldProps = Override<
  ButtonProps,
  { inputRef?: React.RefObject<HTMLButtonElement>; label?: React.ReactNode }
>;

function SubmitField({
  disabled,
  inputRef,
  value,
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();

  return (
    <Button
      isDisabled={
        disabled === undefined ? !!(error || state.disabled) : disabled
      }
      type="submit"
      ref={inputRef}
      variant="primary"
      {...filterDOMProps(props)}
    >
      {value}
    </Button>
  );
}

SubmitField.defaultProps = { value: 'Submit' };

export default SubmitField;
