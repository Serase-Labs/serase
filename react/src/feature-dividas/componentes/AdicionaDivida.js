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



async function adicionar(token, values){
	// TO DO !
	let url = GLOBAL.BASE_URL+"/divida/";
		
	let res = await fetch(url, {
		method: "post",
		headers: {'Authorization': token},
	});
		
	let json = await res.json(),
		conteudo = json.conteudo;
}


function formulario({handleChange, handleBlur, handleSubmit, values, setFieldValue}){
	const [periodo, setPeriodo] = useState("");
	let options = [], campo_cobranca="";

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
		campo_cobranca = "Mês da cobrança";
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
		campo_cobranca = "Dia da cobrança";
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			
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

			<InputPeriodo onValueChange={periodo=>{
				setFieldValue("periodo",periodo);
				setPeriodo(periodo);
			}} espacamento={true}/>

			{ (periodo!="" && periodo!="mensal") &&
				<InputSelect
					label={campo_cobranca}
					placeholder="Selecionar cobrança..."
					options={options}
					onValueChange={cobranca=>setFieldValue("cobranca",cobranca)}
					espacamento={true}
					enabled={periodo!="" && periodo!="mensal"}
				/>
			}

			<Input
				onChangeText={handleChange("juros")}
				onBlur={handleBlur("juros")}
				keyboardType={"numeric"}
				placeholder={"00.00%"}
				textContentType={"number"}
				espacamento={true}
				label="Juros"
			/>

			<InputSelect
				label="Tipo de Juros"
				placeholder="Selecionar tipo..."
				options={[["Simples", "simples"], ["Composto", "composto"]]}
				onValueChange={cobranca=>setFieldValue("tipo_jutos",cobranca)}
				espacamento={true}
			/>

			<View style={tailwind("flex flex-row justify-end w-full")}>
									
				<Botao
					ordem="terciario"
					tamanho="pequeno"
					label="Cancelar"
					onPress={console.log}
				/>
				
				<Botao
					ordem="primario"
					tamanho="pequeno"
					label="Adicionar"
					onPress={handleSubmit}
				/>
			</View>
			
		</ScrollView>
	)
}

export default function AdicionaDivida() {
	const {token} = useAuth();
	

	return (
		<View style={tailwind("flex justify-end")}>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			/>

			<View style={[tailwind("absolute w-full flex items-center justify-center"), estilosCustom.tamanho]}>
				<View style={tailwind("bg-white p-12 rounded-md")}>
					<Formik
						initialValues={({valor: ""}, {data: ""}, {juros: ""})}
						onSubmit={adicionar}
                    >
						{formulario}	
					</Formik>
				</View>
			</View>
			
		</View>
	);
}

const estilos = {
	inputPrincipal: tailwind("border border-green-400 rounded font-bold text-4xl py-6 px-10 text-center mb-8 text-gray-700 text base max-w-xs"),
    labelInput: tailwind("text-gray-700 text-base font-bold"),
    input: tailwind("bg-gray-100 rounded-lg py-2 px-3 text-gray-700 text-base"),
    errorInput: tailwind("bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"),
};

const estilosCustom = StyleSheet.create({
	tamanho: {height: "85%"}
});