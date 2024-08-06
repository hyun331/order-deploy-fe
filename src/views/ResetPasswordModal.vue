<template>
    <v-dialog max-width="500px">


        <v-card>
            <v-card-title class="text-h5 text-center">비밀번호 변경</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="resetPassword">

                    <v-text-field label="기존 비밀번호" 
                    v-model="asIsPassword" 
                    prepend-icon="mdi-lock" type="password" required>
                    </v-text-field>

                    <v-text-field label="신규 비밀번호" v-model="toBePassword" prepend-icon="mdi-lock" type="password" required>
                    </v-text-field>
                    <v-btn color="primary" type="submit" block>비밀번호 변경 요청</v-btn>
                    <v-btn color="secondary" @click="closeModal" block>닫기</v-btn>

                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default{
    data(){
        return{
            email: "",
            asIsPassword: "",
            toBePassword: "",
        }
    },
    methods: {
        async resetPassword(){

        },
        closeModal(){
            // this.emit은 vue에서 컴포넌트간에 이벤트를 전달하는 메커니즘
            //자식 컴포넌트에서 this.$emit을 호출하면 update:dialog라는 이벤트 실행되고 false가 부모컴포넌트로 전달됨
            this.$emit('update:dialog', false)
        }
    },


}

</script>