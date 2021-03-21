import React from "react";
import {
	Text,
	View,
	Image,
	StatusBar,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	ToastAndroid,
} from "react-native";
import tailwind from "tailwind-rn";
// Imports internos
import {ModalInformativa, TextoPrincipal, TextoInformativo} from "../comum/components/ModalInformativa";
import Botao from "../comum/components/Botao";
import { Input, Error } from "../comum/components/Input";
import { useAuth } from "./auth.js";
// Imports externos
import { Formik } from "formik";

export default function Login({ navigation }) {
	const { signIn } = useAuth();

	function handleSubmit(values) {
		signIn(values.email, values.senha)
			.then(() => navigation.navigate("Homepage"))
			.catch(
				console.log(
					"Deu ruim"
				) /* ()=> ToastAndroid.show("Email ou senha incorretos!", ToastAndroid.SHORT) */
			);
	}

	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
				<View style={tailwind("flex justify-end items-end")}>
					<ModalInformativa>
						<Text style={TextoPrincipal()}>O que é o Serase?</Text>
						<Text style={TextoInformativo()}>O aplicativo mais malado do Brasil, quicá de Minas Gerais</Text>
					</ModalInformativa>
				</View>
			<ScrollView
				contentContainerStyle={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
				style={estilos.telaInterior}
			>
				
				<View style={estilos.containerFormulario}>
					<Image
						style={[
							{ resizeMode: "contain" },
							tailwind("h-16 mb-12"),
						]}
						source={require("../comum/assets/lettermark128.png")}
					/>
					<Formik
						initialValues={({ email: "" }, { senha: "" })}
						onSubmit={(values) => {
							handleSubmit(values);
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
									label="Criar Conta"
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

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),
	containerFormulario: tailwind("w-full items-center"),
	textoTerciario: tailwind("text-base text-gray-900 text-center mb-2"),
};

const headerHeight = StatusBar.currentHeight;
const estiloExcecao = StyleSheet.create({
	container: { paddingTop: headerHeight },
});
