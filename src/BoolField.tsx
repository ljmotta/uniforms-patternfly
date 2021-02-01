import React from 'react';
import {
  Checkbox,
  CheckboxProps,
  Switch,
  SwitchProps,
} from '@patternfly/react-core';
import { connectField, FieldProps, filterDOMProps } from 'uniforms/es5';

export type BoolFieldProps = FieldProps<
  boolean,
  CheckboxProps & SwitchProps,
  {
    appearance?: 'checkbox' | 'switch';
    inputRef: React.RefObject<Switch | Checkbox> &
      React.RefObject<HTMLInputElement>;
  }
>;

function Bool({
  appearance,
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  value,
  ...props
}: BoolFieldProps) {
  const Component = appearance === 'switch' ? Switch : Checkbox;
  return (
    <div {...filterDOMProps(props)}>
      <Component
        isChecked={value || false}
        isDisabled={disabled}
        id={id}
        name={name}
        onChange={() => disabled || onChange(!value)}
        ref={inputRef}
        label={label}
      />
    </div>
  );
}

export default connectField(Bool);
