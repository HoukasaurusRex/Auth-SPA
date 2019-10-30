<template>
  <section class="auth">
    <form>
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit" @click="authEmail">Submit</button>
    </form>
    <a href="http://localhost:3030/auth/google">
      <button type="button">Google</button>
    </a>
  </section>
</template>
<script>
export default {
  name: 'Auth',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async authEmail(e) {
      e.preventDefault()
      const options = {
        method: 'POST',
        body: JSON.stringify({ email: this.email, password: this.password })
      }
      const res = await fetch('http://localhost:3030/auth/email', options)
      const resBody = await res.json()
      console.log({ resBody })
    }
  }
}
</script>
<style lang="scss">
.auth {
}
</style>
