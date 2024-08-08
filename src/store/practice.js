//초기화
function initState(){
    return {
        count:0,
        message:""
    }
}


//상태(변수)를 관리하는 제 3의 공간이 존재
const practice={
    //state는 상태를 의미하는 객체로서 initState를 통해 상태 초기화
    state: initState,
    //mutations는 상태를 변경하기 위한 함수들의 집합
    //mutations은 컴포넌트에서 직접호출되기 보다는 actions를 통해 mutation호출
    //그 이유는 여러 mutation을 연속적으로 호출하는 등으 ㅣ경우가 있을 수 있기 때문
    mutations:{
        //state: 여기서 제공하는 문법
        increment(state){
            state.count++;
        },
        updateMsg(state, msg){
            state.message = msg;
        }

    },
    actions:{
        //아래와같이 actions의 함수를 통해 mutation함수를 호출.
        //결국 컴포넌트에서는 actions의 함수를 호출하면 됨.
        //context : practice.js 전체..?
        incrementCount(context){
            context.commit('increment');
        },
        updateMessage(context, msg){
            context.commit('updateMsg', msg);
        }


    },
    //상태(변수)를 get하기 위한 함수들의 집합
    getters:{
        getCount : state => state.count,
        getMessage: state => state.message

    }

}

export default practice;