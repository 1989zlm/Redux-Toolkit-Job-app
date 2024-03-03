import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";


const initialState = {
    tasks: [

        {
            "title": "react kutuphanesini ekle",
            "author": "özlem",
            "assigned_to": "sen",
            "end_date": "2024-03-29",
            "id": "5f3df3ca-ee40-4078-8016-c2adde9e9e3e"
        },
        {
            "title": "footer ı güncelle",
            "author": "özlem",
            "assigned_to": "abdullah",
            "end_date": "2024-03-13",
            "id": "b45d6789-bd9d-48a8-8a3d-d95f3d79190e"
        }

    ],
}

const crudSlice = createSlice({


    name: 'crud',
    initialState,//initialState:tasks[] bu şekildeyken yukarı taşıdık kod kalabalığı olmasın diye.
    reducers: {
        addTask: (state, action) => {
            // a) todoya id ekle
            action.payload.id = v4();//! açıklama aşağıda
            //b) veriyi taskların arasına ekle
            //?toolkit nesne içerisindeki veriyi doğrudan değiştirme izni veriyor bunun için unshift ve push gibi fonksiyonlar kullanılır
            //classıc redux izin vermıyordu bu yuzden return ile guncelleme yapıyoduk return {...state, tasks:state.tasks.concat(payload.action)} şeklinde...
            state.tasks.push(action.payload)
            //bu doğrudan gğncelleme işlemden sonra crudpage gidip stora abone oluyoruz.

        },

        deleteTask: (state, action) => {
            //id'si payload ile gelen elemanı diziden kaldır.çnceden filter ile yapardık ama toolkit bize doğrudan erişim izni veriyor
            //!1.yontem: 
            // const filtred = state.tasks.filter((task) => task.id !== action.payload);
            // state.tasks = filtred;
            //!2.yöntem(slipce) redux toolkitte splice ile idsini bildiğimiz elemanı sileriz.bunun içinde splice bizden iki değer istiyor biri silinecek olan elamnın sırası, ikincisi ise kaçtane eleman silineceği.. bizim id miz var ama sırası dinamik olmalı buyuzden silinecek olan elemanın sırasını bulmalıyız (state içerisindeki tasklerın finindex herbiri item olan itemi idisine eşit olan actionpayloadı bulucaz)
            //silinecek olan elemanın sırasını bul
            const index = state.tasks.findIndex((i) => i.id === action.payload);
            //diziden elemanı kaldır.burada iki parametre girdik bu silme işlemidir.
            state.tasks.splice(index, 1);

        },
        //? klisik reduxta güncel verilerine sahip olduğumuz elemanın dizideki halini gğncelleme işini map ile yapardık.. ama toolkitte bize direk olarak güncellme izni veriliyor bu yüzden map yerine splice kullanıyoruz.
        editTask: (state, action) => {
            //burada silmeden farklı bir işlme olarak sadece action payload ekledik buda günceleleme yapar.Eğer silme parametresindeki 1' in yerine 0 yazarsak yeni eleman ekleme işlemi yapar splice çok amaçlıdır.
            //güncel verilerine sahip olduğuumuz elemanın dizideki halini güncelleme
            const index = state.tasks.findIndex((i) => i.id === action.payload.id)
            //?bu işlemden sonra crudpage sayfasına geçiyoruz 

            // elemanı güncelle
            state.tasks.splice(index, 1, action.payload);
        }

    }

})
//reduucar'ı stora tanıtmak için export et
export default crudSlice.reducer;

//aksiyonları kullanmak içinde export et
export const { addTask, deleteTask, editTask } = crudSlice.actions;

//! formu dolduurup gönder butonuna bastıktan sonra devtools eklentsindeki controlden verinin doğru bir şekilde crudSlice içindeki action bölümüne ulaştığını anlayabiliyoruz

//! burada yapmamız gerekn aldığımız bu action değerlerine bir id değeri atamak atama yapıldıktan sonrada veriyi diğer taskslerin arasına eklemek

//! id değerini unic id sitesinden ekleyeceğimiz için npm i uuid terminalde indiriyoruz ve bu sayfaya {v4} fonksiyonunu import ediyoruz
