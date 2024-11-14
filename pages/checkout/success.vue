<script lang="ts" setup>
onMounted(async () => {
  setTimeout(() => {
    return navigateTo("/");
  }, 3000);
});
</script>
<template>
  <h1>success</h1>
</template>
