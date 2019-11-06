<template>
  <div>
    <form class="form">
      <label for="email">Email</label>
      <input type="email" v-model="email" placeholder="me@example.com" />
      <label for="password">Password</label>
      <input type="password" v-model="password" placeholder="Password123" />
      <button
        type="submit"
        @click="authEmail"
        :style="buttonColor"
        :disabled="isAuthenticated"
      >
        {{ status }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmailAuth',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    buttonColor() {
      return this.isAuthenticated
        ? '--button-color: hsla(163, 100%, 50%, 1);'
        : '--button-color: hsla(323, 100%, 50%, 1);'
    },
    status() {
      return this.isAuthenticated ? 'Logged In!' : 'Login'
    }
  },
  methods: {
    async authEmail(e) {
      e.preventDefault()
      if (this.isAuthenticated) {
        return
      }
      const res = await this.$store.dispatch('AUTH_LOGIN', {
        email: this.email,
        password: this.password
      })
      return res
    }
  }
}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    font-size: 1em;
    text-align: center;
  }

  input {
    border: none;
    width: 100%;
    max-width: 20rem;
    min-width: 10rem;
    padding: 0.5rem;
    margin: 1rem auto;
    border-bottom: 1px solid #666;
  }

  button {
    height: 3rem;
    width: 100%;
    max-width: 20rem;
    min-width: 10rem;
    padding: 0.5rem;
    margin: 1rem auto;
    background-color: var(--button-color);
    border: none;
    border-radius: 0.75rem;
    color: #eee;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:disabled {
      filter: opacity(0.75);
      cursor: not-allowed;
    }

    &:hover {
      filter: opacity(0.75);
    }
  }
}
</style>
