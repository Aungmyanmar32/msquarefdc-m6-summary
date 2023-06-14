## MSquare Programing Fullstack Course
### Episode-*87* 
### Summary For `Room(2)` 
###  Get all **menu**, **menu category**,  *addon* and *addon category* from `current location`
- အရင်ဆုံး frontend / src / utils folder အောက်က general.ts ကို index.ts အဖြစ် နာမည်ပြောင်းလိုက်ပါမယ်
- ပြီးခဲ့တဲ့ သင်ခန်းစာက menu categories တွေ ယူတဲ့ function ကို utils ထဲမှာ ပြောင်းရေးပါမယ်
```js
//frontend / src / utils/index.ts

import {
  Addon,
  AddonCategory,
  Menu,
  MenuAddonCategory,
  MenuCategory,
  MenusMenuCategoriesLocations,
} from "../typings/types";

export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getMenuCategoriesByLocationId = (
  menuCategories: MenuCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};
```
- ရှင်းလင်းချက်
```js
export const getMenuCategoriesByLocationId = (
  menuCategories: MenuCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {....}
```
- **getMenuCategoriesByLocationId**  ဆိုတဲ့ function တစ်ခုလုပ်ထားပြီး *menuCategories* နဲ့ *menusMenuCategoriesLocations* ဆိုတဲ့ **parameter နှစ်ခုလက်ခံ**ထားပါတယ်.
- 
```
  const selectedLocationId = getSelectedLocationId();
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};
```
- lacalStroage ထဲ သိမ်းထားတဲ့ location id ကို လှမ်းယူလိုက်ပြီး
- **သိမ်းထားတဲ့ location id** နဲ့တူတဲ့ items တွေကို menusMenuCategoriesLocations ထဲကနေ filter လုပ်လိုက်ပြီး ရလာတဲ့arrayထဲက MenuCategory Ids တွေ သီးသန့် ပြန်ထုတ်ထားလိုက်ပါတယ်
- ရလာတဲ့ MenuCategory  Ids ပါတဲ့ menuCategories တွေကိုပဲ return ပြန်လုပ်ထားပါတယ်
- MenuCategories.tsx မှာ အခုလိုပြန်ခေါ်သုံးလိုက်ပါမယ်
![enter image description here](https://media.discordapp.net/attachments/1076154921562411008/1118627330848456805/image.png?width=1200&height=403)

- အရင်သင်ခန်းစာမှာ ရေးထားတဲ့ code တစ်ချို့ကို ဖျက်ပြီး အပေါ်မှာ ရေးထားတဲ့ **getMenuCategoriesByLocationId**  ဆိုတဲ့ function ကို ခေါ်သုံးလိုက်တာပဲဖြစ်ပါတယ်
-  context ကနေ လှမ်းယူထားတဲ့ *menuCategories* နဲ့ *menusMenuCategoriesLocations* ဆိုတဲ့ နှစ်ခုကိုလည်း parameter အဖြစ်ထည့်ပေးထားလိုက်ပါတယ်
- အခု foodie app မှာ စမ်းသပ်ကြည့်ပါက အရင်သင်ခန်းစာကလိုပဲ အလုပ်လုပ်နေတာကို မြင်ရမှာ ဖြစ်ပါတယ်
##
### ဆက်ပြီး menu တွေအတွက်လဲ အထက်ပါအတိုင်း လုပ်ပေးပါမယ်

```js
// Add to utils/index.ts

export const getMenusByLocationId = (
  menus: Menu[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};
```
- lacalStroage ထဲ သိမ်းထားတဲ့ location id ကို လှမ်းယူလိုက်ပြီး
- **သိမ်းထားတဲ့ location id** နဲ့တူတဲ့ items တွေကို menusMenuCategoriesLocations ထဲကနေ filter လုပ်လိုက်ပြီး ရလာတဲ့arrayထဲက Menu Ids တွေ သီးသန့် ပြန်ထုတ်ထားလိုက်ပါတယ်
- ရလာတဲ့ Menu Ids ပါတဲ့ menus တွေကိုပဲ return ပြန်လုပ်ထားပါတယ်
- Menuss.tsx မှာ အခုလိုပြန်ခေါ်သုံးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1118631388887908523/image.png)

- **getMenuByLocationId**  ဆိုတဲ့ function ကို ခေါ်သုံးလိုက်တာပဲဖြစ်ပါတယ်
-  context ကနေ လှမ်းယူထားတဲ့ *menuCategories* နဲ့ *menusMenuCategoriesLocations* ဆိုတဲ့ နှစ်ခုကိုလည်း parameter အဖြစ်ထည့်ပေးထားလိုက်ပါတယ်
- အခု foodie app မှာ စမ်းသပ်ကြည့်ပါက လက်ရှိ location မှာ ရှိတဲ့ menu တွေပဲ ပြပေးတာကို မြင်ရမှာဖြစ်တယ်
##
### Get Addon categories
- addon categories အတွက် ဆက်မလုပ်ခင်မှာ context ရဲ့ default data ထဲမှာ menusAddonCategories ဆိုတဲ့တစ်ခု ထပ်ထည့်လိုက်ပြီး types တွေပါ ထပ်ပေါင်းထည့်လိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1118634263437390025/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1118634646624796873/image.png)
- backend က app router မှာလည်း response ပြန်တဲ့အခါ menuAddonCategories ကို ပါ ထည့်ပေးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1118641529347645520/image.png)
- addon categories တွေ ယူမယ့် function ထပ်လုပ်ပြီး addonCategories component မှာ addon categories တွေ ပြပေးမှာဖြစ်ပါတယ်

