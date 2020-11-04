import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Temp from "./pages/Temp";
import PaginaInicial from "./comum/PaginaInicial";
import Login from "./feature-login/Login";
import Cadastro from "./feature-login/Cadastro";
import VisualizacaoGeral from "./comum/VisualizacaoGeral";
import FormularioMeta from "./feature-login/FormularioMeta.js";
import FormularioDivida from "./feature-login/FormularioDivida.js";
import FormularioRenda from "./feature-login/FormularioRenda.js";
import PerfilDeUso from "./feature-login/PerfilDeUso.js";
import Confirmacao from "./feature-login/Confirmacao.js";
import Receitas from "./feature-movimentacoes/Receitas.js";
import Despesas from "./feature-movimentacoes/Despesas.js";
import Relatorios from "./feature-relatorios/Relatorios.js";

// Não-oficial
import Inicio from "./comum/Inicio.js";
import MovimentacaoComum from "./feature-movimentacoes/MovimentacaoComum.js";

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
			Receitas,
			Despesas,
			Relatorios,
			PerfilDeUso,
			Inicio,
			MovimentacaoComum,
		},
		{
			headerMode: "none",
			initialRouteName: "Temp",
		}
	)
);

export default Routes;
