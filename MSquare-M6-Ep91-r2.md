## MSquare Programing Fullstack Course

### Episode-_91_

### Summary For  `Room(2)`
## Addon ( CURD) 
- ဒီသင်ခန်းစာမှာတော့ addon တစ်ခု ကို update လုပ်တာနဲ့ delete လုပ်တာကို လေ့လာသွားကြပါမယ်
- အရင်ဆုံး addon တစ်ခုကို နှိပ်လိုက်တဲ့အချိန်မှာ edit လုပ်လို့ရမယ့် page တစ်ခုကို  ပို့ပေးလိုက်ပြီး edit လုပ်လို့ရအောင် လုပ်ပါမယ်
```js
//Addons.tsx

import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  getAddonCategoriesByLocationId,
  getAddonsByLocationId,
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "../utils";
import { Box, Paper, Typography } from "@mui/material";

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

  return (
    <Layout title="Menu Categories">
      <Box sx={{ p: 3, display: "flex" }}>
        {validAddons.map((item) => (
          <Link
            key={item.id}
            to={`/addons/${item.id}`}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            <Paper
              elevation={2}
              sx={{
                width: 170,
                height: 170,
                mr: 4,
                mb: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                pl: 2,
                pb: 2,
              }}
            >
              <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
                {item.name}
              </Typography>
              <Typography sx={{ color: "#4C4C6D", fontSize: 14 }}>
                {item.price} kyat
              </Typography>
            </Paper>
          </Link>
        ))}
      </Box>
    </Layout>
  );
};

export default Addons;
```
- valid ဖြစ်တဲ့ addon တွေကို mui paper component နဲ့ ပြပေးထားပြီး တစ်ခုခုကို နှိပ်လိုက်ရင် အဲ့ဒီ addon ကို update and delete လုပ်လို့ရမယ့် route တစ်ခုဆီ ပို့ပေးထားပါတယ်။
- အဲ့ဒီ route ကို Router component မှာ ထပ်ထည့်ပေးလိုက်ပြီး route တစ်ခု ဖန်တီးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1121392063754285146/image.png)
- /addons/:id route ကို ၀င်လာရင် EditAddon ဆိုတဲ့ component ကို render လုပ်ပေးမှာဖြစ်ပါတယ်
- EditAddon ဆိုတဲ့ component ကို သတ်မှတ်လိုက်ပါမယ်

```js
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Layout from "./Layout";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Addon } from "../typings/types";

import { config } from "../config/config";
import { getAccessToken } from "../utils";

const EditAddon = () => {
  const params = useParams();
  const navigate = useNavigate();
  const addonId = params.id as string;
  
  const { addons, fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();
  const [open, setOpen] =  useState(false);
  const [addon, setAddon] = useState<Addon>();

  const updateAddon = async () => {
    if (!addon?.name) return;
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addon),
    });
  };



  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addons]);

  if (!addon) return null;

  return (
    <Layout title="Edit Addon Categories">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            defaultValue={addon.name}
            onChange={(evt) => setAddon({ ...addon, name: evt.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            type="number"
            defaultValue={addon.price}
            onChange={(evt) =>
              setAddon({ ...addon, price: Number(evt.target.value) })
            }
          />

          <Button
            variant="contained"
            onClick={updateAddon}
            sx={{ width: "fit-content", mt: 3 }}
          >
            Update
          </Button>
        </Box>
     
      </Box>
    </Layout>
  );
};

export default EditAddon;

```
- ရှင်းလင်းချက်
```js
  const params = useParams();
  const navigate = useNavigate();
  const addonId = params.id as string;
```
- edit လုပ်မယ့်  addon id ကို useParams hook နဲ့ လှမ်းယူထားပါတယ်

