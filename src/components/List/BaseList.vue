<template>
  <el-table v-bind="_tableProps"></el-table>
  <el-pagination
    v-model:current-page="page"
    v-model:page-size="_pageSize"
    :page-sizes="pageSizes"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
  ></el-pagination>
</template>

<script setup lang="ts">
  import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
  import { defineProps, PropType, ref } from 'vue'
  import _ from 'lodash'
  import { mergeTableProps } from '~comp/List/list'
  import { ServerSideOption } from '~types/components/list'

  const props = defineProps({
    tableProps: {
      type: Object as PropType<TableProps<any>>,
      default: () => {
        return { data: [] }
      }
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 100]
      }
    },
    serverSide: {
      type: Object as PropType<ServerSideOption>,
      default: () => {
        return { enabled: false }
      }
    },
    columnTitle: {
      type: Object,
      required: true
    },
    getData: {
      type: Function,
      required: true
    }
  })
  const _pageSize = ref(props.pageSize)
  const page = ref(1)
  let total = ref(0)
  let loading = ref(false)
  const _tableProps = ref(mergeTableProps(props.tableProps))
  const refreshTable = () => {
    loading.value = true
    props
      .getData(page.value, _pageSize.value)
      .then((data: any[] | Object) => {
        let list: Array<any>
        if (props.serverSide.enabled) {
          const dataKey = props.serverSide.dataKey || 'data'
          const totalKey = props.serverSide.dataKey || 'total'
          list = _.get(data, dataKey)
          total.value = _.get(data, totalKey)
        } else {
          list = data as any[]
          total.value = list.length
        }
        _tableProps.value.data = list
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<style scoped></style>
