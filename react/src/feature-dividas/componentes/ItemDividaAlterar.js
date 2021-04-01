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
    ActivityIndicatorBase,
} from "react-native";
import tailwind from "tailwind-rn";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";

import DateInput from "./DateInput.js"
import { Input } from "../../comum/components/Input";
import Botao from "../../comum/components/Botao";
import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth.js";

function cancelar(){

}
function formulario({handleChange, handleBlur, handleSubmit, values, setFieldValue}){
	return (
		<ScrollView>
			<View>
				<Text style={tailwind("text-lg font-bold text-center mb-6")}>Qual o valor da dívida?</Text>
				<TextInput
					nativeID="colorido"
					style={[estilos.inputPrincipal]}
					placeholder={"R$ 0,00"}
					keyboardType={"numeric"}
					onChangeText={handleChange("valor")}
					onBlur={handleBlur("valor")}
				></TextInput>
			</View>

			<Input
				onChangeText={handleChange("credor")}
				onBlur={handleBlur("credor")}
				keyboard={"text"}
				placeholder={"Credor"}
				espacamento={true}
				label="Credor"
			/>
			
			<DateInput label="Data de vencimento" onPick={(data)=>setFieldValue("data", data)}/>

			<Input
				onChangeText={handleChange("juros")}
				onBlur={handleBlur("juros")}
				keyboard={"numeric"}
				placeholder={"0"}
				textContentType={"number"}
				espacamento={true}
				label="Juros"
			/>
			
			<Input
				onChangeText={handleChange("categoria")}
				onBlur={handleBlur("categoria")}
				keyboard={"text"}
				placeholder={"Categoria"}
				espacamento={true}
				label="Categoria"
			/>

			<Input
				onChangeText={handleChange("periodo")}
				onBlur={handleBlur("periodo")}
				keyboardType={"numeric"}
				placeholder={"periodo"}
				espacamento={true}
				label="Periodo"
			/>

			<Input
				onChangeText={handleChange("cobranca")}
				onBlur={handleBlur("cobranca")}
				keyboard={"text"}
				placeholder={"Cobrança"}
				espacamento={true}
				label="Cobranca"
			/>
			
		</ScrollView>
	)
}


export default function ItemDividaAlterar(props) {
	const [tipo, setTipo] = useState("divida");
	const {token} = useAuth();

	// Hooks para o Date Picker
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [temErro, setErro] = useState(false);
	const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(true);

	async function alterar(token, values){
		console.log("eu")
		let credor = values.credor || props.credor,
			valor_divida = values.valor_divida || props.valor_divida,
			valor_pago = values.valor_pago || props.valor_pago,
            juros = values.juros ||props.juros,
            juros_tipo = values.juros_tipo || props.juros_tipo,
            juros_ativos = values.juros_ativos || props.juros_ativos,
            periodo = values.periodo || props.periodo,
            valor = values.valor || props.valor,
            dia_cobranca = values.dia_cobranca || props.dia_cobranca,
            data_inicio = values.data_inicio || props.data_inicio,
            data_fim = values.data_fim || props.data_inicio
			categoria = values.categoria || props.categoria;


		data_lancamento = data_lancamento.split('/').reverse().join('-');
		let body = {credor,valor_divida,juros,juros_tipo,juros_ativos,periodo,valor,dia_cobranca,data_inicio,data_fim, valor_pago, categoria};

		let url = GLOBAL.BASE_URL+"/dividas/"+props.id+"/";

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
            setLoading(false);
		}else{
			setResultado("Atualizado com sucesso!");
			setErro(false);
            setLoading(false);
		}
		console.log(conteudo);
	}

	const showDatePicker = () => {
		setShow(true);
		setMode("date");
	};

	

	return (
		<>
		<View style={tailwind("absolute w-full h-full flex items-center justify-center")}>
				<View style={tailwind("bg-white p-12 rounded-md")}>
					<Formik
						initialValues={({valor: ""}, {data: ""}, {juros: ""})}
						onSubmit={alterar}
                    >
						{formulario}	
					</Formik>
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
const estilos = {
	inputPrincipal: tailwind("border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"),
    labelInput: tailwind("text-gray-700 text-base font-bold"),
    input: tailwind("bg-gray-100 rounded-lg py-2 px-3 text-gray-700 text-base"),
    errorInput: tailwind("bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"),
};
