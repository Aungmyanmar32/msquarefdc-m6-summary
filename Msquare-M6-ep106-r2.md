## MSquare Programing Fullstack Course
### Episode-*106* 
### Summary For `Room(2)`
## deploy project to vercel
### Project build test
- vercel မှာ deploy မလုပ်ခင် lacal မှာ next project ကို အရင် build လုပ်ကြည့်ပါမယ်
- အဆင်ပြေပြေ build လုပ်လို့ရမှ vercel မှာ deploy လုပ်မှာဖြစ်ပါတယ်
```console
npm run build
```
- command ကို run လိုက်ချိန်မှာ warning တစ်ချို့ တက်လာခဲ့ရင် fix မလုပ်လဲ ရပါတယ်
- error တက်လာပြီး **Build optimization failed** ဖြစ်ခဲ့ရင်တော့ error ကို သေချာဖတ်ပြီး fix ပေးရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132956837738721280/image.png)
- terminal မှာ ဒီလိုပြလာရင်တော့ build လုပ်တာ အောင်မြင်ပါတယ်
##
### Database setting
- လက်ရှိproject မှာ database ကို local မှာသာ setup လုပ်ထားပြီး internet ကို တင်တဲ့အခါကျရင် local database နဲ့ သုံးလို့မရတာမို့ render မှာ free ရနိုင်တဲ့ postgres database ကို သုံးပေးရမှာဖြစ်ပါတယ်
- render.com မှာ sign up လုပ်ပြီး postgres database တစ်ခု create လုပ်ပါ
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132959785457819720/image.png)
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132959879867416606/image.png)
- ပြီးရင် external database url ကို copy လုပ်ပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132960131420803112/image.png)
- table plus မှာ connection တစ်ခု လုပ်ပြီး ချိတ်ဆက်ပေးပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132960546342318120/image.png)
- .env ထဲမှာလည်း DATABASE_URL ကို update လုပ်ပေးရပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132966238163832872/image.png)
- ပြီးရင် အောက်ပါ command တွေကို တစ်ခုချင်းစီ run ပေးပါ
```console
npx prisma generate
```
```console
npx prisma db push
```
- အဲ့တာဆိုရင် render databse မှာ table တွေ တည်ေဆာက်ပေးသွားတာကို တွေ့ရမှာဖြစ်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132969258087878706/image.png)
- အကုန်အဆင်ပြေပြီးဆိုရင် .env file ကို .gitignore ထဲထည့်ပေးလိုက်ပါမယ်
- ဒါဆိုရင် project မှာ ပြောင်းလဲထားတာတွေကို commit လုပ်ပြီး github repo မှာ push လုပ်ပေးထားပါ
##

### connect GitHub with vercel 
- https://vercel.com/login ကို သွားပါ။
- containue with Github ကိုနှိပ်ပါ
- Authorize Vercel ကို ရွေးပေးပါ

![enter image description here](https://raw.githubusercontent.com/Aungmyanmar32/msquare-fullstack-m2/main/vercel1.png)

- ပြီးရင် မိမိရဲ့ profile ကို နှိပ်ပါ
- create new project
- install vercelလို့ ပြလာရင် Install ကိုနှိပ်ပေးပါ။

![enter image description here](https://raw.githubusercontent.com/Aungmyanmar32/msquare-fullstack-m2/main/vercel2.png)

### ADD New --> Project
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132957895688994956/image.png)
- Deploy လုပ်ချင်တဲ့ repo ကို ရွေးပေးပါ
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132989926728794212/image.png)
- bulid command မှာ `prisma generate && next build` လို့ overwrite လုပ်ပြီး deploy လုပ်လိုက်ပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132990342971543624/image.png)
- deploy လုပ်တာကို ပြီးအောင်ေစာင့်ပေးပါ
- အောက်ကလို ပြပေးလာရင် deploy လုပ်တာအောင်မြင်ပါပြီး
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132991054577143959/image.png)
##
### Add vercel envroment 
- မိမိရဲ့ vercel app domain ကို copy လုပ်ပေးထားပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132991871971512420/image.png)
- project --> setting အောက်က Environment Variables ထဲကို ၀င်ပါ
- local မှာရှိတဲ့ env ထဲက တန်ဖိုးတွေကို ထည့်ပေးရမှာဖြစ်ပါတယ်၏
- localhost:3000 နေရာမှာ vercel app domain ကို အစားထိုးထည့်ပေးရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132992269159518259/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132994070239789137/image.png)
- လိုအပ်တဲ့ env တွေ ထည့်ပြီးပြီ ဆိုရင် save လုပ်ပြီး redploy ပြန်လုပ်ပေးပါ။

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132994628010901614/image.png)
##
### Change Next auth link at google console
- [https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials) မှာ ## Authorized redirect URIs ကို မိမိရဲ့ vercel app domain နဲ့ ပြောင်းထည့်ပြီး update လုပ်ပေးရပါမယ်
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1132997047595847690/image.png)
- အခု app ကို စမ်းသပ်ကြည့်လို့ရပါပြီး 
- မိမိ vercel app domain နဲ့ ၀င်ပြီး /backoffice ကို ထပ်၀င်ကြည့်ပါက local project မှာ setup လုပ်ထားတဲ့အတိုင်း အဆင်ပြေပြေ အလုပ်လုပ်နေတာကို မြင်ရမှာဖြစ်ပါတယ်။

