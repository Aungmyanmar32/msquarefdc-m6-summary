## MSquare Programing Fullstack Course
### Episode-*89* 
### Summary For `Room(2)` 
## Menu Categories (CURD) part 2
### ပြီးခဲ့တဲ့ သင်ခန်းစာမှာ menu category တစ်ခုရဲ့  *name* ကို edit & update လုပ်ဖို့ပြင်ဆင်ခဲ့ပါတယ်
- ခု သင်ခန်းစာမှာတော့ အဲ့ဒီ menu category  နဲ့ ချိတ်ထားတဲ့ location တွေကို ပါ  edit & update လုပ်လို့ရအောင် ဆက်လုပ်သွားပါမယ်
- အရင်ဆုံး location တွေ ယူဖို့ getLocations function တစ်ခု ကို utils folder အောက်က index.ts မှာ သတ်မှတ်ပါမယ်

```js
// Added to utils/index.ts

export const getLocationsByMenuCategoryId = (
  locations: Location[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.locations_id);
  return locations.filter((item) =>
    validLocationIds.includes(item.id as number)
  );
};
```
- **getLocationsByMenuCategoryId**  function တစ်ခုကို သတ်မှတ်ထားပြီး locations, menuCategoryId, menusMenuCategoriesLocations ဆိုတဲ့ parameter သုံးခု လက်ခံထားပါတယ်
- ၀င်လာမယ့် menuCategoryId နဲ့ ချိတ်ထားတဲ့ location တွေကို filter လုပ်ပြီး return လုပ်ထားပါတယ်
- အဲ့ဒီ function ကို EditMenuCategory.tsx မှာ သုံးပြီး edit လုပ်မယ့် menu category နဲ့ သက်ဆိုင်တဲ့ location ကို ရယူမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1119931213281493134/image.png)
```js
  const validLocations = getLocationsByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );

  const mappedValidLocations = validLocations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));

  const mappedLocations = locations.map((item) => ({
    id: item.id as number,
    name: item.name,
  }));
```
- validLocations တွေရဖို့ အထက်မှာ သတ်မှတ်ထားတဲ့ function ကို ခေါ်သုံးလိုက်ပြီး parameter အနေနဲ့ context ထဲက locations , menusMenuCategoriesLocations ရယ် လက်ရှိ edit လုပ်မယ့် menuCategory Id ကို ထည့်ပေးထားပါတယ်
- ရလာတဲ့ validLocations ကို map လုပ်ပြီး location id နဲ့ name တွေ ပါတဲ့ object item တွေ ပါတဲ့ array တစ်ခု လုပ်လိုက်ပါတယ်
- context ထဲ ရှိတဲ့ location တွေကိုလဲ အထက်ပါအတိုင်း map လုပ်ထားလိုက်ပါတယ်
- အခု map လုပ်ပြီး ရလာတဲ့ array တွေကို autocomplete နဲ့ ပြပေးပြီး menucategory နဲ့ ချိတ်မယ့် location တွေကို  add and remove လုပ်လို့ရအောင် လုပ်ပါမယ်
- Autocomplete Component မှာ အရင် သင်ခန်းစာမှာ သုံးခဲ့တဲ့ autocomplete ကို မသုံးတော့ပဲ ရိုးရှင်းတဲ့ နောက် autocomplete တစ်ခု ကို ထပ်သုံးပါမယ်

```js
// src/components/Autocomplete.tsx

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import MuiAutoComplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option[];
  label: string;
  placeholder: string;
  onChange: (options:  Option[]) =>  void;
}

const Autocomplete = ({ options, defaultValue, label, placeholder,onChange }: Props) => {
  return (
    <MuiAutoComplete
      multiple
      options={options}
      defaultValue={defaultValue}
      disableCloseOnSelect
      onChange={(evt, values) =>  onChange(values)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      sx={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
};

export default Autocomplete;

```
- ရှင်းလင်းချက်

```js
interface Option {
  id: number;
  name: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option[];
  label: string;
  placeholder: string;
  onChange: (options:  Option[]) =>  void;
}

const Autocomplete = ({ options, defaultValue, label, placeholder,onChange }: Props) => {.........}
```
- Autocomplete component တစ်ခု လုပ်ထားပြီး **options**, **defaultValue**, **label**, **placeholder**,**onChange** ဆိုတဲ့ props ငါးခု လက်ခံထားပါတယ်
- အပေါ်မှာတော့ ၀င်လာမယ့် props တွေအတွက် typing လုပ်ပေးထားတာဖြစ်ပါတယ်

