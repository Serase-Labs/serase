import * as React from "react";
import { useState, useEffect } from "react";

import GLOBAL from "../../Global.js"
import { useAuth } from "../../feature-login/auth.js";

import InputSelect from "./InputSelect.js"


const ajeitaCategorias = categorias=>categorias.map(categoria=>[categoria,categoria]);

export default function InputCategoria({onValueChange, espacamento, enabled, mode}) {
	const {token} = useAuth();
    const [options,setOptions] = useState([]);

    useEffect(() => {
		async function fetchData() {
			let url = GLOBAL.BASE_URL + "/categoria/";
		
			try {
				let res = await fetch(url, {
					headers: { Authorization: token },
				});

				let json = await res.json();
				setOptions(ajeitaCategorias(json.conteudo));
				return json;
			} catch (error) {
                console.error(error);
            }
		}
		fetchData();
	}, []);

	return (
        <InputSelect
            label="Categoria"
            placeholder="Selecionar categoria..."
            options={options}
            onValueChange={onValueChange}
            espacamento={espacamento}
            enabled={enabled}
            mode={mode}
        />
	)
}