```js
  const { addons, fetchData } = useContext(AppContext);
  const accessToken = getAccessToken();
```
-  addons နဲ့ fetchData  ကို context ထဲကနေလှမ်းယူထားပြီး accessToken ကို localstroage ကနေ လှမ်းယူထားပါတယ်
- `const [addon, setAddon] = useState<Addon>();` ဆိုပြီး state တစ်ခုလည်း လုပ်ထားပါတယ်
- `const [open, setOpen] =  useState(false);`  ဆိုပြီး state တစ်ခုလည်း လုပ်ထားပါတယ်
```js
const updateAddon = async () => {
    if (!addon?.name) return;
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addon),
    });
  };
```
- updateAddon  function ဖြစ်ပါတယ်
-  `if (!addon?.name) return;` addon ရဲ့ name မရှိခဲ့ ရင် return ပဲ လုပ်ထားတာပါ
-  ကျန်တဲ့ code တွေကတော့ addon ကို body အနေနဲ့ ထည့်ပြီး server ဆီ request လုပ်ထားလိုက်ဖြစ်ပါတယ်

```js
 useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addons]);
```
- addons မှာ တစ်ခုခု ပြောင်းလဲမှုရှိတိုင်း validAdon ကို addons array ထဲမှာ ပြန်ရှာပြီး setAddon နဲ့ addon state တန်ဖိုးကို ပြန်သတ်မှတ်ခိုင်းထားတာဖြစ်ပါတယ်
- 
```js
 <Layout title="Edit Addon Categories">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            defaultValue={addon.name}
            onChange={(evt) => setAddon({ ...addon, name: evt.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            type="number"
            defaultValue={addon.price}
            onChange={(evt) =>
              setAddon({ ...addon, price: Number(evt.target.value) })
            }
          />

          <Button
            variant="contained"
            onClick={updateAddon}
            sx={{ width: "fit-content", mt: 3 }}
          >
            Update
          </Button>
        </Box>
     
      </Box>
    </Layout>
```
- Delete button တစ်ခု လုပ်ထားပြီး နှိပ်လိုက်ရင် open state ရဲ့ တန်ဖိုးကို true အဖြစ် ပြောင်းလဲပေးထားပါတယ်
- text field တွေနဲ့  addon state ထဲက name နဲ့ price ကို ပြပေးထားပြီး တစ်ခုခုပြောင်းတိုင်း   addon state ကို update လုပ်ပေးမှာပါ
- နောက်ဆုံး Update ခလုတ်တစ်ခု ထည့်ပေးထားပြီး နှိပ်လိုက်ရင် အပေါ်မှာ သတ်မှတ်ထားတဲ့ updateAddon function ကို ခေါ်ပေးမှာဖြစ်ပါတယ်
- updateAddon function ကနေ ၀င်လာမယ့် request ကို backend server မှာ လက်ခံပြီး database ကို update လုပ်ပးမှာဖြစ်ပါတယ်
- backend/src/router ထဲမှာ addonRouter.ts ဖိုင်တစ်ခုလုပ်ပြီး addonRouter တစ်ခု သတ်မှတ်လိုက်ပါမယ်

```js
//backend/src/router/addonRouter.ts
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";
const addonsRouter = express.Router();



addonsRouter.put("/:id", checkAuth, async (req: Request, res: Response) => {
  const addonId = req.params.id;
  const isValid = addonId && req.body.name;
  if (!isValid) return res.send(400);
  const existingAddon = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const hasExistingAddon = existingAddon.rows.length > 0;
  if (!hasExistingAddon) return res.send(400);
  const name = req.body.name;
  const existingPrice = existingAddon.rows[0].price;
  const price = req.body.price || existingPrice;
  await db.query("update addons set name = $1, price = $2 where id = $3", [
    name,
    price,
    addonId,
  ]);
  res.send(200);
});

export default addonsRouter;
```
```js
 const addonId = req.params.id;
  const isValid = addonId && req.body.name;
  if (!isValid) return res.send(400);
```
- param အနေနဲ့ ပါလာတဲ့ id နဲ့ bod  အနေနဲ့ ပါလာတဲ့ name ရှိမရှိ စစ်လိုက်ပြီး မရှိခဲ့ရင် bad request(400) ကို response လုပ်လိုက်တာဖြစ်ပါတယ်

```js
  const existingAddon = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const hasExistingAddon = existingAddon.rows.length > 0;
  if (!hasExistingAddon) return res.send(400);
```
- ထပ်ပြီးတော့  param အနေနဲ့ ပါလာတဲ့ id က addon table ထဲမှာ ရှိမရှိ စစ်လိုက်ပြီး  မရှိခဲ့ရင် bad request(400) ကို response လုပ်လိုက်တာဖြစ်ပါတယ်

