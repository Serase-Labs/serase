import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Temp from "./pages/Temp";
import PaginaInicial from "./pages/PaginaInicial";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import VisualizacaoGeral from "./pages/VisualizacaoGeral";
import FormularioMetas from "./pages/FormularioMeta.js";
import FormularioDivida from "./pages/FormularioDivida.js";

const Routes = createAppContainer(
	createStackNavigator(
		{
			Temp,
			PaginaInicial,
			Login,
			Cadastro,
			VisualizacaoGeral,
			FormularioMetas,
			FormularioDivida,
		},
		{
			headerMode: "none",
			initialRouteName: "Temp",
		}
	)
);

export default Routes;
