<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        상품등록
                    </v-card-title>
                    <v-card-text>
                        <!-- 기본적인 submit을 막고 productCreate()를 실행한다. -->
                        <v-form @submit.prevent="productCreate">
                            <v-text-field label="상품명" v-model="name" required></v-text-field>
                            <v-text-field label="카테고리" v-model="category" required></v-text-field>
                            <v-text-field label="가격" v-model="price" required></v-text-field>
                            <v-text-field label="재고수량" v-model="stockQuantity" required></v-text-field>

                            <!-- 상품 이미지. accept="image/*" -> 이미지로 고정 -->
                             <!-- 이미지 변경되면 처리 ->  @change="fileUpdate"-->
                            <v-file-input
                            label="상품이미지"
                            accept="image/*"
                            @change="fileUpdate"
                            required
                            ></v-file-input>

                            <v-btn type="submit" color="primary" block>등록</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: "",
            category: "",
            price: null,
            stockQuantity: null,
            productImage: null,


        }
    },
    methods:{
        async productCreate(){
            try{
                //form-data형식으로 보내기!
                let registerData = new FormData();
                registerData.append("name", this.name);
                registerData.append("eamil", this.email);
                registerData.append("price", this.price);
                registerData.append("stockQuantity", this.stockQuantity);
                registerData.append("productImage", this.productImage);
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/product/create`, registerData);
                console.log(response.data.result);
                this.$router.push('/product/manage');
            }catch(e){
                alert("상품등록 실패");
                
            }
            



        },
        fileUpdate(event){
            this.productImage = event.target.files[0];
        }
    }

}
</script>