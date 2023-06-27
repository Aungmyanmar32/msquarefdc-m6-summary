## MSquare Programing Fullstack Course
### Episode-*94* 
### Summary For `Room(2)` 
## Create menu category , addon category , addon
### Create menu category
- CreateMenuCategories.tsx ဆိုတဲ့ component တစ်ခု လုပ်လိုက်ပါမယ်
```js
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import Autocomplete from "./Autocomplete";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateMenuCategory = ({ open, setOpen }: Props) => {
  const { fetchData, locations } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });

  const createNewMenuCategory = async () => {
    const isValid = newMenuCategory.name && newMenuCategory.locationIds.length;
    if (!isValid) return alert("Name and locations are required.");
    await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create new menu category</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 400,
          }}
        >
          <TextField
            placeholder="Name"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
            }
          />
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              options={mappedLocations}
              label="Locations"
              placeholder="Locations"
              onChange={(options) =>
                setNewMenuCategory({
                  ...newMenuCategory,
                  locationIds: options.map((item) => item.id),
                })
              }
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mb: 2, mr: 2 }}>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={createNewMenuCategory}
          >
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMenuCategory;
```
- CreateMenu component က ကုဒ်တွေ ပြန်ကူးထည့်လိုက်တာဖြစ်ပြီး မလိုအပ်တဲ့ ပုံတင်တဲ့ ဟာတဲ့ price ကို ဖြုတ်လိုက်တာဖြစ်ပါတယ်
- အကျဥ်းချုပ် ပြောရရင်တော့ open နဲ့ onClose props တွေ လက်ခံတဲ့ MUI Dialog box တစ်ခု လုပ်ထားပြီး အထဲမှာ name input  နဲ့  location တွေ ရွေးလို့ရတဲ့ Autocomplete ကို သုံးထားပြီး newMenuCategory  state ကို update လုပ်ထားတာပဲဖြစ်ပါတယ်
- Create ခလုတ်တစ်ခုလဲ လုပ်ထားပြီး နှိပ်လိုက်ရင် createNewMenuCategory function ကို ခေါ်ပေးလိုက်ပါတယ်
```js
 const createNewMenuCategory = async () => {
    const isValid = newMenuCategory.name && newMenuCategory.locationIds.length;
    if (!isValid) return alert("Name and locations are required.");
    await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };
```
-  createNewMenuCategory function ထဲမှာတော့ newMenuCategory state ထဲ value တွေ ရှိမရှိစစ်လိုက်ပြီး ရှိခဲ့ရင် server ဆီ post method နဲ့ request လုပ်ပြီး newMenuCategory ကို body အနေနဲ့ ထည့်ပေးလိုက်ပါတယ်
- ပြီးရင် fetchData function ကို ခေါ်ပေးလိုက်ပြီး open state ကို flase ပြန်ထားပေးလိုက်တာပဲဖြစ်ပါတယ်
- MenuCategories componet မှာလည်း create new menu category ခလုတ်တစ်ခု ထပ်ထည့်ပြီး CreateMenuCategory component ကို အဲ့ဒီခလုတ်နှိပ်လိုက်ချိန်မှာ ပြပေးလိုက်မှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1123210001129939005/image.png)

- open state တစ်ခု လုပ်ထားပါတယ်
- create new menu category ကို နှိပ်လိုက်ရင် open state ကို true ပြောင်းလိုက်ပါတယ်
- CreateMenuCategory component ကို သုံးလိုက်ပြီး open props value ကို open state ရဲ့ value အဖြစ် သတ်မှတ်ပေးလိုက်ပါတယ်
- အလုပ်လုပ်ပုံကတော့ create new menu category ကိုနှိပ်လိုက်ရင် CreateMenuCategory component ထဲက dialog box ကို ပြခိုင်းလိုက်တာပဲ ဖြစ်ပါတယ်
-  menu category တစ်ခု အသစ်လုပ်ဖို့ frontend မှာ ပြင်ဆင်ပြီးပါပြီး
- createNewMenuCategory function မှ တစ်ဆင့် ၀င်လာမယ့် request ကို backend မှာ လက်ခံပြီး database က သက်ဆိုင်ရာ table မှာ insert လုပ်ပေးလိုက်ပါမယ်

```js
// add to --> backend/src/router/menuCategorisRouter.ts


menuCategoriesRouter.post(
  "/",
  checkAuth,
  async (req: Request, res: Response) => {
    const { name, locationIds } = req.body;
    const isValid = name && locationIds.length;
    if (!isValid) return res.send(400);
    const newMenuCategoryResult = await db.query(
      "insert into menu_categories (name) values ($1) returning *",
      [name]
    );
    const newMenuCategoryId = newMenuCategoryResult.rows[0].id;
    locationIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_menu_categories_locations (menu_categories_id, locations_id) values ($1, $2)",
        [newMenuCategoryId, item]
      );
    });
    res.send(200);
  }
);

```
- ၀င်လာတဲ့ name နဲ့  menu_categories table မှာ row တစ်ခု ထပ်ထည့်လိုက်ပြီး newMenuCategoryResult အဖြစ် သိမ်းထားပါတယ်
- newMenuCategoryResult ကနေ id ကို လှမ်းယူပြီး request body ထဲက location id တွေနဲ့ menus_menu_categories_locations table ထဲမှာ ချိတ်ပေးလိုက်တာပဲဖြစ်ပါတယ်
##
### Create addon category
- CreateAddonCategory.tsx component တစ်ခုလုပ်လိုက်ပါမယ်

