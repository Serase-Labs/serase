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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Imports internos
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
					<Tab.Screen
						name="Padrao"
						component={() => AdicionaPadrao(token)}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</KeyboardAvoidingView>
	);
}

function AdicionaDespesa(token) {
	const [dataD, setDataD] = React.useState([]);
	const [valorD, setValorD] = React.useState([]);
	const [categoriaD, setCategoriaD] = React.useState([]);
	const [descricaoD, setDescricaoD] = React.useState([]);
	const [temErro, setErro] = useState(false);
	const [resultado, setResultado] = useState(null);

	const aperta = () =>
		enviaMovimentacao(token, dataD, valorD, categoriaD, descricaoD);

		function enviaMovimentacao(token, data, valor, categoriaM, descricaoM) {
			var data2 = data + "";
			var dataf = data2.split("/");
		
			async function fetchData() {
				let res = await fetch(GLOBAL.BASE_URL + "/movimentacao/", {
					method: "POST",
					headers: { Authorization: token },
					body: JSON.stringify({
						valor_pago: valor,
						data_lancamento: dataf[2] + "-" + dataf[1] + "-" + dataf[0],
						categoria: categoriaM,
						descricao: descricaoM,
					}),
				});
				let json = await res.json();
		
				if(!res.ok){
					setResultado(json.mensagem);
					setErro(true);
				}else{
					setResultado("Inserido com sucesso!");
					setErro(false);
				}
			}
			fetchData();
			console.log(categoriaM);
		}
	
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
			{temErro ? (
				renderErro(resultado)
			) : (
				
				renderSucesso(resultado)
			)}
			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelar}
					//onPress={() => navigation.navigate("Homepage")}
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

function AdicionaReceita(token) {
	const [dataR, setDataR] = React.useState('');
	const [valorR, setValorR] = React.useState('');
	const [categoriaR, setCategoriaR] = React.useState('');
	const [descricaoR, setDescricaoR] = React.useState('');
	const [temErro, setErro] = useState(false);
	const [resultado, setResultado] = useState(null);

	const aperta = () =>
		enviaMovimentacao(token, dataR, valorR, categoriaR, descricaoR);
	
			function enviaMovimentacao(token, data, valor, categoriaM, descricaoM) {
				
				var data2 = data + "";
				var dataf = data2.split("/");
			
				async function fetchData() {
					let res = await fetch(GLOBAL.BASE_URL + "/movimentacao/", {

						method: "POST",
						headers: { Authorization: token },
						body: JSON.stringify({
							valor_pago: valor,
							data_lancamento: dataf[2] + "-" + dataf[1] + "-" + dataf[0],
							categoria: categoriaM,
							descricao: descricaoM,

						}),
					});
					let json = await res.json();
			
					if(!res.ok){
						setResultado(json.mensagem);
						setErro(true);
					}else{
						setResultado("Inserido com sucesso!");
						setErro(false);
					}
				}
				fetchData();
				console.log(categoriaM);
			}
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
			{temErro ? (
				renderErro(resultado)
			) : (
				
				renderSucesso(resultado)
			)}
			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelar}
					//onPress={() => navigation.navigate("Homepage")}
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

function AdicionaPadrao(token) {

	const [valorP, setValorP] = React.useState('');
	const [categoriaP, setCategoriaP] = React.useState('');
	const [descricaoP, setDescricaoP] = React.useState('');
	const [tipo , setTipo] = React.useState('');
	const [diaCobranca, setDiaCobranca] = React.useState('');
	const [diaInicio, setDiaInicio] = React.useState('');
	const [diaFim, setDiaFim] = React.useState('');


	/*
		tipo= json_data["tipo"]
        descricao = json_data["descricao"]
        periodo = json_data["periodo"]
        valor =json_data["valor"]
        dia_cobranca = json_data["dia_cobranca"]
        data_inicio  = json_data["data_inicio"]
        data_fim= json_data["data_fim"]
        categoria= json_data["categoria"]

	*/


	const [temErro, setErro] = useState(false);
	const [resultado, setResultado] = useState(null);

	const aperta = () =>
		enviaMovimentacao(token, valorP, categoriaP, descricaoP, tipo, diaCobranca, diaInicio, diaFim);
	
			function enviaMovimentacao(token, valorP, categoriaP, descricaoP, tipo, diaCobranca, diaInicio, diaFim) {
				//token, valorP, categoriaP, descricaoP, tipo, diaCobranca, diaInicio, diaFim


				var dataI = diaInicio + "";
				dataI = dataI.split("/");

				var dataF = diaFim+ "";
				dataF = dataF.split("/");
			
				async function fetchData() {
					let res = await fetch(GLOBAL.BASE_URL + "/padrao/", {
						method: "POST",
						headers: { Authorization: token },
						body: JSON.stringify({
							valor: valorP,
							dia_cobranca: diaCobranca,
							data_inicio: dataI[2] + "-" + dataI[1] + "-" + dataI[0],
							data_fim: dataF[2] + "-" + dataF[1] + "-" + dataF[0],
							categoria: categoriaP,
							descricao: descricaoP,
							tipo: tipo.toLowerCase(),
							periodo: 15,
						}),
					});
					let json = await res.json();
			
					if(!res.ok){
						setResultado(json.mensagem);
						setErro(true);
					}else{
						setResultado("Inserido com sucesso!");
						setErro(false);
					}
				}
				fetchData();
			}
	return (
		<View style={[estilos.telaInterior]}>
			<Text style={[estilos.labelInputPrincipal]}>
				Valor padrão?
			</Text>
			<TextInput
				nativeID="colorido"
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
				onChangeText={(text) => setValorP(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Categoria de Padrão</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Salário, Empréstimo, Loteria, Aposta"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setCategoriaP(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Descricao do Padrão: </Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Descrição"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setDescricaoP(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Tipo</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Descrição"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setTipo(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Dia de Cobranca</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"3"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setDiaCobranca(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Dia de Início</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"08/03/2021"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setDiaInicio(text)}
			></TextInput>

			<Text style={[estilos.labelInput]}>Dia Fim</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"08/03/2021"}
				placeholderTextColor={"#A0AEC0"}
				onChangeText={(text) => setDiaFim(text)}
			></TextInput>

			{temErro ? (
				renderErro(resultado)
			) : (
				
				renderSucesso(resultado)
			)}
			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelar}
					//onPress={() => navigation.navigate("Homepage")}
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



function renderErro(resultado) {
	return (
		<View >
			<Text style= {[estilos.textoErro]}>{resultado}</Text>
		</View>
	);
}

function renderSucesso(resultado) {
	return (
		<View >
			<Text style= {[estilos.textoSucesso]}>{resultado}</Text>
		</View>
	);
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
	textoErro: tailwind(
		"text-red-700 text-base font-bold text-center"
	),
	textoSucesso: tailwind(
		"text-green-700 text-base font-bold text-center"
	),
	textoBotaoAdicionar: tailwind("text-white font-medium text-lg text-center"),
	botaoCancelar: tailwind("py-2 rounded ml-8 mb-20 mt-12 mr-0 "),
	textoBotaoCancelar: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),
	containerInput: tailwind("w-64 mb-2"),
	labelInput: tailwind("text-gray-700 text-base font-bold mb-3 mr-40"),
};
