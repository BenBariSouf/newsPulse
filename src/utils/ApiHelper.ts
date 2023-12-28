import axios, { AxiosResponse } from "axios";

// Base url
const BASE_URL = "https://newsapi.org/v2";

const params = {
	ENDPOINT: {
		top: "/top-headlines",
		everything: "/everything",
	},
	COUNTRY: "us",
	LANGUAGE: "en",
	APIKEY: "4d6d5d86c92c4ce08753c13b7cfb4fd1",
	PAGESIZE: 20,
};

// TODO: get all news
export const fetchAllNews = async (page: number = 0) => {
	try {
		const response: AxiosResponse = await axios.get(`${BASE_URL + ENDPOINTS.ALL}?offset=${page}&limit=30`);
		if (response.status === 200) {
			return response.data?.data?.articles;
		} else {
			console.log("API ERROR RES: ", response.data.message);
		}
	} catch (error) {
		console.log("API ERROR: ", error);
	}
};
// TODO: get all cateogry
export const fetchAllCategory = () => {
	let res = [
		{
			label: "general",
			topic: "general",
		},
		{
			label: "business",
			topic: "business",
		},
		{
			label: "entertainment",
			topic: "entertainment",
		},
		{
			label: "health",
			topic: "health",
		},
		{
			label: "science",
			topic: "science",
		},
		{
			label: "sports",
			topic: "sports",
		},
		{
			label: "technology",
			topic: "technology",
		},
	];
	return res;
};
// TODO: get news by catagory
export const fetchNewsByCatagory = async (catagory: string, page: number = 1) => {
	try {
		const response: AxiosResponse = await axios.get(`${BASE_URL + params.ENDPOINT.top}?apiKey=${params.APIKEY}&country=${params.COUNTRY}&category=${catagory}&page=${page + 1}`);
		if (response.status === 200) {
			return response.data?.articles;
		} else {
			return response.data.message;
		}
	} catch (error) {
		console.log("API ERROR: ", error);
	}
};

// TODO: search news
export const fetchNewsBySearch = async (query: string, page: number = 1) => {
	try {
		const response: AxiosResponse = await axios.get(
			`${BASE_URL + params.ENDPOINT.everything}?apiKey=${params.APIKEY}&language=${params.LANGUAGE}&q=${query}&pageSize=${params.PAGESIZE}&page=${page}`
		);

		if (response.status === 200) {
			return response.data?.articles;
		} else {
			return response.data.message;
		}
	} catch (error) {
		console.log("API ERROR: ", error);
	}
};
// TODO: fetch trending news
export const fetchTrendingNews = async (offset: number) => {
	try {
		const response: AxiosResponse = await axios.get(`${BASE_URL + ENDPOINTS.TRENDING}?offset=${offset}&limit=30`);
		if (response.status === 200) {
			return response.data?.data?.articles;
		} else {
			return response.data?.message;
		}
	} catch (error) {
		console.log("API ERROR: ", error);
	}
};
