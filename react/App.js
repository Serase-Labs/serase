import React from "react";
import Routes from "./src/routes";
import { AuthProvider } from "./src/feature-login/auth";
/*
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
*/
export default function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}
