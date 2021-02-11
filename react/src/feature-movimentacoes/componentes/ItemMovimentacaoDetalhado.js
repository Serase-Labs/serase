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

import Botao from "../../comum/components/Botao";
import ItemMovimentacaoAlterar from "./ItemMovimentacaoAlterar";
import GLOBAL from "../../Global";

async function excluir(indice){
	let url = GLOBAL.BASE_URL+"/movimentacao/"+indice+"/";
		
	let res = await fetch(url, {
		method: "delete"
	});
		
	let json = await res.json(),
		conteudo = json.conteudo;

	console.log(conteudo);
}

export default function ItemMovimentacaoDetalhado(props) {
	const [tipo, setTipo] = useState("receita");
	const [modalAlteracaoVisible, setModalAlteracaoVisible] = useState(false);
	const servidor_host = "192.168.0.8:8000";
	const [loading, setLoading] = useState(true);
	const [descricao, setDescricao] = useState("");
	const [data, setData] = useState("");
	const [valor, setValor] = useState(0.0);
	const [categoria, setCategoria] = useState("");

	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL+"/movimentacao/"+props.indice+"/";
			try {
				let res = await fetch(url);
				let json = await res.json();
				let conteudo = json.conteudo;
				
				setDescricao(conteudo.descricao);
				let data = conteudo.data_lancamento.split('-'); 
				setData(data[2]+'/'+data[1]+'/'+data[0]);
				setValor(conteudo.valor_pago);
				setCategoria(conteudo.categoria);

				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();
	}, []);

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
								R$ {valor}
							</Text>
						</View>

						<View
							style={tailwind(
								"flex flex-row justify-between mb-4"
							)}
						>
							<Text style={tailwind("text-base text-gray-800")}>
								Data
							</Text>
							<Text
								style={tailwind(
									"text-base font-bold w-48 text-right"
								)}
							>
								{data}
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
								{categoria}
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
								{descricao}
							</Text>
						</View>
					</View>

					<View style={tailwind("flex flex-row justify-between")}>
						<Botao
							ordem="secundario"
							tamanho="pequeno"
							label="Alterar"
							onPress={() => setModalAlteracaoVisible(true)}
						/>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalAlteracaoVisible}
							onRequestClose={() =>
								setModalAlteracaoVisible(false)
							}
						>
							<ItemMovimentacaoAlterar descricao={descricao} data={data} valor={valor} categoria={categoria} indice={props.indice}/>
						</Modal>
						<Botao
							ordem="erro"
							tamanho="pequeno"
							label="Excluir"
							onPress={() => excluirMovimentacao(tipo, descricao, props.indice)}
						/>
					</View>
				</View>
			</View>
		</>
	);
}

function excluirMovimentacao(tipo, nome, indice) {
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
				onPress: () => excluir(indice)
			},
		],
		{ cancelable: true }
	);
}
