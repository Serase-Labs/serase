import * as React from "react";
import { useState, useEffect } from "react";
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Alert,
    KeyboardAvoidingView,
} from "react-native";
import tailwind from "tailwind-rn";
import { Formik } from "formik";

import Botao from "../../comum/components/Botao";
import { Input } from "../../comum/components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";

import GLOBAL from "../../Global";
import { useAuth } from "../../feature-login/auth.js";





export default function ItemPagamentoPagamento(props,{setModal}) {
	const {token} = useAuth();
    
    // function fechar(){
    //     setModal(false);
    // }

        const paga = (valor) => {
            async function fetchData() {
                 
                let url = GLOBAL.BASE_URL + "/pagamento/"+props.indice+"/";
                
                
                
                try {
                    let res = await fetch(url, {
                        method: "PUT",
                        headers: { Authorization: token },
                        body:JSON.stringify({
                            valor_pago: valor
                        }),
                    });
                    let json = await res.json();

                    if(!res.ok){
                        setResultado('Erro');
                        setErro(true);
                    }else{
                        setResultado("Pago com sucesso!");
                        setErro(false);
                    }
                } catch (error) {}
            }
            fetchData();
        }


    // Hooks de data
    const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
    const [temErro, setErro] = useState(false);
	const [resultado, setResultado] = useState(null);

    const showDatePicker = () => {
		setShow(true);
		setMode("date");
	};

    function renderErro(resultado) {
        return (
            <View >
                <Text style= {[estilos.textoErro]}>{resultado}</Text>
            </View>
        );
    }
    
    function renderSucesso(resultado) {
        return (
            <View >
                <Text style= {[estilos.textoSucesso]}>{resultado}</Text>
            </View>
        );
    }

	return (
		<>
			<View
				style={[tailwind("bg-black h-full w-full"), { opacity: 0.5 }]}
			></View>

			<View
				style={tailwind(
					"absolute w-full h-full flex items-center justify-center"
				)}
			>
				<View style={tailwind("bg-white p-6 rounded-md w-5/6")}>
                    <Text style={tailwind("text-lg font-bold text-center mb-6")}>Registrar Pagamento</Text>
                    <Text style={tailwind("text-center")}>Qual o valor do pagamento efetuado para o padrao “{props.descricao}”?</Text>
					
                    <KeyboardAvoidingView style={tailwind("flex items-center")}>
                        <Formik
                            initialValues={({valor: props.valor})}
                                onSubmit={(values) => {
                                    paga(values.valor)
                                }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                                <View style={tailwind("w-full flex-col mr-6")}>
                                    <Input
                                            onChangeText={handleChange("valor")}
                                            onBlur={handleBlur("valor")}
                                            keyboard={"numeric"}
                                            values={props.valor}
                                            placeholder={props.valor}
                                            textContentType={"number"}
                                            espacamento={true}
                                    ></Input>

                                    {temErro ? (
                                        renderErro(resultado)
                                    ) : (
                                        
                                        renderSucesso(resultado)
                                    )}

                                    <View style={tailwind("flex flex-row justify-between w-full")}>
									
                                        
										<Botao
											ordem="primario"
											tamanho="pequeno"
											label="Confirmar"
											onPress={handleSubmit}
										/>
									</View>
                                </View>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
				</View>
			</View>
		</>
	);
}

const estilos = {
    containerInput: tailwind("w-64 mb-6"),
    labelInput: tailwind("text-gray-700 text-base font-bold mb-3"),
    input: tailwind("bg-gray-100 rounded-lg py-2 px-3 text-gray-700 text-base"),
    errorInput: tailwind("bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-2 rounded relative"),
    textoErro: tailwind(
		"text-red-700 text-base font-bold text-center mb-2"
	),
	textoSucesso: tailwind(
		"text-green-700 text-base font-bold text-center mb-2"
	),
}

