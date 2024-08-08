<template>
   <!-- router-view를 통해 app.vue에서 화면 라우팅(전환)이 시작됨 -->


   <!-- v-app : vuetify를 사용하려면 v-app에 감싸져있어야 사용 가능 -->
   
<v-app>
  <HeaderComponent />
  <v-main> 
    <router-view />
  </v-main>
  <FooterComponent />

</v-app>

</template>


<script>

import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
export default {
  name: 'App',
  components: {

    HeaderComponent
    , FooterComponent
  }
}
</script>
<style>
@font-face {
  font-family: 'ONE-Mobile-POP';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-POP.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

*{
    font-family: 'ONE-Mobile-POP';
}
</style>
