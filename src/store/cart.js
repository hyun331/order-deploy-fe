//초기화
function initState(){
    return {
        // 있으면 세팅하고 없으면 빈배열. 꺼낼때 역직렬화
        productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
        totalQuantity: localStorage.getItem('totalQuantity')|| 0,
    }
}


const practice={
    state: initState,

    mutations:{
        addCart(state, product){
            const existProduct = state.productsInCart.find(p=>p.id == product.id);
            if(existProduct){
                existProduct.quantity += product.quantity;
            }else{
                state.productsInCart.push(product);
            }
            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity;
            //새로고침 되더라도 localStorage에 존재함. 넣을 땐 직렬화
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
            localStorage.setItem('totalQuantity', state.totalQuantity)
        },
        clearCart(state){
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem('productsInCart');
            localStorage.removeItem('totalQuantity');
            
        }

    },
    actions:{
        addCart(context, product){
            context.commit('addCart', product);
        },
        clearCart(context){
            context.commit('clearCart');
        }

    },
    getters:{
        // getCount : state => state.count,
        // getMessage: state => state.message
        getTotalQuantity: state=>state.totalQuantity,
        getProductsInCart : state=>state.productsInCart

    }

}

export default practice;