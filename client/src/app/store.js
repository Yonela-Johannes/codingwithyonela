import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/user/authSlice';
import suggestionReducer from '../features/suggestions/suggestionSlice';
import blogsReducer from '../features/blogs/blogSlice';
import postsReducer from '../features/post/postSlice';
import categoryReducer from '../features/category/categorySlice';
import titleReducer from '../features/title/titleSlice';
import countryReducer from '../features/countries/countrySlice';
import topicReducer from '../features/topic/topicSlice';
import questionReducer from '../features/question/questionSlice';
import projectReducer from '../features/project/projectSlice';
import eventReducer from '../features/event/eventSlice';
import recommendationReducer from '../features/recommenation/recommendationSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from '../features/tasks/tasksSlice';
import feedbackReducer from '../features/feedback/feedbackSlice';
import noteReducer from '../features/notes/notesSlice';

// Create a persist configuration for suggestion reducer only
const userPersistConfig = {
  key: 'user',
  storage,
};

// Create persisted suggestion reducer
const persistedUserReducer = persistReducer(userPersistConfig, authReducer);

// Combine the reducers again, replacing the suggestion reducer with the persisted version
const rootReducerWithPersistedSuggestion = combineReducers({
  user: persistedUserReducer,
  users: userReducer,
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
  task: tasksReducer,
  feedback: feedbackReducer,
  event: eventReducer,
  note: noteReducer,
});

// Configure the store to use the combined reducer
export const store = configureStore({
  reducer: rootReducerWithPersistedSuggestion,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor
export const persistor = persistStore(store);
