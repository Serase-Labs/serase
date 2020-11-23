// Essa tela comporta a interface de adição de Despesa e Receita comum.
// Cada interface fica abrigada em uma seção do componente de Material Tab.
// Existe uma funcionalidade de swipe entre as duas telas.
// Se desejar componetizar externamente cada uma das interfaces,
// fique a vontade. Talvez fique confuso tudo junto já que não existe lógica
// compartilhada entre as duas funcionalidaes.
import React, {useState} from "react";
import {
	StatusBar,
	Text,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TextInput,
} from "react-native";
import tailwind from "tailwind-rn";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Picker} from '@react-native-community/picker';

// Componentes de navegação
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
// Documentação do Material Top (https://reactnavigation.org/docs/material-top-tab-navigator)
const Tab = createMaterialTopTabNavigator();

const headerHeight = StatusBar.currentHeight;
const estiloExcecao = StyleSheet.create({
	container: {
		paddingTop: headerHeight,
	},
});


// Essas funções aqui foram retiradas do exemplo na documentação do React Navigation
// estava com preguiça de inventar outra coisa e aí só copiei pra teste.
// Estou deixando pra facilitar o entendimento de como funciona, mas deve ser subtituído
// pelos componentes de AdicaoDespesa e AdicaoReceita aí :)
function HomeScreen() {
	return (
			
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text style={[estilos.labelInputPrincipal]}>
				Quanto você ganhou?
			</Text>
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
			<TextInput
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
			></TextInput>

			<Text style={[estilos.labelInput]}>Data da Receita</Text>
			<TextInput
=======
				<TextInput nativeID = "colorido" 
				
=======
			<View style={[estilos.containerInput]}>
				<TextInput 
				nativeID = "colorido" 
>>>>>>> 8467676... Atualizações na Tela Despesa/Receita:react/src/pages/MovimentacaoComum.js
				style={[estilos.inputPrincipal]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
			>
			</TextInput>
			</View>
			
			
			<View style={{ flex: 1 }}>
			<View style={[estilos.containerInput]}>
			<Text style={[estilos.labelInput]}>
				Data da Receita
			</Text>
			<TextInput nativeID={ "#data"}
>>>>>>> 28bbf47... Resolvendo o Erro Mismatch:react/src/pages/MovimentacaoComum.js
				style={estilos.input}
				placeholder={"23/11/2020"}
				placeholderTextColor={"#A0AEC0"}
				keyboardType={"numeric"}
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
			></TextInput>
=======
			>
			</TextInput>
			</View>
>>>>>>> 8467676... Atualizações na Tela Despesa/Receita:react/src/pages/MovimentacaoComum.js

			<View style={[estilos.containerInput]}>
			<Text style={[estilos.labelInput]}>
				Categoria de Receita
			</Text>
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
			<TextInput
				style={[estilos.input]}
				placeholder={"Salário, Empréstimo, Loteria, Aposta"}
				placeholderTextColor={"#A0AEC0"}
			></TextInput>
			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelar}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoCancelar}>Cancelar</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={estilos.botaoAdicionar}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoAdicionar}>Adicionar</Text>
				</TouchableOpacity>
			</View>
		</View>
=======
			
			<View style={[estilos.containerInput]}>
			<TextInput 
				style={[estilos.input]}
				placeholder={"Salário, Empréstimo, Loteria, Aposta"}
				placeholderTextColor={"#A0AEC0"}
			>
			</TextInput>
			</View>
			</View>
			</View>

			<View 
						style={{ flex: 1, flexDirection: "row" }}
					>
						<TouchableOpacity
							style={estilos.botaoCancelar}
							//onPress={handleSubmit}
							title= "Submit"
						>
							<Text style={estilos.textoBotaoCancelar}>
							Cancelar
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={estilos.botaoAdicionar}
							//onPress={handleSubmit}
							title= "Submit"
						>
							<Text style={estilos.textoBotaoAdicionar}>
							Adicionar
							</Text>
						</TouchableOpacity>	
						</View>
						</View>	
				
>>>>>>> 8467676... Atualizações na Tela Despesa/Receita:react/src/pages/MovimentacaoComum.js
	);
}

