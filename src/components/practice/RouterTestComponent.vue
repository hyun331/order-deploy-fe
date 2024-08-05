<template>
    <h1>화면 라우팅 테스트</h1>
    <div>
        <button @click="spaMove1">modeling 페이지 이동(url 이용)</button>

    </div>
    <div>
        <button @click="spaMove2">modeling 페이지 이동(name 이용)</button>

    </div>
    <div>
        <button @click="hrefMove">modeling 페이지 이동(href)</button>

    </div>
    <div>
        <button @click="reloadPage">현재화면 reload</button>

    </div>
</template>

<script>

export default{
    data(){
        return{

        }
    },
    methods:{
        //router를 통한 spa방식은 created함수가 실행되지 않음 -> 데이터 못받아옴
        spaMove1(){
            this.$router.push("/practice/modeling");
        },
        spaMove2(){
            this.$router.push({name: "ModelingComponent"});

        },
        hrefMove(){
            window.location.href='/practice/modeling'
        },
        reloadPage(){
            window.location.reload();

        }
    }
    
}
</script>
