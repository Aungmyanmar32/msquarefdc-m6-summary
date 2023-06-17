## MSquare Programing Fullstack Course
### Episode-*88* 
### Summary For `Room(2)` 
## Menu Categories 
- လက်ရှိ ရွေးထားတဲ့ location နဲ့ ချိတ်ထားတဲ့ Menu Categories တွေ ကို update လုပ်လို့ရအောင် ဆက်လုပ်ကြပါမယ်

```js
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  getAccessToken,
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "../utils";
import { Box, Typography } from "@mui/material";

const MenuCategories = () => {
  const { fetchData } = useContext(AppContext);
  const { menuCategories, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const validMenuCategories = getMenuCategoriesByLocationId(
    menuCategories,
    menusMenuCategoriesLocations
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ pl: 3, pt: 3, display: "flex" }}>
        {validMenuCategories.map((item) => {
          return (
            <Link
              to={`${item.id}`}
              key={item.id}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mr: 3,
                  maxWidth: "200px",
                  alignItems: "center",
                  p: 2,
                  position: "relative",
                  width: "170px",
                  height: "170px",
                  borderRadius: 2,
                  border: "2px solid #EBEBEB",
                  justifyContent: "center",
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                <Typography variant="h5">{item.name}</Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Layout>
  );
};

export default MenuCategories;

```
- ရှင်းလင်းချက်
```
<Link
 to={`${item.id}`}
 key={item.id}
 style={{ textDecoration: "none" }}
> 
.....
</Link>
```
- Valid menu category တွေကို loop လုပ်ပြီး ပြပေးထားတဲ့ BOX component ကို react-router-dom က Link component နဲ့ wrap လုပ်လိုက်ပြီး ``` to={`${item.id}`}``` ဆိုပြီး menu category တစ်ခုခုကို နှိပ်လိုက်ရင် အဲ့ဒီ menu category  ရဲ့  id နဲ့   route  ဆီ  သွားခိုင်းလိုက်တာဖြစ်ပါတယ်
-  menu category ရဲ့  မူလ route က **http://localhost:3000/menu-categories** ဖြစ်ပြီး menu category တစ်ခုခုကို နှိပ်လိုက်ရင် အဲ့ဒီ menu category  ရဲ့  id က 13 ဖြစ်မယ်ဆိုရင်  **http://localhost:3000/menu-categories/13** ဆိုတဲ့ route  ဆီ ၀င်သွားမှာဖြစ်ပါတယ်

- နှိပ်လိုက်တဲ့ menu category ပေါ်မူတည်ပြီး နောက်က၀င်လာမယ့် id တန်ဖိုးက ပြောင်းလဲနေမှာ ဖြစ်လို့  အဲ့ဒါကို **dynamic route** လို့ ခေါ်ပါတယ်
- **dynamic route**  ထဲ၀င်လာရင် ပြပေးဖို့ EditMenuCateory.tsx ဆိုတဲ့ component တစ်ခု လုပ်ပေးပါမယ်

```js
// EditMenuCateory.tsx

import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";


const EditMenuCategory = () => {
  const params = useParams();
  const menuCategoryId = params.id as string;
  const { menuCategories, locations, menusMenuCategoriesLocations } =
    useContext(AppContext);
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
  });
  
  if (!menuCategoryId) return null;
  
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );

  if (!menuCategory)
    return (
      <Layout title="Edit menu category">
        <Box sx={{ pt: 3, pl: 3 }}>
          <Typography variant="h4">Menu category not found</Typography>
        </Box>
      </Layout>
    );

  const updateMenuCategory = ()=>{
    console.log("New menu categories " , newMenuCategory )
  }
  return (
    <Layout title="Edit menu category">
      <Box  
        sx={{
          pt: 3,
          pl: 3,
          mx: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
        >
        <TextField
          defaultValue={menuCategory.name}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        
        <Button variant="contained" onClick={updateMenuCategory} sx={{ mt: 5 }}>
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditMenuCategory;
```
- ရှင်းလင်းချက်

```
 const params = useParams();
  const menuCategoryId = params.id as string;
```
- react useParams hook ကို သုံးပြီး http://localhost:3000/menu-categories/13  route က id ကို လှမ်းယူလိုက်ပါတယ်

```
  useContext(AppContext);
  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategoryId,
    name: "",
  });
```
- id နဲ့ name တွေပါတဲ့ newMenuCategory ဆိုတဲ့ state တစ်ခု သတ်မှတ်ထားပါတယ်

```js
  if (!menuCategoryId) return null;
  
 const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );
```
- menuCategoryId မရှိခဲ့ရင်တော့ ဘာမှမပြပေးတော့ပဲ return null လုပ်လိုက်ပါတယ်
- ရှိခဲ့ရင်တော့ ရလာတဲ့ id နဲ့ တူတဲ့ menu category ကို context ထဲက menuCategories ထဲမှာ သွားရှာလိုက်ပါတယ်

```
if (!menuCategory)
    return (
      <Layout title="Edit menu category">
        <Box sx={{ pt: 3, pl: 3 }}>
          <Typography variant="h4">Menu category not found</Typography>
        </Box>
      </Layout>
    );
```
- menuCategory တစ်ခုမှ မတွေ့ခဲ့ရင် Menu category not found ဆိုပြီး ပြပေးထားပါတယ်
- တွေ့ခဲ့ရင်တော့ အောက်ပါအတိုင်း Textfield တစ်ခုနဲ့ update button တစ်ခု ပြပေးလိုက်ပြီး Textfield ထဲမှာ တွေ့ထားတဲ့ menu category ရဲ့ name ကို default value အနေနဲ့  ပြပေးထားပါတယ်
```
 return (
    <Layout title="Edit menu category">
      <Box  
        sx={{
          pt: 3,
          pl: 3,
          mx: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
        >
        <TextField
          defaultValue={menuCategory.name}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        
        <Button variant="contained" onClick={updateMenuCategory} sx={{ mt: 5 }}>
          Update
        </Button>
      </Box>
    </Layout>
  );
};
```
- TextFiled ထဲက name ကို ပြင်လိုက်ရင် newMenuCategory state ရဲ့ value ထဲက name ကို update လုပ်ပေးထားပါတယ်
- Update ခလုတ်ကို နှိ်လိုက်ရင် updateMenuCategory function ကို ခေါ်ထားပြီး newMenuCategory ကို log ထုတ်ကြည့်ထားတာဖြစ်ပါတယ်
- ခု EditMenuCateory ကို ပြပေးမယ့် route တစ်ခု Router.tsx မှာ လုပ်ပေးရပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1119637381415452832/image.png)

- ခု menu category တစ်ခုကို နှိပ်ကြည့်ပါက အဲ့ဒီ menu category ရဲ့ id နဲ့ route တစ်ခု ရောက်သွားမှာဖြစ်ပါတယ်
- name နေရာမှာ တစ်ခုခုပြင်ပြီး update လုပ်ကြည့်ပါက အောက်ပါအတိုင်း log ထုတ်ပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1119636795878035597/image.png)

	 
