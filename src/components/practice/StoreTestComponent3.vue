<template>
    <h1>StoreComponent3</h1>
    <p>count: {{getCount}}</p>
    <p>message: {{getMessage}}</p>

</template>

<script>
import { mapGetters } from 'vuex';
export default{
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters(['getCount', 'getMessage'])
    },
    
    
}
    
</script>