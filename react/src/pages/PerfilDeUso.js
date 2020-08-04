import React from "react";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	StatusBar,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";

import tailwind from "tailwind-rn";
import { Checkbox, CheckboxControl} from "../components/Checkbox.js";

const headerHeight = StatusBar.currentHeight;



const estiloExcecao = StyleSheet.create({
	container: { paddingTop: headerHeight },
});

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),

	componenteLocalizacao: tailwind(
		"w-full flex flex-row items-center pt-5 pl-5"
	),
	logoLocalizacao: tailwind("mr-3 w-8 h-8"),
	textoLocalizacao: tailwind("text-base"),

	textoFormulario: tailwind(
		"text-lg text-gray-900 w-3/4 flex self-center text-center"
	),

	containerFormulario: tailwind("w-full items-center"),
	containerInput: tailwind("w-64"),
	labelInput: tailwind("text-gray-700 text-base font-bold mb-1"),
	textoDica: tailwind("text-gray-700 text-base mb-3"),
	input: tailwind(
		"border border-gray-500 rounded w-full py-2 px-3 text-gray-700 text-base"
	),
	errorInput: tailwind(
		"bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"
	),

	botaoPrimarioGrande: tailwind("bg-green-400 py-2 rounded w-64 mb-5"),
	textoBotao: tailwind("text-white font-medium text-lg text-center"),
	botaoTerciarioGrande: tailwind("bg-transparent py-2 rounded w-64"),
	textoBotaoTerciario: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),
};

const perfis = Object.entries({
	"Diário Financeiro": "Anote suas compras e despesas. Observe seu comportamento financeiro.",
	"Quitador de Divída": "Anote suas compras e despesas enquanto segue um planejamento para quitar sua divída.",
	"Meta Fechada": "Anote suas compras e despesas enquanto segue um planejamento para alcançar uma meta pessoal.",
});

function selecionaUm(nome){
	let el=null;

	for(let i=0; i< perfis.length; i++){
		let nomePerfil = perfis[i][0];
		if(nomePerfil==nome)
			el = elementos_checkbox[i];
	}
}

const elementos_checkbox = perfis.map(([nome, desc]) =>
	<Checkbox key={nome}>
		<Text style={estilos.labelInput}>
			{nome}
		</Text>
		<Text style={estilos.textoDica}>
			{desc}
		</Text>
	</Checkbox>
);


export default function PerfilDeUso() {
	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<ScrollView style={[estilos.telaInterior]}>
				<View
					accessibilityRole="header"
					style={[tailwind("mb-6"), estilos.componenteLocalizacao]}
				>
					<Image
						style={estilos.logoLocalizacao}
						source={require("../assets/monologo512x512.png")}
					/>
					<Text style={estilos.textoLocalizacao}>
						Perfil de Uso
					</Text>
				</View>

				<Text style={[estilos.textoFormulario, tailwind("mb-6")]}>
					Escolha como você deseja usar o <Text style={tailwind("text-green-400")}>SeraSe.</Text>
				</Text>

				<View style={estilos.containerFormulario}>
					<View>
						<CheckboxControl>
							{elementos_checkbox}
						</CheckboxControl>
						<TouchableOpacity
							style={estilos.botaoPrimarioGrande}
							title="Submit"
						>
							<Text style={estilos.textoBotao}>
								Confirmar Dados
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}


