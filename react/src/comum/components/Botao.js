import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

function ordem(ordemBotao) {
	// Determina a cor dos botões a partir da sua importância
	// Possíveis valores: primário, secundário, terciário e erro
	switch (ordemBotao) {
		case "primario":
			return tailwind("bg-green-400");
		case "secundario":
			return tailwind("bg-blue-800");
		case "terciario":
			return tailwind("bg-transparent");
		case "erro":
			return tailwind("bg-red-400");
	}
}

function tamanho(tamanhoBotao) {
	// Determina o tamanho dos botões de acordo com o espaçamento necessário
	// Possíveis valores: grande, medio, pequeno
	switch (tamanhoBotao) {
		case "grande":
			return tailwind("w-64");
		case "medio":
			return tailwind("w-48");
		case "pequeno":
			return tailwind("w-24");
	}
}

export default function Botao(props) {
	// Props
	// Ordem = qual o nível de importância do botão
	// Tamanho = Qual o botão requerido pelo botão
	// onPress = a função do botão (por exemplo, para qual tela ele direciona)
	// label = texto a ser exibido dentro do botão
	// espacamento = distancia a ser delimitada abaixo do botao
	return (
		<TouchableOpacity
			style={[
				tailwind("py-2 rounded-lg"),
				ordem(props.ordem),
				tamanho(props.tamanho),
				props.espacamento == true ? tailwind("mb-4") : tailwind("mb-0"),
			]}
			onPress={props.onPress}
		>
			<Text
				style={[
					tailwind("font-medium text-lg text-center"),
					props.ordem === "terciario"
						? tailwind("text-blue-700")
						: tailwind("text-white"),
				]}
			>
				{props.label}
			</Text>
		</TouchableOpacity>
	);
}

// O valor de espacamento é false por padrão, portanto,
// qualquer elemento imediatamente abaixo de um botão estará
// "colado" nele.
// se um botão possui outro elemento imediatamente abaixo dele,
// é imperativo que esse valor seja true.
Botao.defaultProps = { espacamento: false };
