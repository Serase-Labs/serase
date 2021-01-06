import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Temp from "./pages/Temp";
import Login from "./feature-login/Login";
import Cadastro from "./feature-login/Cadastro";
import VisualizacaoGeral from "./comum/VisualizacaoGeral";
import Confirmacao from "./feature-login/Confirmacao.js";
import Receitas from "./feature-movimentacoes/Receitas.js";
import Despesas from "./feature-movimentacoes/Despesas.js";
import Relatorios from "./feature-relatorios/Relatorios.js";

// Não-oficial
import MovimentacaoComum from "./feature-movimentacoes/MovimentacaoComum.js";

const Routes = createAppContainer(
	createStackNavigator(
		{
			Temp,
			Login,
			Cadastro,
			VisualizacaoGeral,

			Confirmacao,
			Receitas,
			Despesas,
			Relatorios,

			MovimentacaoComum,
		},
		{
			headerMode: "none",
			initialRouteName: "Temp",
		}
	)
);

export default Routes;
