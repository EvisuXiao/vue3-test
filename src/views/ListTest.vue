<template>
  <x-list :column-title="title" :table-tools="tool" :row-tools="tool2" :get-data="getData"></x-list>
</template>

<script setup lang="ts">
  import { Ref, ref } from 'vue'
  import { Share } from '@element-plus/icons'
  import XList from '~comp/List/index.vue'
  import { RowToolBtn, TableToolBtn } from '~types/components/list'

  const title = {
    id: 'ID',
    name: '名称'
  }

  const tool: TableToolBtn[] = [
    {
      label: '啦啦啦',
      icon: Share,
      handler: () => {
        console.log(111)
      }
    },
    {
      label: '啦啦啦',
      icon: Share,
      handler: () => {
        console.log('22222')
      }
    }
  ]
  const tool2: RowToolBtn[] = [
    {
      label: '啦啦啦',
      icon: Share,
      handler: row => {
        console.log(row)
      }
    },
    {
      label: '啦啦啦',
      icon: Share,
      handler: row => {
        console.log(row)
      }
    }
  ]
  const getData = () => {
    return new Promise(resolve => {
      const res = [
        { id: 1, name: 'aaa' },
        { id: 2, name: 'bbb' },
        { id: 3, name: 'ccc' },
        { id: 4, name: 'ddd' },
        { id: 5, name: 'eeee' },
        { id: 11, name: 'aaa' },
        { id: 12, name: 'bbb' },
        { id: 13, name: 'ccc' },
        { id: 14, name: 'ddd' },
        { id: 15, name: 'eeee' },
        { id: 21, name: 'aaa' },
        { id: 22, name: 'bbb' },
        { id: 23, name: 'ccc' },
        { id: 24, name: 'ddd' },
        { id: 25, name: 'eeee' },
        { id: 31, name: 'aaa' },
        { id: 32, name: 'bbb' },
        { id: 33, name: 'ccc' },
        { id: 34, name: 'ddd' },
        { id: 35, name: 'eeee' }
      ]
      resolve(res)
    })
  }
</script>

<style scoped></style>