```js
 const name = req.body.name;
  const existingPrice = existingAddon.rows[0].price;
  const price = req.body.price || existingPrice;
```
- request body ထဲက name နဲ့ existingAddon ထဲက price ကို အရင်ယူလိုက်ပါတယ်
- ပြီးမှ price ရဲ့ တန်ဖိူးအဖြစ် request body ထဲက price ဒါမှမဟုတ် existingAddon ထဲက price လို့  သတ်မှတ်ပေးထားပါတယ်
```js
 await db.query("update addons set name = $1, price = $2 where id = $3", [
    name,
    price,
    addonId,
  ]);
```
- နောက်ဆုံး အထက်မှာ သတ်မှတ်ထားတဲ့ name နဲ့ price ကို  addon table မှာ  param အနေနဲ့ ပါလာတဲ့ id ရှိတဲ့ rows ထဲက name နဲ့ price အဖြစ်  update လုပ်ပေးလိုက်တာဖြစ်ပါတယ်

##
### delete Addon
- ဆက်ပြီး EditAddon componentမှာ ထည့်ပေးထားတဲ့ delete button ကို နှိပ်လိုက်တဲ့ အခါ ဖျက်မှာ သေချာပြီလား မေးတဲ့ dialog box တစ်ခု ပြပေးပြီး addon ကို ဖျက်ပေးလို့ရအောင်လုပ်ပါမယ်
-  delete လုပ်တဲ့အခါ ပြပေးမယ့် dialog box ကို အခြားနေရာတွေမှာလဲ သုံးနိုင်အောင် DeleteDialog.tsx ဆိုပြီး component တစ်ခု သပ်သပ် လုပ်ပေးလိုက်ပါမယ်
```js
// frontend/src/components/DeleteDialog.tsx 

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  callback: () => void;
}

const DeleteDialog = ({ title, open, setOpen, callback }: Props) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mb: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              callback();
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;

```
- title, open, setOpen, callback ဆိုတဲ့ props လေးခု လက်ခံထားပါတယ်
-  `<Dialog open={open}>` ဆိုပြီး open ရဲ့ တန်ဖိူးက props ထဲက open ကို ပေးထားလိုက်ပါတယ်
- `<DialogTitle>{title}</DialogTitle>` ဆိုပြီး  props ထဲက titleကို ပြပေးထားလိုက်ပါတယ်
- `This action cannot be undone.` ဆိုပြီး dialog box ရဲ့ content အဖြစ် ပြပေးထားပါတယ်
- DialogActions အနေနဲ့ cancle နဲ့ comfirm button နှစ်ခု ထည့်ထားပြီး 
- cancle ကို နှိပ်လိုက်ရင် props ထဲက  setopen  fumction ကို parameter `flase` ထည့်ပြီး ခေါ်လိုက်ပါတယ်
- အလုပ်လုပ်ပုံက dialog box ကို ပိတ်ပေးလိုက်မှာပဲ ဖြစ်ပါတယ်
- comfirm button ကို နှိပ်လိုက်ရင်တော့ props အနေနဲ့ ၀င်လာမယ့် callback function ကို ခေါ်ပေးပြီး dialog box ကို ပိတ်ပေးလိုက်မှာပဲ ဖြစ်ပါတယ်
- အခု သတ်မှတ်ထားတဲ့ DeleteDialog component ကို EditAddon component မှာ သုံးပြီး addon ကို delete လုပ်လို့ရအောင် လုပ်ပေးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1121851562197782588/image.png)
```
<DeleteDialog

title="Are you sure you want to delete this addon category?"

open={open}

setOpen={setOpen}

callback={handleDeleteAddon}

/>
```
- DeleteDialog componet ကို ခေါ်သုံးထားပြီး
-  title props အနေနဲ့  "Are you sure you want to delete this addon category?"  အဖြစ် သတ်မှတ်ပေးလိုက်ပါတယ်
- open props အနေနဲ့ open state  တန်ဖိုး သတ်မှတ်ပေးလိုက်ပါတယ်
- setOpen props အနေနဲ့ open state  ကို update လုပ်ပေးတဲ့  setOpen အဖြစ် သတ်မှတ်ပေးလိုက်ပါတယ်
- callback props နေရာမှာတော့ backend server ဆီ request လုပ်ပေးပြီး database မှာ သွားပြင်ခိုင်းမယ့် handleDeleteAddon function ကို သတ်မှတ်ပေးထားပါတယ်
- handleDeleteAddon function ကို သတ်မှတ်ပေးရမှာ ဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1121853184999162037/image.png)
```js
  const handleDeleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons/${addonId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate("/addons");
  };
```
- request ထဲမှာ addon id ကို params အနေနဲ့ ထည့်ပေးလိုက်ပါတယ်
- ပြီးေတာ့ fetchdata ကို ခေါ်ပေးထားပါတယ်
- open state ရဲ့ value ကို လည်း false အဖြစ် update လုပ်ပေးလိုက်ပါတယ်
- နောက်ဆုံး addon page ဆီ navigate လုပ်ပြီး ပို့ပေးလိုက်ပါတယ်
- handleDeleteAddon function ရဲ့ အလုပ်လုပ်မယ့်ပုံစံက delete လုပ်မယ့် addon id ကို backend server ဆီ ပိူ့ပေးလိုက်ပြီး update ဖြစ်တဲ့ data ကို fetch ပြန်လုပ်ပြီး dialog box ကို ပိတ်ကာ addon page ဆိ ပြန်ထွက်ပေးသွားမှာ ဖြစ်ပါတယ်
- delete လုပ်မယ့် request ကို backend ထဲက addonRouter မှာ လက်ခံလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1121855303022039151/image.png)

