import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
import _ from 'lodash'

export function init() {}

const defaultTableProps: TableProps<any> = {
  data: [],
  border: true,
  stripe: true,
  highlightCurrentRow: true,
  rowKey: 'id',
  expandRowKeys: []
}

export function mergeTableProps(props: TableProps<any>): TableProps<any> {
  return Object.assign(defaultTableProps, props)
}
