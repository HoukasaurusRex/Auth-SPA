<template>
  <section>
    <form>
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit" @click="submit">Submit</button>
    </form>
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
    async submit(e) {
      e.preventDefault()
      const options = {
        method: 'POST',
        body: JSON.stringify({ email: this.email, password: this.password })
      }
      const res = await fetch('http://localhost:3030/users/auth', options)
      const resBody = await res.json()
      console.log({ resBody })
    }
  }
}
</script>
<style lang="css"></style>
