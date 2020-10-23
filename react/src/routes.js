import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Temp from "./pages/Temp";
import PaginaInicial from "./pages/PaginaInicial";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import VisualizacaoGeral from "./pages/VisualizacaoGeral";
import FormularioMeta from "./pages/FormularioMeta.js";
import FormularioDivida from "./pages/FormularioDivida.js";
import FormularioRenda from "./pages/FormularioRenda.js";
import PerfilDeUso from "./pages/PerfilDeUso.js";
import Confirmacao from "./pages/Confirmacao.js";

const Routes = createAppContainer(
	createStackNavigator(
		{
			Temp,
			PaginaInicial,
			Login,
			Cadastro,
			VisualizacaoGeral,
			FormularioMeta,
			FormularioDivida,
			FormularioRenda,
			PerfilDeUso,
			Confirmacao,
		},
		{
			headerMode: "none",
			initialRouteName: "Temp",
		}
	)
);

export default Routes;
