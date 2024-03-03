import { configureStore } from "@reduxjs/toolkit";



//reducerları import et
import counterReducer from "./slices/counterSlice";
import crudReducer from "./slices/crudSlice";


// configure store - createstore farkları
//1- varsayılan olarak thunk kurulu gelir
//2- verilen reducerlerı otomatik olarak birleştirir
//3- devtools eklentisini destekler

export default configureStore({
    reducer: { counterReducer, crudReducer },
})