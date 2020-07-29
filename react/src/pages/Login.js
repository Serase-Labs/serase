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
	tela: tailwind("flex-1 bg-white"),
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

	textoTerciario: tailwind("text-base text-gray-900 text-center mb-2"),

	// Revisar se vamos utilizar autenticação pela Google
	botaoGoogle: tailwind("bg-blue-500 py-2 rounded w-64 mb-5"),
};

export default function Login({navigation}) {
	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<ScrollView style={estilos.telaInterior}>
				<View
					accessibilityRole="header"
					style={[tailwind("mb-16"), estilos.componenteLocalizacao]}
				>
					<Image
						style={estilos.logoLocalizacao}
						source={require("../assets/monologo512x512.png")}
					/>
					<Text style={estilos.textoLocalizacao}>Fazer Login</Text>
				</View>

				<View style={estilos.containerFormulario}>
					<Formik
						initialValues={({ email: "" }, { senha: "" })}
						onSubmit={(values) => {
							console.log(values);
							navigation.navigate("VisualizacaoGeral");
						}}
						validate={(values) => {
							const errors = {};
							if (!values.email) {
								errors.email = "Ei, não esqueça esse campo!";
							} else if (
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
									values.email
								)
							) {
								errors.email = "Insira um email válido.";
							}

							if (!values.senha) {
								errors.senha =
									"Não esqueça de preencher a sua senha!";
							}

							return errors;
						}}
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
								<View
									style={[
										estilos.containerInput,
										tailwind("mb-12"),
									]}
								>
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

									{errors.senha && (
										<Text style={estilos.errorInput}>
											{errors.senha}
										</Text>
									)}
								</View>
								<TouchableOpacity
									style={estilos.botaoPrimarioGrande}
									onPress={handleSubmit}
									title="Submit"
								>
									<Text style={estilos.textoBotao}>
										Entrar
									</Text>
								</TouchableOpacity>
									<TouchableOpacity style={estilos.botaoGoogle} onPress={() =>navigation.navigate("VisualizacaoGeral")}>
									<Text style={estilos.textoBotao}>
										Entrar com o Google
									</Text>
								</TouchableOpacity>

								<Text style={estilos.textoTerciario}>
									Ainda não possui uma conta?
								</Text>
								<TouchableOpacity
									style={estilos.botaoTerciarioGrande}
									onPress={() => navigation.navigate("Cadastro")}
								>
									<Text style={estilos.textoBotaoTerciario}>
										Cadastrar
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</Formik>
				</View>
				<View style={estilos.telaComplemento} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
