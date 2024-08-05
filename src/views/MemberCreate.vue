<template>
    <v-container>
        <v-container>
            <v-row>
                <!-- 중앙 정렬 -->
                <v-row justify="center">
                    <!-- sm : 화켠 크기가 small 이상일때(스마트폰, 테블릿)  -->
                    <!-- md : 화면크기가 medium이상일 때 (데스크탑) -현재 화면-->
                    <v-col cols="12" sm="6" md="8">
                        <v-card>
                            <v-card-title class="text-h5 text-center">회원가입</v-card-title>
                            <v-card-text>
                                <!-- type 미지정시 text로 default됨 -->
                                <v-form @submit.prevent="memberCreate">
                                    <v-text-field label="이름" v-model="name" prepend-icon="mdi-account" required>
                                    </v-text-field>

                                    <v-text-field label="email" v-model="email" type="email" prepend-icon="mdi-email"
                                        required>
                                    </v-text-field>

                                    <v-text-field label="password" v-model="password" prepend-icon="mdi-lock"
                                        type="password" required>
                                    </v-text-field>

                                    <v-text-field label="도시" v-model="city" prepend-icon="mdi-city">
                                    </v-text-field>

                                    <v-text-field label="상세주소" v-model="street" prepend-icon="mdi-home">
                                    </v-text-field>

                                    <v-text-field label="우편변호" v-model="zipcode" prepend-icon="mdi-mailbox">
                                    </v-text-field>
                                    <v-btn type="submit" color="primary" block>등록</v-btn>


                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            city: "",
            street: "",
            zipcode: ""

        }
    },
    methods: {
        // 등록버튼 누르면 서버에 정보를 보내야함
        async memberCreate() {
            try {
                const registerData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    address:{
                        city: this.city,
                        street: this.street,
                        zipcode: this.zipcode
                    }
                    

                }
                //axios는 비동기이므로 async, await를 붙이지 않으면 바로 this.$router...거기로감
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, registerData);
                this.$router.push("/");
            }catch(e){
                const error_message = e.response.data.error_message;
                console.log(error_message);
                alert(error_message);
            }
            
        }
    }

}
</script>
