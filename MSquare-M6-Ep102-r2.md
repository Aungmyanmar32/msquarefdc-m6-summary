## MSquare Programing Fullstack Course
### Episode-*101* 
### Summary For `Room(2)`
## Add defualt data for new User
- user တစ်ယောက် login ၀င်လာရင် user အသစ်လား အဟောင်းလား စစ်ပြီး အသစ်ဆိုရင် default dataတွေ create လုပ်ပေးလိုက်မှာဖြစ်ပါတယ်
### data တွေ မလုပ်ခင်မှာ prisma နဲ့ ပတ်သတ်ပြီး သိထားသင့်တဲ့ syntax သုံးခုကို အရင် လေ့လာကြည့်ရအောင်

 ```js
 prisma.table-name.create( {
     data :{ } 
  } )
```
- table တစ်ခုမှာ rows အသစ်တစ်ခု create လုပ်တဲ့နေရာမှာ သုံးပါတယ်
- create လုပ်လိုက်တဲ့ row ကို return ပြန်ပေးပါတယ်
 ```js
 prisma.table-name.createMany( {
     data : [
     {item1},
     {item2}
     ]
  } )
```
- table တစ်ခုမှာ တစ်ခုထပ်ပိုတဲ့ rows အသစ် တွေ create လုပ်တဲ့နေရာမှာ သုံးပါတယ်
- data နေရာမှာ object မဟုတ်တော့ပဲ array အနေနဲ့ ရေးပေးရမှာဖြစ်ပါတယ်
- create လုပ်လိုက်တဲ့ row တွေထဲက ပထမ item ကိုပဲ return ပြန်ပေးပါတယ်
 ```js
 prisma.$transaction ( )
```
- rows တွေ အများကြီး create လုပ်ချက်တဲ့အခါ အသုံးပြုပါတယ်
- createMany နဲ့ မတူတာက create လုပ်လိုက်တဲ့ rows တွေ အကုန်လုံး return ပြန်ပေးပါတယ်
### example
```js
const newMenusData = [
      { name: "mote-hinn-kharr", price: 500 },
      { name: "shan-khout-swell", price: 1500 },
    ];
    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menus.create({ data: menu }))
    );
```
- menus table ထဲမှာ menus နှစ်ခု create လုပ်ချင်တာမလို့ create လုပ်ချင်တဲ့ menu items တွေကို array တစ်ခုထဲထည့်လိုက်ပြီး `prisma.$transaction()` နဲ့  loop လုပ်ပြီး create လုပ်လိုက်တာပဲ ဖြစ်ပါတယ်
### ဒီနေသင်ခန်းစာမှာတော့ data အသစ်တွေ crate လုပ်တဲ့အခါ ရလာမယ့် dataတွေကို လိုချင်တာမလို့ `createMany( )` အစား `$transaction( )` ကို အဓိက အသုံးပြုသွားပါမယ်

