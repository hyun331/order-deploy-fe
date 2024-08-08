<template>
    <h1>StoreComponent1</h1>
    <StoreTestComponent2/>
    <StoreTestComponent3/>

</template>


<script>
    import StoreTestComponent2 from './StoreTestComponent2.vue';
    import StoreTestComponent3 from './StoreTestComponent3.vue';

    export default{
        components:{
            StoreTestComponent2,
            StoreTestComponent3
        }
    }
</script>