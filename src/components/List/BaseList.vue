<template>
  <div class="list-container">
    <template v-for="(tool, toolKey) in tableTools">
      <el-tooltip
        v-if="!has(tool, 'visible') || tool.visible"
        :key="toolKey"
        placement="bottom"
        :content="tool.label"
      >
        <el-button class="tool-button" plain :icon="tool.icon" @click="tool.handler">{{
          tool.label
        }}</el-button>
      </el-tooltip>
    </template>
    <el-table v-bind="_tableProps">
      <el-table-column v-for="col in _columnProps" :key="col.prop" v-bind="col"> </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="_pageSize"
      v-loading="loading"
      :page-sizes="pageSizes"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup lang="ts">
  import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
  import { defineProps, PropType, ref, onMounted, Ref } from 'vue'
  import { get, has, forIn } from 'lodash'
  import { mergeTableProps } from '~comp/List/list'
  import { ObjectStringKV } from '~/types'
  import { RowToolBtn, ServerSideOption, TableToolBtn } from '~types/components/list'

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
      type: Array as PropType<Number[]>,
      default: () => {
        return [10, 20, 30, 40, 50, 100]
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
    tableTools: {
      type: Array as PropType<TableToolBtn[]>,
      default: () => {
        return []
      }
    },
    rowTools: {
      type: Array as PropType<RowToolBtn[]>,
      default: () => {
        return []
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
  const _pageSize = ref(props.pageSize)
  const page = ref(1)
  let total = ref(0)
  let loading = ref(false)
  const _tableProps = ref(mergeTableProps(props.tableProps))
  const _columnProps: Ref<ObjectStringKV[]> = ref([])
  const refreshTable = () => {
    loading.value = true
    props
      .getData(page.value, _pageSize.value)
      .then((data: any[] | ObjectStringKV) => {
        let list: Array<any>
        if (props.serverSide.enabled) {
          const dataKey = props.serverSide.dataKey || 'data'
          const totalKey = props.serverSide.dataKey || 'total'
          list = get(data, dataKey)
          total.value = get(data, totalKey)
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

  const initColumn = () => {
    forIn(props.columnTitle, (title, key) => {
      const each: ObjectStringKV = {
        prop: key,
        label: title,
        width: 100
      }
      forIn(props.columnProps, (propVal, propKey) => {
        if (has(propVal, key)) {
          each[propKey] = propVal[key]
        }
      })
      _columnProps.value.push(each)
    })
  }

  onMounted(() => {
    initColumn()
    if (props.preload) {
      refreshTable()
    }
  })
</script>

<style scoped>
  .list-container {
    height: 100%;
  }
  .tool-button {
    margin-left: 10px;
  }
</style>
