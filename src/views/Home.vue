<template>
  <div :class="$style.index">
    <search></search>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from '@/views/Search.vue';

@Component({
  components: {
    Search
  }
})
export default class Index extends Vue {
}
</script>

<style lang="less" module>
.index {
  width: 80vw;
  margin: 0 auto;
}

.input {
  padding: 5px 2px;
  font-size: 24px;
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
