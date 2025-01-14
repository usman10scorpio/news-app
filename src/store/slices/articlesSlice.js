import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewsAPIArticles, getGuardianArticles, getNYTimesArticles } from "../../config/api";

// Source keys
const SOURCES = { NEWS_API: "news-api", GUARDIAN_API: "guardian-api", NY_TIMES: "ny-times", ALL: "all" };

// Async thunk for fetching articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params, { getState }) => {
    const { query, source } = getState().articles.filters;
    const articles = [];

    // Helper function to fetch articles from a specific source
    const fetchSourceArticles = async (fetchFunc, sourceName) => {
      try {
        return await fetchFunc(query, params);
      } catch (error) {
        console.error(`Error fetching articles from ${sourceName}:`, error);
        return [];
      }
    };

    // Prepare fetch tasks based on the selected source
    const fetchTasks = [
      ...(source.key === SOURCES.ALL || source.key === SOURCES.NEWS_API
        ? [fetchSourceArticles(getNewsAPIArticles, "NewsAPI")]
        : []),
      ...(source.key === SOURCES.ALL || source.key === SOURCES.GUARDIAN_API
        ? [fetchSourceArticles(getGuardianArticles, "The Guardian")]
        : []),
      ...(source.key === SOURCES.ALL || source.key === SOURCES.NY_TIMES
        ? [fetchSourceArticles(getNYTimesArticles, "NY Times")]
        : []),
    ];

    // Resolve all fetch tasks in parallel
    const results = await Promise.all(fetchTasks);
    results.forEach((result) => articles.push(...result));

    return articles;
  }
);

// Articles slice
const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: "idle",
    error: null,
    filters: {
      query: "",
      category: "",
      date: "",
      source: SOURCES.ALL, // Default source
      author: "",
      preferredSources: [],
      preferredCategories: [],
      preferredAuthors: [],
    },
  },
  reducers: {
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setDate(state, action) {
      state.filters.date = action.payload;
    },
    setSource(state, action) {
      state.filters.source = action.payload;
    },
    setAuthor(state, action) {
      state.filters.author = action.payload;
    },
    setPreferredSources(state, action) {
      state.filters.preferredSources = action.payload;
    },
    setPreferredCategories(state, action) {
      state.filters.preferredCategories = action.payload;
    },
    setPreferredAuthors(state, action) {
      state.filters.preferredAuthors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions
export const {
  setQuery,
  setCategory,
  setDate,
  setSource,
  setAuthor,
  setPreferredSources,
  setPreferredCategories,
  setPreferredAuthors,
} = articlesSlice.actions;

// Export reducer
export default articlesSlice.reducer;
