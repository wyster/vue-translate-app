<template>
  <div :class="$style.index">
    <input
      ref="input"
      type="text"
      :class="$style.input"
      autofocus
      v-model="input"
    />
    <div v-if="list.length > 0">
      <ul :class="$style.list">
        <li v-for="item in list" :key="item" :class="$style.list__item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  private input = '';
  private list = [];
  mounted() {
    let timeout: number | undefined = undefined;
    this.$watch('input', (v: string) => {
      this.list = [];
      if (!v) {
        return;
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => this.request(v), 500);
    });
  }
  async request(v: string) {
    console.log('send', v);
    let url = `http://localhost:8081/https://it.wiktionary.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${v}&namespace=0&limit=10`;
    const response = await fetch(url);
    this.list = (await response.json() as any)[1];
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
  }
}
</style>
