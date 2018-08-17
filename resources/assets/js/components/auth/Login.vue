<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Login</h3>
              <v-form v-model="valid" @submit.prevent="authenticate">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  :rules="passwordRules"
                  :type="show ? 'text' : 'password'"
                  name="input-10-1"
                  label="Normal with hint text"
                  hint="At least 6 characters"
                  counter
                  @click:append="show = !show"
                ></v-text-field>
  
                <v-btn
                  :disabled="!valid"
                  type="submit"
                >
                  submit
                </v-btn>
              </v-form>
            </div>
          </v-card-title>
        </v-card>
  
        <v-alert
          :value="!!authError"
          type="error"
        >
          {{authError}}
        </v-alert>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {login} from '../../helpers/auth'
  
  export default {
    name: 'login',
    data: () => ({
      valid: false,
      show: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Name must be less than 6 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      error: null
    }),
    methods: {
      authenticate() {
        this.$store.dispatch('login')
        login(this.$data)
          .then(res => {
            this.$store.commit('loginSuccess', res)
            this.$router.push({path: '/'})
          })
          .catch(error => {
            this.$store.commit('loginFailed', {error})
          })
      }
    },
    computed: {
      authError() {
        return this.$store.getters.authError
      }
    }
  }
</script>

<style scoped>

</style>