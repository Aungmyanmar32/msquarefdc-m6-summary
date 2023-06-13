## MSquare Programing Fullstack Course
### Episode-*86* 
### Summary For `Room(2)` 
## Menu Categories
- Menucategories component မှာ ရွေးထားတဲ့ locations မှာ ရှိတဲ့ menu category တွေကို ပြပေးနိုင်အောင် လုပ်ကြပါမယ်။

```js
// MenuCategories.tsx

import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { getSelectedLocationId } from "../utils/generals";
import { Box, Typography } from "@mui/material";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const selectedLocationId = getSelectedLocationId() as string;
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
  const validMenuCategories = menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validMenuCategories.map((item) => {
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

export default MenuCategories;
```
- ရှင်းလင်းချက်
```js
 const { menuCategories, menusMenuCategoriesLocations } =useContext(AppContext);
```
- App context ထဲက menuCategories နဲ့  menusMenuCategoriesLocations တွေကိုလှမ်းယူထားပါတယ်
```js
const selectedLocationId = getSelectedLocationId() as string;
```
- localStroage ထဲမှာသိမ်းထားတဲ့ ရွေးထားတဲ့ location Id ကို လဲ ယူထားလိုက်ပါတယ်
```js
 const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menu_categories_id);
```
- menusMenuCategoriesLocations ထဲက locations_id နဲ့ ရွေးထားတဲ့ location Id တူတဲ့ itemsတွေကို filter လုပ်လိုက်ပါတယ်
- ရလာတဲ့ array ကို map ပြန်လုပ်ပြီး ပြပေးရမဲ့ valid MenuCategory Id တွေ ထုတ်လိုက်ပါတယ်

```js
  const validMenuCategories = menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
```
- အပေါ်က ထုတ်ထားတဲ့ id တွေထဲမှာ menuCategories ထဲက id တွေ ပါတဲ့ဟာကို filter ထပ်လုပ်လိုက်ပြီး validMenuCategories အနေနဲ့ သိမ်းထားလိုက်ပါတယ်
```js
 <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validMenuCategories.map((item) => {
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
```
- နောက်ဆုံးမှာတော့ validMenuCategories array ကို loop လုပ်ပြီး အဲ့ဒီအထဲက item တွေရဲ့ name ကို ပြပေးလိုက်တာဖြစ်ပါတယ်
