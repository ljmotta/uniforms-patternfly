import React from 'react';
import { TextArea, TextAreaProps } from '@patternfly/react-core';
import { connectField, filterDOMProps, HTMLFieldProps } from 'uniforms/es5';

export type LongTextFieldProps = HTMLFieldProps<
  string,
  TextAreaProps,
  { inputRef: React.RefObject<HTMLInputElement> & React.RefObject<HTMLDivElement> }
>;

// These props are provided by useField directly.
// 'changed',
//   'error',
//   'errorMessage',
//   'field',
//   'fieldType',
//   'fields',
//   'initialCount',
//   'name',
//   'onChange',
//   'transform',
//   'value',
//
//   // These props are provided by useField through context.state.
//   'disabled',
//   'label',
//   'placeholder',
//   'showInlineError',
//
//   // This is used by AutoField.
//   'component',
//
//   // These is used by AutoField and bridges.
//   'allowedValues',

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
  <div {...filterDOMProps(props)}>
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
    />
  </div>
);

export default connectField(LongText);
