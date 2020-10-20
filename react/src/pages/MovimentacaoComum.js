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
			<Text>Home!</Text>
		</View>
	);
}

function SettingsScreen() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>Settings!</Text>
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
