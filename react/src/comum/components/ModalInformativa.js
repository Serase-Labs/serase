import React from "react";
import { useState } from "react";
import { Text, View, Modal, TouchableOpacity} from "react-native";
import tailwind from "tailwind-rn";

import Botao from "./Botao";
import IconeInformacao from "../assets/IconeInformacao";

function TextoPrincipal() {
  return tailwind("font-bold text-xl my-4");
}

function TextoInformativo() {
  return tailwind("text-lg text-red-900");
}

function ModalInformativa(props) {
  const [modalVisibile, setModalVisible] = useState(false);  

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={tailwind("w-6 h-6 flex mx-4 mt-4")}>
        <IconeInformacao/>    
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisibile} onRequestClose={() => setModalVisible(false)}>
        <>
          <View style={[tailwind("bg-black h-full w-full"), { opacity: 0.5}]}>
          </View>

          <View style={[tailwind("absolute w-full h-full flex items-center justify-end"), { elevation: 2}]}>
            <View style={tailwind("bg-white w-full rounded-t-md pt-12 px-6")}>
              {props.children}
            </View>
            <View style={tailwind("bg-white w-full items-center justify-center pt-6")}>
                <Botao ordem="terciario" tamanho="grande" onPress={() => setModalVisible(false)} label={"Entendi"} espacamento={true}/>
              </View>
          </View>
        </>
      </Modal>

    </>
  )
}

export { ModalInformativa, TextoInformativo, TextoPrincipal};