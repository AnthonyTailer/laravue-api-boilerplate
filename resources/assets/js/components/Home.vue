<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md6>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Batata</h3>
              <div>{{welcome}}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Home",
    computed: {
      welcome() {
        return this.$store.getters.welcome
      }
    }
  }
</script>

<style scoped>

</style>