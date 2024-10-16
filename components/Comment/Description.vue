<script lang="ts" setup>
const infoProduct: any = inject('product')
console.log(infoProduct)
</script>

<template>
  <div class="font-light w-full">
    {{ infoProduct.description }}
  </div>
</template>