```js
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { getAccessToken } from "../utils";
import Autocomplete from "./AutoComplete";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateAddonCategories = ({ open, setOpen }: Props) => {
  const { fetchData, menus } = useContext(AppContext);
  const accessToken = getAccessToken();
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const createNewAddonCategory = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid) return alert("Name and menus are required.");
    await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  const mappedMenus = menus.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create new addon categories</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 300,
          }}
        >
          <TextField
            placeholder="Name"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewAddonCategory({
                ...newAddonCategory,
                name: evt.target.value,
              })
            }
          />
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              options={mappedMenus}
              label="Menus"
              placeholder="Menus"
              onChange={(options) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  menuIds: options.map((item) => item.id),
                })
              }
            />
          </Box>
          <FormControlLabel
            sx={{ my: 2 }}
            control={
              <Switch
                checked={newAddonCategory.isRequired}
                onChange={(evt) =>
                  setNewAddonCategory({
                    ...newAddonCategory,
                    isRequired: evt.target.checked,
                  })
                }
              />
            }
            label="required"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mb: 2, mr: 2 }}>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={createNewAddonCategory}
          >
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAddonCategories;

```
- အထက်က CreateMenuCategory component ထဲကလိုပဲ ပြန်ကူးထည့်လိုက်တာဖြစ်ပြီး
- DialogContent အနေနဲ့ addon category တစ်ခု အတွက် လိုအပ်တဲ့ name, menu နဲ့ required  ကိုပဲ ထည့်ပေးထားပါတယ်
-  တစ်ခုခုပြောင်းလိုက်တိုင်း newAddonCategory ကို update လုပ်ပေးထားပါတယ်
- Create ခလုတ်တစ်ခုလည်း ထည့်ပေးထားပြီး click လိုက်ရင် createNewAddonCategory ကို ခေါ်ပေးထားပါတယ်
```js
  const createNewAddonCategory = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid) return alert("Name and menus are required.");
    await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };
```
-  createNewAddCategory function ထဲမှာတော့ newAddonCategory state ထဲ value တွေ ရှိမရှိစစ်လိုက်ပြီး ရှိခဲ့ရင် server ဆီ post method နဲ့ request လုပ်ပြီး newAddonCategory ကို body အနေနဲ့ ထည့်ပေးလိုက်ပါတယ်
- ပြီးရင် fetchData function ကို ခေါ်ပေးလိုက်ပြီး open state ကို flase ပြန်ထားပေးလိုက်တာပဲဖြစ်ပါတယ်
- AddonCategories componet မှာလည်း create new Addon category ခလုတ်တစ်ခု ထပ်ထည့်ပြီး CreateAddonCategory component ကို အဲ့ဒီခလုတ်နှိပ်လိုက်ချိန်မှာ ပြပေးလိုက်မှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1123219952091013200/image.png)

- open state တစ်ခု လုပ်ထားပါတယ်
- create new Addon -?category ကို နှိပ်လိုက်ရင် open state ကို true ပြောင်းလိုက်ပါတယ်
- CreateAddonCategory component ကို သုံးလိုက်ပြီး open props value ကို open state ရဲ့ value အဖြစ် သတ်မှတ်ပေးလိုက်ပါတယ်
- အလုပ်လုပ်ပုံကတော့ create new Addoncategory ကိုနှိပ်လိုက်ရင် CreateAddonCategory component ထဲက dialog box ကို ပြခိုင်းလိုက်တာပဲ ဖြစ်ပါတယ်
-  Addoncategory တစ်ခု အသစ်လုပ်ဖို့ frontend မှာ ပြင်ဆင်ပြီးပါပြီး
- createNewAddonCategory function မှ တစ်ဆင့် ၀င်လာမယ့် request ကို backend မှာ လက်ခံပြီး database က သက်ဆိုင်ရာ table မှာ insert လုပ်ပေးလိုက်ပါမယ်
```js
addonCategoriesRouter.post(
  "/",
  checkAuth,
  async (req: Request, res: Response) => {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name && isRequired !== undefined && menuIds.length;
    if (!isValid) return res.send(400);
    const newAddonCategory = await db.query(
      "insert into addon_categories (name, is_required) values ($1, $2) returning *",
      [name, isRequired]
    );
    const newAddonCategoryId = newAddonCategory.rows[0].id;
    menuIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_addon_categories (menus_id, addon_categories_id) values($1, $2)",
        [item, newAddonCategoryId]
      );
    });
    res.send(200);
  }
);
```
-  ၀င်လာတဲ့ name နဲ့ required ကို သုံးပြီး addon categories table မှာ rows အသစ် ထည့်ပေးလိုက်ပါတယ်
- အဲ့ဒီ row ထဲက id ကို ပြန်ထုတ်လိုက်ပြီး req body ထဲက menu id တွေ နဲ့ menu_addon_categories table မှာ ထပ် join ပေးလိုက်တာပဲ ဖြစ်ပါတယ်
