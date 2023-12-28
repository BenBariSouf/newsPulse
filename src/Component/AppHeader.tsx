import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";
import { FONTS } from "../utils/Fonts";
import { Image } from "expo-image";
import AppLogo from "../../assets/logo";

interface AppHeaderProps {
	title: string;
}

const AppHeader: React.FunctionComponent<AppHeaderProps> = ({ title }) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headerTitle}>{title}</Text>
			{/* <Image source={{ uri: image }} style={styles.imageStyle} cachePolicy={"memory"} contentFit="cover" /> */}
			<AppLogo />
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		height: hp(60),
		justifyContent: "space-between",
		width: DEVICE_WIDTH,
		paddingHorizontal: wp(20),
		backgroundColor: COLORS.RED_COLOR,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: wp(20),
		marginRight: wp(6),
		fontFamily: FONTS.POPPINS_BOLD,
		color: COLORS.WHITE_COLOR,
	},
	imageStyle: {
		height: "100%",
		width: wp(100),
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
	},
});

export default AppHeader;
