<template>
    <v-container>
        <v-row justify="center">
            <v-col class="text-center">
                장바구니 목록
            </v-col>
        </v-row>
        <v-row justify="space-between">
            <v-col cols="auto">
                <v-btn @click="clearCart" color="orange"> 장바구니 비우기</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn @click="orderCreate" color="green">주문하기</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-table>
                    <thead>
                        <tr>
                            <th>제품ID</th>
                            <th>제품명</th>
                            <th>주문수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in getProductsInCart" :key="product.id">
                            <td>{{product.id}}</td>
                            <td>{{product.name}}</td>
                            <td>{{product.quantity}}</td>
                            
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import axios
 from 'axios';
export default{
    computed:{
        ...mapGetters(['getProductsInCart'])
    },
    methods:{
        clearCart(){
            //store에서 삭제해야함
            this.$store.dispatch('clearCart');

        },
        async orderCreate(){
            // return {productId:product.id, productCount:product.quantity};
            const orderProducts = this.getProductsInCart.map(p=>{
                return {productId:p.id, productCount:p.quantity};

            });

            if(orderProducts.length<1){
                alert("주문 대상 물건이 없습니다.");
                return;
            }
            const yesOrNo = confirm(`${orderProducts.length}개의 상품을 주문하시겠습니까?`);
            if(!yesOrNo){
                console.log("주문 취소되었습니다.");
                return;
            }
            
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, orderProducts);
                alert("정상 주문 완료");
                this.clearCart();
                window.location.href="/";

            }catch(e){
                alert("주문 실패");
                console.log(e);
            }
        }

    }
}
</script>