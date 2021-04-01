import React from "react";
import tailwind from "tailwind-rn";
import { StatusBar, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth";

import IlustracaoLoading from "../comum/assets/IlustracaoLoading";
import IndicadorRetorno from "../comum/components/IndicadorRetorno";
import Notificacao from "./Notificacao";

export default function Central({navigation}) {

	const [isLoading, setLoading] = useState(true);
	const [cobrancas, setCobrancas] = useState([]);
	const [id, setId] = useState('');
	const { token } = useAuth();
	const [refresh, setRefresh] = useState(true);

	const atualiza = () => setRefresh(true);

	useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/cobrancas/?situacao=pendente&tipo=despesa";
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});
				let json = await res.json();
				setCobrancas(json.conteudo);
				console.log(json);
				setLoading(false);
				return await res.json();
			} catch (error) {}
		}
		fetchData();

		if(refresh) fetchData();
	}, [refresh]);

	function renderNotificacao(cobrancas) {
		return (
			<View>
				<FlatList data={cobrancas}
					extraData={cobrancas}
					renderItem={renderizarNotificacao}
					keyExtractor={(item) => item.id}>
				</FlatList>
			</View>
		)
	}

	function renderizarNotificacao({ item }) {
		return (
			<Notificacao
				indice={item.id}
				{...item}
			/>
		);
	}

	return (
		<>
			<ScrollView
				bounces={true}
				showsVerticalScrollIndicator={false}
				style={[tailwind("flex-1 bg-white"), estiloExcecao.container]}
			>
				<IndicadorRetorno telaAtual="Notificações" navigation={navigation}/>

				<View style={tailwind("mb-12")}>
					<View style={tailwind("mb-24")}>
						<View style={tailwind("flex-col mb-24")}>
							{isLoading ? (
								<View style={tailwind("bg-white h-64")}>
									<IlustracaoLoading/>
								</View>
							) : (
								renderNotificacao(cobrancas)
							)}
						</View>
					</View>
			</View>
			
			</ScrollView>
		</>
	);
}

const headerHeight = StatusBar.currentHeight;
const estiloExcecao = StyleSheet.create({
	botao: {
		lineHeight: 68,
	},
	container: {
		paddingTop: headerHeight,
	},
});