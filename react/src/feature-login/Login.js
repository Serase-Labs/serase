import React from "react";
import {
	Text,
	View,
	StatusBar,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";

// Imports internos
import IndicadorNavegacao from "../comum/components/IndicadorNavegacao";
import Botao from "../comum/components/Botao.js";
import { Input, Error } from "../comum/components/Input";

// Imports externos
import { Formik } from "formik";

const headerHeight = StatusBar.currentHeight;

const estiloExcecao = StyleSheet.create({
	container: {
		paddingTop: headerHeight,
	},
});

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),

	containerFormulario: tailwind("w-full items-center"),
	containerInput: tailwind("w-64 mb-2"),

	textoTerciario: tailwind("text-base text-gray-900 text-center mb-2"),

	// Revisar se vamos utilizar autenticação pela Google
	botaoGoogle: tailwind("bg-blue-500 py-2 rounded w-64 mb-5"),
};

export default function Login({ navigation }) {
	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<ScrollView style={estilos.telaInterior}>
				<IndicadorNavegacao tela="Login" />

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
								<Input
									label="Email"
									onChangeText={handleChange("email")}
									onBlur={handleBlur("email")}
									value={values.email}
									keyboard={"email-address"}
									placeholder={"Insira o seu email"}
									textContentType={"name"}
									espacamento={false}
								>
									{errors.email && (
										<Text style={Error()}>
											{errors.email}
										</Text>
									)}
								</Input>

								<Input
									label="Senha"
									onChangeText={handleChange("senha")}
									onBlur={handleBlur("senha")}
									value={values.senha}
									textContentType={"password"}
									secureTextEntry={true}
									placeholder={"Insira a sua senha"}
									espacamento={true}
								>
									{errors.senha && (
										<Text style={Error()}>
											{errors.senha}
										</Text>
									)}
								</Input>

								<Botao
									ordem="primario"
									tamanho="grande"
									onPress={handleSubmit}
									label="Entrar"
									espacamento={true}
								></Botao>

								<Text style={estilos.textoTerciario}>
									Ainda não possui uma conta?
								</Text>

								<Botao
									ordem="terciario"
									tamanho="grande"
									onPress={() =>
										navigation.navigate("Cadastro")
									}
									label="Cadastrar"
								></Botao>
							</View>
						)}
					</Formik>
				</View>
				<View style={estilos.telaComplemento} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
