<template>
    <h1>StoreComponent2</h1>
    <p>count: {{getCount}}</p>
    <v-btn  color="green" @click="incrementCount">increment count</v-btn>

    <input type="text" v-model="message">
    <v-btn color="red" @click="updateMessage">update Message</v-btn>


</template>

<script>
import {mapGetters} from 'vuex';

export default{
    data(){
        return{
            count : 0,
            message : ""
        }
    },
    //참조되는 변수가 바뀌면 실행되는 함수
    computed:{
        ...mapGetters(['getCount']),
    },
    methods:{
        incrementCount(){
            // this.count++;
            // 전역적 상태인 count를 바라봄 -> store/practice.js의 actions를 호출
            this.$store.dispatch('incrementCount')
        },
        updateMessage(){
            this.$store.dispatch('updateMessage', this.message)

        }
    }
}
    
</script>