## MSquare Programing Fullstack Course
### Episode-*96* 
### Summary For `Room(2)` 
## NextJs
### Introduction 
- NextJS ဆိုတာ **react framework** တစ်ခု ဖြစ်ပါတယ်
- **Fullstack web framework** ဖြစ်တာမလို့ frontend ရော backend ပါ တွဲရေးလို့ရပါတယ်
- **file system routing** စနစ်ဖြစ်ပါတယ်။ ဆိုလိုတာက route ကို react မှာလို သီးသန့်သတ်မှတ်ပေးစရာမလိုပဲ folder တစ်ခု လုပ်လိုက်ရင် အဲ့ဒီ folder name နဲ့ route တစ်ခု ရလာမှာဖြစ်ပါတယ်
- react မှာ component တွေကို စိတ်ကြိုက် folder ထဲ မှာ သတ်မှတ်ပြီး လုပ်လို့ရပေမယ့် **NextJS မှာတော့ သတ်မှတ်ထားတဲ့ folder အောက်မှာပဲ ရေးပေးရမှာဖြစ်ပြီး သတ်မှတ်ထားတဲ့ file name အတိုင်း ရေးပေးရမှာဖြစ်ပါတယ်**။ ဥပမာအားဖြင့် frontend အတွက် ဆိုရင် pages folder အောက်မှာသာ ရေးပေးရမှာဖြစ်ပြီး backend အတွက် ဆိုရင် api folder အောက်မှာ ရေးပေးရမှာ ဖြစ်ပါတယ်
- **Development နဲ့ Production** environment ဆိုပြီး environment  နှစ်မျိုးရှိပါတယ်
  - Development environment ဆိုတာ app ကို ဖန်တီးနေချိန်ကို ( code ရေးနေချိန်, test လုပ်နေချိန်) ဆိုလိုပါတယ်
  - Production environment  ကတော့ app ကို internet ပေါ်မှာ publish (deploy) လုပ်ပြီး run နေချိန်လို့ အလွယ်မှတ်ယူနိုင်ပါတယ်

- NextJS က ရေးလိုက်တဲ့ app ကို build and deploy လုပ်တဲ့ အခါ compile , bundle , minify and code-split ဆိုပြီး လုပ်ဆောင်ချက်တွေ လုပ်ပေးပါတယ်
    -  **compile** ဆိုတာက .tsx .jsx .ts စတဲ့ code တွေကို html,css,js ရိုးရိုးတွေအဖြစ် browser( client)က ဖတ်လို့ရနိုင်အောင် ပြောင်းပေးတာပါ