function SettingsScreen() {
	const [selectedValue, setSelectedValue] = useState("Aplicativo de comida");
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text style={[estilos.labelInputPrincipal]}>
				Quanto você gastou?
			</Text>
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
			<TextInput
				style={[estilos.inputPrincipalVermelho]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
			></TextInput>

			<Text style={[estilos.labelInput]}>Data de Gasto</Text>
			<TextInput
=======
			<View style={[estilos.containerInput]}>
			<TextInput 
				style={[estilos.inputPrincipalVermelho]}
				placeholder={"R$ 0,00"}
				keyboardType={"numeric"}
			>
			</TextInput>
			</View>
			<View style={[estilos.containerInput]}>
			<Text style={[estilos.labelInput]}>
				Data de Gasto
			</Text>
			</View>

			<View style={[estilos.containerInput]}>
			<TextInput 
>>>>>>> 8467676... Atualizações na Tela Despesa/Receita:react/src/pages/MovimentacaoComum.js
				style={estilos.input}
				placeholder={"23/11/2020"}
				placeholderTextColor={"#A0AEC0"}
				keyboardType={"numeric"}
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
			></TextInput>
=======
			>
			</TextInput>
			</View>
>>>>>>> 8467676... Atualizações na Tela Despesa/Receita:react/src/pages/MovimentacaoComum.js

			<View style={[estilos.containerInput]}>
			<Text style={[estilos.labelInput]}>
				Categoria do Gasto
			</Text>
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
			<TextInput
				style={[estilos.input]}
				placeholder={"Alimentação, Trasnporte, Saúde"}
				placeholderTextColor={"#A0AEC0"}
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
			></TextInput>
			<TextInput
=======
			>
			</TextInput>
			
			<TextInput 
>>>>>>> 28bbf47... Resolvendo o Erro Mismatch:react/src/pages/MovimentacaoComum.js
				style={[estilos.input]}
				placeholder={"Aplicativo de comida, trasnporte"}
				placeholderTextColor={"#A0AEC0"}
			></TextInput>

			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity
					style={estilos.botaoCancelarVermelho}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoCancelarVermelho}>
						Cancelar
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={estilos.botaoAdicionarVermelho}
					//onPress={handleSubmit}
					title="Submit"
				>
					<Text style={estilos.textoBotaoAdicionarVermelho}>
						Adicionar
					</Text>
				</TouchableOpacity>
			</View>
=======
			</View>

			<View style={estilos.container} >
			<View style={[estilos.containerInput]}>
				<Picker
					mode="dropdown"
					selectedValue={selectedValue}
					onValueChange={(
						itemValue,
						//itemIndex
					) => {
					setFieldValue(
					"Categoria",
						itemValue
					);
					setSelectedValue(itemValue);
					console.log(itemValue);
				}}
				>
				<Picker.Item
					label="Aplicativo de comida"
					value="Aplicativo de comida"
				/>
				<Picker.Item
					label="Sacolão"
					value="Sacolão"
				/>
				<Picker.Item
					label="Supermercado"
					value="Supermercado"
				/>
				<Picker.Item
					label="Lanchonete"
					value="Lanchonete"
				/>
				</Picker>
				</View>

			</View>
					<View 
						style={{ flex: 1, flexDirection: "row" }}
					>
						<TouchableOpacity
							style={estilos.botaoCancelar}
							//onPress={handleSubmit}
							title= "Submit"
						>
							<Text style={estilos.textoBotaoCancelar}>
							Cancelar
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={estilos.botaoAdicionar}
							//onPress={handleSubmit}
							title= "Submit"
						>
							<Text style={estilos.textoBotaoAdicionar}>
							Adicionar
							</Text>
						</TouchableOpacity>	
						</View>
						
>>>>>>> 8467676... Atualizações na Tela Despesa/Receita:react/src/pages/MovimentacaoComum.js
		</View>
		
	);
}

