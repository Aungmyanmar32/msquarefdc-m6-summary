## MSquare Programing Fullstack Course
### Episode-*90* 
### Summary For `Room(2)` 
## Menu Categories (CURD) part 3
### Show joined Menus in Edit  menu category
- menu category ကို edit လုပ်တဲ့ နေရာမှာ locations အပြင် အဲ့ဒီ menu categoryနဲ့ ချိတ်ထားတဲ့ menuတွေကို ပြပေးနိုင်အောင် လုပ်ပါမယ်
- အရင်ဆုံး လက်ရှိ Valid menu တွေကို လှမ်းယူမယ့် function ကို utils folder အောက်က index.ts မှာ သတ်မှတ်လိုက်ပါမယ်
```js
// Add to --> /utils/index.ts

export const getMenusByMenuCategoryId = (
  menus: Menu[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menus_id &&
        item.menu_categories_id === Number(menuCategoryId) &&
        item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};
```
- parameter အနေနဲ့ ၀င်လာမယ့် menuCategoryId နဲ့  localstroage ထဲ က selectedLocationId  ပါတူတဲ့ rows တွေကို menusMenuCategoriesLocations ထဲကနေ filter လုပ်ပြီး menu id တွေ ယူလိုက်ပါတယ်
- ရလာတဲ့ menu id နဲ့ တူတဲ့ menu တွေကို menu array ထဲကနေ filter လုပ် ထုတ်ယူပြီး return ပြန်ပေးထားပါတယ်
- getMenusByMenuCategoryId  function ကို EditMenuCategory component ထဲမှာ ခေါ်သုံးပြီး  menu တွေပြပေးမှာဖြစ်ပါတယ်
- menu တွေကို MUI card ပုံစံနဲ့ ပြပေးချင်တာမလို့ MenuCard.tsx ဖိုင်တစ်ခု ကို component folder ထဲမှာ အသစ်လုပ်ပြီး mui card component ကို အသုံးပြုလိုက်ပါမယ်
```js
// src/ components / MenuCard.tsx

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu } from "../typings/types";

interface Props {
  menu: Menu;
}

const MenuCard = ({ menu }: Props) => {
  return (
    <Link
      key={menu.id}
      to={`/menus/${menu.id}`}
      style={{
        textDecoration: "none",
        marginRight: "15px",
        marginBottom: "20px",
      }}
    >
      <Card sx={{ width: 300, height: 300 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={menu.asset_url || ""}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {menu.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;

```
- menu ဆိုတဲ့ props တစ်ခုလက်ခံထားပြီး menu prop ထဲက data တွေကို card media ( ပုံ) , card conetnt ( name and Description) အဖြစ် ပြပေးထားတာဖြစ်ပါတယ်
- အဲ့ဒီ MenuCard ကိုသုံးပြီး valid menu function က ရလာမယ့် menu တွေကို EditMenucategory component မှာ ပြပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120444882033586317/image.png)
```js
  const validMenus = getMenusByMenuCategoryId(
    menus,
    menuCategoryId,
    menusMenuCategoriesLocations
  );
```
- **getMenusByMenuCategoryId** function ကို  ခေါ်သုံးထားပြီး ရလာတဲ့ data တွေကို  validMenus array မှာသိမ်းထားလိုက်ပါတယ်
- အောက်က return လုပ်တဲ့ နေရာက Update button အောက်မှာ MenuCard component ကို ထပ်ခေါ်သုံးထားပြီး validMenus array ထဲက item တွေကို menu props အနေနဲ့ ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- ခု menu category တစ်ခုခုကို edit လုပ်ကြည့်ပါက အဲ့ဒီ category နဲ့ ချိတ်ထားတဲ့ menu တွေပြပေးမှာဖြစ်ပါတယ်။

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120446069478793257/image.png)

##
### ဆက်ပြီးတော့ menu တစ်ခု create လုပ်တဲ့အခါမှာ menu category ပါ တစ်ခါတည်း ချိတ်လို့ရအောင် လုပ်ကြပါမယ်

