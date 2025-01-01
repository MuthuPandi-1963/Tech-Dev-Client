import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/AuthSlice'
import productReducer from '../Slices/ProductSlice';
import orderReducer from '../Slices/OrderSlice'
import cartReducer from '../Slices/CartSlice'
import favoriteReducer from '../Slices/FavoriteSlice'


const Store = configureStore({
    reducer:{
        auth : authReducer,
        product : productReducer,
        order : orderReducer,
        cart :cartReducer,
        favorite : favoriteReducer
    }
})

export default Store;