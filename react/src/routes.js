import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Temp from './pages/Temp';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro'; 
import VisualizacaoGeral from './pages/VisualizacaoGeral'; 
import FormularioDividas from './pages/FormularioDividas.js';

const Routes = createAppContainer(
    createStackNavigator({
        Temp,
        Login,
        Cadastro,
        VisualizacaoGeral,
        FormularioDividas,
    }, {
        headerMode: 'none',
        initialRouteName: "Temp"
    })
);

export default Routes;