```js
prisma.table-name.findFirst( {
  where: { value}
}
```
- `findFirst` က table ထဲက value နဲ့ တူတဲ့ ပထမဆုံး rows ကို ရှာတာပါ
```js
prisma.table-name.findUnique( {
  where: { }
}
```
- `findUnique` က table ထဲက unique ဖြစ်တဲ့  rows ကို ရှာတာပါ
```js
prisma.table-name.findMany( {
  where: {
  column-name:{
  in: vlaue}
 }
}
```
- `findMany` က table ထဲက value နဲ့ တူတဲ့ rows အားလုံးကို ရှာတာပါ
##
- pages folder အောက်က api ထဲမှာ app folder တစ်ခုလုပ်ပြီး index.ts ဖိုင်တစ်ခုလုပ်လိုက်ပါမယ်
```js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).send("Unauthorized");
  const user = session.user;
  const email = user?.email as string;
  const name = user?.name as string;
  const userFromDB = await prisma.users.findFirst({ where: { email } });
  if (!userFromDB) {
    const newCompany = await prisma.companies.create({
      data: {
        name: "Default companies",
        address: "Default address",
      },
    });
    await prisma.users.create({
      data: {
        name,
        email,
        companyId: newCompany.id,
      },
    });
    const newLocation = await prisma.locations.create({
      data: {
        name: "Default location",
        address: "Default address",
        companyId: newCompany.id,
      },
    });
    const newMenusData = [
      { name: "mote-hinn-kharr", price: 500 },
      { name: "shan-khout-swell", price: 1500 },
    ];
    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menus.create({ data: menu }))
    );
    const newMenuCategoriesData = [
      { name: "Default category 1" },
      { name: "Default category 2" },
    ];
    const newMenuCategories = await prisma.$transaction(
      newMenuCategoriesData.map((menuCategory) =>
        prisma.menuCategories.create({ data: menuCategory })
      )
    );
    const newMenusMenuCategoriesLocationsData = [
      {
        menuId: newMenus[0].id,
        menuCategoryId: newMenuCategories[0].id,
        locationId: newLocation.id,
      },
      {
        menuId: newMenus[1].id,
        menuCategoryId: newMenuCategories[1].id,
        locationId: newLocation.id,
      },
    ];
    const newMenusMenuCategoriesLocations = await prisma.$transaction(
      newMenusMenuCategoriesLocationsData.map(
        (newMenusMenuCategoriesLocations) =>
          prisma.menusMenuCategoriesLocations.create({
            data: newMenusMenuCategoriesLocations,
          })
      )
    );
    const newAddonCategoriesData = [{ name: "Drinks" }, { name: "Sizes" }];
    const newAddonCategories = await prisma.$transaction(
      newAddonCategoriesData.map((addonCategory) =>
        prisma.addonCategories.create({ data: addonCategory })
      )
    );
    await prisma.menusAddonCategories.createMany({
      data: [
        {
          menuId: newMenus[0].id,
          addonCategoryId: newAddonCategories[0].id,
        },
        {
          menuId: newMenus[1].id,
          addonCategoryId: newAddonCategories[1].id,
        },
      ],
    });
    const newAddonsData = [
      {
        name: "Cola",
        price: 500,
        addonCategoryId: newAddonCategories[0].id,
      },
      {
        name: "Pepsi",
        price: 500,
        addonCategoryId: newAddonCategories[0].id,
      },
      {
        name: "Large",
        price: 200,
        addonCategoryId: newAddonCategories[1].id,
      },
      {
        name: "Normal",
        price: 0,
        addonCategoryId: newAddonCategories[1].id,
      },
    ];
    const newAddons = await prisma.$transaction(
      newAddonsData.map((addon) => prisma.addons.create({ data: addon }))
    );
    return res.send({
      menus: newMenus,
      menuCategories: newMenuCategories,
      addons: newAddons,
      addonCategories: newAddonCategories,
      locations: newLocation,
      menusMenuCategoriesLocation: newMenusMenuCategoriesLocations,
      company: newCompany,
    });
  } else {
    const companyId = userFromDB.companyId as number;
    const locations = await prisma.locations.findMany({
      where: {
        companyId: companyId,
        isArchived: false,
      },
    });
    const locationIds = locations.map((location) => location.id);
    const menusMenuCategoriesLocations =
      await prisma.menusMenuCategoriesLocations.findMany({
        where: {
          locationId: {
            in: locationIds,
          },
          isArchived: false,
        },
      });
    const menuCategoryIds = menusMenuCategoriesLocations.map(
      (item) => item.menuCategoryId
    );
    const menuIds = menusMenuCategoriesLocations
      .map((item) => item.menuId)
      .filter((item) => item !== null) as number[];
    const menuCategories = await prisma.menuCategories.findMany({
      where: {
        id: {
          in: menuCategoryIds,
        },
        isArchived: false,
      },
    });

    const menus = await prisma.menus.findMany({
      where: {
        id: {
          in: menuIds,
        },
        isArchived: false,
      },
    });
    const menusAddonCategories = await prisma.menusAddonCategories.findMany({
      where: {
        menuId: {
          in: menuIds,
        },
      },
    });

    const addonCategoryIds = menusAddonCategories.map(
      (menuAddonCategoryId) => menuAddonCategoryId.addonCategoryId
    ) as number[];
    const addonCategories = await prisma.addonCategories.findMany({
      where: {
        id: {
          in: addonCategoryIds,
        },
        isArchived: false,
      },
    });
    const addons = await prisma.addons.findMany({
      where: {
        addonCategoryId: {
          in: addonCategoryIds,
        },
        isArchived: false,
      },
    });
    const tables = await prisma.tables.findMany({
      where: {
        locationId: {
          in: locationIds,
        },
        isArchived: false,
      },
    });
    const company = await prisma.companies.findFirst({
      where: {
        id: companyId,
      },
    });
    const orders = await prisma.orders.findMany({
      where: { locationId: { in: locationIds } },
    });
    const orderIds = orders.map((item) => item.id);
    const orderlines = await prisma.orderlines.findMany({
      where: { orderId: { in: orderIds } },
    });
    res.send({
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
      orders,
      orderlines,
    });
  }
}
```
- new user ဆိုရင် users table ထဲမှာ user create လုပ်လိုက်ပြီး default data တွေပါ တစ်ခါတည်း create လုပ်ပြီး response ပြန်တဲ့အခါ create လုပ်ထားတဲ့ data တွေကိုပါ တစ်ခါတည်းထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- users table ထဲမှာရှိပြီးသား user ဆိုရင်တော့ location id ပေါ်မူတည်ပြီး အဆိုပါ user နဲ့ ပတ်သတ်တဲ့ data တွေကို ရှာပြီး response ပြန်ပေးလိုက်တာပဲဖြစ်ပါတယ်
- response ကနေ ရလာတဲ့ data တွေကို redux store ထဲမှာ သိမ်းလိုက်ပါမယ်
- slice တွေနဲ့ component တွေကို အရင် သင်ခန်းစာမှာ အသေးစိတ်ရှင်းပြခဲ့ပြီမလို့ ခုသင်ခန်းစာမှာတော့ copy / paste ပဲ လုပ်လိုက်ပါမယ်
- အောက်က link ထဲက repo ကို clone လုပ်လိုက်ပါ
- .env ထဲမှာ မိမိရဲ့ key နဲ့ url တွေကို အစားထိုးပေးပါ
- clone ပြီးတာနဲ့ npm install လုပ်ပေးရပါမယ်
- npx prisma db push လုပ်ပေးလိုက်ပါ
https://github.com/msquareprogramming/next-foodie-app

