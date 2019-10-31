<template>
  <div>
    <form class="form">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit" @click="authEmail">Submit</button>
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
    background-color: tomato;
    border: none;
    border-radius: 0.75rem;
    color: #eee;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      filter: opacity(0.75);
    }
  }
}
</style>
