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

import ItemPreviewPadrao from "./ItemPreviewPadrao";

export default function PreviewPadrao({ navigation }) {
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
          style={tailwind("py-4 ml-5")}
          data={padroes.conteudo}
          extraData={padroes.conteudo}
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
        valor={item.valor_padrao}
      />
    );
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (renderPreviewPadroes(padroes))}
    </View>
  )
}