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
import ItemMovimentacao from "../../feature-movimentacoes/componentes/ItemMovimentacao.js";
import Botao from "../../comum/components/Botao";
import GLOBAL from "../../Global.js"
import { useAuth } from "../../feature-login/auth.js";

async function excluir(token, indice){
	let url = GLOBAL.BASE_URL+"/divida/"+indice+"/";
		
	let res = await fetch(url, {
		method: "delete",
		headers: {'Authorization': token},
	});
		
	let json = await res.json(),
		conteudo = json.conteudo;

	
}
export default function ItemDividaDetalhada(divida) {
	const [loading, setLoading] = useState(true);
	const {token} = useAuth();
	const [movimentacoes, setMovimentacoes] = useState([]);
	
	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL+ "/cobrancas/?cod_divida="+divida.id;
			
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});

				let json = await res.json();
				let conteudo = json.conteudo;

				setMovimentacoes(json.conteudo);
				
				setLoading(false);

				return json;
			} catch (error) {
                console.error(error);
            }
		}
		fetchData();
	}, []);
	return (
		<>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			></View>

			<View style={[tailwind("absolute bottom-0 w-full flex items-center justify-center mb-4"), estilosCustom.tamanho]}>
				<View style={tailwind("bg-white p-12 rounded-md")}>
					<View style={tailwind("mb-4")}>
						<View style={tailwind("flex flex-row justify-between mb-4")}>
							<Text style={tailwind("text-base text-gray-800")}>
								{divida.credor}
							</Text>
							<Text style={tailwind("text-base font-bold w-48 text-right")}>
								R$ {divida.valor_divida}
							</Text>
						</View>
						<View style={tailwind("flex flex-row justify-between mb-4")}>
							<Text style={tailwind("text-base text-gray-800")}>
								Valor Pago
							</Text>
							<Text style={tailwind("text-base font-bold w-48 text-right")}>
								R${divida.valor_pago}
							</Text>
						</View>
						
						<View style={tailwind("flex flex-row justify-between mb-2")}>
							<Text style={tailwind("text-base text-gray-800 mb-2")}>
								Valor Restante
							</Text>
							<Text style={tailwind("text-lg font-bold text-right w-48 self-center")}>
								R${divida.valor_divida - divida.valor_pago}
							</Text>
						</View>

						{
							divida.juros!="0.00" && (
								<View style={tailwind("flex flex-row justify-between mb-4")}>
									<Text style={tailwind("text-base text-gray-800")}>
										Juros
									</Text>
									<Text style={tailwind("text-base font-bold w-48 text-right")}>
										{divida.juros}
									</Text>
								</View>
							)
						}

						<View style={tailwind("flex flex-row justify-between mb-4")}>
							<Text style={tailwind("text-base text-gray-800 mb-2")}>
								Data Final
							</Text>
							<Text style={tailwind("text-lg font-bold text-right w-56 self-end")}>
								{divida.data_fim.split('-').reverse().join('/')}
							</Text>
						</View>

						<ScrollView showsVerticalScrollIndicator={false}>
						{movimentacoes.map(item=>(
							<View> 
								
								<ItemMovimentacao
									indice={item.id}
									descricao={item.descricao}
									valorPago={item.valor_pago}
									dataLancamento={item.data_lancamento||item.data_geracao}
									clickable={false}
								/>
								
							</View>
						))}
							
						</ScrollView>
					</View>
					
					<View style={tailwind("flex flex-row justify-between")}>
						
							<Botao
								ordem="secundario"
								tamanho="pequeno"
								label="Alterar"
								
							/>
							
							<Botao
								ordem="erro"
								tamanho="pequeno"
								label="Excluir"
								onPress={() => excluirDivida(token, "divida", divida.credor, divida.id)}
							/>
						
					</View>
					
				</View>
			</View>
			
		</>
	);
}

function excluirDivida(token, tipo, nome, indice) {
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

const estilosCustom = StyleSheet.create({
	tamanho: {height: "85%"}
});