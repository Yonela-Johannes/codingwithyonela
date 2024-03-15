import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import suggestionReducer from '../features/suggestions/suggestionSlice'
import blogsReducer from '../features/blogs/blogSlice'
import categoryReducer from '../features/category/categorySlice'
import titleReducer from '../features/title/titleSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestion: suggestionReducer,
    blogs: blogsReducer,
    categories: categoryReducer,
    titles: titleReducer
  },
})