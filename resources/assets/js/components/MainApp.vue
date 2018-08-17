<template>
  <v-app id="main">
    <!--navigation toolbar content -->
    <template v-if="currentUser">
      <v-navigation-drawer app v-model="drawer" fixed>
        <v-list dense>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </template>
    
    <v-toolbar app dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="currentUser"></v-toolbar-side-icon>
      <v-toolbar-title>PotatoVue</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        
        <template v-if="!currentUser">
          
          <v-btn flat>
            <router-link to="/login">Login</router-link>
          </v-btn>
          <v-btn flat>
            <router-link to="/register">Register</router-link>
          </v-btn>
        
        </template>
        <template v-else>
          
          <v-btn flat @click.prevent="logout">Logout</v-btn>
        
        </template>
      </v-toolbar-items>
    </v-toolbar>
    
    <!--Main content app-->
    <v-content id="content">
      <router-view/>
    </v-content>
    
    <!-- footer content-->
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'main-app',
    mounted() {
      console.log('Component mounted.')
    },
    data: () => ({
      drawer: null
    }),
    methods: {
      logout() {
        this.$store.commit('logout')
        this.$router.push('/login')
      }
    },
    computed:{
      currentUser(){
        return this.$store.getters.currentUser
      }
    },
    props: {
      source: String
    }
  }
</script>
