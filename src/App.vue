<template>
  <!-- <HelloWorld /> -->
   <!-- router-view를 통해 app.vue에서 화면 라우팅(전환)이 시작됨 -->
   <!-- <HeaderComponent /> -->

   <!-- v-app : vuetify를 사용하려면 v-app에 감싸져있어야 사용 가능 -->
<v-app>
  <v-main> <!--컨텐츠 구역이다-->
    <router-view />
  </v-main>
</v-app>
   <!-- <FooterComponent /> -->

</template>


<script>

// import HelloWorld from './components/HelloWorld.vue'
// import HeaderComponent from './components/HeaderComponent.vue'
// import FooterComponent from './components/FooterComponent.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld
    // HeaderComponent, FooterComponent
  }
}
</script>

<style>

</style>
