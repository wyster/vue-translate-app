<template>
  <div id="app">
    <div :class="$style.nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  background: white;
  color: white;
  font-size: 4vh;
}

a {
  color: white;

  &:hover,
  &:active,
  &:focus {
    color: darkgray;
  }
}

@media screen and (prefers-color-scheme: dark) {
  html,
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

<style lang="less" module>
.nav {
  font-size: 3vh;
  margin-bottom: 5vh;

  a {
    display: inline-block;
    background-color: hsl(0, 0%, 19%);
    padding: 10px;
    color: hsla(0, 0%, 100%, 0.5);
    text-decoration: none;

    &:hover {
      color: hsla(0, 0%, 100%, 0.6);
    }
  }
}
</style>
