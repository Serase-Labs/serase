import * as React from "react";
import { useState, useEffect } from "react";
import {
	Text,
    View,
} from "react-native";
import tailwind from "tailwind-rn";
import {Picker} from '@react-native-picker/picker';

export default function InputSelect({label, placeholder, options, onValueChange, espacamento, enabled, mode}) {
    const [selected, setSelected] = useState();

	return (
        <View style={[espacamento? tailwind("mb-4"):tailwind("mb-0")]}>
            <Text style={tailwind("text-gray-800 text-sm font-bold mb-3")}>
				{label}
			</Text>
            <View style={tailwind("bg-gray-100 rounded-lg py-3 px-2")}>
                <Picker
                    style={tailwind("w-full h-6")}
                    itemStyle={tailwind("text-base text-gray-700")}
                    selectedValue={selected}
                    onValueChange={(itemValue, itemIndex) =>{
                        setSelected(itemValue);
                        onValueChange(itemValue);
                    }}
                    enabled={enabled==undefined?true:enabled}
                    mode={mode?mode:"dialog"}
                >
                    <Picker.Item value='' label={placeholder}/>
                    {options.map(option=>(
                        <Picker.Item label={option[0]} value={option[1]} key={option[1]}/>
                    ))}

                </Picker>
            </View>
        </View>
	)
}