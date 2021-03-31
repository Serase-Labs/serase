import * as React from "react";
import InputSelect from "./InputSelect.js"


export default function InputPeriodo({onValueChange, espacamento, enabled, mode}) {
    const options = [
        ["Semanalmente", "semanal"],
        ["Mensalmente", "mensal"],
        ["Anualmente", "anual"],
    ]

	return (
        <InputSelect
            label="Periodo de cobrança"
            placeholder="Selecionar periodo..."
            options={options}
            onValueChange={onValueChange}
            espacamento={espacamento}
            enabled={enabled}
            mode={mode}
        />
	)
}