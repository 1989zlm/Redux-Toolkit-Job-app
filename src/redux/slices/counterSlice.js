/* 
* Hem reducer'ı
* Hem aksiyonları hemde aksiyon tiplerini
* farklı dosyada oluşturmak yerine createSlice method 
* yardımıyla tek bir 
* noktada tanımlayacağız

? slice oluşturma
 * import { createSlice }
 * gerekli parametreleri tanımla
 - - name: slice ismi > string
 - - initialState: başlangıç state'i > object
 - - reducers: aksiyonların görevlerini tanımladığımız fonksiyonları
 */


import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: { count: 0, isDarkTheme: true },

    reducers: {
        increase: (state, action) => {
            state.count++;
            // klasik redux return {...state, count:state.count+1}
        },
        decrease: (state, action) => {
            state.count--;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
        toggleTheme: (state, action) => { //action kullanmadığımız için yazmasakta olur
            state.isDarkTheme = !state.isDarkTheme;
        }
    }
})

//counter slice'ın oluşturduğu reducer'ı store'da kullanmak için export  et
export default counterSlice.reducer;


//counterSlice ın oluşturduğu fonksiyonlarını bileşenlerde kullanmak için export et
export const { decrease, increase, setCount, toggleTheme } = counterSlice.actions;