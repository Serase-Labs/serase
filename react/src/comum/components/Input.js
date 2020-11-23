import * as React from "react";
import { View, Text, TextInput, ShadowPropTypesIOS } from "react-native";
import tailwind from "tailwind-rn";

function Error() {
	return tailwind("bg-red-100 text-red-700 px-4 py-2 mt-2 rounded relative");
}

function Input(props) {
	return (
		<View style={tailwind("w-64 mb-2")}>
			<Text style={tailwind("text-gray-800 text-base mb-3")}>
				{props.label}
			</Text>
			<TextInput
				style={[
					tailwind(
						"bg-gray-100 rounded w-full py-2 px-3 text-gray-700 text-base"
					),
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
