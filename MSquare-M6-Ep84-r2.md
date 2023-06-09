## MSquare Programing Fullstack Course
### Episode-*84* 
### Summary For `Room(2)` 
## Create *Table* table ( CURD )
- Location တစ်ခုမှာ စားပွဲခုံ ( table) တွေ သိမ်းဖို့ Table ဆိုတဲ့  table တစ်ခုကို database မှာ အသစ်လုပ်ပါမယ်
```sql
CREATE TABLE tables (
id serial PRIMARY KEY NOT NULL,
name text NOT NULL,
locations_id integer NOT NULL REFERENCES locations
)

```
- Tables ဆိုတဲ့ table တစ်ခု create လုပ်လိုက်ပြီး location နဲ့ ချိတ်ထားပါတယ်။
##
### frontend မှာလည်း Tables component တစ်ခုလုပ်ပြီး nav bar နဲ့ router မှာ ချိတ်ဆက်ပေးလိုက်ပါမယ်
- အရင်ဆုံး Tables component လုပ်ပါမယ်
```js

// frontend /src/components/Tables.tsx

import {
  Box,
  Button,

} from "@mui/material";
import Layout from "./Layout";

const Tables = () => {


  return (
    <Layout title="Tables">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 3,
          pt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained">Create new table</Button>
        </Box>
        <Box sx={{}}>
          <h1>Selected locations tables</h1>
        </Box>
      </Box>
     
    </Layout>
  );
};

export default Tables;

```
- ပြီးရင် router component မှာ route တစ်ခု ထပ်ထည့်ပေးပါမယ်
### Router.tsx
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116812542321373205/image.png)
- ဆက်ပြီးတော့ navbar component မှာ table အတွက် တစ်ခု ထပ်ထည့်ပါမယ်
### Navbar.tsx
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116813030412533870/image.png)

- location အပေါ်မှာထားချင်တာမလို့ id 6 ပေးလိုက်ပြီး location နဲ့ seting id တွေကို 1 ပေါင်းပေးထားပါတယ်
- drawer array မှာ item တစ်ခုတိုးလာတဲ့အတွက် line 99 က slice လုပ်တဲ့နေရာမှာ လည်း 1 တိုးပေးထားပါတယ်
- ခု app ကို စမ်းသပ်ကြည့်ပါက အောက်ပါအတိုင်း ပြပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116813988232171620/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116814046684008588/image.png)
### CREATE NEW TABLE ကို နှိပ်လိုက်တဲ့အချိန် MUI Dialog Box တစ်ခုပြပြီး table create လို့ရအောင် ဆက်လုပ်ပါမယ်
```js
// Tables.tsx

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useState } from "react";

import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

const Tables = () => {
 
  const [open, setOpen] = useState(false);


  return (
    <Layout title="Tables">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 3,
          pt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create new table
          </Button>
        </Box>
        <Box sx={{}}>
          <h1>Selected locations tables</h1>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new table</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <TextField
         
            placeholder="Table name"
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained">Create</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tables;

```
- Open state တစ်ခု လုပ်ထားပြီး false ပေးထားလိုက်ပါတယ်

   
```
 const [open, setOpen] = useState(false);
 ```

- CREATE NEW TABLE ကို နှိပ်လိုက်တဲ့အချိန် open state တန်ဖိုးကို true ဆိုပြီး update လုပ်ပေးလိုက်ပါတယ်
- Dialog box တစ်ခု လုပ်ထားပြီး open state တန်ဖိုးက true ဖြစ်နေရင် ပြပေးမှာဖြစ်ပြီး false ဖြစ်နေရင် ပိတ်ထားပေးမှာဖြစ်ပါတယ်
-  Dialog box အထဲမှာတော့ text field တစ်ခု နဲ့ button တစ်ခု ထည့်ပေးထားပါတယ် 
```
   <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new table</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <TextField
         
            placeholder="Table name"
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained">Create</Button>
          </Box>
        </DialogContent>
      </Dialog>
```
- CREATE NEW TABLE ကို နှိပ်လိုက်တဲ့အချိန် Box တစ်ခု ပြပေးမှာဖြစ်ပြီး box အပြင်ဘက် တစ်နေရာ မှာ နှိပ်လိုက်တဲ့ အချိန် ပျောက်သွားမှာ ဖြစ်ပါတယ်


