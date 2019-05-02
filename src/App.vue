<template>
  <div id="app">
    <Index />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Index from './components/Index.vue';

@Component({
  components: {
    Index
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
html, body {
  background: white;
  color: black;
}

@media screen and (prefers-color-scheme: dark) {
  html, body {
    background: rgb(29, 29, 29);
    color: rgba(255, 255, 255, 0.5);
  }

  input {
    border: 1px solid hsl(0, 0%, 19%);
    background: hsl(0, 0%, 7%);
    color: white;
  }
}

html[dark] {
  background: rgb(29, 29, 29);
  color: rgba(255, 255, 255, 0.5);

  body {
    background: rgb(29, 29, 29);
    color: rgba(255, 255, 255, 0.5);
  }

  input {
    border: 1px solid hsl(0, 0%, 19%);
    background: hsl(0, 0%, 7%);
    color: white;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
