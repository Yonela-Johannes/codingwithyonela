import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import suggestionReducer from '../features/suggestions/suggestionSlice';
import blogsReducer from '../features/blogs/blogSlice';
import postsReducer from '../features/post/postSlice';
import categoryReducer from '../features/category/categorySlice';
import titleReducer from '../features/title/titleSlice';
import githubReducer from '../features/github/githubSlice';
import countryReducer from '../features/countries/countrySlice';
import topicReducer from '../features/topic/topicSlice';
import questionReducer from '../features/question/questionSlice';
import projectReducer from '../features/project/projectSlice';
import recommendationReducer from '../features/recommenation/recommendationSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import quoteReducer from '../features/quote/quoteSlice';
import tasksReducer from '../features/tasks/tasksSlice';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  user: userReducer,
  suggestion: suggestionReducer,
  blogs: blogsReducer,
  posts: postsReducer,
  categories: categoryReducer,
  titles: titleReducer,
  countries: countryReducer,
  topic: topicReducer,
  question: questionReducer,
  project: projectReducer,
  recommendation: recommendationReducer,
  quotes: quoteReducer,
  github: githubReducer,
  task: tasksReducer
});

// Create a persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store to use the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
export const persistor = persistStore(store);
