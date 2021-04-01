import * as React from "react";
import InputSelect from "./InputSelect.js"


export default function InputMes({onValueChange, espacamento, enabled, mode}) {
    const options = [
        ["Janeiro", 1],
        ["Fevereiro", 2],
        ["Março", 3],
        ["Abril", 4],
        ["Maio", 5],
        ["Junho", 6],
        ["Julho", 7],
        ["Agosto", 8],
        ["Setembro", 9],
        ["Outubro", 10],
        ["Novembro", 11],
        ["Dezembro", 12],
    ]

	return (
        <InputSelect
            label="Mês da cobrança"
            placeholder="Selecionar mês..."
            options={options}
            onValueChange={onValueChange}
            espacamento={espacamento}
            enabled={enabled}
            mode={mode}
        />
	)
}