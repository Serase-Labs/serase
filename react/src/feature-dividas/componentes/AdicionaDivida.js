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
} from "react-native";
import tailwind from "tailwind-rn";
import { Formik } from "formik";

import Botao from "../../comum/components/Botao";
import { Input } from "../../comum/components/Input";
import DateInput from "../../comum/components/InputDate.js"
import InputCategoria from "../../comum/components/InputCategoria.js"
import InputPeriodo from "../../comum/components/InputPeriodo.js"
import InputSelect from "../../comum/components/InputSelect.js"

import GLOBAL from "../../Global.js"
import { useAuth } from "../../feature-login/auth.js";



async function adicionar(token, indice){
	let url = GLOBAL.BASE_URL+"/divida/"+indice+"/";
		
	let res = await fetch(url, {
		method: "delete",
		headers: {'Authorization': token},
	});
		
	let json = await res.json(),
		conteudo = json.conteudo;
}


function formulario({handleChange, handleBlur, handleSubmit, values, setFieldValue}){
	const [periodo, setPeriodo] = useState("");
	let options = [];

	if(periodo=="anual"){
		options = [
			["Janeiro", 1],
			["Fevereiro", 2],
			["Março", 3],
			["Abril", 4],
			["Maio", 5],
			["Junho", 6],
			["Julho", 7],
			["Agosto", 8],
			["Setembro", 9],
			["Outubro", 10],
			["Novembro", 11],
			["Dezembro", 12],
		];
	} else if(periodo=="semanal"){
		options = [
			["Domingo", 1],
			["Segunda", 2],
			["Terça", 3],
			["Quarta", 4],
			["Quinta", 5],
			["Sexta", 6],
			["Sabado", 7],
		];
	}

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
				onChangeText={handleChange("credo")}
				onBlur={handleBlur("credor")}
				keyboard={"text"}
				placeholder={"Credor"}
				espacamento={true}
				label="Credor"
			/>

					
			<DateInput label="Data de vencimento" onPick={(data)=>setFieldValue("data", data)}/>

			<InputCategoria onValueChange={value=>setFieldValue("categoria",value)} espacamento={true}/>

			<Input
				onChangeText={handleChange("juros")}
				onBlur={handleBlur("juros")}
				keyboard={"numeric"}
				placeholder={"0"}
				textContentType={"number"}
				espacamento={true}
				label="Juros"
			/>

			<InputPeriodo onValueChange={periodo=>{
				setFieldValue("periodo",periodo);
				setPeriodo(periodo);
			}} espacamento={true}/>

			{ (periodo!="" && periodo!="mensal") &&
				<InputSelect
					label="Cobrança"
					placeholder="Selecionar cobrança..."
					options={options}
					onValueChange={cobranca=>setFieldValue("cobranca",cobranca)}
					espacamento={true}
					enabled={periodo!="" && periodo!="mensal"}
				/>
			}
			
		</ScrollView>
	)
}

export default function AdicionaDivida() {
	const {token} = useAuth();
	

	return (
		<>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			/>

			<View style={tailwind("absolute w-full h-full flex items-center justify-center")}>
				<View style={tailwind("bg-white p-12 rounded-md")}>
					<Formik
						initialValues={({valor: ""}, {data: ""}, {juros: ""})}
						onSubmit={adicionar}
                    >
						{formulario}	
					</Formik>
				</View>
			</View>
			
		</>
	);
}

const estilos = {
	inputPrincipal: tailwind("border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"),
    labelInput: tailwind("text-gray-700 text-base font-bold"),
    input: tailwind("bg-gray-100 rounded-lg py-2 px-3 text-gray-700 text-base"),
    errorInput: tailwind("bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"),
};
