import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import suggestionReducer from '../features/suggestions/suggestionSlice'
import blogsReducer from '../features/blogs/blogSlice'
import categoryReducer from '../features/category/categorySlice'
import titleReducer from '../features/title/titleSlice'
import countryReducer from '../features/countries/countrySlice'
import topicReducer from '../features/topic/topicSlice'
import questionReducer from '../features/question/questionSlice'
import projectReducer from '../features/project/projectSlice'
import recommendationReducer from '../features/recommenation/recommendationSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from '../features/theme/themeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: {
    suggestion: suggestionReducer,
    blogs: blogsReducer,
    categories: categoryReducer,
    titles: titleReducer,
    countries: countryReducer,
    topic: topicReducer,
    question: questionReducer,
    project: projectReducer,
    recommendation: recommendationReducer
  },
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const rootstore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(rootstore);