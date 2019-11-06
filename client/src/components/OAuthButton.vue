<template>
  <div class="oauth-container">
    <a class="oauth-button" :href="href" @click="onClick">{{ name }}</a>
    <p v-if="response" class="response">{{ response }}</p>
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
    path: {
      type: String
    },
    action: {
      type: String
    }
  },
  data() {
    return {
      response: null
    }
  },
  computed: {
    href() {
      return this.$store.baseURL + this.path
    }
  },
  methods: {
    async onClick(e) {
      if (!this.action) {
        return
      }
      e.preventDefault()
      const res = await this.$store.dispatch(this.action)
      this.response = res
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

.response {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  margin-top: 50px;
}
</style>
