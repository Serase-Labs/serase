// Esse arquivo abriga a interface e as chamadas
// de componentes necessários para toda a
// funcionalidade de relatórios mensais.
import * as React from "react";
import { useState, useEffect } from "react";
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
import IlustracaoLoading from '../comum/assets/IlustracaoLoading';
import BotaoInformacao from "../comum/components/BotaoInformacao";
import BlocoInformacao from "../comum/components/BlocoInformacao";
import TabDescricao from "../comum/components/TabDescricao";
import GraficoSaldoAnual from "./components/GraficoSaldoAnual";
import GraficoDespesaCategoria from "./components/GraficoDespesaCategoria";
import GraficoDespesaPadrao from "./components/GraficoDespesaPadrao";

import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth";

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
	const { user, token } = useAuth();
	const [relatorio, setRelatorio] = useState({});
	const [isLoadingRel, setLoadingRel] = useState(true);

	const converteDespesa = (informacoes)=>{
		let itens = [];

		for(let titulo in informacoes){
			let despesas = informacoes[titulo],
				media = 0.0;

			for(let {mes, valor} of despesas)
				media+=Number(valor);

			media = media/(despesas.length);
			itens.push({titulo, valor: media.toFixed(2)});
		}

		return itens;
	}

	useEffect(() => {
		async function fetchRelatorio() {
			let url = GLOBAL.BASE_URL + "/relatorio/anual";

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
				conteudo={`Média: R$${item.valor}`}
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

				<GraficoSaldoAnual grafico={relatorio.grafico_saldo}/>
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
					data={converteDespesa(relatorio.grafico_despesa_fixa)}
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
					<GraficoDespesaCategoria periodo="anual"/>
				</TabDescricao>

				<TabDescricao
					conteudo="Despesas por padrão"
					descricao="Sua proporção de gasto em tipos de despesa."
				>
					<GraficoDespesaPadrao periodo="anual"/>
				</TabDescricao>
			</View>
		
		</View>
	);
}
