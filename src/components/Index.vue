<template>
  <div :class="$style.index">
    <input type="text" :class="$style.index__input" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {}
</script>

<style lang="less" module>
.index {
  &__input {
    height: 30px;
    width: 80%;
    font-size: 30px;
  }
}
</style>
