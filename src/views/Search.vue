<template>
  <div :class="$style.index">
    <input
      ref="input"
      type="text"
      :class="$style.input"
      autofocus
      v-model="input"
    />
    <div v-if="$store.state.searchList.length > 0">
      <ul :class="$style.list">
        <li v-for="item in $store.state.searchList" :key="item.title" :class="$style.list__item">
          <a :href="item.link" target="_blank" :class="$style['list__item-link']">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import fetchJsonp from 'fetch-jsonp';

interface List {
  title: string;
  link: string;
}

@Component({})
export default class Index extends Vue {
  private input = '';
  mounted() {
    if (this.$store.state.searchList.length === 0) {
      this.request(this.input);
    }
    (this.$refs.input as HTMLElement).focus();
    this.$watch('input', (v: string) => {
      this.$store.state.searchList.length = 0;
      this.$nextTick(() => {
        v = v.toLocaleLowerCase();
        if (!v) {
          this.$router.push('/');
          return;
        }
        this.$router.push(`/search/${v}`);
        this.request(v);
      });
    });
  }
  /**
   * @param v
   * @return Promise
   */
  async request(v: string) {
    const uri = `https://it.wiktionary.org/w/api.php?action=opensearch&format=json&&search=${v}&&limit=10&`;
    return new Promise(async resolve => {
      const response = await fetchJsonp(uri);
      const data = await response.json();
      const preparedData: List[] = [];
      for (let i = 0; i < data[1].length; i++) {
        preparedData.push({ title: data[1][i], link: data[3][i] });
      }
      this.$store.state.searchList = preparedData;
      resolve();
    });
  }
  created() {
    this.input = this.$route.params.word;
  }
  serverPrefetch() {
    return this.request(this.input);
  }
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
    display: block;

    &-link {
      display: block;
    }
  }
}
</style>
