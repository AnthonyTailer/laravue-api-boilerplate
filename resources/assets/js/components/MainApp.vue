<template>
  <v-app id="main">
    <!--navigation toolbar content -->
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app></v-toolbar>
    
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
    }
  }
</script>
