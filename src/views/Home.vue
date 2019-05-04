<template>
  <div :class="$style.index">
    <input
      ref="input"
      type="text"
      :class="$style.input"
      autofocus
      v-model="input"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  private input = '';
  mounted() {
    this.$refs.input.focus();
    this.$watch('input', (v: string) => {
      if (!v) {
        return;
      }
      this.$router.push(`/search/${v}`);
    });
  }
}
</script>

<style lang="less" module>
.index {
  width: 80vw;
  margin: 0 auto;
}

.input {
  height: 6vh;
  font-size: 4vh;
  width: 100%;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    text-align: left;
    line-height: 6vh;

    &:hover {
    }
  }
}
</style>