![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116818785773555862/image.png)
##
### ဆက်ပြီး Table တစ်ခု create လုပ်ပြီး server ဆီ request ပို့လိုက်ဖို့ ပြင်ဆင်ပါမယ်

- အရင်ဆုံး localStroage မှာ သိမ်းထားတဲ့ accessToken နဲ့ selectedLocationId ကို ဖိုင်တစ်ခု လှမ်းယူထားပြီး ကျန်တဲ့ component တွေမှာ သုံးလို့ရအောင် export လုပ်ထားလိုက်ပါမယ်။

```
// frontend/src/utils/generals.ts
export const getSelectedLocationId = () => {
  return localStorage.getItem("selectedLocationId");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

```
- ပြီးရင် Table component မှာ create new table ကို နှိပ်လိုက်ရင် ပေါ်လာတဲ့ Box အထဲ က textfield မှာ ရေးထည့်လိုက်တဲ့ table name ကို state တစ်ခုမှာ သိမ်းပြီး server ဆီ request လုပ်ပေးလိုက်ပါမယ်

```js
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Layout from "./Layout";
import { useContext, useState } from "react";
import { getAccessToken, getSelectedLocationId } from "../utils/generals";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";

const Tables = () => {
  const { fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState("");
  const selectedLocationId = getSelectedLocationId();
  const accessToken = getAccessToken();
 

  const createTable = async () => {
    if (!newTable) return alert("Table name is required");
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTable, locationId: selectedLocationId }),
    });
    fetchData();
    setOpen(false);
  };

  return (
    <Layout title="Tables">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 3,
          pt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create new table
          </Button>
        </Box>
        <Box sx={{}}>
          <h1>Selected locations tables</h1>
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new table</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <TextField
            onChange={(evt) => setNewTable(evt.target.value)}
            placeholder="Table name"
            sx={{ width: "100%" }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={createTable}>
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tables;

```
- newTable ဆိုတဲ့ state တစ်ခု လုပ်ထားပြီး Dialog box က text field ထဲ တစ်ခုခု ထည့်လိုက်ရင် newTable တန်ဖိုးကို Update လုပ်လိုက်ပါတယ်
- Create BUTTON ကိုနှိပ်လိုက်ရင် createTable function ကို ခေါ်ထားလိုက်ပါတယ်
- createTable function မှာတော့ newTable တန်ဖိုးနဲ့ localStroage  က ယူထားတဲ့ location ID ကို server ဆီ request လုပ်တဲ့အခါ ထည့်ပေးလိုက်တာဖြစ်ပါတယ်။
##
### frontend ကနေ ၀င်လာတဲ့ request ကို backend မှာ လက်ခံပြီး database မှာ သိမ်းပေးပါမယ်
- tableRouter.ts ဖိုင်တစ်ခုလုပ်ပါမယ်

```js
// backend/src/router/tableRouter.ts

import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const tablesRouter = express.Router();

tablesRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, locationId } = req.body;
  const isValid = name && locationId;
  if (!isValid) return res.send(400);
  await db.query("insert into tables (name, locations_id) values($1, $2)", [
    name,
    locationId,
  ]);
  res.send(200);
});

export default tablesRouter;
```
- request နဲ့ အတူ ၀င်လာတဲ့ name နဲ့ location id ကို ယူပြီး database ထဲက ***tables*** table မှာ insertလုပ်ပေးလိုက်ဖြစ်ပါတယ်
- tableRouter ကို server.ts မှာ သုံးပေးမှ အလုပ်လုပ်မှာဖြစ်ပါတယ်

