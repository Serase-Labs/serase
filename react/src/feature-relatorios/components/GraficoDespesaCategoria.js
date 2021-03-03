import * as React from "react";
import { useState, useEffect } from "react";
import { View, Dimensions, Text } from "react-native";
import tailwind from "tailwind-rn";

import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth";

//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd
const categoriaData = [
	{
		name: "Alimentação",
		population: 40,
		color: "#FFFFCC",
	},
	{
		name: "Lazer",
		population: 32,
		color: "#C7E9B4",
	},
	{
		name: "Compras",
		population: 12,
		color: "#7FCDBB",
	},
	{
		name: "Moradia",
		population: 9,
		color: "#41B6C4",
	},
	{
		name: "Transporte",
		population: 5,
		color: "#2C7FB8",
	},
	{
		name: "Outros",
		population: 2,
		color: "#253494",
	},
];

const CORES_GRAFICO = ["#FFFFCC", "#C7E9B4", "#7FCDBB", "#41B6C4", "#2C7FB8", "#253494"];

////

// Componentes externos
import { PieChart } from "react-native-chart-kit";

export default function GraficoCategoriaMensal({ periodo }) {

	const { user, token } = useAuth();
	const [grafico, setGrafico] = useState({});
	const [isLoadingGraf, setLoadingGraf] = useState(true);

	if(!periodo) console.error("O props 'periodo' deve ser definido para o componente 'GraficoDespesaCategoria'!");

	const converteGrafico = (dados)=>{
		let novos_dados = [];

		for(let i=0; i<dados.length; i++){
			let dado = dados[i];
			
			if(i<CORES_GRAFICO.length-1){
				dado = {name: dado.nome, population: dado.porcentagem, color: CORES_GRAFICO[i]};
				novos_dados.push(dado);
			} else if(i==CORES_GRAFICO.length-1){
				dado = {name: "Outros", population: dado.porcentagem, color: CORES_GRAFICO[i]};
				novos_dados.push(dado);
			} else {
				let outros = novos_dados[CORES_GRAFICO.length-1];
				outros.population+=dado.porcentagem;
			}
		}

		console.log(novos_dados);
		return novos_dados;
	}

	useEffect(() => {
		async function fetchGrafico() {
			let url = GLOBAL.BASE_URL + "/grafico/categoria/"+periodo;

			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setGrafico(converteGrafico(json.conteudo));
				setLoadingGraf(false);
			} catch (error) {
				console.error(error);
			}
		}
		fetchGrafico();
	}, []);

	if(isLoadingGraf){
		// Caso o relatório não tenha carregado
		return (
			<View style={tailwind("opacity-25")}>
				<Text>Loading...</Text>
			</View>
		);
	} else
	return (
		<View style={tailwind("flex items-center pt-6")}>
			<PieChart
				data={grafico}
				width={(Dimensions.get("window").width / 100) * 100}
				height={220}
				chartConfig={{
					backgroundColor: "#1cc910",
					backgroundGradientFrom: "#eff3ff",
					backgroundGradientTo: "#efefef",
					decimalPlaces: 2,
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
				}}
				accessor="population"
				backgroundColor="transparent"
				paddingLeft={(Dimensions.get("window").width / 100) * 25}
				hasLegend={false}
			/>

			<View
				style={tailwind(
					"flex flex-row items-center justify-center my-2 flex-wrap"
				)}
			>
				{grafico.map((value, index) => {
					return (
						<View
							style={tailwind("flex flex-row items-center p-2")}
							key={index}
						>
							<View
								style={[
									tailwind(
										"w-4 h-4 bg-green-400 mr-2 rounded-sm"
									),
									{ backgroundColor: value.color },
								]}
							></View>
							<Text style={tailwind("text-gray-600")}>
								{value.population}% - {value.name}
							</Text>
						</View>
					);
				})}
			</View>
		</View>
	);
}
