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

async function adicionar(token, values, closeModal){
	let body = {
		credor: values.credor,
		valor_divida: Number(values.valor),
		periodo: values.periodo,
		dia_cobranca: Number(values.cobranca || 5),
		categoria: values.categoria,
		data_fim: values.data.split('/').reverse().join('-'),
	};

	let juros = {
		juros: values.juros,
		tipo_juros: values.tipo_juros,
		juros_ativos: !(values.tipo_juros=="não ativo"||values.tipo_juros=="")
	}

	if(juros.juros_ativos) body = Object.assign(body, juros);

	let url = GLOBAL.BASE_URL+"/divida/";
		
	let res = await fetch(url, {
		method: "post",
		headers: {'Authorization': token},
		body: JSON.stringify(body)
	});
		
	let json = await res.json();
	console.log(json);
	if(res.ok) closeModal(true);
}


function formulario({handleChange, handleBlur, handleSubmit, values, setFieldValue}, closeModal){
	const [periodo, setPeriodo] = useState("");
	const [juros, setJuros] = useState(false);
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
				onChangeText={handleChange("credor")}
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

			<InputSelect
				label="Juros"
				placeholder="Selecionar tipo..."
				options={[["Não inclui", "não ativo"],["Simples", "simples"], ["Composto", "composto"]]}
				onValueChange={juros=>{
					setFieldValue("tipo_juros",juros);
					setJuros(juros!="não ativo"&&juros!="");
				}}
				espacamento={true}
			/>

			{ juros &&
				<Input
					onChangeText={handleChange("juros")}
					onBlur={handleBlur("juros")}
					keyboardType={"numeric"}
					placeholder={"0.00%"}
					textContentType={"number"}
					espacamento={true}
					label="Valor do juros"
				/>
			}

			

			<View style={tailwind("flex flex-row justify-end w-full")}>
									
				<Botao
					ordem="terciario"
					tamanho="pequeno"
					label="Cancelar"
					onPress={()=>closeModal(false)}
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

export default function AdicionaDivida({closeModal}) {
	const {token} = useAuth();
	

	return (
		<View style={tailwind("flex justify-end")}>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			/>

			<View style={[tailwind("absolute w-full flex items-center justify-center"), estilosCustom.tamanho]}>
				<View style={tailwind("bg-white p-12 rounded-md")}>
					<Formik
						initialValues={({valor: ""}, {data: ""}, {juros: ""}, {tipo_juros: ""}, {cobranca: ""}, {periodo: ""}, {categoria: ""}, {credor: ""})}
						onSubmit={values=> adicionar(token, values, closeModal)}
                    >
						{params=>formulario(params, closeModal)}	
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