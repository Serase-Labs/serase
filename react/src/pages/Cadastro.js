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
	container: {
		paddingTop: headerHeight,
	},
});

const estilos = {
	tela: tailwind("bg-white flex-1"),
	telaInterior: tailwind("flex-1"),

	componenteLocalizacao: tailwind(
		"w-full flex flex-row items-center pt-5 pl-5"
	),
	logoLocalizacao: tailwind("mr-3 w-8 h-8"),
	textoLocalizacao: tailwind("text-base"),

	containerFormulario: tailwind("w-full items-center"),
	containerInput: tailwind("w-64 mb-2"),
	labelInput: tailwind("text-gray-700 text-base font-bold mb-3"),
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

	// Revisar se vamos utilizar autenticação pela Google
	botaoGoogle: tailwind("bg-blue-500 py-2 rounded w-64 mb-5"),
};

export default function Cadastro() {
	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<ScrollView style={estilos.telaInterior}>
				<View
					accessibilityRole="header"
					style={[tailwind("mb-6"), estilos.componenteLocalizacao]}
				>
					<Image
						style={estilos.logoLocalizacao}
						source={require("../assets/monologo512x512.png")}
					/>
					<Text style={estilos.textoLocalizacao}>Cadastro</Text>
				</View>

				<View style={estilos.containerFormulario}>
					<Formik
						initialValues={
							({ senha: "" },
							{ email: "" },
							{ senha: "" },
							{ senhaConfirmacao: "" })
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
								<View style={estilos.containerInput}>
									<Text style={estilos.labelInput}>Nome</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange("nome")}
										onBlur={handleBlur("nome")}
										value={values.email}
										blurOnSubmit={true}
										placeholder={"Insira o seu nome"}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.nome && (
										<Text style={estilos.errorInput}>
											{errors.email}
										</Text>
									)}
								</View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Email
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange("email")}
										onBlur={handleBlur("email")}
										value={values.email}
										blurOnSubmit={true}
										keyboard={"email-address"}
										placeholder={"Insira o seu email"}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.email && (
										<Text style={estilos.errorInput}>
											{errors.email}
										</Text>
									)}
								</View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Senha
									</Text>
									<TextInput
										style={estilos.input}
										onChangeText={handleChange("senha")}
										onBlur={handleBlur("senha")}
										value={values.senha}
										blurOnSubmit={true}
										textContentType={"password"}
										secureTextEntry={true}
										placeholder={"Insira a sua senha"}
										placeholderTextColor={"#A0AEC0"}
									/>
								</View>
								<View
									style={[
										estilos.containerInput,
										tailwind("mb-12"),
									]}
								>
									<Text style={estilos.labelInput}>
										Confirmar Senha
									</Text>
									<TextInput
										style={estilos.input}
										onChangeText={handleChange(
											"senhaConfirmacao"
										)}
										onBlur={handleBlur("senhaConfirmacao")}
										value={values.senhaConfirmacao}
										blurOnSubmit={true}
										textContentType={"password"}
										secureTextEntry={true}
										placeholder={"Repita a sua senha"}
										placeholderTextColor={"#A0AEC0"}
									/>
									{errors.senha && (
										<Text style={estilos.errorInput}>
											{errors.senhaConfirmacao}
										</Text>
									)}
								</View>

								<TouchableOpacity
									style={estilos.botaoPrimarioGrande}
									onPress={handleSubmit}
									title="Submit"
								>
									<Text style={estilos.textoBotao}>
										Cadastrar
									</Text>
								</TouchableOpacity>
								<TouchableOpacity style={estilos.botaoGoogle}>
									<Text style={estilos.textoBotao}>
										Cadastrar com o Google
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
