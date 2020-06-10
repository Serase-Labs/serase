import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import VisualizacaoGeral from './pages/VisualizacaoGeral'; 

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        VisualizacaoGeral,
    })
);

export default Routes;