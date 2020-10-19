import * as React from "react";
import { useState } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";

// Componentes
import IndicadorRetorno from "../components/IndicadorRetorno";
import ListaVazia from "../components/ListaVazia";

const headerHeight = StatusBar.currentHeight;

const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});

const estilos = {
	botaoPrimarioGrande: tailwind("bg-green-400 py-2 rounded w-56 mb-5"),
	textoBotao: tailwind("text-white font-medium text-lg text-center"),
};

export default function Despesas() {
	const [populada, setPopulada] = useState(false);

	return (
		<View style={[tailwind("flex-1 bg-white"), estiloExcecao.container]}>
			<IndicadorRetorno telaAtual="Despesas" />

			{populada == true ? (
				<Text>AAAA</Text>
			) : (
				<>
					<View style={tailwind("flex justify-center flex-1")}>
						<ListaVazia mensagem="Você ainda não relatou nenhuma despesa. Assim que o fizer, ela aparecerá aqui." />
						<View style={tailwind("flex w-full items-center")}>
							<TouchableOpacity
								style={estilos.botaoPrimarioGrande}
							>
								<Text style={estilos.textoBotao}>
									Adicionar Despesa
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</>
			)}
		</View>
	);
}
