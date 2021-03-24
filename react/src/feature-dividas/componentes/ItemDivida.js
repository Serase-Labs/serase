import * as React from "react";
import { useState, useEffect } from "react";
import {
	Modal,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";
import Botao from "../../comum/components/Botao";
import BarraProgresso from "../../comum/components/BarraProgresso";

import ItemDividaPagamento from "./ItemDividaPagamento";


export default function ItemDivida(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalPagamentoVisible, setModalPagamentoVisible] = useState(false);
	const [isPressed, setPressed] = useState(false);

    let porcentagem = (Number(props.valor_pago)/Number(props.valor_divida)*100).toFixed(2);

	return (
		<TouchableOpacity
			style={tailwind(
				"flex flex-col mb-4 ml-5 mr-5 py-4 px-4 items-center rounded-md bg-gray-100"
			)}
			onPress={() => setModalVisible(true)}
		>
            <View style={tailwind("flex-grow flex-row justify-between w-full mb-4")}>
                <View style={tailwind("flex-col")}>
                    <Text
                        style={tailwind(
                            "text-base text-left font-bold mb-1"
                        )}
                    >
                        {props.credor}
                    </Text>
                    <Text style={estilos.dividaDetails}>
                        Progresso: {porcentagem}%
                    </Text>
                </View>
                <View style={tailwind("flex-col")}>
                    <Text style={tailwind("text-base font-bold mb-1 text-right ")}>
                        R$ {props.valor_divida}
                    </Text>
                    <Text style={estilos.dividaDetails}>
                        Valor Restante: R$ {Number(props.valor_divida) - Number(props.valor_pago)}
                    </Text>
                </View>
            </View>

			<Botao ordem="terciario" tamanho="pequeno" label="Ver mais" espacamento={true} onPress={() =>{/* Tela de detalhes */}}/>

            <BarraProgresso porcentagem={porcentagem} espacamento={true}/>

            <Botao ordem="terciario" tamanho="grande" label="Registrar Pagamento" onPress={() =>{setModalPagamentoVisible(true)}}/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				{/*<ItemMovimentacaoDetalhado indice={props.indice}/>*/}
			</Modal>

            <Modal
				animationType="slide"
				transparent={true}
				visible={modalPagamentoVisible}
				onRequestClose={() => setModalPagamentoVisible(false)}
			>
				<ItemDividaPagamento {...props}/>
			</Modal>
		</TouchableOpacity>
	);
}

const estilos = {
    dividaDetails: tailwind("text-sm font-light text-gray-500")
}