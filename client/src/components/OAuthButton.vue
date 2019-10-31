<template>
  <div class="oauth-container">
    <a class="oauth-button" :href="href">{{ name }}</a>
  </div>
</template>
<script>
export default {
  name: 'AuthButton',
  props: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  computed: {
    href() {
      return 'http://localhost:3030' + this.link
    }
  }
}
</script>
<style lang="scss" scoped>
.oauth-container {
  padding: 1rem 0;
  width: 6rem;
}
.oauth-button {
  background-color: #222;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: #eee;
  transition: 0.2s ease-in-out;

  &:hover {
    filter: opacity(0.75);
  }
}
</style>
