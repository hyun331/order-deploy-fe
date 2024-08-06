//main.js는 vue애플리케이션의 시작점. 그냥 저장만 하면 알아서 빌드
import { createApp } from 'vue'
import App from './App.vue' //App이란 파일을 가져와서
//src/router/index.js파일의 router를 사용하겠다는 선언
import router from '@/router/index.js'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios';
import './styles.css';

// createApp(App).mount('#app')    
//위의 코드 한줄과 아래 코드 2줄이 같음
//라우팅에 대해 설정하기 위해 나눔
// const app = createApp(App);
// app.mount('#app');

const app = createApp(App);

//axios요청 인터셉터를 설정하여 모든 요청에 엑세스 토큰을 포함
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;

        }
        return config;
    },
    error => {
        //에러나면 해당인터셉터 무시되고 사용자의 본래 요청인 화면으로 라우팅
        return Promise.reject(error);
    }

)

//401 응답을 받을 경우에 interceptor를 통해 전역적으로 rt를 통한 at 재발급
//만약 rt도 401 응답을 받ㅇ르 경우에 로그아웃 -> token 제거 후 login 화면으로 redirect
//at가 만료됨 -> rt를 보내서 토큰 재발급 -> 사용자는 이 과정을 모르게해야함
axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            try {
                localStorage.removeItem('token');
                //{"refreshToken" : ...} 이렇게 들어감
                //refresh token이 만료되면 아래 코드에서 에러남
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-token`, { refreshToken });
                console.log(response.data.result.token);
                localStorage.setItem('token', response.data.result.token);
                window.location.reload();
            }catch(e){
                //refresh token 만료되면 로그인해야함
                localStorage.clear();
                window.location.href = "/login";
            }
            
        }
    }
)



app.use(router);
app.use(vuetify);
app.mount('#app');