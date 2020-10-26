import React, { useState } from "react";
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
	Picker,
} from "react-native";

import IndicadorNavegacao from "../comum/components/IndicadorNavegacao";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import tailwind from "tailwind-rn";
import * as yup from "yup";

const headerHeight = StatusBar.currentHeight;

const estiloExcecao = StyleSheet.create({
	container: { paddingTop: headerHeight },
});

const validationFormDividas = yup.object().shape({
	valorDivida: yup
		.number()
		.required("Campo Obrigatório")
		.positive("Somente valores positivos"),
	juros: yup.number().required("Campo Obrigatório"),
	periodoJuros: yup.string().required("Campo Obrigatório"),
	prazo: yup.date().required("Campo Obrigatório"),
});

export default function FormularioDivida({ navigation }) {
	// Hooks para o Select
	const [selectedValue, setSelectedValue] = useState("anualmente");

	// Hooks para o Date Picker
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const showDatePicker = () => {
		setShow(true);
		setMode("date");
	};

	return (
		<KeyboardAvoidingView style={[estiloExcecao.container, estilos.tela]}>
			<ScrollView style={[estilos.telaInterior]}>
				<IndicadorNavegacao tela="Formulário de Dívida" />

				<Text style={[estilos.textoFormulario, tailwind("mb-6")]}>
					Nos dê informações sobre a dívida que pretende quitar.
				</Text>

				<View style={estilos.containerFormulario}>
					<Formik
						initialValues={
							({ valorDivida: "" },
							{ juros: "" },
							{ periodoJuros: "" },
							{ prazo: "" })
						}
						onSubmit={(values) => {
							console.log(values);
							navigation.navigate("VisualizacaoGeral");
						}}
						validationSchema={validationFormDividas}
					>
						{({
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
							values,
							errors,
						}) => (
							<View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Valor
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange(
											"valorDivida"
										)}
										onBlur={handleBlur("valorDivida")}
										value={values.valorDivida}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={
											"Qual o valor da sua dívida?"
										}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.valorDivida && (
										<Text style={estilos.errorInput}>
											{errors.valorDivida}
										</Text>
									)}
								</View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Juros
									</Text>
									<TextInput
										style={estilos.input}
										clearTextOnFocus={true}
										onChangeText={handleChange("juros")}
										onBlur={handleBlur("juros")}
										value={values.juros}
										blurOnSubmit={true}
										keyboardType={"numeric"}
										placeholder={"Qual a taxa de juros?"}
										placeholderTextColor={"#A0AEC0"}
									/>

									{errors.juros && (
										<Text style={estilos.errorInput}>
											{errors.juros}
										</Text>
									)}
								</View>
								<View style={[estilos.containerInput]}>
									<Text style={estilos.labelInput}>
										Frequência de Juros
									</Text>

									<Picker
										mode="dropdown"
										selectedValue={selectedValue}
										onValueChange={(
											itemValue,
											itemIndex
										) => {
											setFieldValue(
												"periodoJuros",
												itemValue
											);
											setSelectedValue(itemValue);
											console.log(itemValue);
										}}
									>
										<Picker.Item
											label="Anualmente"
											value="anualmente"
										/>
										<Picker.Item
											label="Mensalmente"
											value="mensalmente"
										/>
										<Picker.Item
											label="Semanalmente"
											value="semanalmente"
										/>
										<Picker.Item
											label="Sem Juros"
											value="nunca"
										/>
									</Picker>

									{errors.periodoJuros && (
										<Text style={estilos.errorInput}>
											{errors.periodoJuros}
										</Text>
									)}
								</View>
								<TouchableOpacity
									style={[
										estilos.containerInput,
										tailwind("mb-6"),
									]}
									onPress={showDatePicker}
								>
									<Text style={estilos.labelInput}>
										Prazo
									</Text>

									<TextInput
										style={estilos.input}
										editable={false}
										value={values.prazo}
										placeholder={"Selecione a data."}
										placeholderTextColor={"#A0AEC0"}
									/>

									{show && (
										<DateTimePicker
											value={date}
											mode={mode}
											display="default"
											onChange={(event, selectedDate) => {
												setShow(false);
												const currentDate = selectedDate.toString();
												setFieldValue(
													"prazo",
													currentDate
												);
												console.log(currentDate);
											}}
										/>
									)}
									{errors.prazo && (
										<Text style={estilos.errorInput}>
											{errors.prazo}
										</Text>
									)}
								</TouchableOpacity>
								<TouchableOpacity
									style={estilos.botaoPrimarioGrande}
									onPress={handleSubmit}
									title="Submit"
								>
									<Text style={estilos.textoBotao}>
										Confirmar
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
