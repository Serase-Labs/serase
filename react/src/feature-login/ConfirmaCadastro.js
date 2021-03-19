import * as React from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";
//import IlustracaoConfirmaCadastro from "./assets/IlustracaoConfirmaCadastro";
import Botao from "../comum/components/Botao.js";
import IndicadorRetorno from "../comum/components/IndicadorRetorno.js";

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

export default function Relatorios({ navigation }) {
	

	return (
		<ScrollView
			style={[tailwind("flex-1 bg-white"), estiloExcecao.container]}
		>
			<IndicadorRetorno telaAtual="ConfirmaCadastro" />
            <View style={tailwind("flex-1")}>
						

                        <Text style={estilos.textoTerciario}>
									Comece a gerenciar a sua vida Financeira agora
								</Text>

					</View>
                    <View style={tailwind("flex w-full items-center")}>
						<Botao
							ordem="primario"
							tamanho="grande"
							onPress={() =>
								navigation.navigate("OnboardingMovimentacao")
							}
							label="Começar"
						></Botao>
					</View>

				
			)
		</ScrollView>
	);
}
const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),
	containerFormulario: tailwind("w-full items-center"),
	textoTerciario: tailwind("text-base text-gray-900 text-center mb-2"),
};