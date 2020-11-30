// Esse arquivo abriga a interface e as chamadas
// de componentes necessários para toda a
// funcionalidade de relatórios mensais.
import * as React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from "react-native";
import tailwind from "tailwind-rn";

// Componentes Internos
import IconeDespesa from "../comum/assets/IconeDespesa";
import IconeReceita from "../comum/assets/IconeReceita";
import BotaoInformacao from "../comum/components/BotaoInformacao";
import BlocoInformacao from "../comum/components/BlocoInformacao";
import TabDescricao from "../comum/components/TabDescricao";
import GraficoSaldoAnual from "./components/GraficoSaldoAnual";
import GraficoDespesaCategoria from "./components/GraficoDespesaCategoria";
import GraficoDespesaPadrao from "./components/GraficoDespesaPadrao";

// Componentes Externos

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd

const DATA = [
	{ titulo: "Conta de Luz", valor: 12 },
	{ titulo: "Telefone Fixo", valor: 50 },
	{ titulo: "Spotify", valor: 26 },
];

////////

export default function RelatorioAnual() {
	const renderizarAnalises = ({ item }) => {
		return (
			<BotaoInformacao
				titulo={item.titulo}
				conteudo={`Média: R$${item.valor}`}
				onPress={() => console.log(item.titulo)}
			/>
		);
	};

	return (
		<View style={tailwind("bg-white flex-1")}>
			{/* Blocos de informações estáticos */}
			<View style={tailwind("flex flex-row justify-between mx-5 mb-5")}>
				<BlocoInformacao titulo="Gasto Total" conteudo="R$1200" />
				<BlocoInformacao titulo="Receita Total" conteudo="R$2000" />
				<BlocoInformacao titulo="Fluxo Total" conteudo="+R$800" />
			</View>

			{/* Gráfico de despesa semanal */}
			<View style={tailwind("border-b border-t border-gray-100 py-4")}>
				<View style={tailwind("mx-6 mb-4")}>
					<Text
						style={tailwind("text-lg font-bold text-gray-800 mb-2")}
					>
						Saldo
					</Text>
					<Text style={tailwind("text-base text-gray-800")}>
						A variação dos seus saldos ao longo do ano.
					</Text>
				</View>

				<GraficoSaldoAnual />
			</View>

			{/* Seção de despesas fixas clicáveis */}
			<View style={tailwind("border-b border-t border-gray-100 py-4")}>
				<View style={tailwind("mx-6 mb-4")}>
					<Text
						style={tailwind("text-lg font-bold text-gray-800 mb-2")}
					>
						Despesas Fixas
					</Text>
					<Text style={tailwind("text-base text-gray-800")}>
						Como as suas despesas fixas variaram ao longo do ano.
					</Text>
				</View>

				<FlatList
					style={tailwind("ml-4")}
					data={DATA}
					renderItem={renderizarAnalises}
					horizontal={true}
					keyExtractor={(item) => item.titulo}
				/>
			</View>

			{/* Gráficos das despesas vão vir aqui */}

			{/* Seção de gráficos gerais */}
			<View style={tailwind("border-t border-gray-100 py-4 px-6 mb-10")}>
				<Text style={tailwind("mb-5 text-lg font-bold text-gray-800")}>
					Gráficos
				</Text>

				<TabDescricao
					conteudo="Despesas por categoria"
					descricao="Suas categorias de maior gasto neste ano."
				>
					<GraficoDespesaCategoria />
				</TabDescricao>

				<TabDescricao
					conteudo="Despesas por padrão"
					descricao="Sua proporção de gasto em tipos de despesa."
				>
					<GraficoDespesaPadrao />
				</TabDescricao>
			</View>
		</View>
	);
}
