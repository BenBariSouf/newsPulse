import { View, Text, StyleSheet, ScrollView, Share } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/Colors";
import CustomStatusBar from "../Component/CustomStatusBar";
import NavigationHeader from "../Component/NavigationHeader";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "../../App";
import { DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import { News, setSavedNews } from "../Redux/NewsSlice";
import { Image } from "expo-image";
import WebViewModal from "../Component/WebViewModal";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "react-native-snackbar-component";
import { RootState } from "../Redux/store";
import dayjs from "dayjs";
import reactotron from "../../ReactotronConfig";

const NewsScreen = () => {
	const navigation = useNavigation();
	// State variable
	const [news, setNews] = useState<News>();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [category, setCategory] = useState<string>("");
	const [isSnakbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
	const [isFromBookMark, setIsFromBookmark] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>("");

	// Navigation Route
	const route = useRoute<RouteProp<HomeStackParamList>>();

	// Selector & Dispatch
	const dispatch = useDispatch();
	const savedNews = useSelector((state: RootState) => state.newsSlice.savedNews);

	useEffect(() => {
		if (route.params?.news !== undefined) {
			setNews(route.params?.news);
		}
		if (route.params?.isFromBookMark !== undefined) {
			setIsFromBookmark(!route.params?.isFromBookMark);
		}
	}, []);

	useEffect(() => {
    if (isSnakbarVisible) {
      setTimeout(() => {
        setIsSnackbarVisible(false);
      }, 4000);
    }
  }, [isSnakbarVisible]);

  const _renderTags = (tag: string | undefined) => {
    return (
      <View style={styles.tagContainer}>
        <View style={styles.tagStyle}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>
    );
  };

  // TODO: sahre news
  const shareNews = async () => {
    if (news !== undefined) {
      try {
        await Share.share({
          message: `${news.title}\n\n${news.url}`,
        });
      } catch (error) {
        console.log("SHare error ", error);
      }
    }
  };

  // TODO: save news to local storage
  const saveNews = () => {
    if (news !== undefined) {
      if (savedNews.includes(news)) {
        setSnackbarMessage("News has been already saved");
      } else {
        dispatch(setSavedNews(news));
        setSnackbarMessage("News has been saved");
      }
      setIsSnackbarVisible(true);
    }
  };

  return (
    // <View style={styles.container}>
    // 	<ScrollView bounces={false} style={{ marginBottom: hp(30) }}>
    // 		<CustomStatusBar backgroundColor={COLORS.RED_COLOR} contentType="light-content" />
    // 		<NavigationHeader isShare={true} isBookmark={isFromBookMark} onPressShare={() => shareNews()} onPressBookmark={() => saveNews()} onPress={() => navigation.goBack()} />
    // 		<Image source={{ uri: news?.imageUrl }} style={styles.imageStyle} contentFit="cover" />
    // 		<Text style={styles.newsTitle}>{news?.title}</Text>
    // 		<Text style={styles.authorText}>{`Written by ${news?.authorName}`}</Text>
    // 		<Text style={styles.authorText}>{`Published at ${dayjs(news?.createdAt).format("MMM, DD YYYY hh:mm A")}`}</Text>
    // 		{_renderTags(news?.categoryNames)}
    // 		<Text style={styles.contentText}>{news?.content.trim()}</Text>
    // 		<Text onPress={() => setIsVisible(true)} style={styles.readMoreText}>
    // 			Read More
    // 		</Text>
    // 	</ScrollView>
    // 	<WebViewModal isVisible={isVisible} source={news?.sourceUrl !== undefined ? news?.sourceUrl : ""} toggleModal={(visible: boolean) => setIsVisible(visible)} />
    // 	<SnackBar
    // 		visible={isSnakbarVisible}
    // 		textMessage={snackbarMessage}
    // 		bottom={20}
    // 		autoHidingTime={3000}
    // 		right={10}
    // 		left={10}
    // 		backgroundColor={COLORS.LIHT_RED_COLOR}
    // 		messageColor={COLORS.RED_COLOR}
    // 	/>
    // </View>
    <View style={styles.container}>
      <ScrollView bounces={false} style={{ marginBottom: hp(30) }}>
        <CustomStatusBar backgroundColor={COLORS.RED_COLOR} contentType='light-content' />
        <NavigationHeader isShare={true} isBookmark={isFromBookMark} onPressShare={() => shareNews()} onPressBookmark={() => saveNews()} onPress={() => navigation.goBack()} />
        <Image source={news?.urlToImage ? { uri: news?.urlToImage } : require("../../assets/images/news_placeholder.png")} style={styles.imageStyle} contentFit='cover' />
        <Text style={styles.newsTitle}>{news?.title}</Text>

        <Text style={styles.authorText}>
          {news?.author && `Written by ${news?.author} - `}
          {news?.source && `${news?.source?.name}`}
        </Text>
        <Text style={styles.authorText}>{`Published at ${dayjs(news?.publishedAt).format("MMM, DD YYYY hh:mm A")}`}</Text>
        {news?.category ? _renderTags(news?.category) : <View style={styles.tagContainer}></View>}
        <Text style={styles.contentText}>{news?.description?.trim()}</Text>
        <Text onPress={() => setIsVisible(true)} style={styles.readMoreText}>
          Read More
        </Text>
      </ScrollView>
      <WebViewModal isVisible={isVisible} source={news?.url !== undefined ? news?.url : ""} toggleModal={(visible: boolean) => setIsVisible(visible)} />
      <SnackBar
        visible={isSnakbarVisible}
        textMessage={snackbarMessage}
        bottom={20}
        autoHidingTime={4000}
        right={10}
        left={10}
        backgroundColor={COLORS.LIHT_RED_COLOR}
        messageColor={COLORS.RED_COLOR}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.WHITE_COLOR,
	},
	newsTitle: {
		fontSize: wp(16),
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		color: COLORS.BLACK_COLOR,
		marginHorizontal: wp(20),
		marginVertical: hp(14),
	},
	imageStyle: {
		height: hp(220),
		width: DEVICE_WIDTH,
		alignSelf: "center",
	},
	authorText: {
		fontSize: wp(12),
		fontFamily: FONTS.POPPINS_REGULAR,
		color: COLORS.BLACK_COLOR,
		marginHorizontal: wp(20),
	},
	tagContainer: {
		flexDirection: "row",
		gap: 4,
		marginHorizontal: wp(20),
		marginVertical: hp(14),
	},
	tagStyle: {
		paddingVertical: hp(10),
		paddingHorizontal: wp(14),
		borderRadius: 8,
		backgroundColor: COLORS.LIHT_RED_COLOR,
	},
	tagText: {
		fontSize: wp(12),
		fontFamily: FONTS.POPPINS_REGULAR,
		color: COLORS.RED_COLOR,
	},
	contentText: {
		fontSize: wp(14),
		fontFamily: FONTS.POPPINS_REGULAR,
		color: COLORS.BLACK_COLOR,
		marginHorizontal: wp(20),
	},
	readMoreText: {
		fontSize: wp(12),
		fontFamily: FONTS.POPPINS_SEMIBOLD,
		color: COLORS.RED_COLOR,
		textDecorationLine: "underline",
		marginHorizontal: wp(20),
		marginTop: hp(14),
	},
});