export default function MovimentacaoComum() {
	
	return (
		<KeyboardAvoidingView
			style={[estiloExcecao.container, tailwind("bg-white flex-1")]}
		>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={({ route }) => ({
						labelStyle: { fontSize: 12 },
    					tabStyle: { width: 100 },
    					style: { backgroundColor: 'powderblue' },
						tabBarIcon: ({ focused, color, size }) => {
							let button;

							// Para personalizar os botões que aparecem na Tab
							// você pode gerar componentes de botão, como eu fiz
							// com o botão de adicionar.
							// Documentação de estilização além disso:
							// https://reactnavigation.org/docs/tab-based-navigation#customizing-the-appearance
							if (route.name === "Receita") {
									button = focused
									  ? 'ios-information-circle'
									  : 'ios-information-circle-outline';
								  } else if (route.name === 'Settings') {
									button = focused ? 'ios-list-box' : 'ios-list';
								  }
					  
								  // You can return any component that you like here!
								  return <Ionicons name={button} size={size} background-Color={"#2C5282"} />;
								},
							  })}
							  tabBarOptions={{
								activeTintColor: '#2c5282',
								labelStyle: { fontSize: 12, fontWeight: 'bold', fontFamily: "Roboto" },
								style: { backgroundColor: 'white' },
							  }}
					
				>
					<Tab.Screen name="Receita" component={HomeScreen} />
					<Tab.Screen name="Despesa" component={SettingsScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		</KeyboardAvoidingView>
	);
}

const estilos = {
	tela: tailwind("flex-1 bg-white"),
	telaInterior: tailwind("flex-1"),

	labelInputPrincipal: tailwind("text-gray-700 text-xl font-bold pb-8 mt-16"),
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
	inputPrincipal: tailwind(
		"border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-16 text-gray-700 text-base max-w-xs"
	),
	inputPrincipalVermelho: tailwind(
		"border border-red-700 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text-base max-w-xs"
	),

<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
	labelInput: tailwind("text-gray-700 text-base font-bold mb-3 mr-40"),
	input: tailwind(
		"border border-gray-700 rounded w-64 py-2 px-2 mx-12 mb-4 ml-8 text-gray-700 text-base"
	),
=======
	labelInput: tailwind("text-gray-700 text-base font-bold px-2 mb-3 mr-40"),
	input: tailwind("border border-gray-700 rounded w-64 py-2 px-2 mx-12 mb-4 ml-8 text-gray-700 text base"),
>>>>>>> 28bbf47... Resolvendo o Erro Mismatch:react/src/pages/MovimentacaoComum.js

	labelInputcategoria: tailwind(
		"text-gray-700 text-base font-bold mb-3 mr-40 ml-8"
	),

	botaoAdicionar: tailwind(
		"bg-green-400 py-2 rounded w-32 mb-8 mr-1 mt-12 ml-16"
	),
	textoBotaoAdicionar: tailwind("text-white font-medium text-lg text-center"),
<<<<<<< HEAD:react/src/feature-movimentacoes/MovimentacaoComum.js
	botaoCancelar: tailwind("py-2 rounded ml-8 mb-20 mt-12 mr-0"),
	textoBotaoCancelar: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),

	botaoAdicionarVermelho: tailwind(
		"bg-green-400 py-2 rounded w-32 mb-8 mr-1 mt-4 ml-16"
	),
	textoBotaoAdicionarVermelho: tailwind(
		"text-white font-medium text-lg text-center"
	),
	botaoCancelarVermelho: tailwind("py-2 rounded ml-8 mb-20 mt-4 mr-0"),
	textoBotaoCancelarVermelho: tailwind(
		"text-blue-700 font-medium text-lg text-center"
	),
};
=======
	botaoCancelar: tailwind("relative py-2 rounded ml-8 mb-20 mt-12"),
=======
	inputPrincipal: tailwind("border border-green-400 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"),
	inputPrincipalVermelho: tailwind("border border-red-700 rounded font-bold text-4xl py-6 px-20 mb-8 text-gray-700 text base max-w-xs"),

	labelInput: tailwind("text-gray-700 text-base font-bold mb-3"),
	input: tailwind("border border-gray-700 rounded w-full py-2 px-3 text-gray-700 text-base"),
	containerInput: tailwind("w-full mb-2 py-12"),

	botaoAdicionar: tailwind("bg-green-400 py-2 rounded w-32 mb-8 mr-1 mt-12 ml-16 py-2 px-4"),
	textoBotaoAdicionar: tailwind("text-white font-medium text-lg text-center"),
	botaoCancelar: tailwind("py-2 rounded ml-8 mb-20 mt-12 mr-0 "),
>>>>>>> 8467676... Atualizações na Tela Despesa/Receita:react/src/pages/MovimentacaoComum.js
	textoBotaoCancelar: tailwind("text-blue-700 font-medium text-lg text-center"),


	containerInput: tailwind("w-64 mb-2"),
	labelInput: tailwind("text-gray-700 text-base font-bold mb-3 mr-40"),
	

}
>>>>>>> 28bbf47... Resolvendo o Erro Mismatch:react/src/pages/MovimentacaoComum.js
