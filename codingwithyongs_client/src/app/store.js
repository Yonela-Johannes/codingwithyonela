import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import suggestionReducer from '../features/suggestions/suggestionSlice'
import blogsReducer from '../features/blogs/blogSlice'
import categoryReducer from '../features/category/categorySlice'
import titleReducer from '../features/title/titleSlice'
import countryReducer from '../features/countries/countrySlice'
import topicReducer from '../features/topic/topicSlice'
import questionReducer from '../features/question/questionSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestion: suggestionReducer,
    blogs: blogsReducer,
    categories: categoryReducer,
    titles: titleReducer,
    countries: countryReducer,
    topic: topicReducer,
    question: questionReducer
  },
})