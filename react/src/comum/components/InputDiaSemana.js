import * as React from "react";
import InputSelect from "./InputSelect.js"


export default function InputDiaSemana({onValueChange, espacamento, enabled, mode}) {
    const options = [
        ["Domingo", 1],
        ["Segunda", 2],
        ["Terça", 3],
        ["Quarta", 4],
        ["Quinta", 5],
        ["Sexta", 6],
        ["Sabado", 7],
    ]

	return (
        <InputSelect
            label="Dia da cobrança"
            placeholder="Selecionar dia..."
            options={options}
            onValueChange={onValueChange}
            espacamento={espacamento}
            enabled={enabled}
            mode={mode}
        />
	)
}