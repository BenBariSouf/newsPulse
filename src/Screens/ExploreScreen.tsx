import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../utils/Colors";
import AppHeader from "../Component/AppHeader";
import CustomStatusBar from "../Component/CustomStatusBar";
import Input from "../Component/Input";
import { hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import { useDispatch } from "react-redux";
import { News, setTrendingNews } from "../Redux/NewsSlice";
import { fetchNewsBySearch, fetchTrendingNews } from "../utils/ApiHelper";
import Loader from "../Component/Loader";
import NewsItem from "../Component/NewsItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

const ExploreScreen = () => {
	// State variable
	const [search, setSearch] = useState<string>("");
	const [news, setNews] = useState<News[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEndLoading, setIsEndLoading] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [isRefresh, setIsRefresh] = useState<boolean>(false);

	// Dispatch
	const dispatch = useDispatch();

	const flatlistRef = useRef<FlashList<News>>(null);

	// TODO: get trending news
	const getTrendingNews = async () => {
		let res = await fetchTrendingNews(0);
		if (res && res.length > 0) {
			setNews(res);
			dispatch(setTrendingNews(res));
			setIsLoading(false);
		}
	};

	// TODO: get news by search
	const getNewsBySearch = async () => {
		// setPage(page + 1);
		let res = await fetchNewsBySearch(search, 0);
		if (res && res.length > 0) {
			setNews(res);
			setIsLoading(false);
		}
	};

	// useEffect(() => {
	//     setIsLoading(true);
	//     getTrendingNews();
	// }, []);

	useEffect(() => {
		if (search.length === 0) {
			setIsLoading(true);
			// setPage(page + 1);
			// getTrendingNews();
		}
	}, [search]);

	// TODO: render footer component
	const _renderFooter = () => {
		if (news.length >= 100) return null;
		return (
			<TouchableOpacity
				onPress={_onEndReached}
				activeOpacity={0.8}
				style={{ ...styles.footerContainer, backgroundColor: search.length === 0 && news.length === 0 ? COLORS.DARK_GREY_COLOR : COLORS.LIHT_RED_COLOR }}
				disabled={search.length === 0 && news.length === 0}
			>
				{!isEndLoading ? (
					<View style={styles.loadMoreContainer}>
						<Text style={{ ...styles.loadMoreText, color: search.length === 0 && news.length === 0 ? COLORS.WHITE_COLOR : COLORS.RED_COLOR }}>
							{page === 1 ? "Search" : "Load more stories"}
						</Text>
						<MaterialCommunityIcons
							name="chevron-double-down"
							size={wp(20)}
							color={search.length === 0 && news.length === 0 ? COLORS.GREY_COLOR : COLORS.RED_COLOR}
							style={{ marginLeft: 6 }}
						/>
					</View>
				) : (
					<ActivityIndicator size={"small"} color={search.length === 0 && news.length === 0 ? COLORS.GREY_COLOR : COLORS.RED_COLOR} />
				)}
			</TouchableOpacity>
		);
	};

	// TODO: onEnd flatlist
	const _onEndReached = async () => {
		if (!isEndLoading) {
			setIsEndLoading(true);
			let res: News[] = [];
			if (search.length > 0) {
				res = await fetchNewsBySearch(search, page);
			} else {
			}

			if (res.length > 0) {
				setPage(page + 1);
				let newNewsArr: News[] = [];
				newNewsArr = [...news, ...res];
				setNews(newNewsArr);
				setIsEndLoading(false);
			} else {
				Alert.alert("Error while fetching news!");
			}
		}
	};

	// TODO: on refresh get latest news
	const onRefresh = () => {
		setIsRefresh(true);
		if (search.length > 0) {
			getNewsBySearch();
		} else {
			getTrendingNews();
		}
		setIsRefresh(false);
	};

	return (
		<View style={styles.container}>
			<CustomStatusBar backgroundColor={COLORS.RED_COLOR} contentType="light-content" />
			<AppHeader title="Explore News" />
			<Input
				value={search}
				placeholder="Search"
				onChangeText={setSearch}
				onSubmit={() => {
					setIsLoading(true);
					getNewsBySearch();
				}}
				onPressRightIcon={() => setSearch("")}
			/>

			<FlashList
				refreshing={isRefresh}
				refreshControl={<RefreshControl colors={[COLORS.RED_COLOR]} refreshing={isRefresh} onRefresh={onRefresh} />}
				ref={flatlistRef}
				data={news}
				keyExtractor={(item, idx) => item.title + idx.toString()}
				renderItem={({ item, index }) => {
					return <NewsItem news={item} />;
				}}
				ItemSeparatorComponent={() => {
					return <View style={{ height: 10 }} />;
				}}
				ListFooterComponent={_renderFooter}
				onEndReachedThreshold={0.5}
				disableIntervalMomentum={true}
				estimatedItemSize={100}
				estimatedFirstItemOffset={100}
			/>
			{/* {isLoading && <Loader />} */}
		</View>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.WHITE_COLOR,
	},
	titleText: {
		fontSize: wp(18),
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		marginHorizontal: wp(20),
		color: COLORS.BLACK_COLOR,
		marginBottom: hp(14),
	},
	footerContainer: {
		paddingVertical: hp(10),
		marginVertical: hp(20),
		marginHorizontal: wp(20),
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: COLORS.LIHT_RED_COLOR,
	},
	loadMoreText: {
		fontSize: wp(12),
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		// color: COLORS.RED_COLOR,
		textAlign: "center",
	},
	loadMoreContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
});
