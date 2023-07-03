## MSquare Programing Fullstack Course
### Episode-*97* 
### Summary For `Room(2)` 
## Prisma 
### Introduction 
- prisma ဆိုတာ backend server နဲ့ database ကို ကြားခံစက်သွယ်ပေးတဲ့ node module တစ်ခုဖြစ်ပါတယ်
- NextJS မှာ ဆိုရင်တော့ next api နဲ့ database ကို ချိတ်ဆက်ပေးပါတယ်
- **O**bject **R**elational **M**apper ဖြစ်တာမလို့ database နဲ့ ချိတ်ဆက်တဲ့အခါ sql query တွေ ရေးစရာမလိုပဲ object ပုံစံ နဲ့ ရေးလို့ရပါတယ်။ ကျနော်တို့ ရေးလိုက်တဲ့ code တွေကို PRISMA က sql အဖြစ် သူ့ဘာသူ migrate လုပ်ပြီး database နဲ့ ချိတ်ဆက်ပေးမှာဖြစ်ပါတယ်

![enter image description here](https://github.com/Aungmyanmar32/msquarefdc-m6-summary/blob/main/prisma.png?raw=true)
- prisma ကို nextJS / postgres sql နဲ့ပဲ သုံးလို့ ရတာမဟုတ်ပဲ အခြား framework / database တွေ နဲ့လည်း ချိတ်ဆက်ရာမှာ သုံးလို့ရပါတယ်

![enter image description here](https://camo.githubusercontent.com/fcd334fbf1845e89c837cce8327332126bb2c1c516f3efbd7cd38e215d3bd32d/68747470733a2f2f692e696d6775722e636f6d2f5167774469654f2e706e67)
##
### Setup prisma in nextJS project
- vs code မှာ project folder ကို ဖွင့်ပြီး terminal ကို ထပ်ဖွင့်ပါ
```js
npm i prisma
```
- install လုပ်ပြီးရင် init ထပ်လုပ်ပေးရပါမယ်
```js
npx prisma init
```
- init လုပ်ပြီးတဲ့ အခါ project ထဲမှာ prisma folder တစ်ခု ရလာမှာဖြစ်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074204233588543560/1125368750003212329/prisma2.png)



##
### Create table in database with Prisma
- prisma ကို သုံးပြီး table တွေ create လုပ်တဲ့အခါ prisma folder အောက်မှာရှိတဲ့ schema.prisma file ထဲမှာပဲ code တွေ ရေးပေးရမှာဖြစ်ပါတယ်
- ခု id , name စတာတွေ ပါတဲ့ user table တစ်ခု စမ်းလုပ်ကြည့်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125370932110839899/image.png)

- model User ဆိုတာက User table တစ်ခု လုပ်လိုက်တာဖြစ်ပါတယ်
- id က column name ဖြစ်ပြီး 
- Int က integer type လို့ သတ်မှတ်လိုက်တာပါ
- @id ဆိုတာက sql မှာ Primary key လို့ သတ်မှတ်ပေးတာနဲ့ တူပါတယ်
- @default(autoincrement()) ဆိုတာက sql မှာ serial လို့ သတ်မှတ်ပေးတာနဲ့ တူပြီး row တစ်ခု ၀င်လာတိုင်း Id တန်ဖိုးကို တစ် တိုးပေး သွားမှာ ဖြစ်ပါတယ်
- name string ကတော့ string တွေထည့်လို့ရမယ့် name column ဖြစ်ပါတယ်
### table တစ်ခု create or Update လုပ်ပြီးရင် database မှာ migrate လုပ်ပေးရပါမယ်
```
npx prisma migrate dev --name added user table
```
 - `--name `နောက်မှာ ကြိုက်တာရေးလို့ရပါတယ်
 - 
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125374289420484689/image.png)
- migration လုပ်လိုက်တာနဲ့ prisma folder အောက်မှာ migrations folder တစ်ခု ပေါ်လာမှာ ဖြစ်ပြီး အဲ့ဒီ folder အောက်မှာ migrate လုပ်လိုက်တဲ့ အချိန်နဲ့ migration file တစ်ခု ရှိနေမှာဖြစ်ပြီး ဖွင့်ကြည့်လိုက်ပါက sql တွေ နဲ့ prisma က ပြောင်းထားတာကို မြင်ရမှာ ဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074204233588543560/1125388053364625428/image.png)
 - ခု လုပ်လိုက်တဲ့ user table database မှာ ရမရ ကြည့်နိုင်ဖို့ table plus ကို သုံးပြီး ကြည့်လို့ရသလို prisma studio နဲ့ လည်း ကြည့်လို့ရပါတယ်

