import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	ScrollView,
	FlatList,
} from "react-native";
import tailwind from "tailwind-rn";

import IlustracaoDespesaFixa from "../comum/assets/IlustracaoDespesaFixa";
import ItemPadrao from "../feature-padroes/components/ItemPadrao";
import IndicadorRetorno from "../comum/components/IndicadorRetorno";
import IconePesquisa from "../comum/assets/IconePesquisa";
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";

// Padroes de Movimentação
import PreviewPadrao from "./components/PreviewPadrao";

export default function ListaPadroes({navigation}) {
	const [isLoading, setLoading] = useState(true);
	const [padroes, setPadrao] = useState([]);
	const[filtro, setFiltro] = useState('');
	const[id,setId] = useState('');
	const[data, setData] = useState(9000);
	const { token } = useAuth();

	const carrega = () => {
		async function fetchData() {
			 
			let url = GLOBAL.BASE_URL + "/cobrancas/?situacao="+filtro+"&tipo=despesa";
			if(filtro==''){
				url = GLOBAL.BASE_URL + "/cobrancas/";
			}
			
			
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});
				let json = await res.json();
				setPadrao(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}


	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/cobrancas/";
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});
				let json = await res.json();
				setPadrao(json);
				console.log(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}, []);

	function renderDespesa(padroes) {
		return (
			<View>
				<FlatList
					data={padroes.conteudo}
					extraData={padroes.conteudo}
					renderItem={renderizarMovimentacoes}
					keyExtractor={(item) => item.id}
				></FlatList>
			</View>
		);
	}

	const renderizarMovimentacoes = ({ item }) => {
		return (
			<ItemPadrao
				indice={item.id}
				situacao={item.situacao}
				cod_padrao={item.cod_padrao}

				descricao={item.descricao}

        		valor = {item.valor_esperado}
        		categoria ={item.categoria}
			/>
		);
	};

	return (
		<View style={[estilos.tela, estiloExcecao.container]}>
			<View style={estilos.telaInterior}>
				<IndicadorRetorno telaAtual={"Lista Padrao"} />
				
				<View style={tailwind("h-32")}>
							<IlustracaoDespesaFixa />
						</View>
				<View style={[tailwind("flex-row bg-white justify-between")]}>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}
						onPress={()=>{setFiltro('');carrega();}}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>
							Todas
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}              
						onPress={()=>{setFiltro('pendente');carrega();}}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>
							Pendentes
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}
						//onPress={setData('Sempre')}
						onPress={()=>{setFiltro('paga');carrega();}}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>Pagas</Text>
					</TouchableOpacity>
				</View>
				<View style={tailwind("flex-row justify-between mx-5 mb-4")}>
					<TextInput
						style={tailwind("flex-row flex-grow")}
						placeholder={"Pesquise por uma entrada de receita"}
						placeholderTextColor={"#A0AEC0"}
						onChangeText={text => setFiltro(text)}
					/>
					<View style={tailwind("flex")}>
					<TouchableOpacity 
						style={tailwind("h-10 w-10 rounded-lg justify-center items-center")}
						title="Submit"
						onPress={carrega}
					>
						<IconePesquisa />
					</TouchableOpacity>
					</View>
				</View>

				<View style={tailwind("mb-16")}>
				<View style={tailwind("mb-24")}>
					<View style={tailwind("mb-24")}>
						<View style={tailwind("flex-col mb-24")}>
							{isLoading ? (
								<Text>Loading...</Text>
							) : (
								renderDespesa(padroes)
							)}
						</View>
					</View>
				</View>
				</View>
			</View>
		</View>
	);
}

const headerHeight = StatusBar.currentHeight;

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),
	itemBalanca: tailwind("flex-1"),
	itemBalancaValor: tailwind("text-white text-lg font-bold"),
	itemBalancaDescricao: tailwind("text-white text-xs"),
	botoesMain: tailwind(
		"bg-gray-300 h-24 w-24 rounded-lg justify-center items-center"
	),
	botaoTerciarioGrande: tailwind("bg-transparent rounded my-2"),
	textoBotaoTerciario: tailwind(
		"text-blue-700 font-bold text-base text-center py-4 px-8"
	),
	botoesMainText: tailwind("text-blue-800 font-bold"),
	botoesMainImg: tailwind("w-6 h-6"),
	movimentacao: tailwind("flex-row mb-4"),
	movimentacaoImg: tailwind("w-6 h-6"),
	movimentacaoTexto: tailwind("text-base flex-grow text-left font-bold"),
	movimentacaoValor: tailwind("text-base"),
	movimentacaoData: tailwind("text-gray-500"),
	botaoDespesa: tailwind("bg-blue-700 rounded-lg w-24 h-24 m-2 mt-6 mb-6"),
	botaoDespesaTxt: tailwind(
		"text-white text-left px-2 mt-6 text-xs font-thin text-opacity-75"
	),
	botaoDespesaVlrTxt: tailwind("text-white text-left text-sm px-2 font-bold"),
	botaoDespesaVlrTotal: tailwind(
		"rounded-lg w-24 h-24 m-2 mt-6 mb-6 bg-blue-700"
	),
};

const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});
