import * as React from "react";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";

import IconeSeta from "../../comum/assets/IconeSeta";

export default function TabGrafico(props) {
	const [toggleGraficoCategoria, setToggleGraficoCategoria] = useState(false);

	return (
		<View style={tailwind("mb-4")}>
			<TouchableOpacity
				style={tailwind(
					"flex flex-row w-full justify-between items-center"
				)}
				onPress={() =>
					setToggleGraficoCategoria(!toggleGraficoCategoria)
				}
			>
				<View>
					{toggleGraficoCategoria ? (
						<Text
							style={tailwind(
								"mb-2 text-base font-bold text-blue-800"
							)}
						>
							{props.conteudo}
						</Text>
					) : (
						<Text
							style={tailwind(
								"mb-2 text-base font-bold text-gray-900"
							)}
						>
							{props.conteudo}
						</Text>
					)}
					<Text style={tailwind("text-sm text-gray-500")}>
						{props.descricao}
					</Text>
				</View>

				<View style={tailwind("w-6 h-6")}>
					<IconeSeta estado={toggleGraficoCategoria} />
				</View>
			</TouchableOpacity>

			{toggleGraficoCategoria && props.children}
		</View>
	);
}
