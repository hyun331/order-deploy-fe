<template>
    <v-app-bar app>
        네비게이션바
    </v-app-bar>

    <!-- <v-container, v-row, v-col></v-container>  많이 사용됨. container는 하나의 박스-->
    <v-container>
        <v-row>
            <!-- col의 총합은 12 -->
            <v-col cols="8">
                helloworld1
            </v-col>
            <v-col cols="4">
                helloworld2
            </v-col>
        </v-row>
        <v-row>
            <!-- v-card(v-card-title(제목), v-card-text(내용)와 많이 사용됨)는 카드처럼 보임. 회원가입 이러거에 많이 사용 -->
            <v-card>
                <v-card-title>
                    안내문구
                </v-card-title>
                <v-card-text>
                    안녕하세요
                </v-card-text>
            </v-card>
        </v-row>

        <!-- table 형식 -->
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>hong1</td>
                        <td>hong1@naver.com</td>
                    </tr>
                    <tr>
                        <td>hong2</td>
                        <td>hong2@naver.com</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-row>
    </v-container>
    <!-- form형식은 v-card안에 넣기 -->
    <v-card>
        <v-card-title>회원가입</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field label="email" type="email">

                </v-text-field>
                <v-text-field label="name" type="name">

                </v-text-field>

                <v-text-field label="password" type="password">
                </v-text-field>

                <v-btn color="primary">제출하기</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
    <br><br>


    <!-- click을 누르면  -->
    <v-btn @click.stop="cancel()">취소</v-btn>
    <!-- 모달창을 위한 v-dialog. v-model로 설정한 변수에 따라 움직임 -->
    <v-dialog v-model="dialog" max-width="400px">
        <v-card>
            <v-card-title>정말 취소하시겠습니까</v-card-title>
        
            <v-card-actions>
                <v-btn color="primary">확인</v-btn>
                <v-btn color="secondary" @click="dialog=false">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <br>


    <!-- reload 방식 : created 호출 가능. 만약 modeling 화면이 서버에서 데이터를 가져와야 하는 경우. reload 해야함 -->
    <v-btn href="/practice/modeling">일반(그냥 링크로 보냄)</v-btn>

    <!-- single page application. reload가 없어 빠름. created실행 안됨. -> 서버에서 데이터 가져와야 하는 경우에 사용못함... 보통 path 방식 많이 사용 -->
    <v-btn :to="{path: '/practice/modeling'}">spa 라우팅(router기능을 활용)</v-btn>
    <v-btn :to="{name: 'ModelingComponent'}">spa 라우팅(router기능을 활용) - name호출</v-btn>


</template>

<script>
export default {
    //변수설정은 : data()함수를 통해 변수 세팅
    data(){
        return{
            dialog:false,   //이게 취소 버튼을 누르면 true로 바껴야함
        }
    },
    methods:{
        cancel(){
            this.dialog=true;   //this는 data에 있는 변수를 의미
        },
    }

}
</script>  
