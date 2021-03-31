import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Temp from "./pages/Temp";
import Login from "./feature-login/Login";
import Cadastro from "./feature-login/Cadastro";
import Homepage from "./feature-login/Homepage";
import Onboarding from "./feature-login/Onboarding.js";
import OnboardingMovimentacao from "./feature-login/OnboardingMovimentacao.js";

import ListaDespesas from "./feature-movimentacoes/ListaDespesas.js";
import ListaReceitas from "./feature-movimentacoes/ListaReceitas.js";
import ListaPadroes from "./feature-padroes/ListaPadroes.js";
import AdicionaMovimentacao from "./feature-movimentacoes/AdicionaMovimentacao.js";

import Relatorios from "./feature-relatorios/Relatorios.js";

import ListaDividas from "./feature-dividas/ListaDividas.js";

const Routes = createAppContainer(
	createStackNavigator(
		{
			Temp,
			Login,
			Cadastro,
			Onboarding,
			Homepage,
			ListaDespesas,
			ListaPadroes,
			ListaReceitas,
			Relatorios,
			AdicionaMovimentacao,
			ListaDividas,
			OnboardingMovimentacao,
		},
		{
			headerMode: "none",
			initialRouteName: "Login",
		}
	)
);

export default Routes;
