// Este arquivo abriga a interface e lógica
// da ilustração e barra de navegação
// que invoca as páginas de relatório
// por período.

import * as React from "react";
import { useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";

// Componentes Internos
import IndicadorRetorno from "../comum/components/IndicadorRetorno.js";
import ListaVazia from "../comum/components/ListaVazia";
import Botao from "../comum/components/Botao.js";
import IlustracaoRelatorio from "./assets/IlustracaoRelatorio";
import RelatorioSemanal from "./RelatorioSemanal.js";
import RelatorioMensal from "./RelatorioMensal.js";
import RelatorioAnual from "./RelatorioAnual.js";

// Componentes Externos
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Estilizacao
const headerHeight = StatusBar.currentHeight;

const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});

// Componente de navegação com estilização
// sobrescrevendo o Material Design
function BarraNavegacao({ state, descriptors, navigation }) {
	const focusedOptions = descriptors[state.routes[state.index].key].options;

	if (focusedOptions.tabBarVisible === false) {
		return null;
	}

	return (
		<View style={tailwind("mx-5 my-5 flex flex-row")}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						key={index}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1 }}
					>
						<Text
							style={[
								{
									backgroundColor: isFocused
										? "#E2E8F0"
										: "#FFFFFF",
								},
								tailwind(
									"text-blue-800 text-base rounded-md py-3 text-center"
								),
							]}
						>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const Tab = createMaterialTopTabNavigator();

export default function Relatorios({ navigation }) {
	const [populada, setPopulada] = useState(true);

	return (
		<ScrollView
			style={[tailwind("flex-1 bg-white"), estiloExcecao.container]}
		>
			<IndicadorRetorno telaAtual="Relatórios" navigation={navigation} />

			{populada == false ? (
				<View style={tailwind("flex justify-center flex-1")}>
					<ListaVazia mensagem="Você ainda não relatou nenhuma movimentação. Assim que o fizer, seus relatórios serão gerados." />
					<View style={tailwind("flex w-full items-center")}>
						<Botao
							ordem="primario"
							tamanho="grande"
							onPress={() =>
								navigation.navigate("MovimentacaoComum")
							}
							label="Adicionar Movimentação"
						></Botao>
					</View>
				</View>
			) : (
				<>
					<View style={tailwind("flex-1")}>
						<View style={tailwind("h-32")}>
							<IlustracaoRelatorio />
						</View>

						<View style={tailwind("flex-1")}>
							<NavigationContainer>
								<Tab.Navigator
									tabBar={(props) => (
										<BarraNavegacao {...props} />
									)}
								>
									<Tab.Screen
										name="Semana"
										component={RelatorioSemanal}
									/>
									<Tab.Screen
										name="Mês"
										component={RelatorioMensal}
									/>
									<Tab.Screen
										name="Ano"
										component={RelatorioAnual}
									/>
								</Tab.Navigator>
							</NavigationContainer>
						</View>
					</View>
				</>
			)}
		</ScrollView>
	);
}
