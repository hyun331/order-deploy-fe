<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        회원목록
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="tableHeaders"
                        :items="memberList">

                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            </v-row>
    </v-container>


</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            // thead의 th와 같은 느낌. align - 정렬 기능!
            tableHeaders:[{title:'ID', key: 'id', align:'start'},
            {title:'NAME', key: 'name', align:'start'},
            {title:'EMAIL', key:'email', align:'start'}],
            memberList:[]
        }
    },
    async created(){
        //토큰을 같이 보내야함
        const token = localStorage.getItem('token');
        //{headers: {Authorization: 'Bearer 토큰값', ....}}
        const headers = {Authorization: `Bearer ${token}`};
        // headers : headers로 나감 {"headers":headers} == {headers}
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`, {"headers":headers});
        // pageing 처리 되어있어서 content로 가져와야함. postman으로 test후 실행해보기
        this.memberList = response.data.result;
    }
}
</script>