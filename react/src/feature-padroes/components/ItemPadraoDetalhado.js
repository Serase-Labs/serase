import * as React from "react";
import { useState, useEffect } from "react";
import {
	Text,
	View,
	Modal,
	Alert,
} from "react-native";
import tailwind from "tailwind-rn";

import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth.js";

async function excluir(token, indice){
	let url = GLOBAL.BASE_URL+"/padrao/"+indice+"/";
		
	let res = await fetch(url, {
		method: "delete",
		headers: {'Authorization': token},
	});
		
	let json = await res.json(),
		conteudo = json.conteudo;

	console.log(conteudo);
}

export default function ItemPadraoDetalhado(props) {
	const {token} = useAuth();
	const [tipo, setTipo] = useState("padrao");
	const [loading, setLoading] = useState(true);
	const [descricao, setDescricao] = useState("");
	const [valor, setValor] = useState(0.0);
	const [categoria, setCategoria] = useState("");
	const [periodo, setPeriodo] = useState("");

	
	var data = props.dataC+'';
	var dataC = data;
	data = props.dataF+'';
	data = data.split('-');
	var dataF = data[2]+'/'+data[1]+'/'+data[0];
	data = props.dataI+'';
	data = data.split('-');
	var dataI = data[2]+'/'+data[1]+'/'+data[0];

	return (
		<>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			></View>

			<View
				style={tailwind(
					"absolute w-full h-full flex items-center justify-center"
				)}
			>
				<View style={tailwind("bg-white p-12 rounded-md")}>
					<View style={tailwind("mb-12")}>
						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Valor
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								R$ {props.valor}
							</Text>
						</View>

						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Dia Cobrança:
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								{dataC}
							</Text>
						</View>

						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Data Inicio:
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								{!dataI.match('null') ? (dataI):('Indefinido') }
							</Text>
						</View>
						
						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Data Fim:
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
							{!dataF.match('null') ? (dataF):('Indefinido') }
							</Text>
						</View>
						
						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Periodo:
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								{props.periodo}
							</Text>
						</View>

						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Categoria
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								{props.categoria}
							</Text>
						</View>

						<View style={tailwind()}>
							<Text
								style={tailwind("text-base text-gray-800 mb-2")}
							>
								Descrição
							</Text>
							<Text
								style={tailwind(
									"text-lg font-bold text-right w-56 self-end"
								)}
							>
								{props.descricao}
							</Text>
						</View>
					</View>

					
				</View>
			</View>
		</>
	);
}

function excluirMovimentacao(token, tipo, nome, indice) {
	const titulo = `Excluir ${tipo}`;
	const descricao = `Tem certeza que deseja excluir a ${tipo} "${nome}"`;

	Alert.alert(
		titulo,
		descricao,
		[
			{
				text: "CANCELAR",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "SIM",
				onPress: () => excluir(token, indice)
			},
		],
		{ cancelable: true }
	);
}
