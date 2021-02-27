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
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";
import {useState, useEffect} from "react";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd
const DATA = [
	{ titulo: "Maior Despesa", valor: "Lazer" },
	{ titulo: "Maior Salto", valor: "Alimentação" },
	{ titulo: "Maior Economia", valor: "Saúde" },
];

export default function RelatorioMensal() {
	const { user, token } = useAuth();

	const [categoria, setCategoria] = useState();
	const [isLoadingCategoria, setLoadingCategoria] = useState(true);
	const [isLoadingRelatorio, setLoadingRelatorio] = useState(true);

	useEffect(() => {
		async function fetchRelatorioMensal() {
			let url = GLOBAL.BASE_URL + "/relatorio/";
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setCategoria(json);
				setLoadingRelatorio(false);
			} catch (error) {
				console.log(error);
			}
		}
		fetchRelatorioMensal();

		async function fetchCategoria() {
			let url = GLOBAL.BASE_URL + "analise/categoria/mensal/";
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setCategoria(json.conteudo.total);
				setLoadingCategoria(false);
				console.log("IRIRIRIRI");
			} catch (error) {
				console.log(error);
			}
		}
		fetchCategoria();
		
	}, []);


	const renderizarAnalises = ({categoria}) => {
		return (
			<BotaoInformacao
				titulo={categoria.titulo}
				conteudo={categoria.valor}
				onPress={() => console.log(categoria.titulo)}
			/>
		);
	};

	return (
		<View style={tailwind("bg-white flex-1")}>
			{/* Blocos de informações estáticos */}
			<View style={tailwind("flex flex-row justify-between mx-5 mb-5")}>
			{isLoadingCategoria ? (
					<View style={tailwind("opacity-25")}>
						<Text>Loading...</Text>
					</View>
				) : (
					<View style={tailwind("py-4")}>
						{renderizarAnalises(categoria)}
					</View>
				)}
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
					data = {categoria}
					renderItem={renderizarAnalises}
					horizontal={true}
					keyExtractor={(categoria) => categoria.titulo}
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
