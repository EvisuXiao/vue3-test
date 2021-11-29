<template>
  <el-table-column>
    <slot></slot>
  </el-table-column>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps({
    field: {
      type: string,
      default: ''
    },
    condition: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  })
</script>

<style scoped></style>
