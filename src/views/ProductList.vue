<template>
    <!-- productListComponent를 가져다 쓴다는 의미 -->
     <!-- 문자열로 props 넘길 때는 변수명=, 그 외는 :변수명= -->
    <ProductListComponent
    :isAdmin="false"
    pageTitle="상품목록"
    />
</template>

<script>
import ProductListComponent from '@/components/ProductListComponent.vue';
export default{
    components:{
        ProductListComponent
    },
    data(){
        return{

        }
    },
    
}
</script>