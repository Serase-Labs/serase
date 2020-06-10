import React from 'react';
import {Text,View, Image} from 'react-native';
import tailwind from 'tailwind-rn';

export default function Login() {
  return (
    <View style={tailwind('pt-8 items-center')}>
      
      <View style={tailwind('bg-blue-900 h-2 w-full')}></View>
      
        <Image style={tailwind('rounded-full h-64 w-64 my-24 justify-center')} 
          source={require('../assets/download.jpg')}/>
      
      <View style={tailwind('bg-gray-100 bg-opacity-50 h-12 w-56 rounded py-2 mb-8 border border-blue-800')}>
        <Text style={tailwind('text-center text-blue-800 text-xl')}>Fazer Login</Text>
      </View>

      <View style={tailwind('bg-green-600 bg-opacity-50 h-12 w-56 rounded py-2')}>
        <Text style={tailwind('text-center text-white text-xl')}>Cadastrar</Text>
      </View>
    </View>
  );
}