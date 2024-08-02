//main.js는 vue애플리케이션의 시작점. 그냥 저장만 하면 알아서 빌드
import { createApp } from 'vue'
import App from './App.vue' //App이란 파일을 가져와서
//src/router/index.js파일의 router를 사용하겠다는 선언
import router from '@/router/index.js'
import vuetify from './plugins/vuetify';

// createApp(App).mount('#app')    
//위의 코드 한줄과 아래 코드 2줄이 같음
//라우팅에 대해 설정하기 위해 나눔
// const app = createApp(App);
// app.mount('#app');

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');