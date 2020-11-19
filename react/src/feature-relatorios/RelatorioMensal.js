// Esse arquivo abriga a interface e os chamadas
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
import GraficoDespesaCategoria from "./components/GraficoDespesaCategoria";
import GraficoDespesaPadrao from "./components/GraficoDespesaPadrao";
import GraficoDespesaFrequencia from "./components/GraficoDespesaFrequencia";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd
const DATA = [
	{ titulo: "Maior Despesa", valor: "Lazer" },
	{ titulo: "Maior Salto", valor: "Alimentação" },
	{ titulo: "Maior Economia", valor: "Saúde" },
];

/////////

export default function RelatorioSemanal() {
	const renderizarAnalises = ({ item }) => {
		return (
			<BotaoInformacao
				titulo={item.titulo}
				conteudo={item.valor}
				onPress={() => console.log(item.titulo)}
			/>
		);
	};

	return (
		<View style={tailwind("bg-white")}>
			{/* Blocos de informações estáticos */}
			<View style={tailwind("flex flex-row justify-between mx-5 mb-5")}>
				<BlocoInformacao titulo="Gasto Total" conteudo="R$1200" />
				<BlocoInformacao titulo="Receita Total" conteudo="R$2000" />
				<BlocoInformacao titulo="Fluxo Total" conteudo="+R$800" />
			</View>

			{/* Blocos de informações clicáveis */}

			<View style={tailwind("border-b border-t border-gray-100 py-4")}>
				<View style={tailwind("mx-6 mb-4")}>
					<Text style={tailwind("text-lg font-bold text-gray-800")}>
						Análises
					</Text>
					<Text style={tailwind("text-base text-gray-800")}>
						Em relação a última semana.
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

			{/* Gráfico de despesa semanal */}
			<View
				style={tailwind("border-b border-t border-gray-100 py-4 px-6")}
			>
				<Text style={tailwind("mb-5 text-lg font-bold text-gray-800")}>
					Gráficos
				</Text>

				<TabDescricao
					conteudo="Despesas por categoria"
					descricao="Suas áreas de maior gasto este mês."
				>
					<GraficoDespesaCategoria />
				</TabDescricao>

				<TabDescricao
					conteudo="Despesas por padrão"
					descricao="Seus gastos em despesas fixas e variáveis."
				>
					<GraficoDespesaPadrao />
				</TabDescricao>
				<TabDescricao
					conteudo="Frequência de despesas"
					descricao="Distribuição dos seus gastos pelo mês."
				>
					<GraficoDespesaFrequencia />
				</TabDescricao>
			</View>

			{/* Seção de redirecionamento1*/}
			<View
				style={tailwind(
					"mt-4 mb-12 mx-5 py-4 bg-gray-100 flex items-center rounded-md"
				)}
			>
				<Text
					style={tailwind(
						"my-4 text-base text-gray-500 w-64 text-center"
					)}
				>
					Veja todas as suas despesas da semana em detalhes.
				</Text>

				<View
					style={tailwind("flex flex-row w-56 justify-between mb-3")}
				>
					<TouchableOpacity
						style={[
							tailwind(
								"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
							),
							{ elevation: 2 },
						]}
						onPress={() => navigation.navigate("Receitas")}
					>
						<View style={tailwind("w-8 h-8 mb-1")}>
							<IconeReceita uso="sistema" />
						</View>
						<Text
							style={[
								tailwind("text-base text-blue-900"),
								{ fontWeight: "bold" },
							]}
						>
							Receitas
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							tailwind(
								"w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md"
							),
							{ elevation: 1 },
						]}
						onPress={() => navigation.navigate("Despesas")}
					>
						<View style={tailwind("w-8 h-8 mb-1")}>
							<IconeDespesa uso="sistema" />
						</View>
						<Text
							style={[
								tailwind("text-base text-blue-900"),
								{ fontWeight: "bold" },
							]}
						>
							Despesas
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
