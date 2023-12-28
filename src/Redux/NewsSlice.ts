import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Topic = {
	topic: string;
	label: string;
	// type: string;
	// imageUrl: string;
	// priority: number;
	selected: boolean;
};

export type News = {
	// content: string;
	// createdAt: number;
	// hashId: string;
	// important: boolean;
	// score: number;
	// shortenedUrl: string;
	// sourceUrl: string;
	// title: string;
	id: number;
	author: string;
	title: string;
	description: string;
	url: string;
	source: {
		id: string;
		name: string;
	};
	urlToImage: string;
	category: string;
	language: string;
	content: string;
	publishedAt: string;
};

type NewsState = {
	isUserOnbaord: boolean;
	topics: Topic[];
	news: News[];
	userSelectedTopics: Topic[];
	trendingNews: News[];
	savedNews: News[];
	isNotification: boolean;
	isNotificationSubscribed: boolean;
};

const initialState: NewsState = {
	isUserOnbaord: false,
	topics: [],
	news: [],
	userSelectedTopics: [],
	trendingNews: [],
	savedNews: [],
	isNotification: true,
	isNotificationSubscribed: false,
};

const NewsSlice = createSlice({
	name: "newsSlice",
	initialState,
	reducers: {
		setUserOnboard: (state: NewsState, action: PayloadAction<boolean>) => {
			state.isUserOnbaord = action.payload;
		},
		setTopics: (state: NewsState, action: PayloadAction<Topic[]>) => {
			state.topics = action.payload;
		},
		setUserSelectedTopics: (state: NewsState, action: PayloadAction<Topic[]>) => {
			state.userSelectedTopics = action.payload;
		},
		setNews: (state: NewsState, action: PayloadAction<News[]>) => {
			let {
				payload: [res, category],
			} = action;
			const news = res.map((item: News) => ({
				...item,
				id: Math.floor(Math.random() * Date.now()),
				category,
			}));
			state.news = news;
		},
		setTrendingNews: (state: NewsState, action: PayloadAction<News[]>) => {
			state.trendingNews = action.payload;
		},
		setSavedNews: (state: NewsState, action: PayloadAction<News>) => {
			state.savedNews = [...state.savedNews, action.payload];
		},
		removeNews: (state: NewsState, action: PayloadAction<News>) => {
			state.savedNews = state.savedNews.filter((news: News) => news.id !== action.payload.id);
		},
		updateTopics: (state: NewsState, action: PayloadAction<Topic>) => {
			let tempTopics = state.userSelectedTopics;
			if (tempTopics.includes(action.payload)) {
				tempTopics = tempTopics.filter((e: Topic) => e.topic !== action.payload.topic);
				console.log(tempTopics);
			}
			console.log(tempTopics.includes(action.payload));
		},
		setIsNotification: (state: NewsState, action: PayloadAction<boolean>) => {
			state.isNotification = action.payload;
		},
		setIsNotificationSubscribed: (state: NewsState, action: PayloadAction<boolean>) => {
			state.isNotificationSubscribed = action.payload;
		},
	},
});

export const {
	setTopics,
	setUserOnboard,
	setUserSelectedTopics,
	setNews,
	setTrendingNews,
	setSavedNews,
	removeNews,
	setIsNotification,
	setIsNotificationSubscribed,
	updateTopics,
} = NewsSlice.actions;
export default NewsSlice.reducer;
