import React from 'react';
import {View,Image,Text,TextInput,KeyboardAvoidingView} from 'react-native';
import tailwind from 'tailwind-rn';

export default function Cadastro() {
    return (
        <KeyboardAvoidingView>
    
          <View style={tailwind('pt-8')}>
          
            <View style={tailwind('bg-blue-900 h-2 w-full')}></View>
    
            <View style={tailwind('flex-row')}>
              
              <Image style={tailwind('rounded-full h-10 w-10 mt-8 ml-8')} 
                source={require('../assets/download.jpg')}/>
    
              <Text style={tailwind('text-blue-900 font-medium mt-10 mx-4 text-xl')}>Cadastro</Text>
            </View>
          
            
            <Text style={tailwind('text-base text-blue-900 mt-4 mx-12 font-bold')}>Nome</Text>
            <TextInput style={tailwind('text-base mt-4 mx-12 h-10 pl-2 border border-gray-400 rounded')}
              placeholder='Insira seu nome'
            />
    
            <Text style={tailwind('text-base text-blue-900 mt-4 mx-12 font-bold')}>Email</Text>
            <TextInput style={tailwind('text-base mt-4 mx-12 h-10 pl-2 border border-gray-400 rounded')}
              placeholder='Insira seu email'
            />
            
            <Text style={tailwind('text-base text-blue-900 mt-4 mx-12 font-bold')}>Senha</Text>
            <TextInput style={tailwind('text-base mt-4 mx-12 h-10 pl-2 border border-gray-400 rounded')}
              placeholder='Insira sua senha'
            />
            
            <Text style={tailwind('text-base text-blue-900 mt-4 mx-12 font-bold')}>Confirmar senha</Text>
            <TextInput style={tailwind('text-base mt-4 mx-12 h-10 pl-2 border border-gray-400 rounded')}
              placeholder='Repita sua senha'
            />
    
            <View style={tailwind('bg-green-400 h-12 w-64 rounded mt-16 self-center py-2')}>
              <Text style={tailwind('text-center text-white text-xl')}>Cadastrar</Text>
            </View>
    
            <View style={tailwind('bg-blue-500 h-12 w-64 rounded mt-8 self-center py-2')}>
              <Text style={tailwind('text-center text-white text-xl')}>Cadastrar com o Google</Text>
            </View>
    
          </View>
    
        </KeyboardAvoidingView>
      );
}