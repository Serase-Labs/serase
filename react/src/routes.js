import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Temp from "./pages/Temp";
import Login from "./feature-login/Login";
import Cadastro from "./feature-login/Cadastro";
import Homepage from "./feature-login/Homepage";
import Onboarding from "./feature-login/Onboarding.js";

import ListaDespesas from "./feature-movimentacoes/ListaDespesas.js";
import AdicionaMovimentacao from "./feature-movimentacoes/AdicionaMovimentacao.js";

import Relatorios from "./feature-relatorios/Relatorios.js";

const Routes = createAppContainer(
	createStackNavigator(
		{
			Temp,
			Login,
			Cadastro,
			Onboarding,
			Homepage,
			ListaDespesas,
			Relatorios,
			AdicionaMovimentacao,
		},
		{
			headerMode: "none",
			initialRouteName: "Temp",
		}
	)
);

export default Routes;
