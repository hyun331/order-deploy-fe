<template>
    <v-container>
        <v-row>
            <v-row justify="center">
                <v-col cols="12" sm="6" md="8">
                    <v-card>
                        <v-card-title class="text-h5 text-center">LOGIN</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent="doLogin">

                                <v-text-field label="email" v-model="email" type="email" prepend-icon="mdi-email"
                                    required>
                                </v-text-field>

                                <v-text-field label="password" v-model="password" prepend-icon="mdi-lock"
                                    type="password" required>
                                </v-text-field>
                                <v-row>
                                    <v-col cols="6">
                                        <v-btn color="secondary" @click="showPasswordModal" block>비밀번호 변경</v-btn>

                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn type="submit" color="primary" block>LOGIN</v-btn>
                                    </v-col>


                                </v-row>


                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-row>
        <!-- resetPassword가 true가 될 때 해당 모달창이 보여짐 -->
         <!-- @update:dialog : 모달 컴포넌트가 @update:dialog라는 이벤트를 발생시킬 때 실행될 이벤트 핸들러를 정의 -->
          <!-- $event는 자식 요소로부터 전달된 값. true/fasle가 모달로부터 전달 -->
        <ResetPasswordModal 
        v-model="resetPassword" @update:dialog="resetPassword = $event">

        </ResetPasswordModal>
    </v-container>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
//modal 가져다 쓰는 방법
import ResetPasswordModal from './ResetPasswordModal.vue';
export default {
    components:{
        ResetPasswordModal
    },
    data() {
        return {
            email: "",
            password: "",
            resetPassword: false,

        }
    },
    methods: {
        async doLogin() {
            try {
                const LoginData = {
                    email: this.email,
                    password: this.password
                };
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, LoginData);
                console.log(response.data);
                // console.log(response.data.error_message);
                //localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰값 저장
                const token = response.data.result.token;

                const refreshToken = response.data.result.refreshToken;
                //페이로드에 있는 role 가져오려면 decode 해야함
                const role = jwtDecode(token).role;
                // console.log(jwtDecode(token);
                //key value 형식으로 저장
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('role', role);

                //this.$router.push() 사용불가 -> header를 제외한 안쪽에만 reload되기 때문에 header가 고쳐지지 않음
                // this.$router.push("/");
                window.location.href = '/';

            } catch (e) {
                console.log("heeer")
                console.log(e);

            }
        },
        showPasswordModal(){
            this.resetPassword = true;
        }
    }

}
</script>
