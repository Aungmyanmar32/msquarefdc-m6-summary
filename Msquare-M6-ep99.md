﻿## MSquare Programing Fullstack Course
### Episode-*99* 
### Summary For `Room(2)` 
## Redux toolkit
### What is redux ?
- redux ဆိုတာ reactJS မှာ state တွေ management လုပ်တဲ့အခါ ပိုမိုလွယ်ကူစေရန်သုံးတဲ့ package တစ်ခု ဖြစ်ပါတယ်
- app တွေ က complex ဖြစ်လာတဲ့အခါ context နဲ့ state management လုပ်ရတာ ရှုပ်ထွေးလာပြီး အဆင်မပြေ ဖြစ်လာတက်ပါတယ်
- အဲ့ဒီအခါကျရင် redux ကို သုံးပြီး management လုပ်ရင် အဆင်ပြေပြေ နဲ့ အလုပ်လုပ်နိုင်မှာဖြစ်ပါတယ်
### Redux data flow ( one way data flow)
![enter image description here](https://www.freecodecamp.org/news/content/images/2022/06/2.png)
- redux မှာ state တွေကို store ထဲမှာ reducer ထဲ slice  တွေ အနေနဲ့ သိမ်းထားလေ့ရှိပါတယ်
- state တွေကို update လုပ်တဲ့အခါ store ထဲကို တစ်ခါတည်း update လုပ်ပေးမှာမဟုတ်ပဲ
 သက်ဆိုင်ရာ action ( slice ထဲမှာ သတ်မှတ်ထားသော action) ကို အရင် ဆက်သွယ်လိုက်( dispatch) ပါတယ်
 - အဲ့ဒီ action တွေမှတစ်ဆင့် reducer တွေနဲ့ ချိတ်ဆက်ပြီး store ထဲက သက်ဆိုင်ရာ state ကို update လုပ်ပေးကာ ရလာတဲ့ result ကို subscribe လုပ်ထားတဲ့ UI ဆီမှာ ပြန်ပို့ပေးတာဖြစ်ပါတယ်

![enter image description here](https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)
##
### Redux tookit
- redux toolkit ကတော့ အထက်ပါ ရှင်းပြထားတဲ့ redux ကို ပိုမိုလွယ်ကူအောင် လုပ်ထားပေးတဲ့ package တစ်ခုပဲ ဖြစ်ပါတယ်
### Store
- ***Store*** ဆိုတာ data တွေ ကို သိမ်းထားတဲ့နေရာလို မှတ်ယူနိုင်ပါတယ်
  - store ထဲမှာ state တွေကို reducer ထဲမှာ သက်ဆိုင်ရာ အကန့်တွေ နဲ့ ( slice ) လုပ်ပြီး reducer အဖြစ် သိမ်းထားလေ့ရှိပါတယ်
  - ဥပမာ ။    ။ menu အတွက် state တွေကို menuSlice ဆိုတဲ့ slice တစ်ခုလုပ်ပြီး သိမ်းထားတာမျိုးပါ
  - addon အတွက် ဆိုလဲ addonSlice တစ်ခု သပ်သပ် ထပ်လုပ်ပြီး သိမ်းထားမယ်ပေါ့
  - အဲ့ဒီ slice တွေ ထဲမှာမှ action တွေ သတ်မှတ်ပြီး reducer ကို ချိတ်ဆက်ကာ state ကို Update လုပ်ပြီး store ထဲမှာ သိမ်းပေးမှာဖြစ်ပါတယ်
  - slice တွေ ထဲမှာမှ action တွေ သတ်မှတ်ပြီး state ကို update လုပ်ကာ store ထဲမှာ သိမ်းပေးမှာဖြစ်ပါတယ်
  - slice တစ်ခု အောက်ပါအတိုင်း create လုပ်ပေးရပါမယ်
```js
 const sliceName = createSlice({
    name,
    initialState,
    reducers : { 
    actions-name :(state,payload)=>{....}
    }
  })
```
- react-redux ထဲက createSlice function ကို သုံးပြီး slice တစ်ခုကို create လုပ်လို့ရပါတယ်
- createSlice function မှာ object parameter တစ်ခု လက်ခံပါတယ်
- အဲ့ဒီ object ထဲမှာတော့ 
    - **name** ( slice name 0r type) slice အတွက် နာမည်
    - **initialState**  မူလ အခြေအနေ
    - **reducers** ( actions  )  လုပ်ဆောင်ချက်တွေ ပါတဲ့ object
 - စတာတွေ ပါပါတယ်
 - action တွေ မှာလည်း parameter နှစ်ခု လက်ခံပါတယ်
 - ပထမ parameter က state ထဲက vlaue တွေ ဖြစ်ပြီး ဒုတိယ parameter က action တွေကို dispatch လုပ်တဲ့အခါ ၀င်လာမယ့် data ( payload ) တွေ ဖြစ်ပါတယ်

## Setup redux toolkit in NextJS project
- next js project မှာ redux toolkit ကို အသုံးပြုနိုင်ဖို့ react-redux နဲ့ reduxjs/toolkit ကို ထည့်ပေးရပါမယ်
```console
npm i react-redux @reduxjs/toolkit
```
- redux toolkit ကို စသုံးနိုင်ရန် store တစ်ခုကို create လုပ်ပေးရပါမယ်
- src အောက်မှာ store folder တစ်ခု လုပ်ပြီး index.ts ဖိုင်တစ်ခုလုပ်ပါမယ်

```js
import { configureStore } from "@reduxjs/toolkit";

// ...

export const store = configureStore({
  reducer: {
    
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```
- @reduxjs/toolkit ထဲက configureStore ကို အသုံးပြုပြီး store တစ်ခု လုပ်လိုက်ပါတယ်
- configureStore function မှာ parameter အနေနဲ့ object တစ်ခု လက်ခံပြီး အဲ့ဒီ object ထဲမှာ reducer ဆိုတဲ့ property နဲ့ slice တွေကို ထည့်ပေးရမှာဖြစ်ပါတယ်
- အောက်ဆုံးမှာေတာ့ RootState နဲ့ AppDispatch  ဆိုတဲ့ type နှစ်ခုကို export လုပ်ထားပါတယ်
- redux store တစ်ခု ကို အတက်ပါအတိုင်း တည်ဆောက်ပေးရမှာဖြစ်ပါတယ်
- ပြီးရင် ခုသတ်မှတ်ထားတဲ့ store ကို App တစ်လုံးမှာ သုံးလို့ရအောင် redux provider နဲ့  pages folder အောက်က `_app.tsx` မှာ wrap လုပ်ပေးရမှာဖြစ်ပါတယ်

```js
// src/pages/_app.tsx

import { store } from "@/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

```
- return ထဲမှာ ရှိေနတဲ့ `<Component {...pageProps} />` ကို react-redux ထဲက Provider နဲ့ wrap လုပ်ပေးထားတာဖြစ်ပြီး store props အနေနဲ့ redux store ကို ထည့်ပေးထားလိုက်တာဖြစ်ပါတယ်
- context ကို သုံးတဲ့အခါ context provider နဲ့ wrap လုပ်ပေးရတဲ့ ပုံစံမျိုးပါပဲ
##
### ခု redux toolkit ကို သုံးပြီး counter app တစ်ခု လုပ်ကြည့်ပါမယ်
- counter app အတွက် counter slice တစ်ခု လုပ်ပါမယ်
- store folder အောက်မှာ slice တွေ ထားမယ့် slices folder တစ်ခု လုပ်ပြီး အဲ့ဒီထဲမှာ counterSlice.ts ဖိုင်တစ်ခု လုပ်ပါမယ်

```js
//src / store / slices / counterSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface CounterState {
  isLoading: boolean;
  value: number;
  data: any;
}

// Define the initial state using that type
const initialState: CounterState = {
  isLoading: false,
  value: 0,
  data: {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;

```
- counterSlice ဆိုတဲ့ slice တစ်ခုလုပ်ထားပြီး
- name ကို counter
- initialState ကို အပေါ်မှာ သတ်မှတ်ထားတဲ့ initialState 
- reducers ထဲမှာတော့ တစ်တိုး / တစ်လျော့တဲ့ action နှစ်ခုသတ်မှတ်ထားပါတယ်
- အောက်မှာတော့ action နှစ်ခုကို export လုပ်ထားပါတယ်
- ထပ်ပြီး selectCount  ဆိုပြီးတော့ state ထဲက value ကို export လုပ်ထားပါတယ်
- ေနာက်ဆုံးမှာတော့ counterSlice ထဲက reducer ကို export လုပ်ထားလိုက်ပါတယ်
##
### Get and Update data from store
- store ထဲမှာ သိမ်းထားတဲ့ state က data တွေ ရယူနိုင်ဖို့  redux က useSelector hook ကို အသုံးပြုနိုင်ပါတယ်
- store ထဲမှာ သိမ်းထားတဲ့ state က data တွေကို update လုပ်နိုင်ဖို့ useDispatch hook ကို အသုံးပြုပေးရမှာဖြစ်ပါတယ်
- အထက်ပါ hook တွေကို သူ့အတိုင်း တိုက်ရိုက်သုံးလို့ရပါတယ်
- ဒါပေမယ့် လက်ရှိ project က typescript နဲ့ ရေးနေတာမလို့   အထက်ပါ hook တွေကို သူ့အတိုင်း တိုက်ရိုက်သုံးတဲ့အခါ type error တွေ တက်နိုင်တာမလို့  အထက်ပါ hook တွေကို type လုပ်ပေးထားတဲ့ custom hook တွေ လုပ်ပြီး အသုံးပြုမှာဖြစ်ပါတယ်
- store folder အောက်မှာ hooks.ts ဖိုင်တစ်ခု လုပ်ပြီး custom hook တွေ လုပ် လိုက်ပါမယ်

```js
// store / hooks.ts

import  type { TypedUseSelectorHook } from  "react-redux";

import { useDispatch, useSelector } from  "react-redux";

import  type { AppDispatch, RootState } from  "./";

  

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export  const  useAppDispatch: () =>  AppDispatch  =  useDispatch;

export  const  useAppSelector:  TypedUseSelectorHook<RootState> =  useSelector;
```
- useAppDispatch ဆိုတဲ့ hook တစ်ခု လုပ်ထားပါတယ်။ react-redux က useDispatch hook ကိုပဲ type လုပ်ပေးပြီး useAppDispatch hook အနေနဲ့ export လုပ်ထားတာပဲ ဖြစ်ပါတယ်
- နောက်ထပ် useAppSelector ဆိုတဲ့ hook တစ်ခု လုပ်ထားပါတယ်။ react-redux က useSelectorhook ကိုပဲ type လုပ်ပေးပြီး useAppSelector hook အနေနဲ့ export လုပ်ထားတာပဲ ဖြစ်ပါတယ်
- store ထဲက state တွေကို update လုပ် ချင်ရင် useAppDispatch  ကို သုံးမှာဖြစ်ပြီး
- store ထဲက data တွေကို လို ချင်ရင် useAppSelector ကို သုံးမှာဖြစ်ပါတယ်
##
### Demo conter app
- ခု redux store ထဲက data တွေ သုံးပြီး counter app တစ်ခု လုပ်ကြည့်ပါမယ်
- pages folder အောက်မှာ ***reduxTest*** folder တစ်ခု လုပ်ပြီး index.tsx ဖိုင်တစ်ခု သတ်မှတ်ပါမယ်
```js

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decrement, increment } from "@/store/slices/counterSlice";
import { Button } from "@mui/material";
import React from "react";

const ReduxConcepts = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <Button variant="contained" onClick={() => dispatch(increment())}>
        +
      </Button>
      <Button variant="contained" onClick={() => dispatch(decrement())}>
        -
      </Button>
    </div>
  );
};

export default ReduxConcepts;
```
- ReduxConcepts ဆိုတဲ့ component တစ်ခု လုပ်ထားပါတယ်
- useAppSelector ကို သုံးပြီး store ထဲက counter state မှာ ရှိတဲ့ value ကို counter ဆိုပြီး လှမ်းယူလိုက်ပါတယ်
- useAppDispatch hook ကိုလည်း လှမ်းယူသုံးထားပြီး dispatch ဆိုပြီး လုပ်ထားပါတယ်
- UI မှာ store ထဲက counter state မှာ ရှိတဲ့ value ကို ပြပေးထားပြီး 
- button နှစ်ခုလည်း ပြပေးထားလိုက်ပါတယ်
-  `+` button ကို နှိပ်လိုက်ရင် counterSlice ထဲက increment action ကို dispatch လုပ်လိုက်မှာဖြစ်ပြီး အဲ့ဒီ action ထဲမှာ state ထဲက value ကို တစ်တိုးထားတာမလို့ reducer က store ထဲက counter state ထဲမှာ ရှိတဲ့ value ကို update လုပ်ပေပြီး `တစ်တိုးပေး` မှာဖြစ်ပါတယ်
-  `-` button ကို နှိပ်လိုက်ရင် counterSlice ထဲက decrement action ကို dispatch လုပ်လိုက်မှာဖြစ်ပြီး အဲ့ဒီ action ထဲမှာ state ထဲက value ကို တစ်လျော့ထားတာမလို့ reducer က store ထဲက counter state ထဲမှာ ရှိတဲ့ value ကို update လုပ်ပေပြီး `တစ်လျော့ပေး` မှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128666144753065994/image.png)

