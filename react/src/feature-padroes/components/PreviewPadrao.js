import * as React from "react";
import { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import tailwind from "tailwind-rn";

import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth";

import IconeAdicionar from "../../comum/assets/IconeAdicionar";
import ItemPreviewPadrao from "./ItemPreviewPadrao";

export default function PreviewPadrao(props) {
  const [ padroes, setPadroes ] = useState([]);
  const [ loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchPadrao() {
      let url = GLOBAL.BASE_URL + "/padroes/?tipo=despesa";

      try {
        let res = await fetch(url, {
          headers: { Authorization: token },
        });

        let json = await res.json();
        setPadroes(json);
        setLoading(false);
        console.log(json);
        return await res.json();
      } catch (error) { console.log(error)}
    }
    fetchPadrao();
  }, []);

  function renderPreviewPadroes(padroes) {
    return (
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tailwind("py-4 ml-5")}
          data={padroes.conteudo}
          extraData={padroes.conteudo}
          ListHeaderComponent={header}
          renderItem={renderizarPreviewPadroes}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    )
  }

  const renderizarPreviewPadroes = ({ item }) => {
    
    return (
      
      <ItemPreviewPadrao
        descricao={item.descricao}

        dataI ={item.data_inicio}
        dataF ={item.data_fim}
        dataC = {item.dia_cobranca}

        valor = {item.valor}
        categoria ={item.categoria}
        periodo = {item.periodo}
      />
    );
  };
  const header = () => {
    
    return (
      <TouchableOpacity
					style={[tailwind("w-24 h-24 bg-gray-200 flex justify-center items-center rounded-md mr-4")]}
					onPress={() => props.navigation.navigate("AdicionaMovimentacao")}>  
					<View style={tailwind("w-12 h-12 mb-1 rounded-full bg-gray-100 flex justify-center items-center")}>
						<View style={tailwind("w-8 h-8")}>
							<IconeAdicionar/>
						</View>
					</View>
				</TouchableOpacity>
    );
  };

  return (
    <View>
      {loading ? (
        <View style={tailwind("bg-gray-100 rounded-md px-4 py-5 h-24 w-24 mr-2 flex justify-between")}>
        </View>
      ) : (renderPreviewPadroes(padroes))}
    </View>
  )
}