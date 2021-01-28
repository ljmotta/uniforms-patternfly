import React from 'react';
import { TextInput, TextInputProps } from '@patternfly/react-core';
import { connectField, FieldProps, filterDOMProps } from 'uniforms/es5';

import wrapField from './wrapField';

export type TextFieldProps = FieldProps<
  string,
  TextInputProps,
  { inputRef?: React.RefObject<HTMLInputElement> }
>;

const Text = (props: TextFieldProps) =>
  wrapField(
    props,
    <TextInput
      id={props.id}
      name={props.name}
      isDisabled={props.disabled}
      validated={props.error ? 'error' : 'default'}
      onChange={(value, event) => props.onChange((event.target as any).value)}
      placeholder={props.placeholder}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />
  );

export default connectField(Text, { kind: 'leaf' });
