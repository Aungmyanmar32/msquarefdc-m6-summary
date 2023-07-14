## MSquare Programing Fullstack Course
### Episode-*99* 
### Summary For `Room(2)` 
## setup table in database with prisma
- ဒီနေ့သင်ခန်းစာမှာတော့ database မှာ လိုအပ်တဲ့ table တွေကို setup လုပ်မှာဖြစ်ပါတယ်
- အရင် react project မှာ သုံးခဲ့တဲ့ database မှာလိုပဲ table တွေ လုပ်ပေးရမှာဖြစ်ပါတယ်

## create company table
```js
model Company {
  id         Int      @id @default(autoincrement())
  name       String
  isArchived Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt

}
```
- project အသစ်မှာ table တစ်ခု create လုပ်တိုင်း isArchived, createdAt  , updatedAt  column တွေကို ထည့်ပေးမှာဖြစ်ပါတယ်
- `createdAt  DateTime @default(now())` မှာ createdAt က    column name ဖြစ်ပြီး DateTime type ဖြစ်ပါတယ်။ default အနေနဲ့  create လုပ်တဲ့အချိန်ကို ထည့်ပေးထားတာဖြစ်ပါတယ်

### Create user table
```js
model Users {
  id         Int      @id @default(autoincrement())
  name       String?
  email      String   @unique
  companyId  Int
  company    Company  @relation(fields: [companyId], references: [id])
  isArchived Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt
}
```
- Users table ထဲမှာ company id ကို fk အနေနဲ့ ချိတ်ဆက်ထားပါတယ်
- company table ထဲမှာလည်း user တွေ နဲ့ ချိတ်ဆက်ပေးရဦးမယ် ( prisma နဲ့ table တွေ relation လုပ်နည်းကို အရင်သင်ခန်းစာတွေ မှာ ကြည့်ပါ)
- အဲ့ဒီလို ချိတ်ဆက်တဲ့အခါမှာ menual ရေးပြီး ချိတ်ဆက်လို့ရသလို `npx prisma format`  command ကို သုံးပြီး auto ချိတ်ဆက်ခိုင်းလို့ရပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1129325850458849341/image.png)
- ပြီးရင် database မှာ update လုပ်မှာ ဖြစ်ပါတယ်
- ပထမအကြီမ် update လုပ်မှာမလို့ `npx prisma db push`  commmand ကို သုံးလိုက်ပါမယ်
- `npx prisma db push`  commmand ကို ပထမအကြိမ် setup လုပ်တဲ့အချိန်မှာသာ သုံးပေးရမှာဖြစ် ပြီး နောက်ထပ် update လုပ်မယ်ဆိုရင် `npx prisma db push` ကို အသုံးပြုပါက data တွေ ပျက်နိုင်တဲ့ error ရှိနိုင်တာမလို့ `npx prisma migrate dev`  ကိုပဲ သုံးသင့်ပါတယ်။
- ဆက်ပြီး လိုအပ်တဲ့ Table တွေကို ဆက်ထည့်လိုက်ပါမယ်

```js
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Company {
  id         Int      @id @default(autoincrement())
  name       String
  isArchived Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt
  Users      Users[]
}

model Users {
  id         Int      @id @default(autoincrement())
  name       String?
  email      String   @unique
  companyId  Int
  company    Company  @relation(fields: [companyId], references: [id])
  isArchived Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @default(now()) @updatedAt
}

model Locations {
  id                           Int                            @id @default(autoincrement())
  name                         String
  address                      String
  tables                       Tables[]
  isArchived                   Boolean                        @default(false)
  createdAt                    DateTime                       @default(now())
  updatedAt                    DateTime                       @default(now()) @updatedAt
  MenusMenuCategoriesLocations MenusMenuCategoriesLocations[]
}

model Tables {
  id         Int       @id @default(autoincrement())
  name       String
  locationId Int
  locations  Locations @relation(fields: [locationId], references: [id])
  isArchived Boolean   @default(false)
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @default(now()) @updatedAt
}

model Menus {
  id                           Int                            @id @default(autoincrement())
  name                         String
  price                        Int
  assetUrl                     String?
  isArchived                   Boolean                        @default(false)
  createdAt                    DateTime                       @default(now())
  updatedAt                    DateTime                       @default(now()) @updatedAt
  MenusAddonCategories         MenusAddonCategories[]
  MenusMenuCategoriesLocations MenusMenuCategoriesLocations[]
}

model MenuCategories {
  id                           Int                            @id @default(autoincrement())
  name                         String
  isArchived                   Boolean                        @default(false)
  createdAt                    DateTime                       @default(now())
  updatedAt                    DateTime                       @default(now()) @updatedAt
  MenusMenuCategoriesLocations MenusMenuCategoriesLocations[]
}

model MenusAddonCategories {
  id              Int             @id @default(autoincrement())
  menuId          Int
  menus           Menus           @relation(fields: [menuId], references: [id])
  addonCategoryId Int
  addonCategories AddonCategories @relation(fields: [addonCategoryId], references: [id])
}

model MenusMenuCategoriesLocations {
  id             Int            @id @default(autoincrement())
  menuId         Int
  menus          Menus          @relation(fields: [menuId], references: [id])
  menuCategoryId Int
  menuCategories MenuCategories @relation(fields: [menuCategoryId], references: [id])
  locationId     Int
  locations      Locations      @relation(fields: [locationId], references: [id])
}

model AddonCategories {
  id                   Int                    @id @default(autoincrement())
  name                 String
  isRequired           Boolean                @default(false)
  addons               Addons[]
  isArchived           Boolean                @default(false)
  createdAt            DateTime               @default(now())
  updatedAt            DateTime               @default(now()) @updatedAt
  MenusAddonCategories MenusAddonCategories[]
}

model Addons {
  id              Int             @id @default(autoincrement())
  name            String
  price           Int
  isAvailable     Boolean?        @default(true)
  addonCategoryId Int
  addonCategories AddonCategories @relation(fields: [addonCategoryId], references: [id])
  isArchived      Boolean         @default(false)
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @default(now()) @updatedAt
}
```
- လိုအပ်တဲ့ table တွေ လုပ်ပြီးပြီ ဆိုရင် `npx prisma migrate dev --name added-tables` နဲ့ database ကို migrate လုပ်လိုက်ရင် database setup လုပ်လို့ ပြီးပါပြီး