- menu တစ်ခု create လုပ်ဖို့ NewMenu.tsx component တစ်ခု ကို components folder အောက်မှာ လုပ်ပါမယ်

```js
// src/components/NewMenu.tsx

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useState } from "react";
import FileDropZone from "./FileDropZone";
import { config } from "../config/config";
import Autocomplete from "./Autocomplete";
import { getMenuCategoriesByLocationId, getSelectedLocationId } from "../utils";
import { AppContext } from "../contexts/AppContext";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenu = ({ open, setOpen }: Props) => {
  const { menuCategories, menusMenuCategoriesLocations, fetchData } =
    useContext(AppContext);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const selectedLocationId = getSelectedLocationId() as string;
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: 0,
    assetUrl: "",
    locationId: selectedLocationId,
    menuCategoryIds: [] as number[],
  });

  const createNewMenu = async () => {
    const isValid =
      newMenu.name && newMenu.description && newMenu.menuCategoryIds.length;
    if (!isValid)
      return alert("Name, description and menu categories are required.");
    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      newMenu.assetUrl = responseData.assetUrl;
    }

    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  const validMenuCategory = getMenuCategoriesByLocationId(
    menuCategories,
    menusMenuCategoriesLocations
  );
  const mappedMenuCategories = validMenuCategory.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const onFileSelected = (selectedFiles: File[]) => {
    setSelectedFiles(selectedFiles);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create new menu</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 500,
          }}
        >
          <TextField
            placeholder="Name"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewMenu({ ...newMenu, name: evt.target.value })
            }
          />
          <TextField
            placeholder="Description"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewMenu({ ...newMenu, description: evt.target.value })
            }
          />
          <TextField
            type="number"
            placeholder="Price"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewMenu({ ...newMenu, price: Number(evt.target.value) })
            }
          />
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              options={mappedMenuCategories}
              label="Menu categories"
              placeholder="Menu categories"
              onChange={(options) =>
                setNewMenu({
                  ...newMenu,
                  menuCategoryIds: options.map((item) => item.id),
                })
              }
            />
          </Box>
          <Box>
            <FileDropZone onFileSelected={onFileSelected} />
            <Box sx={{ mt: 2 }}>
              {selectedFiles.map((file) => {
                return (
                  <Chip
                    key={file.name}
                    label={file.name}
                    onDelete={() => {
                      const filteredSelectedFiles = selectedFiles.filter(
                        (selectedFile) => selectedFile.name !== file.name
                      );
                      setSelectedFiles(filteredSelectedFiles);
                    }}
                    sx={{ mr: 2, mb: 2 }}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={createNewMenu}
          >
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenu;

```
- `const NewMenu = ({ open, setOpen }: Props) => {......}`  
- NewMenu ဆိုတဲ့ component တစ်ခု လုပ်ထားပြီး props အနေနဲ့   **open, setOpen** နှစ်ခုကို လက်ခံထားပါတယ်
-  component  ထဲမှာတော့ [Episode-81 ](https://github.com/Aungmyanmar32/msquarefdc-m6-summary/blob/main/MSquare-M6-Ep81-r2.md) မှာ လေ့လာခဲ့တဲ့ createMenu componet ထဲက code တွေကို ပြန်သုံးခဲ့တာဖြစ်ပြီး  အဲ့ဒီ code တွေကို MUI Dialog box နဲ့ wrap လုပ်ပြီး ပြပေးထားတာဖြစ်ပါတယ်
- ထပ်ဖြည့်ထားတာတွေကတော့ **Autocomplete Componet နဲ့ menu category တွေ ရွေးလို့ရအောင်** လုပ်ထားတာရယ် နဲ့ n**ewMenu state ရဲ့ တန်ဖိုးမှာ    locationId: selectedLocationId,  menuCategoryIds: [] as number[] ဆိုပြီး ထပ်ဖြည့်ထား**တာ တွေ ရှိပါတယ်
```js
  const validMenuCategory = getMenuCategoriesByLocationId(
    menuCategories,
    menusMenuCategoriesLocations
  );
  const mappedMenuCategories = validMenuCategory.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
```
- ရွေးထားတဲ့ location မှာရှိတဲ့ menu categories တွေကို လှမ်းယူထားတာဖြစ်ပါတယ်
```js
 <Autocomplete
   options={mappedMenuCategories}
   label="Menu categories"
   placeholder="Menu categories"
   onChange={(options) =>
    setNewMenu({
     ...newMenu,
     menuCategoryIds: options.map((item) => item.id),
     })
    }
/>
```
- Autocomplete component ကို ခေါ်သုံးထားပြီး options props အနေနဲ့ အပေါ်မှာ လှမ်းယူထား menu categories တွေကို ထည့်ပေးထားပါတယ်
- တစ်ခုခု ကို ရွေးလိုက်တိုင်း newMenu တန်ဖိုးထဲက menuCategoryIds array ကို update လုပ်ပေးထားတာဖြစ်ပါတယ်
-  ခု Menu Component ( Menus.tsx) မှာ NewMenu component ကို ခေါ်သုံးပြီး menu အသစ်တစ်ခု create လို့ ရအောင် လုပ်ပေးလိုက်ပါမယ်

```JS
// Menus.tsx

import { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getMenusByLocationId } from "../utils";
import NewMenu from "./NewMenu";
import MenuCard from "./MenuCard";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations, fetchData } =
    useContext(AppContext);

  const validMenus = getMenusByLocationId(menus, menusMenuCategoriesLocations);

  const [open, setOpen] = useState(false);

  return (
    <Layout title="Menus">
      <Box sx={{ mx: 3, mt: 3 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new menu
          </Button>
        </Box>

        <Box sx={{ display: "flex" }}>
          {validMenus.map((menu) => {
            return <MenuCard menu={menu} />;
          })}
        </Box>
      </Box>

      <NewMenu open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Menus;

```

- ရှင်းလင်းချက်
```js
const { menus, menusMenuCategoriesLocations, fetchData } =
    useContext(AppContext);
```
- context ထဲက  *menus*,  *menusMenuCategoriesLocations*,  *fetchData*  တွေကို လှမ်းယူထားပါတယ်
```js
 const validMenus = getMenusByLocationId(menus, menusMenuCategoriesLocations);
```
- **getMenusByLocationId** function ကို သုံးပြီး လက်ရှိ location နဲ့ ချိတ်ထားတဲ့ Menu တွေ ကို validMenus  ထဲ သိမ်းထားလိုက်ပါတယ်
```js
  const [open, setOpen] = useState(false);
```
- open ဆိုတဲ့ state တစ်ခု သတ်မှတ်ထားပြီး တန်ဖိုးအနေနဲ့ false ပေးထားပါတယ်
```js
         <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new menu
          </Button>
```
- Create new menu ဆိုတဲ့ ခလုတ်တစ်ခုကို အပေါ်ထောင့်မှာပြပေးထားပြီး နှိပ်လိုက်ရင် open state value ကို true အဖြစ် update လုပ်ပေးထားပါတယ်
```js
 <Box sx={{ display: "flex" }}>
          {validMenus.map((menu) => {
            return <MenuCard menu={menu} />;
          })}
        </Box>
```
-  ဒါကတော့ လက်ရှိ location နဲ့ ချိတ်ထားတဲ့ Menu တွေ ကို validMenus  ထဲ သိမ်းထားတာကို MenuCard component ကို သုံးပြီး menu တွေ ပြပေးထားတာဖြစ်ပါတယ်
```js
 <NewMenu open={open} setOpen={setOpen} />
```
- နောက်ဆုံးမှာတော့ NewMenu component ကို ခေါ်သုံးထားပြီး  o**pen={open}  နဲ့ setOpen={setOpen}** ဆိုပြီး အပေါ်မှာ သတ်မှတ်ထားတဲ့ open state ကို props အဖြစ် ထည့်ပေးထားတာဖြစ်ပါတယ်
- - Create new menu ဆိုတဲ့ ခလုတ်တစ်ခုကို  နှိပ်လိုက်ရင် open state value က true ဖြစ်လာပြီး  NewMenu component မှာ သုံးထားတဲ့ dialog box ပေါ်လာကာ menu အသစ်တစ်ခု create လုပ်လို့ ရမှာ ဖြစ်ပါတယ်

### Before clicking `Create New Menu` 
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120463449378521301/image.png)
### After clicking  `Create New Menu` 
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120463873070342144/image.png)

