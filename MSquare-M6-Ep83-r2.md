## MSquare Programing Fullstack Course
### Episode-*83* 
### Summary For `Room(2)` 
## Create New join table 
- အရင် သင်ခန်းစာတွေမှာ menus table နဲ့ locations table ကို သပ်သပ်ဆီ  ချိတ်ထားတဲ့ menus_locations table တစ်ခုကို database မှာ လုပ်ခဲ့ကြပါတယ်
- အလားတူပဲ menus table နဲ့ menu_categories  table ကို ချိတ်ထားတဲ့ menus_menu_categories   table တစ်ခုကို database မှာ လုပ်ခဲ့ကြပါတယ်
- အကယ်လို့ **menu categories  တစ်ခုကို location အများကြီးနဲ့ join ချင်တဲ့ အခါ** အထက်ပါ join table နှစ်ခုကို ပြန်join / id တွေ ပြန်တိုက်စစ် menus တွေ ပြန်join စသည်ဖြင့် အများကြီး join ပေးရမှာ ဖြစ်လို့ **code တွေ ထပ်လာကြသလို error လဲ ဖြစ်လာနိုင်ခြေများလာပါတယ်**
- ဒါ့ကြောင့်မို့လို့  အထက်ပါ join table နှစ်ခု မသုံးတော့ပဲ menus , locations , menu_categories သုံးခုစလုံး join table တစ်ခု ပဲ လုပ်ပေးလိုက်ပါမယ်
> မှတ်ချက် ။   ။  menus , locations , menu_categories သုံးခုစလုံး join table တစ်ခု ပဲ လုပ်ပေးလိုက်ခြင်း အားဖြင့် အထက်ပါ ပြဿနာတွေကို ဖြေရှင်းနိုင်ယုံသာမက အခြား အကျိုးရှိတဲ့ ရလဒ်တွေလဲရှိပါတယ်။ ဒါကို ဆရာ့ record video မှာ သေချာနားလည်အောင် ကြည့်ရှုပေးကြပါခင်ဗျာ

##
### DB မှာ join table တစ်ခု လုပ်ပါမယ်
```sql
create table menus_menu_categories_locations (
 id serial PRIMARY KEY not null,
 menus_id int REFERENCES menus,
 menu_categories_id int REFERENCES menu_categories not null,
 locations_id int REFERENCES locations,
 is_available BOOLEAN DEFAULT true
)
```
- **menus_menu_categories_locations** ဆိုတဲ့ menus , locations , menu_categories သုံးခုစလုံး joinထားတဲ့ table တစ်ခု crate လုပ်လိုက်တာဖြစ်ပါတယ်
- is_availabe ဆိုတဲ့ column တစ်ခု လည်းထည့်ပေးထားပြီး true ကို DEFAULT အနေနဲ့ ထားပေးထားပါတယ်။
- menus_menu_categories   table  နဲ့  menus_locations table  တွေကို မလိုအပ်တော့တာမို့ ဖျက်လိုက်ပါမယ်

```sql
DROP TABLE menus_locations;
```
```sql
DROP TABLE menus_menu_categories;
```
- join table အသစ်ကို သုံးမှာမို့လို့ ( **data-modeling ပြောင်းသွားတာမလို့** ) user အသစ် register လုပ်တဲ့ အခါ မှာ default အနေနဲ့ လုပ်ပေးထားတဲ့ အချက်အလက်တွေ coding လုပ်တဲ့နေရာမှာ အနည်းငယ် ပြင်ပေးရမှာဖြစ်ပါတယ်
### backend / src / router / authRouter.ts ( before -- After )
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116324189230616596/image.png)
- authRouter ထဲက register route နဲ့ request ၀င်လာတဲ့အခါ menu တွေ location တွေ menu categories တွေ create လုပ်ပြီးတဲ့အခါ အရင်ကလို menusနဲ့  locations / menus နဲ့ menus_categories တွေကို ချိတ်ထားတဲ့ code တွေကို ဖျက်ပြီး **menus_menu_categories_locations** table မှာ တစ်ခါတည်း join ပေးလိုက်တာဖြစ်ပါတယ်။
- ဆက်ပြီးတော့ user login ၀င်ပြီးတဲ့ အချိန် data တွေ လှမ်းယူတဲ့ appRouter မှာလည်း ပြင်လိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116327500218384444/image.png)
- အဓိက ပြောင်းလိုက်တာကတော့ **menuLocation ဆိုတဲ့ variable name ကို menusMenuCategoriesLocations** အဖြစ် ပြောင်းလိုက်တာပါ
- ပြီးတော့ database ဆီကနေ data လှမ်းယူတဲ့အခါ table အမည် ပြောင်းပေးလိုက်တာပဲ ဖြစ်ပါတယ်။
- frontend ထဲက appContext component မှာလည်း **menusLocations နေရာမှာ *menusMenuCategoriesLocations***  ဆိုပြီး ပြောင်းပေးရမှာဖြစ်ပါတယ်။

```js
import { createContext, useEffect, useState } from "react";
import {
  Menu,
  MenuCategory,
  Addon,
  AddonCategory,
  MenuLocation,
  Company,
  Location,
} from "../typings/types";
import { config } from "../config/config";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Location[];
  menusMenuCategoriesLocations: MenuLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}

export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menusMenuCategoriesLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken: ", accessToken);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    console.log(config);
    const response = await fetch(`${config.apiBaseUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const responseJson = await response.json();

    console.log("data from server", responseJson);

    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusMenuCategoriesLocations,
      company,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusMenuCategoriesLocations,
      company,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

```
