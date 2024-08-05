<template>
    <h1>생명주가 watch, updated</h1>
    <h3>watch 예제</h3>
    <div>count : {{ count }} </div>
    <button @click="incrementCount">increment button</button>
    <br>
    <h3>update 예제</h3>
    <div>message : {{ message }}</div>
    <button @click="updateMessage">update messsage</button>

</template>

<script>
export default{
    data(){
        return{
            count : 0,
            message: "hello java"

        }
    },

    //특정 변수값의 변경 사항을 인지하는 hook함수
    watch:{
        //인지하고자 하는 변수값과 일치되는 함수명
        count(){
            alert("count값 변경됨 "+this.count);
        }

    },
    //dom 객체의 변경사항을 이닞하는 hook함수 - watch보다 범위 넓음
    updated(){
        alert("dom 요소 변경됨!!!!!");
        
    },
    
    methods:{
        incrementCount(){
            this.count++;
        },
        updateMessage(){
            this.message = "helllo python. this is updated message"
        }
    }
       
}
</script>