```js
// Add to utils/index.ts
export const getAddonCategoriesByLocationId = (
  addonCategories: AddonCategory[],
  menusAddonCategories: MenuAddonCategory[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.locations_id && item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
 
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id);
 
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id as number)
  );
};
```
- lacalStroage ထဲ သိမ်းထားတဲ့ location id ကို လှမ်းယူလိုက်ပြီး
- **သိမ်းထားတဲ့ location id** နဲ့တူတဲ့ items တွေကို menusMenuCategoriesLocations ထဲကနေ filter လုပ်လိုက်ပြီး ရလာတဲ့arrayထဲက Menu Ids တွေ သီးသန့် ပြန်ထုတ်ထားလိုက်ပါတယ်
- ရလာတဲ့ menu id တွေကို context ထဲက menusAddonCategories array မှာ filter ထပ်လုပ်ပြီး addonCategories id တွေ ထပ်ယူလိုက်ပါတယ်
- ရလာတဲ့ addonCategories id တွေနဲ့ addonCategories array  မှာ filter လုပ်ပြီး addon categories တွေ ယူလိုက်တာဖြစ်ပါတယ်
- AddonCategories.tsx မှာအထက်ပါ function ကို ခေါ်သုံးပြီး addon categories တွေ ပြပေးမှာဖြစ်ပါတယ်။

```js
//AddonCategories.tsx

import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  getAddonCategoriesByLocationId,
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "../utils";
import { Box, Typography } from "@mui/material";

const AddonCategories = () => {
  const {
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);
  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );

  console.log(validAddonCategories);

  return (
    <Layout title="Addon Categories">
      <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validAddonCategories.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                height: 150,
                width: 100,
                border: "2px solid lightgray",
                mr: 2,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};

export default AddonCategories;
```
-  getAddonCategoriesByLocationId function ကို ခေါ်သုံးလိုက်ပြီး ရလာတဲ့ addon categories တွေကို return လုပ်ပြီး ပြပေးလိုက်တာပါ။
##
### Addon တွေ အတွက် ဆက်လုပ်ပါမယ်

```js
// utils/index.ts

import {

  Addon,

  AddonCategory,

  Menu,

  MenuAddonCategory,

  MenuCategory,

  MenusMenuCategoriesLocations,

} from "../typings/types";




export const getSelectedLocationId = () => {

  return localStorage.getItem("selectedLocationId");

};




export const getAccessToken = () => {

  return localStorage.getItem("accessToken");

};




export const getMenuCategoriesByLocationId = (

  menuCategories: MenuCategory[],

  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]

) => {

  const selectedLocationId = getSelectedLocationId();

  const validMenuCategoryIds = menusMenuCategoriesLocations

    .filter((item) => item.locations_id === Number(selectedLocationId))

    .map((item) => item.menu_categories_id);

  return menuCategories.filter((item) =>

    validMenuCategoryIds.includes(item.id as number)

  );

};




export const getMenusByLocationId = (

  menus: Menu[],

  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]

) => {

  const selectedLocationId = getSelectedLocationId();

  const validMenuIds = menusMenuCategoriesLocations

    .filter((item) => item.locations_id === Number(selectedLocationId))

    .map((item) => item.menus_id);

  return menus.filter((item) => validMenuIds.includes(item.id as number));

};




export const getAddonCategoriesByLocationId = (

  addonCategories: AddonCategory[],

  menusAddonCategories: MenuAddonCategory[],

  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]

) => {

  const selectedLocationId = getSelectedLocationId();

  const validMenuIds = menusMenuCategoriesLocations

    .filter(

      (item) =>

        item.locations_id && item.locations_id === Number(selectedLocationId)

    )

    .map((item) => item.menus_id);

  const validAddonCategoryIds = menusAddonCategories

    .filter((item) => validMenuIds.includes(item.menus_id))

    .map((item) => item.addon_categories_id);

  return addonCategories.filter((item) =>

    validAddonCategoryIds.includes(item.id as number)

  );

};



// Get addons
export const getAddonsByLocationId = (

  addons: Addon[],

  addonCategories: AddonCategory[]

) => {

  const validAddonCategoryIds = addonCategories.map((item) => item.id);

  return addons.filter((item) =>

    validAddonCategoryIds.includes(item.addon_categories_id)

  );

};
```
- getAddonsByLocationId ဆိုတဲ့ function တစ်ခုလုပ်လိုက်ပြီး
- addonCategories array ထဲက id နဲ့ addon ထဲက addon_categories_id ပါတဲ့ items တွေကို filter လုပ်ပြီး return လုပ်လိုက်တာဖြစ်ပါတယ်
- ရလာတဲ့ addons တွေကို Addons.tsx မှာ ပြပေးမှာဖြစ်ပါတယ်။

```js
// Addons.tsx]

import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  getAddonCategoriesByLocationId,
  getAddonsByLocationId,
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "../utils";
import { Box, Typography } from "@mui/material";

const Addons = () => {
  const {
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(AppContext);
  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );
  const validAddons = getAddonsByLocationId(addons, validAddonCategories);
  console.log(validAddons);

  return (
    <Layout title="Menu Categories">
      <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validAddons.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                height: 150,
                width: 100,
                border: "2px solid lightgray",
                mr: 2,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
};

export default Addons;
```
-  getAddonsByLocationIdfunction ကို ခေါ်သုံးလိုက်ပြီး ရလာတဲ့ addon တွေကို return လုပ်ပြီး ပြပေးလိုက်တာပါ။
##
### 
