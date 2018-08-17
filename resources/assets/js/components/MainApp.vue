<template>
  <v-app id="main">
    <!--navigation toolbar content -->
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
    
    <v-toolbar app dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Logout</v-btn>
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
    props: {
      source: String
    }
  }
</script>
