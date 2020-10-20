// Essa tela/compomente comporta as telas que são encontradas diretamente
// pelo menu. Ela serve apenas para fazer chamadas as telas programadas
// em outros arquivos. Favor não programar as telas como funções aqui dentro.

import React from "react";
import tailwind from "tailwind-rn";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// Componentes de navegação
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Telas chamadas pelo Menu.
// Não são as telas oficiais, obviamente, mas as coloquei pra testar a
// funcionalidade do menu.
import VisualizacaoGeral from "./VisualizacaoGeral.js";
import PerfilDeUso from "./PerfilDeUso.js";
import MovimentacaoComum from "./MovimentacaoComum.js";

// Estilização do botão de adicionar
import IconeAdicionar from "../assets/icons/IconeAdicionar.js";
const cor = StyleSheet.create({
	primaria: {
		height: 60,
		width: 60,
		marginBottom: 20,
	},
});

// Criacao do menu inferior. Nomenclaturas melhores são muito bem-vindas.
const Tab = createBottomTabNavigator();

export default function Inicio({ navigation }) {
	return (
		// Documentação do Bottom Tab Navigator  -> https://reactnavigation.org/docs/tab-based-navigation
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let button;

						if (route.name === "Adicionar") {
							button = (
								<>
									<TouchableOpacity
										style={[
											tailwind(
												"flex flex-col justify-center items-center bg-green-400 rounded-full"
											),
											cor.primaria,
										]}
										onPress={() =>
											navigation.navigate(
												"MovimentacaoComum"
											)
										}
									>
										<View style={tailwind("w-8 h-8 mb-1")}>
											<IconeAdicionar uso="sistema"></IconeAdicionar>
										</View>
									</TouchableOpacity>
								</>
							);
						}
						return button;
					},
				})}
				tabBarOptions={{
					activeTintColor: "tomato",
					inactiveTintColor: "gray",
					style: {
						height: 50,
					},
					showLabel: false,
				}}
			>
				<Tab.Screen name="Inicio" component={VisualizacaoGeral} />
				<Tab.Screen name="Adicionar" component={MovimentacaoComum} />
				<Tab.Screen name="Settings" component={PerfilDeUso} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
