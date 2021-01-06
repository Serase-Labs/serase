import React from "react";
import {
	Text,
	View,
	TextInput,
	StatusBar,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import tailwind from "tailwind-rn";
// Imports internos
import IndicadorNavegacao from "../comum/components/IndicadorNavegacao";
import Botao from "../comum/components/Botao";
import { Input, Error } from "../comum/components/Input";
// Imports externos
import { Formik } from "formik";
import * as yup from "yup";

const estilos = {
	tela: tailwind("bg-white flex-1"),
	telaInterior: tailwind("flex-1"),
	containerFormulario: tailwind("w-full items-center"),
	textoTerciario: tailwind("text-base text-gray-900 text-center mb-2"),
};

const headerHeight = StatusBar.currentHeight;

const estiloExcecao = StyleSheet.create({
	container: {
		paddingTop: headerHeight,
	},
});

const formatoEmail =
	"^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+).(.[a-z]{2,3})$";

const validationsCadastro = yup.object().shape({
	nome: yup.string().required("Campo Obrigatório"),
	email: yup
		.string()
		.required("Campo Obrigatório")
		.matches(formatoEmail, "Formato Inválido"),
	senha: yup
		.string()
		.required("Campo Obrigatório")
		.min(8, "Digite pelo menos 8 caracteres"),
	senhaConfirmacao: yup
		.string()
		.required("Campo Obrigatório")
		.oneOf([yup.ref("senha"), null], "As senhas não correspondem"),
});

export default function Cadastro({ navigation }) {
	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<IndicadorNavegacao tela="Cadastro" />
			<ScrollView
				contentContainerStyle={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
				style={estilos.telaInterior}
			>
				<View style={estilos.containerFormulario}>
					<Formik
						initialValues={
							({ nome: "" },
							{ email: "" },
							{ senha: "" },
							{ senhaConfirmacao: "" })
						}
						onSubmit={(values) => {
							console.log(values);
							navigation.navigate("PerfilDeUso");
						}}
						validationSchema={validationsCadastro}
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
									label="Nome"
									onChangeText={handleChange("nome")}
									onBlur={handleBlur("nome")}
									value={values.nome}
									placeholder={"Insira o seu nome"}
									espacamento={false}
								>
									{errors.nome && (
										<Text style={Error()}>
											{errors.nome}
										</Text>
									)}
								</Input>

								<Input
									label="Email"
									onChangeText={handleChange("email")}
									onBlur={handleBlur("email")}
									value={values.email}
									keyboard={"email-address"}
									placeholder={"Insira o seu email"}
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
									espacamento={false}
								>
									{errors.senha && (
										<Text style={Error()}>
											{errors.senha}
										</Text>
									)}
								</Input>

								<Input
									label="Confirmar Senha"
									style={estilos.input}
									onChangeText={handleChange(
										"senhaConfirmacao"
									)}
									onBlur={handleBlur("senhaConfirmacao")}
									value={values.senhaConfirmacao}
									textContentType={"password"}
									secureTextEntry={true}
									placeholder={"Repita a sua senha"}
									espacamento={true}
								>
									{errors.senhaConfirmacao && (
										<Text style={estilos.errorInput}>
											{errors.senhaConfirmacao}
										</Text>
									)}
								</Input>

								<Botao
									ordem="primario"
									tamanho="grande"
									onPress={handleSubmit}
									label="Cadastrar"
									espacamento={true}
								></Botao>

								<Text style={estilos.textoTerciario}>
									Já possui uma conta?
								</Text>

								<Botao
									ordem="terciario"
									tamanho="grande"
									onPress={() => navigation.navigate("Login")}
									label="Fazer Login"
								></Botao>
							</View>
						)}
					</Formik>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
