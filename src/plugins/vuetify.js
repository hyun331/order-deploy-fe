import 'vuetify/styles'
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
    //components는 vuetify에서 사용할 수 있는 ui component를 의미
    components, 
    //directives는 vuetify에서 html 요소에 행동을 부여하는데 사용
    directives
});

