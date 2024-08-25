<template>
    <v-app-bar app dark>
        <v-container>
            <!-- 행의 자식 col들을 center로 정렬? -->
            <v-row align="center">
                
                 
                <!-- 왼족 정렬 -->
                <v-col class="d-flex justify-start">
                    <!-- Admin 기능 -->
                    <div v-if="userRole==='ADMIN'">
                        <v-btn :to="{path:'/member/list'}">회원관리</v-btn>
                        <v-btn :to="{path:'/product/manage'}">상품관리</v-btn>
                        <v-btn href="/order/list">실시간 주문( {{liveQuantity}} )</v-btn>
                    </div>
                </v-col>
                 
                
                <!-- 가운데 정렬 -->
                <v-col class="text-center">
                    <v-btn :to="{path:'/'}">java shop!!!</v-btn>
                </v-col>
                <!-- 오른쪽 정렬 -->
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{path:'/order/cart'}">장바구니[{{ getTotalQuantity }}]</v-btn>
                    <v-btn :to="{path:'/product/list'}">상품목록</v-btn>
                    <v-btn v-if="isLogin" :to="{path:'/mypage'}">My Page</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/member/create'}">회원가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/login'}">로그인</v-btn>
                    <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
//서버와 실시간 알림 서비스를 위한 의존성 추가 필요
import {EventSourcePolyfill} from 'event-source-polyfill';
    export default{
        data(){
            return{
                userRole: null,
                isLogin: false,
                //실시간 주문 개수 - 알림 기능을 통해
                liveQuantity : 0,
            }
        },
        computed:{
            ...mapGetters(['getTotalQuantity'])
        },
        created(){
            const token = localStorage.getItem("token");
            if(token){
                this.isLogin = true;
                this.userRole = localStorage.getItem("role");
            }

            if(this.userRole === 'ADMIN'){
                //axios가 아니므로 token을 가져가지 않음 -> 직접 세팅해주기
                let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/subscribe`, {headers: {Authorization: `Bearer ${token}`}});
                //위에서 연결 요청함 -> 서버는 connect라는 이벤트를 줌
                sse.addEventListener('connect', (event)=>{
                    console.log(event);
                })
                
                //서버에서 발행한 ordered event를 잡는다
                sse.addEventListener('ordered', (event)=>{
                    console.log(event.data);
                    this.liveQuantity ++;
                })

                //에러발생시 연결 끊기
                sse.onerror = (error) => {
                    console.log(error);
                    sse.close();
                }
            }
        },
        methods:{
            doLogout(){
                localStorage.clear();
                window.location.reload();
            }
        }
       
    }
</script>

