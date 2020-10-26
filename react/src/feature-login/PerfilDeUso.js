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
import IndicadorNavegacao from "../comum/components/IndicadorNavegacao.js";
import { Checkbox, CheckboxControl } from "./componentes/Checkbox.js";

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
	containerFormulario: tailwind("w-full h-full items-center"),
	containerInput: tailwind("w-64"),
	labelInput: tailwind("text-base font-bold mb-1"),
	textoDica: tailwind("text-base mb-3"),
	corCinza: tailwind("text-gray-700"),
	corVerde: tailwind("text-green-400"),
	input: tailwind(
		"border border-gray-500 rounded w-full py-2 px-3 text-gray-700 text-base"
	),
	errorInput: tailwind(
		"bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"
	),
	botaoPrimarioGrande: tailwind("py-2 rounded w-64 mb-5"),
	botaoDesabilitado: tailwind("bg-gray-500 bg-opacity-75"),
	botaoHabilitado: tailwind("bg-green-400 bg-opacity-100"),
	textoBotao: tailwind("text-white font-medium text-lg text-center"),
	botaoTerciarioGrande: tailwind("bg-transparent py-2 rounded w-64"),
	textoBotaoTerciario: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),
};

const perfis = Object.entries({
	"Diário Financeiro": {
		desc:
			"Anote suas compras e despesas. Observe seu comportamento financeiro.",
		page: "FormularioRenda",
	},
	"Quitador de Divída": {
		desc:
			"Anote suas compras e despesas enquanto segue um planejamento para quitar sua divída.",
		page: "FormularioDivida",
	},
	"Meta Fechada": {
		desc:
			"Anote suas compras e despesas enquanto segue um planejamento para alcançar uma meta pessoal.",
		page: "FormularioMeta",
	},
});

class DetalhesPerfilDeUso extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let checkbox_selecionado = this.props.checkbox
			? this.props.checkbox.state.selecionado
			: false;

		const estilo_label = [estilos.labelInput];
		const estilo_desc = [estilos.textoDica];

		if (checkbox_selecionado) {
			estilo_label.push(estilos.corVerde);
			estilo_desc.push(estilos.corVerde);
		} else {
			estilo_label.push(estilos.corCinza);
			estilo_desc.push(estilos.corCinza);
		}

		return (
			<View>
				<Text style={estilo_label}>{this.props.nome}</Text>
				<Text style={estilo_desc}>{this.props.desc}</Text>
			</View>
		);
	}
}

export default class PerfilDeUso extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			perfil: null,
		};

		this.redirecionar = this.redirecionar.bind(this);
	}

	redirecionar() {
		console.log(this.state.perfil);
		if (this.state.perfil != null)
			this.props.navigation.navigate(this.state.perfil);
	}

	render() {
		const checkbox_controle = (
			<CheckboxControl
				onChange={(valor) => this.setState({ perfil: valor })}
			>
				{perfis.map(([nome, infos]) => (
					<Checkbox key={nome} valor={infos.page}>
						<DetalhesPerfilDeUso nome={nome} desc={infos.desc} />
					</Checkbox>
				))}
			</CheckboxControl>
		);

		const estilos_botao = [
			estilos.botaoPrimarioGrande,
			this.state.perfil == null
				? estilos.botaoDesabilitado
				: estilos.botaoHabilitado,
		];

		return (
			<KeyboardAvoidingView
				style={[estiloExcecao.container, estilos.tela]}
			>
				<ScrollView style={[estilos.telaInterior]}>
					<IndicadorNavegacao tela="Perfil de Uso" />

					<Text style={[estilos.textoFormulario, tailwind("mb-6")]}>
						Escolha como você deseja usar o{" "}
						<Text style={tailwind("text-green-400")}>SeraSe.</Text>
					</Text>

					<View style={estilos.containerFormulario}>
						{checkbox_controle}
						<TouchableOpacity
							style={estilos_botao}
							title="Submit"
							onPress={this.redirecionar}
							disabled={this.state.perfil == null}
						>
							<Text style={estilos.textoBotao}>
								Confirmar Dados
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}
