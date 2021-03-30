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

const dateToDateFormat = date=> date.toISOString().slice(0,10).split('-').reverse().join('/');



export default function ItemDividaPagamento({divida, setModal}) {
	const {token} = useAuth();
    
    function fechar(){
        setModal(false);
    }

    async function pagarDivida(){
        let body = {descricao, data_lancamento, valor_pago, categoria};
		let url = GLOBAL.BASE_URL+"/movimentacao/"+props.indice+"/";

        /*todo*/
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
                    <Text style={tailwind("text-center")}>Qual o valor do pagamento efetuado para a divída “{divida.credor}”?</Text>
					
                    <KeyboardAvoidingView style={tailwind("flex items-center")}>
                        <Formik
                            initialValues={({valor: ""}, {data: ""})}
                                onSubmit={console.log}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
                                <View style={tailwind("w-full flex-col")}>
                                    <Input
                                            onChangeText={handleChange("valor")}
                                            onBlur={handleBlur("valor")}
                                            keyboard={"numeric"}
                                            placeholder={"100.00"}
                                            textContentType={"number"}
                                            espacamento={true}
                                    ></Input>
                                    <TouchableOpacity style={[estilos.containerInput]} onPress={showDatePicker}>
                                        <Text style={estilos.labelInput}>Data para registro</Text>
                                        <TextInput style={estilos.input} editable={false} value={values.data} placeholder={dateToDateFormat(new Date())} placeholderTextColor={"#A0AEC0"}/>
                                                {show && (
                                                    <DateTimePicker value={date} mode={mode} display="default" onChange={(event, selectedDate) => { 
                                                        setShow(false);
                                                        const currentDate = dateToDateFormat(selectedDate);
                                                        setFieldValue("data", currentDate);
                                                        console.log(currentDate);
                                                    }}/>
                                                )}
                                    </TouchableOpacity>

                                    <View style={tailwind("flex flex-row justify-between w-full")}>
									
										<Botao
											ordem="terciario"
											tamanho="pequeno"
											label="Cancelar"
											onPress={fechar}
										/>
                                        
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
}