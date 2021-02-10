import React from "react";
//import { YellowBox } from "react-native";
import Routes from "./src/routes";
import { AuthProvider } from './src/feature-login/auth';
import { LogBox } from "react-native";

//YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

export default function App() {
	return (
	<AuthProvider>
		<Routes />
	</AuthProvider>);
}
