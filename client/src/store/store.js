import { configureStore } from '@reduxjs/toolkit'
import MusicsReducer from './slices/MusicsSlice'
import favoritesReducer from './slices/favoritesSlice'

export const store = configureStore({
    reducer: {
        musics: MusicsReducer,
        favorites: favoritesReducer
    }
})