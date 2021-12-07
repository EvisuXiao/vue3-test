import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
import { defineProps, PropType } from 'vue'
import { RowToolBtn, ServerSideOption, TableToolBtn } from '~types/components/list'

const defaultTableProps: TableProps<any> = {
  data: [],
  border: true,
  stripe: true,
  highlightCurrentRow: true,
  rowKey: 'id',
  expandRowKeys: []
}

function mergeTableProps(props: TableProps<any>): TableProps<any> {
  return Object.assign(defaultTableProps, props)
}

export default function () {
  const tableProps = defineProps({
    tableProps: {
      type: Object as PropType<TableProps<any>>,
      default: () => {
        return { data: [] }
      }
    },
    serverSide: {
      type: Object as PropType<ServerSideOption>,
      default: () => {
        return { enabled: false, dataKey: 'data', totalKey: 'total' }
      }
    },
    columnTitle: {
      type: Object,
      required: true
    },
    columnProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selection: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    preload: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    getData: {
      type: Function,
      required: true
    }
  })
}
