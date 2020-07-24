import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import TesteFormikCadastro from './pages/TesteFormikCadastro'; 
import VisualizacaoGeral from './pages/VisualizacaoGeral'; 

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Cadastro,
       // TesteFormikCadastro,
        VisualizacaoGeral,

    })
);

export default Routes;