##
### Frontend မှာ menu create လုပ်ဖို့ ပြင်ဆင်ပြီးပြီမို့ backend မှာ ၀င်လာတဲ့ request ကို လက်ခံကို menu table ထဲမှာ ရော menus_menu_categories_location table ထဲမှာ အသစ်လုပ်လိုက်တဲ့ menu ရဲ့ data တွေ သိမ်းပေးမှာဖြစ်ပါတယ်

```js
// backend/src/router/menuRouter.tsx --> post middleware

menusRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, description, price, assetUrl, locationId, menuCategoryIds } =
    req.body;
  const isValid = name && description && locationId && menuCategoryIds.length;
  const newMenuResult = await db.query(
    "insert into menus (name, description, price, asset_url) values($1, $2, $3, $4) returning *",
    [name, description, price, assetUrl]
  );
  const menuId = newMenuResult.rows[0].id;
  menuCategoryIds.forEach(async (item: number) => {
    await db.query(
      "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values($1, $2, $3)",
      [menuId, item, Number(locationId)]
    );
  });
  res.send(newMenuResult.rows);
});

```
- ရှင်းလင်းချက်
```js
const { name, description, price, assetUrl, locationId, menuCategoryIds } =
    req.body;
```
- request body ထဲက name, description, price, assetUrl, locationId, menuCategoryIds တွေ ထုတ်ယူထားပါတယ်
```js
 const isValid = name && description && locationId && menuCategoryIds.length;
```
- ထုတ်ယူထားတဲ့ data တွေ valid ဖြစ်မဖြစ် စစ်လိုက်ပါတယ်
```js
 const newMenuResult = await db.query(
    "insert into menus (name, description, price, asset_url) values($1, $2, $3, $4) returning *",
    [name, description, price, assetUrl]
  );
```
- ထုတ်ယူထားတဲ့ data တွေ ထဲက name, description, price, assetUrl ကို သုံးပြီး menus table ထြမှာ insert လုပ် လိုက်ပါတယ်
```js
  const menuId = newMenuResult.rows[0].id;
  menuCategoryIds.forEach(async (item: number) => {
    await db.query(
      "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values($1, $2, $3)",
      [menuId, item, Number(locationId)]
    );
  });
```
- insert လုပ် ပြီး return လုပ်လာတဲ့ array ထဲက id ကို လှမ်းယူလိုက်ပါတယ်
-  request body ထဲက menuCategoryIds array ထဲရှိ item တစ်ခုချင်းဆီကို သုံးပြီး **menus_menu_categories_locations** table ထဲမှာ join လုပ်ပေးလိုက်ဖြစ်ပါတယ်
- ခု menu အသစ်တစ်ခု create လုပ်ကြည့်ပါမယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120468050714570912/image.png)
- create လုပ်လိုက်တာနဲ့ menu item တစ်ခု တိုးပြီး ပြပေးတာကို မြင်ရမှာပါ

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120467829548925079/image.png)

- data base မှာလဲ menu တစ်ခု တိုးလာပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120468895854243981/image.png)
- အလားတူပဲ join table မှာလည်း ခုလို join ပေးသွားပါလိမ့်မယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120468995418624043/image.png)
