// Essa tela comporta a interface de adição de Despesa e Receita comum.
// Cada interface fica abrigada em uma seção do componente de Material Tab.
// Existe uma funcionalidade de swipe entre as duas telas.
// Se desejar componetizar externamente cada uma das interfaces,
// fique a vontade. Talvez fique confuso tudo junto já que não existe lógica
// compartilhada entre as duas funcionalidaes.
import React from "react";
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

// Componentes de navegação
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { date } from "yup";
// Documentação do Material Top (https://reactnavigation.org/docs/material-top-tab-navigator)
const Tab = createMaterialTopTabNavigator();

const headerHeight = StatusBar.currentHeight;
const estiloExcecao = StyleSheet.create({
	container: {
		paddingTop: headerHeight,
	},
});

// Essas funções aqui foram retiradas do exemplo na documentação do React Navigation
// estava com preguiça de inventar outra coisa e aí só copiei pra teste.
// Estou deixando pra facilitar o entendimento de como funciona, mas deve ser subtituído
// pelos componentes de AdicaoDespesa e AdicaoReceita aí :)
function HomeScreen() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text style={[estilos.labelInputPrincipal]}>
				Quanto você ganhou?
			</Text>
			<TextInput
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
			></TextInput>

			<Text style={[estilos.labelInput]}>Data da Receita</Text>
			<TextInput
				style={estilos.input}
				placeholder={"20/10/2020"}
				placeholderTextColor={"#A0AEC0"}
				keyboardType={"numeric"}
			></TextInput>

			<Text style={[estilos.labelInputcategoria]}>
				Categoria de Receita
			</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Salário, Empréstimo, Loteria, Aposta"}
				placeholderTextColor={"#A0AEC0"}
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
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoAdicionar}>Adicionar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function SettingsScreen() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text style={[estilos.labelInputPrincipal]}>
				Quanto você gastou?
			</Text>
			<TextInput
				style={[estilos.inputPrincipalVermelho]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
			></TextInput>

			<Text style={[estilos.labelInput]}>Data de Gasto</Text>
			<TextInput
				style={estilos.input}
				placeholder={"20/10/2020"}
				placeholderTextColor={"#A0AEC0"}
				keyboardType={"numeric"}
			></TextInput>

			<Text style={[estilos.labelInputcategoria]}>
				Categoria do Gasto
			</Text>
			<TextInput
				style={[estilos.input]}
				placeholder={"Alimentação, Trasnporte, Saúde"}
				placeholderTextColor={"#A0AEC0"}
			></TextInput>
			<TextInput
				style={[estilos.input]}
				placeholder={"Aplicativo de comida, trasnporte"}
				placeholderTextColor={"#A0AEC0"}
			></TextInput>

			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelarVermelho}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoCancelarVermelho}>
						Cancelar
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={estilos.botaoAdicionarVermelho}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoAdicionarVermelho}>
						Adicionar
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default function MovimentacaoComum() {
	return (
		<KeyboardAvoidingView
			style={[estiloExcecao.container, tailwind("bg-white flex-1")]}
		>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let button;

							// Para personalizar os botões que aparecem na Tab
							// você pode gerar componentes de botão, como eu fiz
							// com o botão de adicionar.
							// Documentação de estilização além disso:
							// https://reactnavigation.org/docs/tab-based-navigation#customizing-the-appearance
							if (route.name === "Receita") {
								button = (
									<>
										<TouchableOpacity>
											<Text>Receita</Text>
										</TouchableOpacity>
									</>
								);
							} else {
								button = (
									<>
										<TouchableOpacity>
											<Text>Despesa</Text>
										</TouchableOpacity>
									</>
								);
							}

							return button;
						},
					})}
				>
					<Tab.Screen name="Receita" component={HomeScreen} />
					<Tab.Screen name="Despesa" component={SettingsScreen} />
				</Tab.Navigator>
			</NavigationContainer>

			{
				// Nessa área comentada aqui eu já havia testado uma possibilidade de implementação do input,
				// To deixando, mas pode jogar fora kkk.
				// Eu havia conseguido deixar o "R$" bem próximo do input, como se fosse parte dele
				// mas sem atrapalhar a formatação do valor inserido pelo usuário.
			}

			{/* <View style={tailwind("flex-1")}>
				<View
					style={[
						tailwind(
							"mt-6 mx-5 p-5 bg-blue-700 justify-between rounded-md"
						),
					]}
				>
					<View
						style={tailwind(
							"flex flex-row w-full justify-center items-center"
						)}
					>
						<Text style={tailwind("text-white text-2xl font-bold")}>
							R$
						</Text>
						<TextInput
							style={tailwind("text-white text-2xl font-bold")}
							clearTextOnFocus={true}
							blurOnSubmit={true}
							keyboardType={"numeric"}
							placeholder={"0,00"}
							placeholderTextColor={"#A0AEC0"}
						></TextInput>
					</View>
				</View>
			</View> */}
		</KeyboardAvoidingView>
	);
}

const estilos = {
	labelInputPrincipal: tailwind("text-gray-700 text-xl font-bold pb-8 mt-16"),
	inputPrincipal: tailwind(
		"border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-16 text-gray-700 text-base max-w-xs"
	),
	inputPrincipalVermelho: tailwind(
		"border border-red-700 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text-base max-w-xs"
	),

	labelInput: tailwind("text-gray-700 text-base font-bold mb-3 mr-40"),
	input: tailwind(
		"border border-gray-700 rounded w-64 py-2 px-2 mx-12 mb-4 ml-8 text-gray-700 text-base"
	),

	labelInputcategoria: tailwind(
		"text-gray-700 text-base font-bold mb-3 mr-40 ml-8"
	),

	botaoAdicionar: tailwind(
		"bg-green-400 py-2 rounded w-32 mb-8 mr-1 mt-12 ml-16"
	),
	textoBotaoAdicionar: tailwind("text-white font-medium text-lg text-center"),
	botaoCancelar: tailwind("py-2 rounded ml-8 mb-20 mt-12 mr-0"),
	textoBotaoCancelar: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),

	botaoAdicionarVermelho: tailwind(
		"bg-green-400 py-2 rounded w-32 mb-8 mr-1 mt-4 ml-16"
	),
	textoBotaoAdicionarVermelho: tailwind(
		"text-white font-medium text-lg text-center"
	),
	botaoCancelarVermelho: tailwind("py-2 rounded ml-8 mb-20 mt-4 mr-0"),
	textoBotaoCancelarVermelho: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),
};