##
### Using payload parameter in action
- အထက်မှာ ပြထားတဲ့ counter app မှာ  + button ကို နှိပ်လိုက်ရင် တစ် ပေါင်း ပေးသွားပါတယ်
- အကယ်လို့  + ကို နှိပ်လိုက်ချိန်မှာ 10 တိုးချင်တယ် ဆိုပါစို့ 
- အဲ့ဒီအချိန်မှာ counter slice ထဲက  increment action မှာ ဒုတိယ parameter အနေနဲ့  data ( payload) ကို လက်ခံပြီး အောက်ပါအတိုင်း ရေးပေးလို့ရပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128668711394496512/image.png)
- ဒုတိယ parameter အနေနဲ့ action ဆိုတာကို လက်ခံထားပြီး state ထဲက value ကို အရင်ကလို တစ် ပဲ မပေါင်းတော့ပဲ action parameter  အနေနဲ့  ၀င်လာမယ့် data ထဲက payload ကို ထပ်ပေါင်းပေးလိုက်တာဖြစ်ပါတယ်
- increment action ကို သုံးတဲ့အခါမှာလည်း  parameter တစ်ခု ထည့်ပေးရမှာဖြစ်ပြီး အဲ့ဒီ ထည့်ပေးလိုက်တဲ့ parameter က increment action မှာ payload အနေနဲ့ ၀င်သွားမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128671649806417930/image.png)
- ဆိုလိုတဲ့ သဘောက increment action ကို dispatch လုပ်တဲ့ အခါ  parameter အနေနဲ့ 10 ထည့်ပေးလိုက်ရင် + ကို နှိပ်လိုက်တဲ့အခါ  တစ်ခါနှိပ်လိုက်တိုင်း 10 တိုးပေးသွားမှာဖြစ်ပါတယ်

