<template>
  <el-table :data="data"></el-table>
  <el-pagination></el-pagination>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps({
    data: {
      type: Array,
      required: true
    },
    columnTitle: {
      type: Object,
      required: true
    }
  })
</script>

<style scoped></style>
