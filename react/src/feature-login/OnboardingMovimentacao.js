import React from "react";
import tailwind from "tailwind-rn";
import { View, Text, StyleSheet, TextInput } from "react-native";

// Imports internos
import Botao from "../comum/components/Botao.js";
import { useAuth } from "./auth.js";
import AdicionaDivida from "../feature-dividas/componentes/AdicionaDivida.js";
import GLOBAL from "../Global"
async function adicionarSaldo(valor,token){
	
	let body = {
		valor_pago: valor,
		data_lancamento: "2021-04-01" ,
		categoria: "Salário",
		descricao: "PrimeiraMovimentacao",
	};
	console.log( body.descricao );
	let url = GLOBAL.BASE_URL+"/movimentacao/";
		
	let res =  fetch(url, {
		method: "post",
		headers: {'Authorization': token},
		body: JSON.stringify(body)
	});
		
	let json = res.json();
	console.log(json);
	
}
export default function Confirmacao({navigation}) {
	const [valor, setValor] = React.useState([]);
	const {token} = useAuth();
	adicionarSaldo(valor,token)
	return (
		<View
			style={tailwind(
				"flex-1 flex-col items-center bg-white justify-center"
			)}
		>
            <Text
					style={[
						tailwind("text-xl font-bold text-center mb-2"),
						estilos.texto,
					]}
				>
					Configure seu saldo atual
				</Text>
                <Text
					style={[
						tailwind("text-lg text-center w-64 mb-10"),
						estilos.texto,
					]}
				>
					Adicione seu saldo atual para começar o gerencimento financeiro da maneira certa.
				</Text>

                <TextInput
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
				onChangeText={(text) => setValor(text)}
				
			    ></TextInput>
				
				<Botao
					ordem="primario"
					tamanho="medio"
					
					label="Confirmar Saldo"
					onPress= {() => adicionarSaldo(valor,token)}
					onPress={() =>
						navigation.navigate("Homepage")
						}
				></Botao>
                <Botao
					ordem="terciario"
					tamanho="grande"
					onPress={() =>
					navigation.navigate("Homepage")
					}
					label="Pular"
				></Botao>
			
		</View>
	);
}

const estilos = StyleSheet.create({
	inputPrincipal: tailwind(
		"border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"
	),
	texto: {
		color: "#0E305B",
	},
}); 
/*
import React from "react";
import tailwind from "tailwind-rn";
import { View, Text, StyleSheet, TextInput } from "react-native";

// Imports internos
import Botao from "../comum/components/Botao.js";

async function adicionarSaldo(token, values, closeModal){
	
	let body = {
		valor_pago: values.valor_pago,
		data_lancamento: "2021-03-31" ,
		categoria: "Salário",
		descricao: "Primeira Movimentacao",
	};

	let url = GLOBAL.BASE_URL+"/movimentacao/";
		
	let res = await fetch(url, {
		method: "post",
		headers: {'Authorization': token},
		body: JSON.stringify(body)
	});
		
	let json = await res.json();
	console.log(json);
	if(res.ok) closeModal(true);
}
export default function Confirmacao({navigation}) {

	return (
		<View
			style={tailwind(
				"flex-1 flex-col items-center bg-white justify-center"
			)}
		>
            <Text
					style={[
						tailwind("text-xl font-bold text-center mb-2"),
						estilos.texto,
					]}
				>
					Configure seu saldo atual
				</Text>
                <Text
					style={[
						tailwind("text-lg text-center w-64 mb-10"),
						estilos.texto,
					]}
				>
					Adicione seu saldo atual para começar o gerencimento financeiro da maneira certa.
				</Text>

                <TextInput
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
				
				onChangeText={handleChange("valor_pago")}
				onBlur={handleBlur("valor_pago")}
			    ></TextInput>
				
				<Botao
					ordem="primario"
					tamanho="medio"
					onPress={() => console.log("OnboardingMovimentacao")}
					label="Confirmar Saldo"
					onSubmit={values=> adicionarSaldo(token, values)}
				></Botao>
                <Botao
					ordem="terciario"
					tamanho="grande"
					onPress={() =>
					navigation.navigate("Homepage")
					}
					label="Pular"
				></Botao>
			
		</View>
	);
}

const estilos = StyleSheet.create({
	inputPrincipal: tailwind(
		"border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"
	),
	texto: {
		color: "#0E305B",
	},
});
*/