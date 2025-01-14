import axios from 'axios';
import newsImage from '../images/newsImage.jpg';

// API keys loaded from environment variables
const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_API_KEY;
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

// Utility function to perform API requests
const fetchApiData = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null;
  }
};

// Function to standardize article data structure
const formatArticles = (articles, source) => {
  return articles.map((article) => ({
    title: article.title || article.webTitle || article.headline?.main || 'Untitled',
    url: article.url || article.webUrl || article.web_url,
    source: article?.source?.name || article?.fields?.publication || article?.source || source,
    author: article?.author || article?.fields?.byline || article?.byline?.original || 'Unknown Author',
    category: article?.category || article?.sectionName || 'General',
    imgSrc: article?.urlToImage || article.image || newsImage,
  }));
};

// Fetch articles from NewsAPI
export const getNewsAPIArticles = async (query, filters) => {
  const baseUrl = 'https://newsapi.org/v2/';
  const searchUrl = `${baseUrl}everything?q=${query}&from=${filters.date}`;
  const headlinesUrl = `${baseUrl}top-headlines?country=us&category=${filters.category}`;
  
  const requestUrl = query ? searchUrl : filters.category ? headlinesUrl : `${baseUrl}top-headlines?country=us`;
  const params = { apiKey: NEWS_API_KEY };
  
  const responseData = await fetchApiData(requestUrl, params);
  return responseData ? formatArticles(responseData.articles, 'NewsAPI') : [];
};

// Fetch articles from The Guardian API
export const getGuardianArticles = async (query, filters) => {
  const baseUrl = 'https://content.guardianapis.com/search';
  const params = {
    q: query || filters.category || '',
    'from-date': filters.date || '',
    'api-key': GUARDIAN_API_KEY,
    'show-fields': 'all',
  };

  const responseData = await fetchApiData(baseUrl, params);
  return responseData ? formatArticles(responseData.response.results, 'The Guardian') : [];
};

// Fetch articles from New York Times API
export const getNYTimesArticles = async (query, filters) => {
  const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const params = {
    fq: query,
    begin_date: filters.date?.replace(/-/g, ''), // NYT API expects date in YYYYMMDD format
    'api-key': NYT_API_KEY,
    section_name: filters.category,
  };

  const responseData = await fetchApiData(baseUrl, params);
  return responseData ? formatArticles(responseData.response.docs, 'NYTimes') : [];
};
