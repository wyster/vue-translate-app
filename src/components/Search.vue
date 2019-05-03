<template>
  <div :class="$style.index">
    <input ref="input" type="text" :class="$style.index__input" autofocus v-model="input" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  private input = '';
  mounted() {
    let timeout: number | undefined = undefined;
    this.$watch('input', (v: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => this.request(v), 500);
    });
  }
  request(v: string) {
    console.log('send', v);
  }
}
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