![enter image description here](https://nextjs.org/static/images/learn/foundations/compiling.png)
    - အဲ့ဒီပြောင်းလိုက်တဲ့အခါမှာလည်း  ရှိရှိသမျှ code တွေအကုန် တစ်ဖိုင်ထဲမှာ စုပြုံပြီး လုပ်လိုက်တာ မဟုတ်ပဲ သက်ဆိုင်ရာ code တွေကို သူနဲ့သက်ဆိုင်တဲ့ နေရာ မှာ (**bundle** ) သိမ်းပေးတာတဲ့ လုပ်ဆောင်ချက်ပါ ရှိပါတယ် 
    - 
![enter image description here](https://nextjs.org/static/images/learn/foundations/bundling.png)
    - ဒါတင်မကဲ သိမ်းတဲ့ အခါမှာလည်း ကျစ်ကျစ်လစ်လစ်ဖြစ်အောင်  **minify**  လုပ်ပေးလိုက်ပါသေးတယ်။

![enter image description here](https://nextjs.org/static/images/learn/foundations/minifying.png)
    - code-split ဆိုတာက bundle လုပ်ပြီး သိမ်းတဲ့အခါ file တွေခွဲပြီး သိမ်းထားပေး'တာပါ

![enter image description here](https://nextjs.org/static/images/learn/foundations/code-splitting.png)
- NextJS မှာ **Server-Side Rendering**, **Static Site Generation**, **Client-Side Rendering** ဆိုပြီး render method သုံးမျိုးရှိပါတယ်။ [render လုပ်ပုံအကြောင်း ဒီမှာ အသေးစိတ်ဖတ်ပါ](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)
- နောက်ထပ် တစ်ခုက pre rendering လုပ်ဆောင်ချက်ဖြစ်ပါတယ်
- server မှာပဲ တစ်ခါတည်း render လုပ်ပြီးမှ  result client ကို ပို့ပေးလိုက်တာပါ
![enter image description here](https://nextjs.org/static/images/learn/foundations/client-side-rendering.png)

![enter image description here](https://nextjs.org/static/images/learn/foundations/pre-rendering.png)


## React *Vs* Next

![enter image description here](https://mobisoftinfotech.com/resources/wp-content/uploads/2022/05/next-js-vs-react-comparison.png)
Read more about react Vs next 
https://mobisoftinfotech.com/resources/blog/next-js-vs-react/

##
## Crate  next js project

- next js project တစ်ခု စလုပ်ဖို့ အောက်ပါ command ကို terminal ထဲမှာ run ပေး၇ပါမယ်

```console
npx create-next-app@latest
```
![enter image description here](https://cdn.discordapp.com/attachments/1074204233588543560/1124349581950451722/image.png)

- next project တစ်ခု create လုပ်ပြီးပြီး ဆိုပါက npm run dev နဲ့ app ကို run လို့ရပြီးဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1125048099421831308/image.png)
-  http://localhost:3000 မှာ next app ကို ပြပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1125048581187973240/image.png)

## 
### File system

![enter image description here](https://github.com/Aungmyanmar32/msquarefdc-m6-summary/blob/main/next-file.png?raw=true)
- Next js မှာ page တစ်ခုခုကို လုပ်မယ်ဆိုရင် pages folder အောက်မှာပဲ လုပ်ပေးရမှာဖြစ်ပါတယ်
- nextJs project တစ်ခု create လုပ်လိုက်တာနဲ့ ပါလာတဲ့ pages folder ကို အမည်ပြောင်းတာ လုပ်လို့မရပါဘူး။
- ဒါတင်မကပဲ pages folder အောက်က api folder ကိုလည်း အမည်မပြောင်းရပါ
- http://localhost:3000 ကို ၀င်လိုက်တာနဲ့ pages folder အောက်က index.tsx ကို render လုပ်ပြီး ပြပေးမှာ ဖြစ်ပါတယ်။
- ထပ်ပြီး ရှင်းပြရရင် next js မှာ pages folder က root route ဖြစ်ပြီး browser ကနေအဲ့ဒီ root route ထဲ ၀င်လာရင်  pages folder အောက်မှာရှိတဲ့ index.tsx ကို ပြပေးမှာဖြစ်ပါတယ်
- အကယ်လို့ pages folder အောက်မှာ users folder တစ်ခု ရှိတယ်ဆို့ပါစို့
- next js က file system routing စနစ်ဖြစ်တာမလို့ /users ဆိုတဲ့ route တစ်ခု ရှိလာမှာဖြစ်ပြီး း browser ကနေအဲ့ဒီ  /users ဆိုတဲ့ route ကို ၀င်လာခဲ့ပါက users folder ထဲမှာ index.tsx ဆိုတဲ့ ဖိုင်ကို ရှာပြီး ပြပေးမှာဖြစ်ပါတယ်။
- users folder အောက်မှာ index.tsx မရှိခဲ့ပါက ( အခြားမည်သည့်ဖိုင်တွေ ရှိနေပါစေ) 404 Not found ကိုပဲ ပြပေးမှာဖြစ်ပါတယ်

![ ](https://cdn.discordapp.com/attachments/1076154921562411008/1125057786800259172/image.png)
##

### Setup Foodie Pos next app

![enter image description here](https://github.com/Aungmyanmar32/msquarefdc-m6-summary/blob/main/foodienext.png?raw=true)
- root route နဲ့ ၀င်လာရင် pages folder အောက်က index.tsx ကို welcome page အနေနဲ့ ပြပေးမှာဖြစ်ပြီး
- backoffice နဲ့ orders route တွေသပ်သပ်စီခွဲပြီး ပြပေးမှာဖြစ်ပါတယ်
- backoffice တော့ လက်ရှိ ပြုလုပ်နေတဲ့ component တွေကို ထည့်ထားပေးမှာဖြစ်ပြီး
- order app ကိုတော့ backoffice app ready ဖြစ်တဲ့အချိန်မှာ ဆက်ပြီး create လုပ်သွားမှာဖြစ်ပါတယ်
- အရင်ဆုံး pages folder အောက်မှာ backoffice နဲ့ orders ဆိုပြီး folder နှစ်ခု create လုပ်လိုက်ပါမယ်
- ပြီးရင် အဲ့ဒီ folder တွေအောက်မှာ index.tsx ဖိုင် ထပ်လုပ်လိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1125082649380270191/image.png)
```js
// src/pages/backoffice/index.tsx

import React from "react";

const BackOffice = () => {
  return <div>BackOffice</div>;
};

export default BackOffice;

```

```js
// src/pages/orders/index.tsx

import React from "react";

const OrderApp= () => {
  return <div>OrderApp</div>;
};

export default OrderApp;

```

## 
### ဆက်ပြီး pages folder အောက်က index.ts မှာလဲ ပါလာတဲ့ code တွေ ဖျက်ပြီး အသစ်ပြန်ရေးလိုက်ပါမယ်
```js
// src/pages/index.tsx

import React from "react";

const Welcome= () => {
   return (
    <div>
      <h1>Welcome to Foodie POS</h1>
      <h3>The best morden POS software for Restaurent </h3>
    </div>
  );
};

export default Welcome;

```
##
- style folder အောက်က globle.css ကိုလဲ အသုံးမပြုချင်တာမလို့ ဖျက်လိုက်ပါမယ်
-  globle.css ကို import လုပ်သုံးတာတဲ့ _app.tsx မှာလည်း ဖြုတ်ပေးလိုက်ပါမယ်
```js
// src/pages/_app.tsx

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

```
##
### ခု browser မှာ သွားစမ်းကြည့်ပါမယ်

![enter image description here](https://github.com/Aungmyanmar32/msquarefdc-m6-summary/blob/main/ETS.png?raw=true)
