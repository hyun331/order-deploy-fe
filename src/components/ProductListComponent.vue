<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <v-form @submit.prevent="searchProducts">

                    <v-row>
                        <v-col cols="auto">
                            <v-select
                            v-model="searchType"
                            :items="searchOptions"
                            item-title="text"
                            item-value="value"
                            >
                            

                            </v-select>
                        </v-col>

                        <v-col>
                            <v-text-field
                                v-model="searchValue" label="Search"
                            >

                            </v-text-field>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn type="submit">
                                검색
                            </v-btn>
                            
                        </v-col>
                    
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto" v-if="!isAdmin">
                <v-btn color="secondary" @click="addCart" class="mr-2">장바구니</v-btn>
                <v-btn color="success" @click="createOrder">주문하기</v-btn>
            </v-col>

            <v-col cols="auto" v-if="isAdmin">
                <v-btn href="/product/create" color="success">상품등록</v-btn>    
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h6 text-center" style="font-family: ONE-Mobile-POP;">
                        {{pageTitle}}
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th v-if="!isAdmin">주문수량</th>
                                    <th v-if="!isAdmin" class="text-center">주문선택</th>
                                    <th v-if="isAdmin">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList " :key="p.id">
                                    <td><v-img :src="p.imagePath" style="height: 100px; width:auto;"></v-img></td>
                                    <td>{{p.name}}</td>
                                    <td>{{p.price}}</td>
                                    <td>{{p.stockQuantity}}</td>
                                    <td>
                                        <!-- quantity : 원래는 product p에 quantity가 없지만 아래에서 세팅해줘서 사용 가능해짐 -->
                                        <v-text-field
                                        v-model.number="p.quantity"
                                        type="number"
                                        style="width: 70px;">

                                        </v-text-field>
                                    </td>
                                    <td class="text-center" v-if="!isAdmin">
                                        <input type="checkbox" v-model="selected[p.id]">
                                    </td>
                                    <td v-if="isAdmin"><v-btn color="red" @click="deleteProduct(p.id)">삭제</v-btn></td>
                                </tr>
                            </tbody>

                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default{
    computed:{
        ...mapGetters(['getProductsInCart'])
    },
    props:['isAdmin', 'pageTitle'],
    data(){
        return{

            //검색
            searchType:"optional",
            searchOptions:[
                {text:"선택", value:"optional"},
                {text:"상품명", value:"name"},
                {text:"카테고리", value:"category"}
            ],
            searchValue: "",

            //페이지네이션
            productList:[],
            //한번에 5개씩 받아온다
            pageSize: 5,
            //현재 페이지
            currentPage:0,
            isLastPage: false,
            isLoading: false,

            //selected예시- 1, 4번 상품 선택시
            // 1:true   
            // 2:false
            // 3:false  
            // 4:true   
            selected:{}


            
        }
        
    }, 
    created(){
        this.loadProduct();
        window.addEventListener('scroll', this.scrollPagination);
    },
    beforeUnmount(){
        window.removeEventListener('scroll', this.scrollPagination);
    },

    methods:{
        searchProducts(){
            this.productList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            // this.isLoading = false;

            this.loadProduct();
        },
        deleteProduct(productId){
            alert(productId);
        },
        async loadProduct(){
            try{
                if(this.isLoading || this.isLastPage){
                    return;
                }

                this.isLoading=true;
                //pageable 객체에 맞게 parameter방식으로 데이터를 전송해줘야함.(pagesize,currentPage 데이터들)
                //방법 1 - {params:{page:10, size:2}}와 같은 형식으로 전송시 parameter 형식으로 변환되어 서버로 전송
                    //url에 ? 달고 들어감
                //방법 2 - formData객체를 생성하여 서버로 데이터 전송
                let params ={
                    size: this.pageSize,
                    page: this.currentPage,
                };

                //params : {size:5, page=0, category:"fruits"}형태 또는{size:5, page=0, name:"apple"}
                if(this.searchType === 'name'){
                    params.searchName = this.searchValue;
                }else if(this.searchType === 'category'){
                    params.category = this.searchValue;
                }
                //localhost:8080/product/list?category=fruits&size=5&pag0
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params});
                //product에 quantity라는 컬럼이 추가된 느낌?
                const additionalData = response.data.result.content.map(p => ({...p, quantity:0}));
            
                this.isLastPage = response.data.isLastPage;
                // if(additionalData.length==0){
                //     this.isLastPage = true;
                //     return;
                // }
                //두 배열을 합치는 문법
                this.productList =[...this.productList, ...additionalData];
                this.currentPage++;
                this.isLoading = false;
                console.log(response.data);
            }catch(e){
                console.log(e);
            }
            
        },
        scrollPagination(){
            //스크롤하면 event 발생
            //"현재화면 + 스크롤로 이동한 화면 > 전체화면 - n"의 조건이 성립되면 추가 데이터 로드

            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if(isBottom && !this.isLastPage && !this.isLoading){
                this.loadProduct();
            }
        },

        addCart(){  //장바구니. orderProducts를 전역 관리
            const orderProducts = Object.keys(this.selected).filter(key=>this.selected[key])
            .map(key=>{
                const product = this.productList.find(p => p.id == key)
                return {id:product.id, name:product.name, quantity:product.quantity};
            });
            orderProducts.forEach(p=> this.$store.dispatch('addCart', p));
            console.log(this.getProductsInCart);
            // window.location.reload();
            
        },
        async createOrder(){
            //선택된 keys들에 filter를 걸어 selected된 것들만 골리하
            const orderProducts = Object.keys(this.selected).filter(key=>this.selected[key])
            .map(key=>{
                const product = this.productList.find(p => p.id == key)
                return {productId:product.id, productCount:product.quantity};
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
                window.location.reload();

            }catch(e){
                alert("주문 실패");
                console.log(e);
            }
        }

    }
    

}

</script>