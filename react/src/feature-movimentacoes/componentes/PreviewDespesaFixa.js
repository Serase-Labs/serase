import * as React from "react";
import { useState, useEffect } from "react";

export default function PreviewDespesaFixa() {
	return (
		<>
			<View style={tailwind("px-5")}>
				<Text style={tailwind("text-lg font-bold")}>
					Desespesa Fixa
				</Text>
			</View>
			<View style={[tailwind("flex-row bg-white justify-center ml-6")]}>
				<ScrollView horizontal={true}>
					<TouchableOpacity
						style={estilos.botaoDespesaVlrTotal}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.botaoDespesaTxt}>Comida</Text>
						<Text style={estilos.botaoDespesaVlrTxt}>
							R$ 500.00
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={estilos.botaoDespesa}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.botaoDespesaTxt}>Drogas</Text>
						<Text style={estilos.botaoDespesaVlrTxt}>
							R$ 500.00
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={estilos.botaoDespesa}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.botaoDespesaTxt}>Alface</Text>
						<Text style={estilos.botaoDespesaVlrTxt}>
							R$ 500.00
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={estilos.botaoDespesa}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.botaoDespesaTxt}>Netflix</Text>
						<Text style={estilos.botaoDespesaVlrTxt}>
							R$ 500.00
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={estilos.botaoDespesa}
						//onPress={handleSubmit}
						title="Submit"
					>
						<Text style={estilos.botaoDespesaTxt}>Alface</Text>
						<Text style={estilos.botaoDespesaVlrTxt}>
							R$ 500.00
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		</>
	);
}
