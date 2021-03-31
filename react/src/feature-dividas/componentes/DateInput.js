import * as React from "react";
import { useState, useEffect } from "react";
import {
	Text,
	TouchableOpacity,
	TextInput,
} from "react-native";
import tailwind from "tailwind-rn";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInput({onPick, label}) {
    const [date, setDate] = useState();
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);

	const showDatePicker = () => {
		setShow(true);
		setMode("date");
	};

	const dateToDateFormat = date=> date.toISOString().slice(0,10).split('-').reverse().join('/');

	return (
		<TouchableOpacity style={[estilos.containerInput]} onPress={showDatePicker}>
			<Text style={estilos.labelInput}>{label}</Text>
			<TextInput style={estilos.input} editable={false} value={date? dateToDateFormat(date):""} placeholder={dateToDateFormat(new Date())} placeholderTextColor={"#A0AEC0"}/>
			{show && (
				<DateTimePicker value={date? date:new Date()} mode={mode} display="default" onChange={(event, selectedDate) => { 
					setShow(false);
                    if(selectedDate){
                        setDate(selectedDate);
                        const currentDate = dateToDateFormat(selectedDate);
                        onPick(currentDate, selectedDate);
                        console.log(currentDate);
                    } 
				}}/>
			)}
		</TouchableOpacity>
	)
}

const estilos = {
	containerInput: tailwind("w-64 mb-6"),
    labelInput: tailwind("text-gray-700 text-base font-bold mb-3"),
    input: tailwind("bg-gray-100 rounded-lg py-2 px-3 text-gray-700 text-base"),
};