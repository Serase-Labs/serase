import React, { Component } from 'react';
import { Text, View, Button, TextInput} from 'react-native';
import tailwind from 'tailwind-rn';


export default class App extends Component {
  render() {
    return (
    
    <View style={styles.normal}>
        <View style={tailwind('bg-blue-900 h-2 w-full')}></View>
        <View style={styles.container}>
        <Text style={styles.cabecalho}>Formulario de Meta</Text>
        <Text style={styles.descricao}>
          Nos dê informação sobre a sua meta financeira
        </Text>
        </View>
        <View style={styles.container}>
        <Text style={styles.label}>Valor</Text>
        <TextInput style={styles.inputs} placeholder="Quanto você pretende guardar?" />
        <Text style={styles.label}>Data</Text>
        <TextInput style={styles.inputs} placeholder="Quando pretende atinguir a meta?" />
        <Text style={styles.label}>Disponibilidade Financeira</Text>
        <TextInput style={styles.inputs} placeholder="Quanto da sua renda etá disposta a guardar?" />
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