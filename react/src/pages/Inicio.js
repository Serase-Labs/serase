import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import tailwind from "tailwind-rn";

import VisualizacaoGeral from "./VisualizacaoGeral.js";
import PerfilDeUso from "./PerfilDeUso.js";

const Tab = createBottomTabNavigator();

export default function Inicio({ navigation }) {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={VisualizacaoGeral} />
				<Tab.Screen name="Settings" component={PerfilDeUso} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
