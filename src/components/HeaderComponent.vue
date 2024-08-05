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
                        <v-btn :to="{path:'/order/list'}">실시간 주문</v-btn>
                    </div>
                </v-col>
                 
                
                <!-- 가운데 정렬 -->
                <v-col class="text-center">
                    <v-btn to:="{path:'/'}">java shop</v-btn>
                </v-col>
                <!-- 오른쪽 정렬 -->
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{path:'/ordercart'}">장바구니</v-btn>
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
    export default{
        data(){
            return{
                userRole: null,
                isLogin: false,
            }
        },
        created(){
            const token = localStorage.getItem("token");
            if(token){
                this.isLogin = true;
                this.userRole = localStorage.getItem("role");
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
