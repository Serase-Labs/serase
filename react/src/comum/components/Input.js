import * as React from "react";
import { View, Text, TextInput, Dimensions } from "react-native";
import tailwind from "tailwind-rn";

function Error() {
	const windowWidth = Dimensions.get('window').width;
	return [tailwind("bg-red-100 text-red-700 px-4 py-2 mt-2 rounded relative w-full"), { width: windowWidth/100*80 }];
}

function Input(props) {
	const windowWidth = Dimensions.get('window').width;
	return (
		<View style={tailwind("w-64 mb-2")}>
			<Text style={tailwind("text-gray-800 text-sm font-bold mb-3")}>
				{props.label}
			</Text>
			<TextInput
				style={[
					tailwind(
						"bg-gray-100 rounded-lg py-2 px-3 text-gray-700 text-base"
					), 
					{ width: windowWidth/100*80},
					props.espacamento === true
						? tailwind("mb-4")
						: tailwind("mb-0"),
				]}
				// Formik
				onChangeText={props.onChangeText}
				onBlur={props.handleBlur}
				value={props.value}
				// Comportamento do input
				blurOnSubmit={true}
				secureTextEntry={props.secureTextEntry}
				textContextType={props.textContextType}
				// Aprimoramentos para UX
				keyboard={props.keyboard}
				// Estilização do Placeholder
				placeholder={props.placeholder}
				placeholderTextColor={"#718096"}
			></TextInput>

			{props.children}
		</View>
	);
}

export { Error, Input };
