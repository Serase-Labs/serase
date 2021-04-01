// Esse arquivo abriga a interface e os chamadas
// necessárias para todo a funcionalidade
// de relatórios semanais.

import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import tailwind from "tailwind-rn";

//Componentes Internos
import IlustracaoLoading from "../comum/assets/IlustracaoLoading";
import IconeDespesa from "../comum/assets/IconeDespesa";
import IconeReceita from "../comum/assets/IconeReceita";
import BotaoInformacao from "../comum/components/BotaoInformacao";
import BlocoInformacao from "../comum/components/BlocoInformacao";
import GraficoDespesaSemanal from "./components/GraficoDespesaSemanal";
import {ModalInformativa, TextoPrincipal, TextoInformativo} from "../comum/components/ModalInformativa";

import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth";

// Componentes Externos
import { StackedBarChart } from "react-native-chart-kit";

const DICIONARIO = {
	"maior_despesa": "Maior Despesa",
    "maior_salto": "Maior Salto",
    "maior_economia": "Maior Economia"
}

/////////

export default function RelatorioSemanal() {
	const { user, token } = useAuth();
	const [relatorio, setRelatorio] = useState({});
	const [isLoadingRel, setLoadingRel] = useState(true);

	const converteAnalise = analises =>{
		return Object.entries(analises).map(([titulo, valor])=>{
			return {
				titulo: (titulo in DICIONARIO)? DICIONARIO[titulo] : titulo, 
				valor
			}
		});
	}

	useEffect(() => {
		async function fetchRelatorio() {
			let url = GLOBAL.BASE_URL + "/relatorio/semanal";

			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setRelatorio(json.conteudo);
				setLoadingRel(false);
			} catch (error) {
				console.error(error);
			}
		}
		fetchRelatorio();
	}, []);

	const renderizarAnalises = ({ item }) => {
		return (
			<BotaoInformacao
				titulo={item.titulo}
				conteudo={item.valor}
				onPress={() => console.log(item.titulo)}
			/>
		);
	};

	if(isLoadingRel){
		// Caso o relatório não tenha carregado
		return (
			<View style={tailwind("bg-white h-64")}>
				<IlustracaoLoading/>
			</View>
		);
	} else
	return (
		<View style={tailwind("bg-white flex-1")}>

			{/* Blocos de informações estáticos */}
			<View style={tailwind("flex flex-row justify-between mx-5 mb-5")}>
				<BlocoInformacao titulo="Gasto Total" conteudo={"R$"+(relatorio.resumo.gasto_total*-1)} />
				<BlocoInformacao titulo="Receita Total" conteudo={"R$"+(relatorio.resumo.receita_total)} />
				<BlocoInformacao titulo="Fluxo Total" conteudo={(relatorio.resumo.fluxo_total>0? "+":"-")+"R$"+(relatorio.resumo.fluxo_total)} />
			</View>

			{/* Blocos de informações clicáveis */}

			<View style={tailwind("border-b border-t border-gray-100 py-4")}>
			<View style={tailwind("flex justify-between")}>
				<ModalInformativa>
						<Text style={TextoPrincipal()}>O que as análises indicam?</Text>
						<Text style={TextoInformativo()}>Indicam como foram os seus gastos na última semana, exibidos do Maior Gasto da semana para o Menor gasto. Fique atento ao seu maior gasto na semana, ele é realmente necessário?</Text>
				</ModalInformativa>
				</View>
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
					data={converteAnalise(relatorio.analises)}
					renderItem={renderizarAnalises}
					horizontal={true}
					keyExtractor={(item) => item.titulo}
				/>
			</View>

			{/* Gráfico de despesa semanal */}
			<View style={tailwind("border-b border-t border-gray-100 py-4")}>
				<View style={tailwind("flex justify-between")}>
					<ModalInformativa>
						<Text style={TextoPrincipal()}>O que o gráfico de movimentações indica?</Text>
						<Text style={TextoInformativo()}>É o relatório das suas movimentações recentes. Suas movimentações são todas as receitas e despesas inseridas no aplicativo. É possível visualizar a quantidade de receitas e despesas realizadas por dia durante a semana e o valor alcançado por elas.</Text>
					</ModalInformativa>
				</View>
				<View style={tailwind("mx-6 mb-4")}>
					<Text style={tailwind("text-lg font-bold text-gray-800")}>
						Movimentações
					</Text>
					<Text style={tailwind("text-base text-gray-800")}>
						Suas receitas e despesas nos dias dessa semana.
					</Text>
				</View>

				<GraficoDespesaSemanal grafico={relatorio.grafico_semanal}/>
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