```
npx prisma studio
```
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125375198602989628/image.png)
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125375434922672241/image.png)

## Joining tabale ( relation)
- prisma နဲ့ table နှစ်ခုကို join ကြည့်ပါမယ်
- လောလောဆယ် table တစ်ခုပဲ ရှိသေးတာမလို့ နောက်ထပ် table တစ်ခု ထပ်လုပ်လိုက်ပါမယ်

```js
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User{
  id Int @id @default(autoincrement())
  name String
}

model Post{
  id Int @id @default(autoincrement())
  title String
  content String?
}
```
- Post ဆိုတဲ့ table တစ်ခု create လုပ်လိုက်ပါတယ်
- User တစ်ယောက် က Post တွေ အများကြီး တင်နိုင်တယ် ဆိုပါစို့
- ကျနော်တို့ က User table နဲ့  Post table ကို ချိတ်ဆက်တဲ့ အခါ User table ထဲမှာ Post တွေ အရင်ချိတ်လိုက်ပါမယ်
```js
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User{
  id Int @id @default(autoincrement())
  name String
  posts Post[]
}

model Post{
  id Int @id @default(autoincrement())
  title String
  content String?
}

```
- ရှင်းလင်းချက်
```js
model User{
  id Int @id @default(autoincrement())
  name String
  posts Post[]
}
```
- User table ထဲမှာ posts ဆိုတဲ့ column ကို Post array type အဖြစ် ထည့်လိုက်ပါတယ်
- ဆက်ပြီး Post table ထဲမှာလည်း User table နဲ့ realtion လုပ်ပေးရပါမယ်

```js
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User{
  id Int @id @default(autoincrement())
  name String
  posts Post[]
}

model Post{
  id Int @id @default(autoincrement())
  title String
  content String?
  author  User  @relation(fields: [authorId],references: [id])
  authorId  Int
}

```
- ရှင်းလင်းချက်
```js
model Post{
  id Int @id @default(autoincrement())
  title String
  content String?
  author  User  @relation(fields: [authorId],references: [id])
  authorId  Int
}

```
- Post table ထဲမှာ author ဆိုတဲ့ column တစ်ခု လုပ်လိုက်ပြီး User table နဲ့  ချိတ်လိုက်ပါတယ်
- `@relation`  နဲ့ ချိတ်မယ့်ပုံစံ သတ်မှတ်လိုက်ပါတယ်
- relation ထဲမှာတော့ fields နဲ့ reference နှစ်ခု ရှိပြီး fields က အောက်က authorId ကို သတ်မှတ်လိုက်ပြီး reference အဖြစ် User table ထဲက id ကို ရည်ညွှန်းလိုက်ပါတယ် 
- fields အနေနဲ့ သတ်မှတ်ထားတဲ့ authorId column မှာတော့ integer type အဖြစ် သတ်မှတ်ပေးလိုက်ပါတယ်
- table နှစ်ခုကို join ြီးပြီဆိုတော့ migrate လုပ်ပေးရပါမယ်

```console
npx prisma migrate dev --name join User and Post table
```
- prisma studio မှာ သွားကြည့်လိုက်ပါက ခုလို ပြပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074204233588543560/1125389928281411584/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1074204233588543560/1125389851471134800/image.png)
