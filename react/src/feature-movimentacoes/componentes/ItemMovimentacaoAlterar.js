import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
} from "react-native";
import tailwind from "tailwind-rn";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";

import ItemMovimentacao from "./ItemMovimentacao";
import { Input } from "../../comum/components/Input";
import Botao from "../../comum/components/Botao";
import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth.js";

function cancelar(){

}

export default function ItemMovimentacaoAlterar(props) {
	const [tipo, setTipo] = useState("receita");
	const {token} = useAuth();

	// Hooks para o Date Picker
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [temErro, setErro] = useState(false);
	const [resultado, setResultado] = useState(null);

	async function alterar(token, values){
		console.log("eu")
		let descricao = values.descricao || props.descricao,
			data_lancamento = values.prazo || props.data,
			valor_pago = values.valor || props.valor,
			categoria = values.categoria || props.categoria;

		
		data_lancamento = data_lancamento.split('/').reverse().join('-');
		let body = {descricao, data_lancamento, valor_pago, categoria};

		let url = GLOBAL.BASE_URL+"/movimentacao/"+props.indice+"/";
		
		let res = await fetch(url, {
			method: "put",
			headers: {'Authorization': token},
			body: JSON.stringify(body)
		});
		
		let json = await res.json(),
			conteudo = json.conteudo;
		if(!res.ok){
			setResultado(json.mensagem);
			setErro(true);
		}else{
			setResultado("Inserido com sucesso!");
			setErro(false);
		}
		console.log(conteudo);
	}	

	const showDatePicker = () => {
		setShow(true);
		setMode("date");
	};

	let data = props.data.split('/');
	data = data[2]+'-'+data[1]+'-'+data[0];

	return (
		<>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			></View>

			<View
				style={tailwind(
					"absolute w-full h-full flex items-center justify-end"
				)}
			>
				<View style={tailwind("bg-white w-full rounded-md py-12")}>
					<View style={tailwind("mb-6")}>
						<ItemMovimentacao
							descricao={props.descricao}
							valorPago={props.valor}
							dataLancamento={data}
						/>
					</View>

					<KeyboardAvoidingView style={tailwind("flex items-center")}>
						<Formik
							initialValues={
								({ valor: "" },
								{ data: "" },
								{ categoria: "" },
								{ descricao: "" })
							}
							onSubmit={values=> alterar(token, values)}
						>
							{({
								handleChange,
								handleBlur,
								handleSubmit,
								values,
								setFieldValue,
							}) => (
								<View style={tailwind("w-full")}>
									<View
										style={tailwind(
											"w-full px-12 py-6 flex flex-col items-center"
										)}
									>
										<Input
											label="Valor"
											onChangeText={handleChange("valor")}
											onBlur={handleBlur("valor")}
											value={values.valor}
											keyboard={"numeric"}
											placeholder={props.valor}
											textContentType={"number"}
											espacamento={true}
										></Input>
										<TouchableOpacity
											onPress={showDatePicker}
										>
											<Text
												style={tailwind(
													"text-gray-800 text-sm font-bold mb-3"
												)}
											>
												Prazo
											</Text>

											<TextInput
												style={tailwind(
													"bg-gray-100 rounded-lg w-64 py-2 px-3 text-gray-700 text-base mb-4"
												)}
												editable={false}
												value={values.prazo}
												placeholder={
													props.data
												}
												placeholderTextColor={"#A0AEC0"}
											/>

											{show && (
												<DateTimePicker
													value={date}
													mode={mode}
													display="default"
													onChange={(
														event,
														selectedDate
													) => {
														setShow(false);
														const currentDate = selectedDate.toISOString().split('T')[0].split('-').reverse().join('/');
														setFieldValue(
															"prazo",
															currentDate
														);
														console.log(
															currentDate
														);
													}}
												/>
											)}
										</TouchableOpacity>
										<Input
											label="Categoria"
											onChangeText={handleChange(
												"categoria"
											)}
											onBlur={handleBlur("categoria")}
											value={values.categoria}
											keyboard={"numeric"}
											placeholder={props.categoria}
											textContentType={"number"}
											espacamento={true}
										></Input>
										<Input
											label="Descrição"
											onChangeText={handleChange(
												"descricao"
											)}
											onBlur={handleBlur("descricao")}
											value={values.descricao}
											keyboard={"default"}
											placeholder={props.descricao}
											textContentType={"text"}
											espacamento={true}
										></Input>
									</View>

									<View
										style={tailwind(
											"flex flex-row justify-end px-6"
										)}
									>
									{temErro ? (
										renderErro(resultado)
									) : (
										
										renderSucesso(resultado)
									)}
										<Botao
											ordem="terciario"
											tamanho="pequeno"
											label="Cancelar"
											onPress={cancelar}
										/>
										<Botao
											ordem="primario"
											tamanho="pequeno"
											label="Alterar"
											onPress={handleSubmit}
										/>
									</View>
								</View>
							)}
						</Formik>
					</KeyboardAvoidingView>
				</View>
			</View>
		</>
	);
}
function renderErro(resultado) {
	return (
		<View >
			<Text >{resultado}</Text>
		</View>
	);
}

function renderSucesso(resultado) {
	return (
		<View >
			<Text >{resultado}</Text>
		</View>
	);
}