```js
return (
    <MuiAutoComplete
      multiple
      options={options}
      defaultValue={defaultValue}
      disableCloseOnSelect
      onChange={(evt, values) =>  onChange(values)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      sx={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
```
- component ထဲမှာ mui autocomplete ကို return လုပ်ထားပါတယ်
   - multiple ဆိုတာက တစ်ခုထပ်ပို ရွေးလို့ရအောင် သတ်မှတ်ပေးထားတာပါ
   - options ဆိုတာက autocomplete မှာ  သုံးမယ့် option object တွေပါတဲ့  array ကို သတ်မှတ်ပေးထားတာပါ
   - defaultValue က autocomplete မှာ ပြပေးမယ့် select လုပ်ပြီးသား items တွေ ဖြစ်ပါတယ်
   - disableCloseOnSelect ဆိုတာက တစ်ခုခုရွေးလိုက်တိုင်း autocomplete မှာ ပြပေးနေတဲ့ items list ပိတ်မသွားရအောင် သတ်မှတ်ထားပါတယ်
   - **onChange={(evt, values) =>  onChange(values)}** က တစ်ခုခု ရွေးလိုက်တိုင်း props အနေနဲ့ ၀င်လာမယ့် onchange function ကို ခေါ်လိုက်ပြီး parameter အနေနဲ့ ရွေးထားတဲ့ values ကို ထည့်ပေးထားတာဖြစ်ပါတယ်
   ```
     renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
- ဒါကတော့ option item တွေပြပေးမယ့် list ပုံစံကို သတ်မှတ်ထားတာဖြစ်ပါတယ်

```
 renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
```
- ဒါကတော့ ရွေးထားတဲ့ option item တွေကို  text field မှာ ပြပေးမယ့် ပုံစံ သတ်မှတ်ထားတာဖြစ်ပါတယ်
- အထက်ပါ Autocomplete component ကို သုံးပြီး EditMenuCategory componentမှာ location တွေပါ တစ်ခါတည်း add and removed လုပ်လို့ရအောင် လုပ်ပေးပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120095410942394378/image.png)
```js
   <Autocomplete
          options={mappedLocations}
          defaultValue={mappedValidLocations}
          label="Locations"
          placeholder="Locations"
          onChange={(options) =>
            setNewMenuCategory({
              ...newMenuCategory,
              locationIds: options.map((item) => item.id),
            })
          }
        />
```
- Autocomplete component ကို ခေါ်သုံးထားပြီး
   - options အဖြစ် context ထဲက location အားလုံးကို ထည့်ပေးထားပါတယ်
   - defaultValueအဖြစ် လက်ရှိ update လုပ်မယ့် mneu category နဲ့ချိတ်ထားတဲ့location တွေကို ထည့်ပေးထားပါတယ်
   - Label နဲ့ placeholder ကို Locations ဆိုတဲ့ string ပဲ ထည့်ပေးလိုက်ပါတယ်
   - onChangeမှာတော့ newMenuCategory ထဲက locationIds array ကို update လုပ်လိုက်ပါတယ်
   - newMenuCategory ရဲ့ တန်ဖိုးထဲမှာ  locationIds array ကို ထပ်ထည့်ပေးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120096972251086869/image.png)
- ခု menu category တစ်ခုကို update လုပ်တဲ့ နေရာဆီသွားပြီး name ကို တစ်ခုခု ထပ်ထည့်ပြီး location ကို လဲ နောက်ထပ်တစ်ခု ထပ်ရွေးပေးကာ update လုပ်ကြည့်ပါက ခုလို log ထုတ်ပေးမှာဖြစ်ပါတယ်

### before
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120102042946502776/image.png)
### After
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120102381196152872/image.png)
- ခုတစ်ခါတော့ update button ကို click လိုက်တဲ့အခါ backend က server ဆီ request လုပ်ပြီး newMenuCategory ရဲ့ တန်ဖိုးကို body အနေနဲ့ ထည့်ပေးလိုက်မှာဖြစ်ပါတယ်

```js
// EditMenuCategory.tsx --> updateMenuCategory function

  const updateMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
  };
```
- အဲ့ဒီ request ကို backend မှာလက်ခံပြီး database ကို update လုပ်မှာဖြစ်ပါတယ်
- backend/src/routers အောက်မှာ menuCategoriesRouter.ts file တစ်ခု လုပ်ပါမယ်
```js
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";
const menuCategoriesRouter = express.Router();

menuCategoriesRouter.put("/", async (req: Request, res: Response) => {
  const { id, name, locationIds } = req.body;
  if (!id) return res.send(400);
  if (name) {
    await db.query("update menu_categories set name = $1 where id = $2", [
      name,
      id,
    ]);
  }
  
  const existingLocationResultRows = await db.query(
    "select locations_id from menus_menu_categories_locations where menu_categories_id = $1",
    [id]
  );
  
  const existingLocationIds = existingLocationResultRows.rows.map(
    (item) => item.locations_id
  );
 
  const removedLocationIds = existingLocationIds.filter(
    (item) => !locationIds.includes(item)
  );
  
  if (removedLocationIds.length) {
    removedLocationIds.forEach(async (item) => {
      await db.query(
        "update menus_menu_categories_locations set is_archived = true where menu_categories_id = $1 AND locations_id = $2",
        [Number(id), item]
      );
    });
  }
  
  const addedLocationIds = locationIds.filter(
    (item: number) => !existingLocationIds.includes(item)
  );

  res.send(200);
});

