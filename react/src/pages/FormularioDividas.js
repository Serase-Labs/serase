import React, { Component } from 'react';
import { Text, View, Button,TextInput} from 'react-native';
import tailwind from 'tailwind-rn';

export default class App extends Component {
  render() {
    return (
      

      <View style={styles.normal}>
        <View style={tailwind('bg-blue-900 h-2 w-full')}></View>
        <View style={styles.container}>
        <Text style={styles.cabecalho}>Formulario de Dividas</Text>
        <Text style={styles.descricao}>
          Nos dê informação sobre a divida que pretende quitar
        </Text>
        </View>
        <View style={styles.container}>
        <Text style={styles.label}>Valor</Text>
        <TextInput style={styles.inputs} placeholder="Qual o valor da sua divida?" />
        <Text style={styles.label}>Juros</Text>
        <TextInput style={styles.inputs} placeholder="Qual a taxa de juros da sua dívida?" />
        <Text style={styles.label}>Periodo de juros</Text>
        <TextInput style={styles.inputs} placeholder="O juros é aplicado mensalmente?" /> 
        <Text style={styles.label}>Prazo</Text>
        <TextInput style={styles.inputs} placeholder="Até quando essa dívida prevalece?" />
        </View>
        <View style={styles.container}>
        <Button color="#68d391" title="Confirmar"></Button>
        </View>

      </View>
    );
  }
}

const styles = {
    container: tailwind(" p-8 pt-3"),
    normal : tailwind("flex-1 pt-8 "),
    cabecalho: tailwind("text-black text-sm font-bold p-6 text-center"),
    descricao: tailwind("text-black text-base font-bold pt-8 text-center"),
    label: tailwind(" text-sm font-bold mb-2 pt-5"),
    inputs: tailwind("bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 "),
};