<template>
  <section class="login">
    <h1><span>Login</span> or <span>Sign Up</span></h1>
    <email-auth />
    <div class="buttons">
      <o-auth-button name="LinkedIn" link="/auth/linkedin" />
      <o-auth-button name="Google" link="/auth/google" />
      <o-auth-button name="Verify" link="/auth/verify" />
    </div>
  </section>
</template>
<script>
import EmailAuth from '@/components/EmailAuth.vue'
import OAuthButton from '@/components/OAuthButton.vue'
export default {
  components: {
    EmailAuth,
    OAuthButton
  },
  data() {
    return {
      jwtToken: this.$route.query.token || this.$store.getters.getJwtPayload
    }
  },
  mounted() {
    if (this.$route.query.token) {
      this.$store.commit('setJwtPayload', this.jwtToken)
      this.jwtToken = this.$route.query.token
    }
  }
}
</script>
<style lang="scss">
.login {
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
}
.buttons {
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}
</style>
