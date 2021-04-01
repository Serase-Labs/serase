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

import IlustracaoLoading from "../comum/assets/IlustracaoLoading";
import ListaVazia from "../comum/components/ListaVazia";
import {ModalInformativa, TextoPrincipal, TextoInformativo} from "../comum/components/ModalInformativa";
import ItemMovimentacao from "./componentes/ItemMovimentacao";
import IndicadorRetorno from "../comum/components/IndicadorRetorno";
import IconePesquisa from "../comum/assets/IconePesquisa";
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";

// Padroes de Movimentação
import PreviewPadrao from "../feature-padroes/components/PreviewPadrao";

export default function ListaDespesas({ navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [despesas, setDespesa] = useState([]);
	const[filtro, setFiltro] = useState('');
	const[data, setData] = useState(9000);
	const { token } = useAuth();

	const carrega = () => {
		async function fetchData() {
			 // Days you want to subtract
			var days = data;
			var date = new Date();
			var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
			var day =last.getDate();
			var month=last.getMonth()+1;
			var year=last.getFullYear();

			let url = GLOBAL.BASE_URL + "/movimentacoes/?tipo=despesa&data_inicial="+year+"-"+month+"-"+day+"&filtro="+filtro;
			
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});
				let json = await res.json();
				setDespesa(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}

	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/movimentacoes/?tipo=despesa";
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});
				let json = await res.json();
				setDespesa(json);
				console.log(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}, []);

	function renderDespesa(despesas) {
		return (
			<View>
				<FlatList
					data={despesas.conteudo}
					extraData={despesas.conteudo}
					renderItem={renderizarMovimentacoes}
					keyExtractor={(item) => item.id}
				></FlatList>
			</View>
		);
	}

	const renderizarMovimentacoes = ({ item }) => {
		return (
			<ItemMovimentacao
				indice={item.id}
				descricao={item.descricao}
				valorPago={item.valor_pago}
				dataLancamento={item.data_lancamento}
			/>
		);
	};

	return (
		<View style={[estilos.tela, estiloExcecao.container]}>
			<View style={estilos.telaInterior}>
			<View style={tailwind("flex justify-between")}>
				<ModalInformativa>
					<Text style={TextoPrincipal()}>o que são despesas fixas?</Text>
					<Text style={TextoInformativo()}>É todo gasto mensal que não sofre alteração à medida que você o consome. Exemplos de despesas fixas: Aluguel de um imóvel e assinatura da TV à cabo.</Text>
				</ModalInformativa>
				</View>
				<IndicadorRetorno telaAtual={"Despesas"} />

				<View style={tailwind("px-5 flex flex-row justify-between items-center")}>
					<Text style={tailwind("text-lg font-bold")}>
						Despesas Fixas
					</Text>
					<TouchableOpacity onPress={() =>{navigation.navigate('ListaPadroes')}}>
						<Text style={tailwind("font-bold text-blue-700")}>
							Ver todas
						</Text>
					</TouchableOpacity>
				</View>

				<PreviewPadrao navigation={navigation}/>

				<View style={tailwind("px-5")}>
					<Text style={tailwind("text-lg font-bold")}>
						Movimentações
					</Text>
				</View>

				<View style={[tailwind("flex-row bg-white justify-between")]}>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}
						onPress={()=>{setData(7);carrega();}}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>
							Essa semana
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}              
						onPress={()=>{setData(30);carrega();}}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>
							Esse Mês
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={estilos.botaoTerciarioGrande}
						//onPress={setData('Sempre')}
						onPress={()=>{setData(9000);carrega();}}
						title="Submit"
					>
						<Text style={estilos.textoBotaoTerciario}>Sempre</Text>
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

				{isLoading ? (
								<IlustracaoLoading/>
							) : (
										<View>
											{ despesas.conteudo.length === 0 ? 
												<View style={tailwind("py-4")}>
														<ListaVazia mensagem="Você ainda não relatou nenhuma despesa. Assim que o fizer, ela aparecerá aqui."/> 
												</View>
												: 
												<View style={tailwind("mb-12")}>
													{renderDespesa(despesas)}
												</View>
											}
										</View>
				)}
				
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
