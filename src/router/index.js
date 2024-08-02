import {createRouter, createWebHistory} from 'vue-router';
//@ == src. 즉 루트폴더 경로다
//파일 내부에 export default가 있는 경우에는 {}가 필요없고, 없으면 {}
//import 하는 요소가 여러 개 있을 때에도 {} 붙임
// import HomeComponent from '@/components/HomeComponent.vue';
// import TestComponent from '@/components/TestComponent.vue';


import { practiceRouter } from './practiceRouter';

const routes = [
    // {
    //     // home으로 오면 homecomponent로 보내겠다
    //     path: '/home',  //path로도 라우팅 가능
    //     name: 'HOME',   //name으로도 라우팅 가능. 단 js 코드내에서 라우팅 하는 경우만
    //     component: HomeComponent
    // },
    // {   path: "/test",
    //     name: "TEST",
    //     component: TestComponent

    // }
    
    //practiceRouter에 있는 요소를 가져다가 여기에 붙임
    ...practiceRouter

]

// vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
// 1)createWebHistory( : /home), 2)createHashHistory( :/#/home)
// 대부분 webHistory 사용
const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;