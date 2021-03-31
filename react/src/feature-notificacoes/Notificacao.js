import * as React from "react";
import { useState, useEffect } from "react";
import {
	Modal,
	Text,
	View,
	TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import tailwind from "tailwind-rn";
import { Formik } from "formik";

import GLOBAL from "../Global";
import { useAuth } from "../feature-login/auth.js";
import IconeNotificacao from "../comum/assets/IconeNotificacao";
import Botao from "../comum/components/Botao";
import Input from "../comum/components/Input";
import NotificacaoPagamento from "./NotificacaoPagamento";


export default function ItemDivida(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalPagamentoVisible, setModalPagamentoVisible] = useState(false);
	const [isPressed, setPressed] = useState(false);

	return (
		<View
			style={tailwind(
				"my-2 mx-5 pl-4 pr-6 py-4 rounded-lg bg-gray-100"
			)}
		>

        <View style={tailwind("h-6 my-2 text-green-600")}>
				  <IconeNotificacao/>
			  </View>
        
        <View>
        <Text style={tailwind("text-base")}>Seu compromisso financeiro 
          <Text style={tailwind("font-bold")}> {props.descricao}</Text> se encontra 
          <Text style={tailwind("font-bold")}> {props.situacao}. </Text>
          {props.valor_esperado ?
            (<Text>
					    O valor esperado para essa movimentação é de <Text style={tailwind("font-bold")}>R${props.valor_esperado}</Text>.
				    </Text>) 
            : 
            <Text> </Text>
          }
        </Text>
        <Text style={tailwind("text-base text-green-900 py-4 italic")}>Se já houver sanado o compromisso, registre a movimentação agora.</Text>
        </View>
      <Botao ordem="extra" label="Pagar" tamanho="grande" espacamento="true" onPress={() => setModalPagamentoVisible(true)}/>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalPagamentoVisible}
				onRequestClose={() => setModalPagamentoVisible(false)}
			>
				<NotificacaoPagamento indice={props.indice} valor={props.valor} descricao={props.descricao} setModal={setModalPagamentoVisible}/>
			</Modal>
		</View>    
	);
}

const estilos = {
  containerInput: tailwind("w-64 mb-6"),
  labelInput: tailwind("text-gray-700 text-base font-bold mb-3"),
  input: tailwind("bg-gray-100 rounded-lg py-2 px-3 text-gray-700 text-base"),
  errorInput: tailwind("bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"),
  textoErro: tailwind(
  "text-red-700 text-base font-bold text-center"
),
textoSucesso: tailwind(
  "text-green-700 text-base font-bold text-center"
),
}
