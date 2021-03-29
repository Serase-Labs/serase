import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GLOBAL from "../Global";

const AuthContext = createContext({ signed: false, user: {} });

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(null);

	useEffect(() => {
		async function loadStorageData() {
			const storageUser = await AsyncStorage.getItem("@RNAuth:user");
			const storageToken = await AsyncStorage.getItem("@RNAuth:token");

			if (storageUser && storageToken) {
				setUser(JSON.parse(storageUser));
				setToken(storageToken);
				setLoading(false);
			} else if (!storageUser && !storageToken) {
				setLoading(false);
			}
		}

		loadStorageData();
	}, []);

	async function signIn(email, senha) {
		let res = await fetch(GLOBAL.BASE_URL+"/login/", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "post",
			body: JSON.stringify({
				email: email,
				senha: senha,
			}),
		});

		if (!res.ok) throw res.status;

		console.log(res);
		let json = await res.json();
		console.log(json);

		let token = json.conteudo.token,
			user = { nome: json.conteudo.nome, email: json.conteudo.email };

		setUser(user);
		setToken(token);

		await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(user));
		await AsyncStorage.setItem("@RNAuth:token", token);
	}

	async function signUp(nome, email, senha, senhaConfirmacao) {
		let res = await fetch(GLOBAL.BASE_URL+"/cadastro/", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "post",
			body: JSON.stringify({
				nome: nome,
				email: email,
				senha: senha,
				senhaConfirmacao: senhaConfirmacao,
			}),
		});

		if (!res.ok) throw res.status;

		console.log(res);
		let json = await res.json();
		console.log(json);

		let token = json.conteudo.token,
			user = { nome: json.conteudo.nome, email: json.conteudo.email };

		setUser(user);
		setToken(token);

		await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(user));
		await AsyncStorage.setItem("@RNAuth:token", token);
	}

	function signOut() {
		AsyncStorage.clear().then(() => {
			setUser(null);
			setToken(null);
		});
	}

	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, token, signIn, signUp, signOut, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = React.useContext(AuthContext);
	return context;
}

export default AuthContext;
