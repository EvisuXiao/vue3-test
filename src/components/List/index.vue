<template>
  <div class="list-container">
    <div class="box-space right-side">
      <div class="item-space-8 display-inline">
        <el-button-group v-if="!!innerTableTools" size="medium">
          <template v-for="(tool, toolKey) in innerTableTools">
            <el-tooltip
              v-if="!has(tool, 'visible') || tool.visible"
              :key="toolKey"
              placement="bottom"
              :content="tool.label"
            >
              <el-button plain :icon="tool.icon" @click="tool.handler">{{
                !!tool.icon ? '' : tool.label
              }}</el-button>
            </el-tooltip>
          </template>
        </el-button-group>
      </div>
      <div class="form-width-200 item-space-8 display-inline">
        <el-input
          v-if="showFilterTool"
          v-model="filterText"
          :prefix-icon="Search"
          placeholder="请输入过滤内容"
          size="medium"
        ></el-input>
      </div>
    </div>
    <div class="box-space">
      <el-table v-bind="innerTableProps">
        <el-table-column v-if="selection" type="selection" fixed></el-table-column>
        <el-table-column
          v-if="!!rowTools"
          v-slot="scope"
          prop="rowTool"
          label="操作"
          width="150%"
          align="center"
          fixed
        >
          <template v-for="(tool, toolKey) in rowTools">
            <el-tooltip
              v-if="!has(tool, 'visible') || tool.visible(scope.row)"
              :key="toolKey"
              placement="bottom"
              :content="tool.label"
            >
              <el-button
                class="item-space-3"
                type="text"
                :icon="tool.icon"
                @click="tool.handler(scope.row)"
                >{{ !!tool.icon ? '' : tool.label }}</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column v-for="col in innerColumnProps" :key="col.prop" v-bind="col">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-model:current-page="page"
      v-model:page-size="innerPageSize"
      v-loading="loading"
      class="box-space"
      :page-sizes="pageSizes"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup lang="ts">
  import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
  import { defineProps, PropType, ref, onMounted, Ref, computed } from 'vue'
  import { get, has, forIn } from 'lodash'
  import { mergeTableProps } from '~comp/List/list'
  import { ObjectStringKV } from '~/types'
  import { RowToolBtn, ServerSideOption, TableToolBtn } from '~types/components/list'
  import { Refresh, Search } from '@element-plus/icons'

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
    showRefreshTool: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    showFilterTool: {
      type: Boolean,
      default: () => {
        return true
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
  const innerPageSize = ref(props.pageSize)
  const page = ref(1)
  let total = ref(0)
  const filterText = ref('')
  let loading = ref(false)
  const innerTableProps = ref(mergeTableProps(props.tableProps))
  // const innerColumnProps: Ref<ObjectStringKV[]> = ref([])

  const innerTableTools = computed(() => {
    const refreshTool: TableToolBtn = {
      visible: props.showRefreshTool,
      label: '刷新',
      icon: Refresh,
      handler: refreshTable
    }
    return props.tableTools.concat(refreshTool)
  })

  const refreshTable = () => {
    loading.value = true
    props
      .getData(page.value, innerPageSize.value)
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
        innerTableProps.value.data = list
      })
      .finally(() => {
        loading.value = false
      })
  }

  const innerColumnProps = computed(() => {
    const _columnProps: ObjectStringKV[] = []
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
      _columnProps.push(each)
    })
    return _columnProps
  })

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
      innerColumnProps.value.push(each)
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
    padding: 15px;
  }
  .box-space {
    padding: 8px;
  }
</style>
