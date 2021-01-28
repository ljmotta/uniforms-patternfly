import React from 'react';
import { TextInput } from '@patternfly/react-core';
import { connectField, FieldProps } from 'uniforms/es5';

import wrapField from './wrapField';

export type NumFieldProps = FieldProps<
  number,
  HTMLDivElement,
  {
    decimal?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    max?: number;
    min?: number;
  }
>;

const Num = (props: NumFieldProps) => {
  const onChange = (
    value: string,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const parse = props.decimal ? parseFloat : parseInt;
    const v = parse((event.target as any).value);
    props.onChange(isNaN(v) ? undefined : v);
  };

  return wrapField(
    props,
    <TextInput
      name={props.name}
      isDisabled={props.disabled}
      id={props.id}
      max={props.max}
      min={props.min}
      onChange={onChange}
      placeholder={props.placeholder}
      ref={props.inputRef}
      step={props.decimal ? 0.01 : 1}
      type="number"
      value={props.value ?? ''}
    />
  );
};

export default connectField(Num, { kind: 'leaf' });
