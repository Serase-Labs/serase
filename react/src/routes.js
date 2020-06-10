import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro'; 
import VisualizacaoGeral from './pages/VisualizacaoGeral'; 

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Cadastro,
        VisualizacaoGeral,
    })
);

export default Routes;