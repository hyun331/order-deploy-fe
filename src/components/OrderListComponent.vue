<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-cneter text-h5">
                        주문조회
                    </v-card-title>
                    <v-card-text>
                        <v-data-table :headers="tableHeaders" :items="orderList" class="elevation-1" show-expand>
                            <!-- items는 vue의 문법. items는 리스트. item이 각 요소 -->
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-btn color="red" v-if="isAdmin && item.orderStatus === 'ORDERED'"
                                    @click.stop="cancelOrder(item.id)" size="small">
                                    CANCEL
                                </v-btn>
                            </template>

                            <!-- 주문 누르면 바로 아래가 expand되면서 상세 내역이 보임 -->
                            <template v-slot:expanded-row="{ item }">
                                <v-row>
                                    <v-col>
                                        <v-list-item v-for="orderItem in item.orderDetailDtos" :key="orderItem.id">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    {{ orderItem.productName }} {{ orderItem.count }}
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-col>
                                </v-row>

                            </template>

                        </v-data-table>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
import axios from 'axios';
export default {
    props: ['isAdmin'],

    data() {
        return {
            orderList: [],
            tableHeaders: [{ title: 'ID', key: 'id', align: 'start' },
            { title: '회원email', key: 'memberEmail', align: 'start' },
            { title: '주문상태', key: 'orderStatus', align: 'start' },
            { title: 'ACTION', key: 'actions' }
            ],

        }
    },
    // 화면에서는 this. 사용하지 않아도 되지만 script에서는 사용해야함
    async created() {
        if (this.isAdmin) {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/ordering/list`);
            this.orderList = response.data.result;

        } else {
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/ordering/myorders`);
            this.orderList = response.data.result;

        }



    },
    methods: {
        async cancelOrder(id) {
            console.log(id);
            const response = await axios.patch(`${process.env.VUE_APP_API_BASE_URL}/ordering/cancel/${id}`);
            console.log(response.data);
            window.location.reload();
        }

    }
}
</script>