##
### slice တွေထဲမှာ async ဖြစ်တဲ့ action တွေကို သုံးချင်ရင် အတက်မှာ ပြထားတဲ့ increment action တွေလို သတ်မှတ်လို့မရပဲ `createAsyncThunk` ကို သုံးပေးရမှာဖြစ်ပါတယ်
- နမူနာအနေနဲ့ 
- counterSlice ထဲက initialState ရှိ data မှာ API က data တွေ လှမ်းယူပြီး update လုပ်ချင်တယ် ဆိုပါစို့
- အဲ့ဒီအခါမှ tunk action  တစ်ခု သပ်သပ်သတ်မှတ်ပေးရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128675983596212335/image.png)

- fake store api ကနေ product တစ်ခုကို fetch လုပ်ပြီး return လုပ်ထားတာပဲဖြစ်ပါတယ်

- အဲ့ဒီ  tunk function  ကို counterSlice ထဲက actions တွေ ရှိတဲ့ reducers object မှာ ထည့်မသုံးပဲ နောက်ထပ် extraReducers ထဲမှာ သတ်မှတ်ပေးရမှာ ဖြစ်ပါတယ်
### extraReducers syntax for tunk action
```js
  extraReducers(builder) {
    builder.addCase(tank-function-codition , ( ) => { });
  }
```
-  extraReducers မှာ builder ဆိုတဲ့ parameter တစ်ခု လက်ခံထားပြီး action တွေ သတ်မှတ်တဲ့အခါ   `builder.addCase()`  နဲ့ သတ်မှတ်ပေးရမှာဖြစ်ပါတယ်
- `builder.addCase()` မှာ parameter နှစ်ခု လက်ခံပြီး 
- ပထမ parameter အနေနဲ့ tunk function ရဲ့  အခြေအနေ ကို ထည့်ပေးရမှာဖြစ်ပြီး 
- ဒုတိယ parameter အနေနဲ့  callback function ( action) ကို လက်ခံမှာဖြစ်ပါတယ်
- ခု အပေါ်မှာ သတ်မှတ်ထားတဲ့ fetchConetnt ( tunk function) ကို သုံးပြီး  action တွေ သတ်မှတ်ကြရအောင်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128903964801388615/image.png)
- counterSlice ထဲမှာ extraReducers တစ်ခု ထပ်ထည့်လိုက်ပါတယ်
- `builder.addCase` မှာ fetchContent function က
-   + pending ဖြစ်နေတဲ့ အချိန် state ထဲက isLoading ကို true ပြောင်းပေးလိုက်ပါတယ်
-  + fulfilled ဖြစ်တဲ့အချိန်မှာတော့  isLoading ကို flase , ရလာတဲ့ data ကို state က data ရဲ့ တန်ဖိုး အဖြစ် update လုပ်ပေးလိုက်ပါတယ်
-  + rejected ဖြစ်ခဲ့ရင်တော့   isLoading ကို flase ပြန်ပြောင်းလိုက်တာဖြစ်ပါတယ်
##
### အခု COUNTER APP မှာ fetch data လုပ်လို့ရမယ့် button တစ်ခု ထပ်ထည့်ပြီး အတက်မှာ သတ်မှတ်ထားတဲ့ action ( tunk action) ကို စမ်းသုံးကြည့်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128906346708869252/image.png)
- UI မှာ ခလုတ်တစ်ခု တိုးလာမှာဖြစ်ပြီး  နှိပ်လိုက်ရင် fetch လုပ်လို့ရမယ့် action ကို dispatch လုပ်ထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128907390952165386/image.png)
- fetch data ကို နှိပ်ကြည့်လိုက်ပါက 
- ပထမ pending action ကို dispatch မှာဖြစ်ပြီး နောက်မှ fulfill or reject  action ကို dispatch လုပ်ပေးမှာဖြစ်ပါတယ်
- fulfilled ဖြစ်ခဲ့ရင်တော့ counter state ထဲက data ကို update လုပ်ပေးသွားမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1128908862758584380/image.png)
