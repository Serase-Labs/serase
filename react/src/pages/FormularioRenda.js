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

export default function FormularioDivida() {
	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<ScrollView style={[estilos.telaInterior]}>
				<View
					accessibilityRole="header"
					style={[tailwind("mb-6"), estilos.componenteLocalizacao]}
				>
					<Image
						style={estilos.logoLocalizacao}
						source={require("../assets/monologo512x512.png")}
					/>
					<Text style={estilos.textoLocalizacao}>
						Formulário de Renda
					</Text>
				</View>

				<Text style={[estilos.textoFormulario, tailwind("mb-6")]}>
					Precisamos traçar o seu perfil financeiro.
				</Text>

				<View style={estilos.containerFormulario}>
					<Formik
						initialValues={
							({ rendaFixa: "" },
							{ dataPagamento: "" },
							{ despesaFixa: "" },
							{ dependentes: "" })
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
										Renda Fixa
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange("rendaFixa")}
										onBlur={handleBlur("rendaFixa")}
										value={values.rendaFixa}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={"Qual o seu salário fixo?"}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.rendaFixa && (
										<Text style={estilos.errorInput}>
											{errors.rendaFixa}
										</Text>
									)}
								</View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Data de Pagamento
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange(
											"dataPagamento"
										)}
										onBlur={handleBlur("dataPagamento")}
										value={values.dataPagamento}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={
											"Quando seu pagamento cai?"
										}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.dataPagamento && (
										<Text style={estilos.errorInput}>
											{errors.dataPagamento}
										</Text>
									)}
								</View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Despesa Fixa
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange(
											"despesaFixa"
										)}
										onBlur={handleBlur("despesaFixa")}
										value={values.despesaFixa}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={
											"Qual a sua despesa mensal"
										}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.rendaFixa && (
										<Text style={estilos.errorInput}>
											{errors.rendaFixa}
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
										Dependentes
									</Text>
									<Text style={estilos.textoDica}>
										Quantas pessoas se beneficiam da sua
										renda?
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange(
											"dependentes"
										)}
										onBlur={handleBlur("dependentes")}
										value={values.dependentes}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={"Número de pessoas"}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.dependentes && (
										<Text style={estilos.errorInput}>
											{errors.dependentes}
										</Text>
									)}
								</View>
								<TouchableOpacity
									style={estilos.botaoPrimarioGrande}
									onPress={handleSubmit}
									title="Submit"
								>
									<Text style={estilos.textoBotao}>
										Confirmar Dados
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
