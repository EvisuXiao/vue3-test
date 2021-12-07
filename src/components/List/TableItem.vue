<template>
  <el-table v-bind="_tableProps">
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
</template>

<script setup lang="ts">
  import { TableProps } from 'element-plus/lib/components/table/src/table/defaults'
  import { forIn, has } from 'lodash'
  import { defineProps, onMounted, PropType, ref, Ref } from 'vue'
  import { ObjectStringKV } from '~/types'
  import { ServerSideOption } from '~types/components/list'

  const props = defineProps({
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

  const innerColumnProps: Ref<ObjectStringKV[]> = ref([])

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

<style scoped></style>