export default menuCategoriesRouter;
```
- ရှင်းလင်းချက်
```
 const { id, name, locationIds } = req.body;
  if (!id) return res.send(400);
```
- request body နဲ့ အတူပါလာတဲ့ id, name, locationIds တွေ လှမ်းယူထားပါတယ်
- id ါမလာရင် 400 ကို response ပြီး return လုပ်ပေးလိုက်ပါတယ်
```js
 if (name) {
    await db.query("update menu_categories set name = $1 where id = $2", [
      name,
      id,
    ]);
  }
```
- name ပါလာခဲ့ရင်တော့ id ကို သုံးပြီး menu_categories table ထဲက row မှာname ရဲ့ တန်ဖိုးကို update လုပ်လိုက်တာဖြစ်ပါတယ်

```
 const existingLocationResultRows = await db.query(
    "select locations_id from menus_menu_categories_locations where menu_categories_id = $1",
    [id]
  );
  
  const existingLocationIds = existingLocationResultRows.rows.map(
    (item) => item.locations_id
  );
```
- request ၀င်လာတဲ့ menu categories id ကို သုံးပြီး သူတဲ့ချိတ်ထားတဲ့ location id တွေကို  database ကနေ အရင် လှမ်းယူလိုက်ပါတယ်
```js
 const removedLocationIds = existingLocationIds.filter(
    (item) => !locationIds.includes(item)
  );
```
- existingLocationIds  က  id တွေက request နဲ့ ပါလာတဲ့ locationIds array ထဲမှာ မပါခဲ့လို့ ရှိရင် ( **နဂိုချိတ်ထားတဲ့ location တစ်ချို့ကို user က ဖြုတ်လိုက်ပြီး update လုပ်လာခဲ့**) အဲ့ဒိ ဖြုတ်လိုက်တဲ့ location id တွေကို removedLocationIds ဆိုပြီး သိမ်းထားလိုက်ပါတယ်
```js
 if (removedLocationIds.length) {
    removedLocationIds.forEach(async (item) => {
      await db.query(
        "update menus_menu_categories_locations set is_archived = true where menu_categories_id = $1 AND locations_id = $2",
        [Number(id), item]
      );
    });
  }
```
- ဖြုတ်လိုက်တဲ့ location id တွေကို removedLocationIds ဆိုပြီး သိမ်းထားတဲ့ array ထဲမှာ item တွေ ရှိခဲ့ရင်  အဲ့ဒီ menu categories id နဲ့ array ထဲက location id ချိတ်ထားတဲ့ row ထဲ is_archived ရဲ့ တန်ဖိုးကို true ပေးလိုက်တာဖြစ်ပါတယ်
## is_archived
### is_archived ဆိုတာက database မှာရှိတဲ့ table တွေထဲ တန်ဖိုးတစ်ခုခု ဖျက်ချင်ရင် အရင်လို့ "DELET FROM table-name ...." မလုပ်တော့ပဲ  is_archived ကို true လုပ်ထားခြင်းဖြင့် ဖျက်ထားသလို သတ်မှတ်ပေးထားတာဖြစ်ပါတယ် ( တကယ် delete လုပ်လိုက်တာမဟုတ်လို့ is_archived ကို false ပြန်ပြောင်းပြီး ဖျက်ထားတာကနေ ပြန်သုံးလို့ရမှာဖြစ်ပါတယ်။

- လက်ရှိ လက်ရှိ ကျနော်တို့ရဲ့  menus_menu_categories_locations table ထဲမှာ is_archived ဆိုတဲ့ column မရှိသေးတာမလို့ ထပ်ထည့်လိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120112236195749898/image.png)

- ဆက်ပြီးတော့ context မှာသိမ်းဖို့ server ဆီက data တွေ လှမ်းယူတဲ့အချိန်မှာ is_archived (true ) မဖြစ်တဲ့ data တွေပဲ လှမ်းယူလို့ ရအောင် လုပ်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1120120206514212964/image.png)

- appRouter.ts မှာ get method နဲ့ request လက်ခံတဲ့ fi=unction ထဲက menus_menu_categories_locations table ထဲက dataတွေ select လုပ်တဲ့အခါ is_archived false ဖြစ်တဲ့ rows တွေပဲ ယူထားလိုက်တာဖြစ်ပါတယ်
