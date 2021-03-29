import * as React from "react";
import { useState } from "react";
import { View, Dimensions, Text } from "react-native";
import tailwind from "tailwind-rn";
import { ContributionGraph } from "react-native-chart-kit";
import { useAuth } from "../../feature-login/auth";
import { useEffect} from "react";
import GLOBAL from "../../Global";


//////// Dados falsos utilizados para testes de gráficos
//////// Serão substituídos por chamadas para os arquivos json
//////// e, posteriormente, para chamadas do servidor+bd

// Componentes Internos

// Componentes Externos


export default function GraficoDespesaFrequencia() {

	const { token } = useAuth();
	const [data, setData] = useState({});
	const [isLoadingGrafico, setLoadingGrafico] = useState(true);

	
	const converteGrafico = (commitsData)=>{

		let dados_grafico = [];

		for(let i=0; i< commitsData.length; i++){
			let info = commitsData[i];

			info= {date: info.data, count: info.quantidade};
			dados_grafico.push(info);
		}
		console.log(dados_grafico);
		return dados_grafico;
	}

	useEffect(() => {
		async function fetchGraficoDespesaFrequencia() {
			let url = GLOBAL.BASE_URL + "/grafico/despesa/mensal/";
			console.log(url);
			try {
				let res = await fetch(url, {
					headers: {
						Authorization: token,
					},
				});
				let json = await res.json();
				setData(converteGrafico(json.conteudo));
				setLoadingGrafico(false);
				console.log("XUXU");
			} catch (error) {
				console.log(CARALHOOO);
			}
		}
		fetchGraficoDespesaFrequencia();	
	}, []);


	if(!isLoadingGrafico){
		commitsData = data.map(({data,quantidade})=> [data,quantidade]);
		console.log("BATATATATATATA")
		console.log(data)
		
		return (
			<View style={tailwind("flex items-center pt-6")}>
				<ContributionGraph
					values={data}
					endDate={new Date("2020-09-30")}
					numDays={30}
					gutterSize={5}
					squareSize={20}
					horizontal={false}
					showMonthLabels={false}
					onDayPress={(value, item) => {
						console.log(value);
					}}
					width={(Dimensions.get("window").width / 100) * 70}
					height={120}
					chartConfig={{
						backgroundGradientFrom: "#ffffff",
						backgroundGradientTo: "#ffffff",
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(44, 127, 184, ${opacity})`,
						style: {},
					}}
				/>
				{/*<View
					style={tailwind(
						"bg-gray-100 mx-5 rounded flex flex-col items-center py-4 my-4 w-full"
					)}
				>
					<Text style={tailwind("text-base text-gray-900")}>
						Data: {date}
					</Text>
					<Text style={tailwind("text-base text-gray-900")}>
						{count} Movimentações
					</Text>
					</View>*/}
			</View>
		);
	}
	else{
		return (
			<View style={tailwind("opacity-25")}>
				<Text>Loading...</Text>
			</View>
		);
	}
}