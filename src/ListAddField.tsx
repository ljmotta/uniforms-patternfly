import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Button, ButtonProps, ButtonVariant } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import {
  useField,
  filterDOMProps,
  joinName,
  connectField,
  HTMLFieldProps,
} from 'uniforms/es5';

export type ListAddFieldProps = HTMLFieldProps<
  unknown,
  ButtonProps,
  { initialCount?: number }
>;

function ListAdd({
  disabled = false,
  name,
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <Button
      variant={ButtonVariant.plain}
      style={{ paddingLeft: '0', paddingRight: '0' }}
      disabled={!limitNotReached}
      // @ts-ignore
      onClick={() => {
        !disabled &&
          limitNotReached &&
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
      }}
      icon={<PlusCircleIcon color="#0088ce" />}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