```js
addonsRouter.delete("/:id", checkAuth, async (req: Request, res: Response) => {
  const addonId = req.params.id;
  if (!addonId) return res.send(400);
  const existingAddon = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const hasExistingAddon = existingAddon.rows.length;
  if (!hasExistingAddon) return res.send(400);
  await db.query("update addons set is_archived = true where id = $1", [
    addonId,
  ]);
  res.send(200);
});

```
- ရှင်းလင်းချက်
```js
 const addonId = req.params.id;
  
  if (!addonId ) return res.send(400);
```
- param အနေနဲ့ ပါလာတဲ့ id ရှိမရှိ စစ်လိုက်ပြီး မရှိခဲ့ရင် bad request(400) ကို response လုပ်လိုက်တာဖြစ်ပါတယ်

```js
  const existingAddon = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const hasExistingAddon = existingAddon.rows.length > 0;
  if (!hasExistingAddon) return res.send(400);
```
- ထပ်ပြီးတော့  param အနေနဲ့ ပါလာတဲ့ id က addon table ထဲမှာ ရှိမရှိ စစ်လိုက်ပြီး  မရှိခဲ့ရင် bad request(400) ကို response လုပ်လိုက်တာဖြစ်ပါတယ်

```js
  await db.query("update addons set is_archived = true where id = $1", [
    addonId,
  ]);
```
-   addons table ထဲမှာ param အနေနဲ့ ပါလာတဲ့ id  ရှိတဲ့ rows ထဲက is_archived ရဲ့ တန်ဖိုးကို true ပေးလိုက်တာဖြစ်ပါတယ်
- addons table ထဲမှာ is_archived  ဆိုတဲ့ column တစ်ခု ထပ်ထည့်ပေးရမှာဖြစ်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1121857001824190545/image.png)
- ထပ်ပြီးတော့ database ထဲက dataw တွေ လှမ်းယူတဲ့ appRouter.ts ထဲက addon တွေ လှမ်းယူတဲ့ နေရာမှာလည်း is_archived   ( false) ဖြစ်တဲ့ addon တွေပဲ လှမ်းယူလို့ရအောင် ပြင်ပေးရပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1121858876619362304/image.png)
- ခုဆိုရင် Addon တစ်ခု ကို update and delete လုပ်လို့ရပြီး ဖြစ်ပါတယ်
