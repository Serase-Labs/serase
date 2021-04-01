import React from "react";
import { View, StyleSheet} from "react-native";
import tailwind from "tailwind-rn";

export default function BarraProgresso(props) {
	// Props
	let porcentagem = props.porcentagem, // <int> 0-100 porcentagem da barra
		cor = props.cor, // <string> cor da barra
		espacamento = props.espacamento; // <boolean> se verdadeiro, adiciona margem em baixo

	const style = StyleSheet.create({
		barra:{
			width: porcentagem+'%',
			backgroundColor: cor,
		}
	});

	return (
		<View style={[
			tailwind("bg-gray-400 w-full h-2 rounded"),
			espacamento? tailwind("mb-4") : tailwind("mb-0"),
		]}>
			<View style={[tailwind("h-2"), style.barra]}/>
		</View>
	);
}

BarraProgresso.defaultProps = {
	porcentagem: 0,
	cor: "#2AF598",
	espacamento: false,
};