```js
// server.ts

import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import menuRouter from "./src/routers/menuRouter";
import authRouter from "./src/routers/authRouter";
import appRouter from "./src/routers/appRouter";
import locationRouter from "./src/routers/locationRouter";
import menuCategoriesRouter from "./src/routers/menuCategories";
import tableRouter from "./src/routers/tableRouter";

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/menus", menuRouter);
app.use("/auth", authRouter);
app.use("/", appRouter);
app.use("/locations", locationRouter);
app.use("/menuCategories", menuCategoriesRouter);
app.use("/tables", tableRouter);

app.listen(port, () => {
  console.log("Server has started on port:", port);
});

```
- table တစ်ခု create လုပ်ကြည့်ပါက database မှာ tables table ထဲ create လုပ်လိုက်တဲ့ table ရောက်လာကို တွေ့ရမှာပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116829892349268088/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1116830002856595486/image.png)
##
### database ထဲက tables table မှ data တွေ လှမ်းယူကာ context မှာ သိမ်းပြီး Tables component မှာ ပြပေးနိုင်အောင် ဆက်လုပ်ပါမယ်
- backend ရှိ appRouter မှာ get နဲ့ data တွေ လှမ်းယူတဲ့အခါ tables table ထဲက data တွေလဲ ယူပေးရမှာဖြစ်ပါတယ်။
-
### backend/src/router/appRouter.ts

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1116831406761447525/image.png)
- tables table ထဲက data တွေ လှမ်းယူလိုက်ပြီး response ပြန်တဲ့အခါ tables ဆိုပြီး ရလာတဲ့ data တွေ ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- အဲ့ဒီ data တွေကို context မှာ သိမ်းပါမယ်
- မသိမ်းခင် types အရင် လုပ်ပေးလိုက်ပါမယ်

```js
// frontend/src/typings.ts

interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
  locationIds: number[];
  description?: string;
  assetUrl?: string;
  isAvailable?: boolean;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  isAvailable: boolean;
  addonCategoriesIds: string[];
}

export interface AddonCategory extends BaseType {
  isRequired: boolean;
}

export interface Location extends BaseType {
  companyId?: string;
  address?: string;
}

export interface MenuLocation {
  id: number;
  menus_id: number;
  locations_id: number;
  is_available: boolean;
}

export interface Company {
  id?: string;
  name: string;
  address: string;
}

export interface Table extends BaseType {
  locations_id: number;
}

```
- context data object ထဲမှာ tables ဆိုတဲ့ key တစ်ခု ထပ်ထည့်ပြီး update လုပ်ပေးရမှာ ဖြစ်ပါတယ်

```
import { createContext, useEffect, useState } from "react";
import {
  Menu,
  MenuCategory,
  Addon,
  AddonCategory,
  MenuLocation,
  Company,
  Location,
  Table,
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
  tables: Table[];
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
  tables: [],
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
      tables,
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
      tables,
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

- ခုဆိုရင် tables တွေ အကုန်လုံး contest ထဲမှာ သိမ်းထားလိုက်ပြီးမို့ Tables component မှာ ရလာတဲ့ table တွေကို ထုတ်ယူလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1116835182008340563/image.png)

- context ထဲက tables ကို လှမ်းယူလိုက်ပြီး လက်ရှိ locations id နဲ့ ချိတ်ထားတဲ့ table တွေကို validTables array ထဲ သိမ်းပြီး log ထုတ်ကြည့်ထားတာဖြစ်ပါတယ်
- ခု tables route ကို ၀င်ကြည့်ပါက ခုနက crate လုပ်ထားတဲ့ table 01 ကို log ထုတ်ပေးမှာဖြစ်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1116836087759917076/image.png)

- နောက်ထပ် table တစ်ခု create လုပ်ကြည့်ပါက table နှစ်ခုပါတဲ့ array ကို log ထုတ်ပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1116836508058529882/image.png)
##
## Try this !!
### validTable array ထဲက table တွေကို Tables component မှာ ပြပေးနိုင်အောင် လုပ်ကြည့်ပါ
