import React, { useState } from 'react';
import {
  Checkbox,
  CheckboxProps,
  Radio,
  RadioProps,
  Select,
  SelectProps,
  SelectOption,
  SelectVariant,
  SelectOptionObject,
} from '@patternfly/react-core';
import { connectField, FieldProps, filterDOMProps } from 'uniforms/es5';

import wrapField from './wrapField';

function xor(item: any, array: any[]) {
  const index = array.indexOf(item);
  if (index === -1) {
    return array.concat([item]);
  }

  return array.slice(0, index).concat(array.slice(index + 1));
}

filterDOMProps.register('autoValue');

type CheckboxesProps = FieldProps<
  string | string[],
  CheckboxProps | RadioProps,
  {
    fieldType?: typeof Array | any;
    onChange: (value?: string | string[]) => void;
    transform?: (value?: string) => string;
    allowedValues: string[];
    id: string;
    disabled?: boolean;
  } & (Omit<CheckboxProps, 'isDisabled'> | Omit<RadioProps, 'isDisabled'>)
>;

function RenderCheckboxes(props: CheckboxesProps) {
  const Group = props.fieldType === Array ? Checkbox : Radio;

  return (
    <div {...filterDOMProps(props)}>
      {props.label && <label>{props.label}</label>}
      {props.allowedValues!.map((item: string, index: number) => {
        return (
          <React.Fragment key={index}>
            <label htmlFor={props.id}>
              {props.transform ? props.transform(item) : item}
            </label>
            <Group
              id={`${props.id}-${item}`}
              isDisabled={props.disabled}
              name={props.name}
              aria-label={props.name}
              value={props.value}
              isChecked={
                props.fieldType === Array && Array.isArray(props.value)
                  ? props.value!.includes(item)
                  : props.value === item
              }
              onChange={() => {
                props.onChange(
                  props.fieldType === Array && Array.isArray(props.value)
                    ? xor(item, props.value)
                    : item
                );
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export type SelectInputProps = FieldProps<
  string | string[],
  SelectProps,
  {
    required?: boolean;
    id: string;
    fieldType?: typeof Array | any;
    onChange: (value?: string | string[]) => void;
    placeholder: string;
    allowedValues: string[];
    disabled?: boolean;
    error?: boolean;
    transform?: (value?: string) => string;
  }
>;

function isSelectOptionObject(
  toBeDetermined: string | SelectOptionObject
): toBeDetermined is SelectOptionObject {
  return toBeDetermined.toString !== undefined;
}

function RenderSelect(props: SelectInputProps) {
  const selectDefault = props.fieldType === Array ? [] : props.placeholder;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | string[]>([
    props.allowedValues[0],
  ]);

  const handleSelect = (
    event: React.MouseEvent | React.ChangeEvent,
    selection: string | SelectOptionObject
  ) => {
    const items = parseInput(selection, props.fieldType);
    props.onChange(items);
    setSelected(items);
    setExpanded(false);
  };

  const parseInput = (
    selection: string | SelectOptionObject, fieldType: typeof Array | any
  ): string | string[] => {
    const parsedSelection = isSelectOptionObject(selection)
      ? selection.toString()
      : selection;

    if (fieldType !== Array) {
      return parsedSelection !== '' ? parsedSelection : '';
    }

    if (Array.isArray(selected)) {
      if (selected.includes(parsedSelection)) {
        return selected.filter((s) => s !== parsedSelection);
      }
      return [parsedSelection, ...selected];
    }
    return [parsedSelection, selected];
  };

  const selectedOptions = props.allowedValues!.map((value) => (
    <SelectOption key={value} value={value}>
      {props.transform ? props.transform(value) : value}
    </SelectOption>
  ));

  if (props.placeholder)
    selectedOptions.unshift(
      <SelectOption
        key={props.allowedValues!.length}
        isDisabled
        isPlaceholder
        value={props.placeholder}
      />
    );
  return wrapField(
    props,
    <Select
      isDisabled={props.disabled}
      id={props.id}
      variant={
        props.fieldType === Array
          ? SelectVariant.typeaheadMulti
          : SelectVariant.single
      }
      name={props.name}
      placeholderText={props.placeholder}
      isOpen={expanded}
      selections={selected}
      onToggle={() => setExpanded(!expanded)}
      onSelect={handleSelect}
      value={props.value || (props.fieldType === Array ? [] : undefined)}
    >
      {selectedOptions}
    </Select>
  );
}

type SelectFieldProps = (CheckboxesProps | SelectProps) & {
  checkboxes?: boolean;
};

function SelectField({ checkboxes, ...props }: SelectFieldProps) {
  if (checkboxes) {
    RenderCheckboxes(props as CheckboxesProps);
  }
  return RenderSelect(props as SelectInputProps);
}

// @ts-ignore
export default connectField(SelectField, { kind: 'leaf' });
