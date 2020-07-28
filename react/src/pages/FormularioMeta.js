import React from "react";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	StatusBar,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";

import { Formik } from "formik";
import tailwind from "tailwind-rn";

const headerHeight = StatusBar.currentHeight;

const estiloExcecao = StyleSheet.create({
	container: { paddingTop: headerHeight },
});

export default function FormularioMeta() {
	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<ScrollView style={[estilos.telaInterior]}>
				<View
					accessibilityRole="header"
					style={[tailwind("mb-10"), estilos.componenteLocalizacao]}
				>
					<Image
						style={estilos.logoLocalizacao}
						source={require("../assets/monologo512x512.png")}
					/>
					<Text style={estilos.textoLocalizacao}>
						Formulário de Meta
					</Text>
				</View>

				<Text style={[estilos.textoFormulario, tailwind("mb-10")]}>
					Nos dê informações sobre a sua meta financeira.
				</Text>

				<View style={estilos.containerFormulario}>
					<Formik
						initialValues={
							({ quantia: "" },
							{ prazo: "" },
							{ disponibilidade: "" })
						}
						onSubmit={(values) => console.log(values)}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							values,
							errors,
						}) => (
							<View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Quantia
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange("quantia")}
										onBlur={handleBlur("quantia")}
										value={values.quantia}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={
											"Quanto você pretende juntar?"
										}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.quantia && (
										<Text style={estilos.errorInput}>
											{errors.quantia}
										</Text>
									)}
								</View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Prazo
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange("prazo")}
										onBlur={handleBlur("prazo")}
										value={values.prazo}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={
											"Quando deseja atingir a meta?"
										}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.prazo && (
										<Text style={estilos.errorInput}>
											{errors.prazo}
										</Text>
									)}
								</View>
								<View
									style={[
										estilos.containerInput,
										tailwind("mb-6"),
									]}
								>
									<Text style={estilos.labelInput}>
										Disponibilidade
									</Text>
									<Text style={estilos.textoDica}>
										Quanto da sua renda fixa você quer
										dedicar para a sua meta?
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange(
											"disponibilidade"
										)}
										onBlur={handleBlur("disponibilidade")}
										value={values.disponibilidade}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={"Exemplo: 20 indica 20%"}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.prazo && (
										<Text style={estilos.errorInput}>
											{errors.prazo}
										</Text>
									)}
								</View>
								<TouchableOpacity
									style={estilos.botaoPrimarioGrande}
									onPress={handleSubmit}
									title="Submit"
								>
									<Text style={estilos.textoBotao}>
										Confirmar Meta
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),

	componenteLocalizacao: tailwind(
		"w-full flex flex-row items-center pt-5 pl-5"
	),
	logoLocalizacao: tailwind("mr-3 w-8 h-8"),
	textoLocalizacao: tailwind("text-base"),

	textoFormulario: tailwind(
		"text-lg text-gray-900 w-3/4 flex self-center text-center"
	),

	containerFormulario: tailwind("w-full items-center"),
	containerInput: tailwind("w-64 mb-2"),
	labelInput: tailwind("text-gray-700 text-base font-bold mb-3"),
	textoDica: tailwind("text-gray-500 text-base mb-3"),
	input: tailwind(
		"border border-gray-500 rounded w-full py-2 px-3 text-gray-700 text-base"
	),
	errorInput: tailwind(
		"bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"
	),

	botaoPrimarioGrande: tailwind("bg-green-400 py-2 rounded w-64 mb-5"),
	textoBotao: tailwind("text-white font-medium text-lg text-center"),
	botaoTerciarioGrande: tailwind("bg-transparent py-2 rounded w-64"),
	textoBotaoTerciario: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),
};
