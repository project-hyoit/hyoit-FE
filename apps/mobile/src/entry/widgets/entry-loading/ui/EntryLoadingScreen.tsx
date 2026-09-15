import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "@hyoit/auth";

// 앱 시작 시 보여주는 로딩(스플래시) 화면
export default function EntryLoadingScreen() {
	const role = useAuthStore((s) => s.role);

	useEffect(() => {
		let mounted = true;
		const timer = setTimeout(() => {
			if (!mounted) return;

			router.replace("/(entry)/login");
		}, 2000);

		return () => {
			mounted = false;
			clearTimeout(timer);
		};
	}, [role]);

	return (
		<View style={s.wrap}>
			<Image source={require("@/assets/images/login/login_logo.png")} style={s.logoSvg} />
		</View>
	);
}

const s = StyleSheet.create({
	wrap: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	logo: {
		width: 120,
		height: 120,
		borderRadius: 16,
		resizeMode: "cover",
	},
	webview: {
		width: 84,
		height: 52,
		backgroundColor: "transparent",
	},
	logoSvg: {
		width: 84,
		height: 52,
		resizeMode: "contain",
	},
});
