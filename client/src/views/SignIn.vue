<template>
  <section class="login">
    <h1>Authentication SPA</h1>
    <email-auth />
    <div class="buttons">
      <o-auth-button name="LinkedIn" path="/auth/linkedin" />
      <o-auth-button name="Google" path="/auth/google" />
      <o-auth-button name="Verify" action="AUTH_VERIFY" />
      <o-auth-button name="Logout" action="AUTH_LOGOUT" />
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
