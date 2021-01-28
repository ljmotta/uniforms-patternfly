import React from 'react';
import { TextArea, TextAreaProps } from '@patternfly/react-core';
import { connectField, FieldProps, filterDOMProps } from 'uniforms/es5';

export type LongTextFieldProps = FieldProps<
  string,
  TextAreaProps,
  { inputRef: React.RefObject<HTMLInputElement> }
>;

const LongText = ({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  value,
  ...props
}: LongTextFieldProps) => (
  <>
    {label && <label htmlFor={id}>{label}</label>}
    <TextArea
      id={id}
      disabled={disabled}
      name={name}
      aria-label={name}
      onChange={(value, event) => onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      value={value ?? ''}
      {...filterDOMProps(props)}
    />
  </>
);

export default connectField(LongText, { kind: 'leaf' });
