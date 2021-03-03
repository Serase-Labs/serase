import React, { useState } from "react";
import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TextInput,
} from "react-native";
import tailwind from "tailwind-rn";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Imports internos
import Botao from "../comum/components/Botao";
import Input from "../comum/components/Input";
import { number } from "yup";
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";
const Tab = createMaterialTopTabNavigator();

export default function AdicionaMovimentacao() {
	const { token } = useAuth();

	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						labelStyle: { fontSize: 12 },
						tabStyle: { width: 100 },
						style: { backgroundColor: "powderblue" },
						tabBarIcon: ({ focused, color, size }) => {
							let button;

							if (route.name === "Receita") {
								button = focused
									? "ios-information-circle"
									: "ios-information-circle-outline";
							} else if (route.name === "Settings") {
								button = focused ? "ios-list-box" : "ios-list";
							}

							return (
								<Ionicons
									name={button}
									size={size}
									background-Color={"#2C5282"}
								/>
							);
						},
					})}
					tabBarOptions={{
						activeTintColor: "#2c5282",
						labelStyle: {
							fontSize: 12,
							fontWeight: "bold",
							fontFamily: "Roboto",
						},
						style: { backgroundColor: "white" },
					}}
				>
					<Tab.Screen
						name="Receita"
						component={() => AdicionaReceita(token)}
					/>
					<Tab.Screen
						name="Despesa"
						component={() => AdicionaDespesa(token)}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</KeyboardAvoidingView>
	);
}

function AdicionaReceita(token) {
	const [dataR, setDataR] = React.useState();
	const [valorR, setValorR] = React.useState();
	const [categoriaR, setCategoriaR] = React.useState();
	const [descricaoR, setDescricaoR] = React.useState();
	const aperta = () =>
		enviaMovimentacao(token, dataR, valorR, categoriaR, descricaoR);
	return (
		<View style={[estilos.telaInterior]}>
			<Text style={[estilos.labelInputPrincipal]}>
				Quanto você ganhou?
			</Text>
			<TextInput
				nativeID="colorido"
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
				onChangeText={(text) => setValorR(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Data da Receita</Text>
			<TextInput
				nativeID={"#data"}
				style={estilos.input}
				placeholder={"20/10/2020"}
				placeholderTextColor={"#A0AEC0"}
				//keyboardType={"numeric"}
				onChangeText={(text) => setDataR(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Categoria de Receita</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Salário, Empréstimo, Loteria, Aposta"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setCategoriaR(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Descricao de Receita</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Descrição"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setDescricaoR(text)}
			></TextInput>

			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelar}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoCancelar}>Cancelar</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={estilos.botaoAdicionar}
					onPress={aperta}
					title="Submit"
				>
					<Text style={estilos.textoBotaoAdicionar}>Adicionar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function AdicionaDespesa(token) {
	const [dataD, setDataD] = React.useState([]);
	const [valorD, setValorD] = React.useState([]);
	const [categoriaD, setCategoriaD] = React.useState([]);
	const [descricaoD, setDescricaoD] = React.useState([]);
	const aperta = () =>
		enviaMovimentacao(token, dataD, valorD, categoriaD, descricaoD);
	return (
		<View style={[estilos.telaInterior]}>
			<Text style={[estilos.labelInputPrincipal]}>
				Quanto você gastou?
			</Text>
			<TextInput
				style={[estilos.inputPrincipalVermelho]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
				onChangeText={(text) => setValorD(text * -1)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Data de Gasto</Text>
			<TextInput
				style={estilos.input}
				placeholder={"20/10/2020"}
				placeholderTextColor={"#A0AEC0"}
				//keyboardType={"numeric"}
				onChangeText={(text) => setDataD("" + text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Categoria do Gasto</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Alimentação, Trasnporte, Saúde"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setCategoriaD(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Descricao de Despesa</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Descricao"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setDescricaoD(text)}
			></TextInput>

			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelar}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoCancelar}>Cancelar</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={estilos.botaoAdicionar}
					onPress={aperta}
					title="Submit"
				>
					<Text style={estilos.textoBotaoAdicionar}>Adicionar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function enviaMovimentacao(token, data, valor, categoriaM, descricaoM) {
	const servidor_host = "192.168.0.8:8000";
	var data2 = data + "";
	var dataf = data2.split("/");

	fetch(GLOBAL.BASE_URL + "/movimentacao/", {
		method: "POST",
		headers: { Authorization: token },
		body: JSON.stringify({
			valor_pago: valor,
			data_lancamento: dataf[2] + "-" + dataf[1] + "-" + dataf[0],
			categoria: "Outros",
			descricao: descricaoM,
		}),
	});
	console.log(categoriaM);
}

const headerHeight = StatusBar.currentHeight;
const estiloExcecao = StyleSheet.create({
	container: {
		paddingTop: headerHeight,
	},
});

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1 bg-white items-center px-12"),
	botaoCancelar: tailwind("relative py-2 rounded ml-8 mb-20 mt-12"),
	inputPrincipal: tailwind(
		"border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"
	),
	inputPrincipalVermelho: tailwind(
		"border border-red-700 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"
	),

	labelInput: tailwind("text-gray-700 text-base font-bold mb-3"),
	input: tailwind(
		"bg-gray-100 rounded-lg w-full py-2 px-3 text-gray-700 text-base"
	),
	containerInput: tailwind("w-full mb-2 py-12"),

	botaoAdicionar: tailwind(
		"bg-green-400 py-2 rounded w-32 mb-8 mr-1 mt-12 ml-16 py-2 px-4"
	),
	textoBotaoAdicionar: tailwind("text-white font-medium text-lg text-center"),
	botaoCancelar: tailwind("py-2 rounded ml-8 mb-20 mt-12 mr-0 "),
	textoBotaoCancelar: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),
	containerInput: tailwind("w-64 mb-2"),
	labelInput: tailwind("text-gray-700 text-base font-bold mb-3 mr-40"),
};
