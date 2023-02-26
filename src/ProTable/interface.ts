import { ColumnProps, TableProps } from 'antd/lib/table';
import { IProps as drawerProp } from '@/DrawerFilter';
import { FormProps } from 'antd/lib/form';
import { ValueType as TableFilterValueType } from '../TableFilter';
import { ToolbarProps } from './Toolbar';

export interface RequestData {
  success: boolean;
  data?: any[];
  total: number;
}
export type PresetStatusColorTypesCustom =
  | 'success'
  | 'processing'
  | 'error'
  | 'default'
  | 'warning'
  | 'info'
  | 'stop'
  | 'disable';
export type IValueEnum = Map<any, | string | {
  text: string;
  status: PresetStatusColorTypesCustom;
  icon?: React.ReactNode;
}
>;

export interface IPagination {
  current: number;
  pageSize: number;
}

export interface ProColumn<T = any> extends ColumnProps<T> {
  dataIndex: string;
  valueType?: TableFilterValueType;
  valueEnum?: IValueEnum;
  search?: boolean;
  hideInTable?: boolean;
  dateTimeFormat?: string;
  fieldProps?: any;
  order?: number;
  filterType?: 'right' | 'table' | 'filter';
  customRender?: React.ReactNode;
  disabled?: boolean;
  setting?: boolean;
}

export interface ActionType {
  reload: (resetPageIndex?: boolean | number) => void;
  getFilterValue: () => object;
  setFilterValue: (val: any) => void;
  resetFilter: (post?: any) => void;
  getPage: () => IPagination;
  getTotal: () => number;
}

export interface IFormProps extends FormProps {
  filters?: { [x: string]: any }; // 表头筛选默认值设置
  sorters?: { [x: string]: any }; // 表头排序默认值设置
}

export interface ProTableProps<Column> extends TableProps<Column> {
  id?: string;
  request?: (
    params: object,
    sort: {
      [key: string]: 'ascend' | 'descend';
    },
    filter: { [key: string]: React.ReactText[] },
  ) => Promise<RequestData>;
  params?: object;
  columns: Array<ProColumn<Column>>;
  className?: string;
  style?: React.CSSProperties;
  tableClassName?: string;
  tableStyle?: React.CSSProperties;
  formClassName?: string;
  emptyText?: string | React.ReactNode;
  formStyle?: React.CSSProperties;
  formProps?: IFormProps;
  toolbar?: ToolbarProps;
  clearForm?: Record<string, any>;
  checkFlip?: boolean; // 列展示配置项 默认save开启，checkFlip为true，则取反
  container?: React.ReactNode[];
  actionRef?:
  | React.MutableRefObject<ActionType | undefined>
  | ((actionRef: ActionType) => void);
  defaultPagination?: IPagination;
  formMode?: 'fixed' | 'static';
  defaultCollapsed?: boolean;
  drawerProps?: drawerProp; // 筛选组件
  remember?: boolean; // 记住page功能
  resetRemember?: boolean; // 是否自动根据路由清除当前搜索参数
  onFinish?: (values: any) => void; // 请求完成以后回调
  onFilterSearch?: (values: any) => void;
  onFilterReset?: () => void;
}
