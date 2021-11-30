<template>
  <x-list :column-title="title" :table-tools="tool" :get-data="getData"></x-list>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Share } from '@element-plus/icons'
  import XList from '~comp/List/BaseList.vue'

  const title = ref({
    id: 'ID',
    name: '名称'
  })

  const tool = ref([
    {
      label: '啦啦啦',
      // icon: Share,
      handler: () => {
        console.log('11111')
      }
    }
  ])
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