##
### file system
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131263215041511458/image.png)
- src / assets folder အောက်မှာတော့ app အတွက် logo လေး သိမ်းထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131263746505986128/image.png)
 - component folder ထဲမှာတော့ UI မှာပြမယ့် conponent တွေ လုပ်ထားပါတယ်
 ![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131264337613434910/image.png)

- config folder မှာတော့ .env ထဲက value တွေကို cofig object ထဲမှာ ပြန်ထည့်ပေးလိုက်တာပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131265756433231962/image.png)
- pages/api ထဲမှာတော့ သက်ဆို်ရာ component တွေနဲ့ slice တွေ အတွက် backend code တွေ သတ်မှတ်ထားပါတယ်
- route တစ်ခုချင်းစီထဲက code နဲ့ logic တွေထဲက အရေးကြီးတဲ့ အပိုင်းတွေကို နောက်သင်ခန်းစာမှာ ရှင်းပြထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131265944090587226/image.png)
- pages/backoffice မှာတော့ store ထဲက data တွေကို CURD လုပ်နိုင်တဲ့ LOGIC တွေ ပါတဲ့ route တစ်ခုချင်းစီ ကို ထည့်ပေးထားပါတယ် 
- အဲ့ဒီ logic တွေနဲ့ component တွေကို ပေါင်းစပ်ပြီး route တစ်ခုစီကို ၀င်လာတိုင်း သက်ဆိုင်ရာ componet တွေနဲ့ UI မှ တဆင့် CURD လုပ်နိုင်မှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131266150609719376/image.png)
- store/slice ထဲမှာတော့ redux store မှာ သိမ်းဖို့ slice တွေနဲ့ action တွေ ထည့်ထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131266287306297466/image.png)
- store ရဲ့ root မှာတော့ slice တွေ အားလုံးကို သိမ်းထားတဲ့ store တစ်ခု လုပ်ထားပါတယ်
- ![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131269433910902836/image.png)
- utils folder မှာတော့ frontend မှာ သုံးမယ့် function တွေကို client.ts မှာ ထည့်ပေးထားပြီး backend အတွက် function တွေကိုတော့ server.ts မှာ ထည့်ပေးထားပါတယ်။
### အထက်ပါ file တွေ တော်တော်များများဟာ အရင် react project မှာ လေ့လာခဲ့တဲ့ logic တွေနဲ့ ရှေ့ သင်ခန်းစာများမှာ ရှင်းပြခဲ့တဲ့ logic တွေ ကို အသုံးပြုပြီး ရေးထားတာတွေ ဖြစ်တာမို့ မိမိကိုယ်တိုင် လေ့လာကြည့်ကြစေလိုပါတယ်
### အသစ် ပါ၀င်လာတဲ့ feature တွေလည်း အနည်းငယ်ရှိပါတယ်။ အဲ့တာတွေကို နောက်သင်ခန်းစာမှာ ရှင်းပြပေးသွားမှာ ဖြစ်ပါတယ်
##
- ခုဆိုရင် next foodie app ထဲကို gamil နဲ့ login ၀င်ကြည့်ပါက user အသစ်ဆို dafault data တွေ လုပ်ပေးမှာဖြစ်ပြီး ရှိပြီးသား user ဆို location id ကို သုံးပြီး data တွေ ပြပေးမှာဖြစ်ပါတယ်။
