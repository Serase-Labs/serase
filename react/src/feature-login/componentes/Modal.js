import React, {useState} from 'react';
import {Button, Text, View, TouchableOpacity, Svg} from 'react-native';
import Modal from 'react-native-modal';
//import Svg from "react-native-svg";
//import IconeInformacao from "../assets/icones/IconeInformacao";

import tailwind from "tailwind-rn";
import { ScrollView } from 'react-native-gesture-handler';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

class ModalTester extends React.Component { 
    render(){ 
    return (
      <View style={ estilos.telaContainer}>
      
        <Modal 
        visible={isModalVisible}
        animationType='slide'
        >
          <View style={ estilos.containerModal}>
            <ScrollView estilos={ScrollView}>
            <Text className = "Modal-text" style ={estilos.textoPerguntaModal}>{this.props.text}  
              O que é a minha Renda Fixa?
            </Text>
            <Text style ={estilos.textoRespostaModal}>
              Renda Fixa é blablablablablablablablablablablabla
              blablablablablablablablablablablablablablablabla
            </Text>
            <Text style ={estilos.textoPerguntaModal}>
              O que é a minha Despesa Fixa?
            </Text>
            <Text style ={estilos.textoRespostaModal}>
              Despesa Fixa é blablablablablablablablablablablabla
              blablablablablablablablablablablablablablablabla
              blablablablablablablablablablablablablablablabla
            </Text>

            </ScrollView>
            <TouchableOpacity 
            style={estilos.botaoFecharModal} onPress={toggleModal} >
              <Text style={estilos.textoBotaoFecharModal}>Entendi</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      <Text
      style ={estilos.textoAjuda}
      //onPress={()=> setModalVisible(true)}
      onPress={toggleModal}
      >Precisando de ajuda?</Text>

      </View>
    );
  }
  }
}

export default ModalTester;

const estilos = {
    telaContainer: tailwind("flex-1 bg-gray-500 bg-opacity-75"),
      containerModal: tailwind("bg-gray-300 h-full rounded items-center p-6 flex-1 mx-6 mt-32 mb-16"), 
  
      scrollView: tailwind("pr-6 pl-6 pt-5 items-center"),
      textoAjuda: tailwind("text-gray-700 text-base mb-3 pt-8 items-center"),
      textoPerguntaModal: tailwind("text-gray-700 text-base font-bold mb-3 pb-1 pt-4 "),
      textoRespostaModal:tailwind("text-gray-700 text-base font-medium leading-6 mb-3"),
  
      botaoFecharModal: tailwind("py-2 rounded w-64 items-center"),
      textoBotaoFecharModal: tailwind("text-blue-700 font-medium text-lg text-center "),
    
};