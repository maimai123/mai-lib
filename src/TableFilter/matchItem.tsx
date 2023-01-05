import React from 'react';
import { getLocale } from '@/utils';
import { IField } from './index';
import Select from './Select';
import Radio from './Radio';
import Checkbox from './Checkbox';
import TreeSelect from './TreeSelect';
import Input from './Input';
import Textarea from './Textarea';
import Number from './InputNumber';
import Search from './Search';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import Cascader from './Cascader';
import './index.less';

export default (field: IField) => {
  field?.fieldProps?.itemProps && delete field?.fieldProps?.itemProps;
  switch (field.valueType) {
    case 'search':
      return (
        <Search
          className="default-width"
          placeholder={getLocale('item.input')}
          {...field.fieldProps}
        />
      );
    case 'number':
      return <Number className="default-width" {...field.fieldProps} />;
    case 'textarea':
      return (
        <Textarea
          className="default-width"
          placeholder={getLocale('item.input')}
          {...field.fieldProps}
        />
      );
    case 'select':
      return field.valueEnum ? (
        <Select
          className="default-width"
          placeholder={getLocale('item.select')}
          options={field.valueEnum}
          {...field.fieldProps}
        />
      ) : null;
    case 'treeSelect':
      return (
        <TreeSelect
          className="default-width"
          placeholder={getLocale('item.select')}
          {...field.fieldProps}
        />
      );
    case 'date':
      return (
        <DatePicker
          className="default-width"
          placeholder={getLocale('item.select')}
          {...field.fieldProps}
        />
      );
    case 'dateRange':
      return (
        <DateRangePicker
          className="default-width"
          placeholder={[getLocale('item.startTime'), getLocale('item.endTime')]}
          {...field.fieldProps}
        />
      );
    case 'cascader':
      return (
        <Cascader
          className="default-width"
          placeholder={getLocale('item.select')}
          {...field.fieldProps}
        />
      );
    case 'radio':
      return field.valueEnum ? (
        <Radio
          className="default-width"
          options={field.valueEnum}
          {...field.fieldProps}
        />
      ) : null;
    case 'checkbox':
      return field.valueEnum ? (
        <Checkbox
          className="default-width"
          options={field.valueEnum}
          {...field.fieldProps}
        />
      ) : null;
    case 'custom':
      return field.customRender;
    default:
      return (
        <Input
          className="default-width"
          placeholder={getLocale('item.input')}
          {...field.fieldProps}
        />
      );
  }
};
