<template>
  <div :class="$style.index">
    <input
      ref="input"
      type="text"
      :class="$style.input"
      autofocus
      v-model="input"
    />
    <no-ssr>
      <recognition @result="result"></recognition>
    </no-ssr>
    <div v-if="$store.state.searchList.length > 0">
      <ul :class="$style.list">
        <li
          v-for="item in $store.state.searchList"
          :key="item.title"
          :class="$style.list__item"
        >
          <a
            :href="item.link"
            target="_blank"
            rel="noreferrer"
            :class="$style['list__item-link']"
          >
            {{ item.title }}
          </a>
          &nbsp; (
          <a
            :href="item.multitranLink"
            target="_blank"
            rel="noreferrer"
            :class="$style['list__item-link']"
          >
            multitran
          </a>
          /
          <a
            :href="item.reversoLink"
            target="_blank"
            rel="noreferrer"
            :class="$style['list__item-link']"
          >
            reverso
          </a>
          )
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Recognition from '../components/Recognition.vue';
import NoSSR from 'vue-no-ssr';

interface List {
  title: string;
  link: string;
  multitranLink: string;
  reversoLink: string;
}

@Component({
  components: {
    Recognition,
    'no-ssr': NoSSR
  }
})
export default class Index extends Vue {
  private input = '';
  mounted() {
    if (this.$store.state.searchList.length === 0 && this.input) {
      this.request(this.input);
    }
    (this.$refs.input as HTMLElement).focus();
    this.$watch('input', (v: string) => {
      if (v === '') {
        (this.$refs.input as HTMLElement).focus();
      }
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
    if (this.$ssrContext) {
      return Promise.resolve();
    }

    const lang = process.env.SPEECH_LANG.split('-')[0];
    const uri = `https://${lang}.wiktionary.org/w/api.php?action=opensearch&format=json&&search=${v}&limit=10`;
    return new Promise(async resolve => {
      const fetchJsonp: any = await import('fetch-jsonp');
      const response = await fetchJsonp.default(uri);
      const data = await response.json();
      const preparedData: List[] = [];
      for (let i = 0; i < data[1].length; i++) {
        let phrase = data[1][i];
        preparedData.push({
          title: phrase,
          link: data[3][i],
          multitranLink: `https://www.multitran.com/m.exe?l1=1&l2=2&s=${phrase}`,
          reversoLink: `https://context.reverso.net/перевод/английский-русский/${phrase}`
        });
      }
      this.$store.state.searchList = preparedData;
      resolve();
    });
  }
  created() {
    this.input = this.$route.params.word;
    this.$watch(
      '$route.name',
      v => {
        if (v !== 'search') {
          this.$store.state.searchList.length = 0;
        }
      },
      { immediate: true }
    );
  }
  serverPrefetch() {
    if (this.input) {
      return this.request(this.input);
    }

    return Promise.resolve();
  }
  result(v: string) {
    this.input = v;
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
      text-decoration: underline;
      word-wrap: normal;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
