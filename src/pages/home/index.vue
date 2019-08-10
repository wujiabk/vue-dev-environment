<style lang="scss">
.home {
  color: blue;
}
</style>

<template>
<section class="home">{{content}}</section>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      content: 'home页面内容'
    }
  }
}
</script>