import * as React from "react";
import  { useState,useEffect } from 'react';

import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";

import IconeVolta from "../assets/icons/IconeVolta";
import IconeReceita from "../assets/icons/IconeReceita";
import IconeCarteiraReceita from "../assets/icons/IconeCarteiraReceita";
import IconePesquisa from "../assets/icons/IconePesquisa";



const headerHeight = StatusBar.currentHeight;

const estilos = {
	itemBalanca: tailwind("flex-1"),
	itemBalancaValor: tailwind("text-white text-lg font-bold"),
	itemBalancaDescricao: tailwind("text-white text-xs"),
	botoesMain: tailwind(
		"bg-gray-300 h-24 w-24 rounded-lg justify-center items-center"
	),
	botaoTerciarioGrande: tailwind("bg-transparent rounded w-15 h-14 my-4"),
	textoBotaoTerciario: tailwind(
		"text-blue-700 font-bold fontfont-small text-base text-center py-4 px-8"
	),
	botoesMainText: tailwind("text-blue-800 font-bold"),
	botoesMainImg: tailwind("w-6 h-6"),
	movimentacao: tailwind("flex-row mb-4 justify-between"),
	movimentacaoImg: tailwind("w-6 h-6"),
	movimentacaoTexto: tailwind("text-base flex-grow text-left font-bold"),
	movimentacaoValor: tailwind("text-base"),
	movimentacaoData: tailwind("text-gray-500 "),

};

const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});



export default function VisualizacaoGeral({ navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [receitas, setReceita] = useState([]);
	
	
	//then(setLoading(false))
	
	 useEffect(()  => {
		async function fectchData(){
		let url = 'http://192.168.0.53:8080/movimentacoes/?tipo=despesa';
		try{
		let res =  await fetch(url);
		let json =  await res.json()
		setReceita(json)
		setLoading(false)
		return await res.json()
		} catch(error){
		}
		}
		fectchData();
	 },[]);
    
	//finally {
	//	setLoading(false)
	//}	

	function renderReceita(receitas) {
		let dados = []; 
		
	console.log(receitas.conteudo);

    receitas.conteudo.forEach(conteudo => {
		dados.push(
				<View style={estilos.movimentacao}>
				
					<View style={tailwind("w-8 h-8 mb-1 ")}>
					<IconeReceita uso="sistema" />
					</View>
					<View style={tailwind(
						"flex-col mx-6 flex-grow"
					)}>
					<Text style={estilos.movimentacaoTexto}>{conteudo.descricao}</Text>
					<Text style={estilos.movimentacaoData}>{conteudo.valor_pago }</Text>
					</View>
					<Text style={estilos.movimentacaoValor}>{conteudo.data_lancamento}</Text>
				</View>
		);
	});
	return dados;
	}
	
	return (
		
		<View style={[tailwind("flex-1 bg-white"), estiloExcecao.container]}>  
            <View
				style={tailwind(
					"p-5  w-full flex flex-row justify-start items-left items-center"
				)}
			>   
				<TouchableOpacity
					style={tailwind("w-10 h-10 p-1 bg-gray-200 rounded")}
					onPress={() => navigation.navigate("VisualizacaoGeral")}
				>
					<View style={tailwind("h-8 w-7")}>
						<IconeVolta />
					</View>
				</TouchableOpacity>

				<Text style={tailwind("text-lg ml-4")}>
					<Text style={tailwind("text-lg ")}>
						Receitas
					</Text>
				</Text>
			</View>
			
			
			
			<View style={[tailwind("flex-row bg-white justify-center")]}>
					
			</View>
			<View style={tailwind("justify-between flex-row p-3")}>
				
				<TextInput style={tailwind("flex-row mx-2 flex-grow ")}
				placeholder={
				"Pesquise por uma entrada de receita"}
				placeholderTextColor={"#A0AEC0"} /> 
				<View style={[tailwind("flex-1")]}>
				<IconePesquisa/>
				</View>
				</View>	
				
				<View style={tailwind("p-8 flex-col")}>
				{ isLoading ? <Text>Loading...</Text>: 
				renderReceita(receitas)}
				
                    
                </View>
		</View>
	);
}
