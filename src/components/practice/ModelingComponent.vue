<template>
    <!-- html요소의 동적 값 표시 -->
     <!-- html요소 안에 중괄호를 두번 사용항으로서 script에 정의된 변수값을 화면에 표시한다. -->
     <h1>hello world {{ language }}</h1>

    <!-- :value 문법 사용하면 단방향 데이터 바인딩 -->
    <input type="text" :value="value1">

    <!-- v-model은 양방향 데이터 바인딩함 -->
    <!-- 여기서 바꾸면 data()의 value2도 변경 -->
    <input type="text" v-model="value2">
    <button @click="showValue">변수변경사항 확인</button>

    <h1>{{count}}</h1>
    <button @click="increment">increment</button>
    <br>

    <!-- count값이 증가하면 count의 2배가 되도록. count에 의존적임 -->
    <!-- doubleCount는 함수임. return 값이 나오는 것 -->
    <h1>{{doubleCount}}</h1>


    <input type="number" v-model="count2">
    <button @click="increment2">increment2</button>


</template>

<script>
    export default{
        data(){
            return{
                language: "python",
                value1: "python",
                value2: "java",
                count: 0,
                count2: 0
            }
        },
        // computed는 종속된 반응형 데이터가 변경될 때에 함수를 다시 실행하여 값을 계산하는 함수
        computed: {
            doubleCount(){
                return this.count * 2;
            }
        },
        methods:{
            showValue(){
                alert(this.value2)
            },
            increment(){
                this.count+=1;
            },
            increment2(){
                this.count2+=1;
            }
        }
    }
</script>