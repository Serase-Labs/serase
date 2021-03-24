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



export default function ItemDivida(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [isPressed, setPressed] = useState(false);

	return (
		<TouchableOpacity
			style={tailwind(
				"flex flex-col mb-4 ml-5 mr-5 py-6 px-4 items-center rounded-md bg-gray-100"
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
                        Progresso: {(Number(props.valor_pago)/Number(props.valor_divida)*100).toFixed(2)}%
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

            {/* Barra de progresso aqui*/}

            <Botao ordem="terciario" tamanho="grande" label="Registrar Pagamento" onPress={() =>{/* Tela de inserir pagamento */}}/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				{/*<ItemMovimentacaoDetalhado indice={props.indice}/>*/}
			</Modal>
		</TouchableOpacity>
	);
}

const estilos = {
    dividaDetails: tailwind("text-sm font-light text-gray-600")
}