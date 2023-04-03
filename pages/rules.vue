<template>
  <Rules />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RulesPage',
  middleware({ route, redirect }) {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (!token && route.path !== '/') {
      redirect('/')
    }
  },
})
</script>
