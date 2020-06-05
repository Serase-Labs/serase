import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import VisualizacaoGeral from './pages/VisualizacaoGeral'; 

const Routes = createAppContainer(
    createSwitchNavigator({
        VisualizacaoGeral,
    })
);

export default Routes;