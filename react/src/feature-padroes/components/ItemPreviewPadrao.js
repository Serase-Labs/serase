import * as React from "react";
import {useState, useEffect} from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import tailwind from "tailwind-rn";
import ItemPadraoDetalhado from "./ItemPadraoDetalhado";

export default function ItemPreviewPadrao(props) {
  const [modalVisible, setModalVisible ] = useState(false);
  const [isPressed, setPressed] = useState(false);

  console.log(props.descricao);
  console.log(props.valor);
  return (
    <TouchableOpacity 
    style={tailwind("bg-blue-700 rounded-md px-4 py-5 h-24 w-24 mr-2 flex justify-between")}
    onPress={() => setModalVisible(true)}
    >    
      <Text numberOfLines={2} ellipsizeMode={"tail"} style={tailwind("text-white text-sm")}>{props.descricao}</Text>
      { props.valor && <Text style={tailwind("text-xl font-bold text-white")}>{props.valor}</Text>}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <ItemPadraoDetalhado 
      
      descricao={props.descricao}
      valor={props.valor}

      dataI ={props.dataI}
      dataF ={props.dataF}
      dataC = {props.dataC}

      valor = {props.valor}
      categoria ={props.categoria}
      periodo = {props.periodo}/>
    </Modal>
    </TouchableOpacity>
    
  )
    
}