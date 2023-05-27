## MSquare Programing Fullstack Course
### Episode-*76* 
### Summary For `Room(2)` 
## Refactor
- အရင် သင်ခန်းစာ တွေမှာ backend code တွေကို အစီစဥ်တကျ မဟုတ်ပဲ server.ts မှာပဲ စုပြုံပြီးရေးခဲ့ကြပါတယ်
- ခုသင်ခန်းစာမှာတော့ code တွေကို သူ့ folder နဲ့သူ သီးသန့်ခွဲရေးပြီး server.ts မှာ ပြန်ခေါ်သုံးကြပါမယ်
- src folder အောက်မှာ routers folder တစ်ခုလုပ်ပါမယ်
- အဲ့ဒီfolder ထဲမှ request ၀င်လာမယ့် route တွေကို ထားမှာဖြစ်ပါတယ်။

-router folder ထဲမှာ menuRouter.ts ဖိုင်တစ်ခုလုပ်လိုက်ပြီး server.ts ထဲမှာ /menu route နဲ့ request လက်ခံတဲ့ middlewareကို ပြောင်းထည့်လိုက်ပါမယ်
```js
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";

const menuRouter = express.Router();

menuRouter.get("/menus", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
});

export default menuRouter;
```
- express Router ကို သုံးပြီး menuRouter တစ်ခု create လုပ်လိုက်ပါတယ်
- app.get နေရာမှာ menuRouter ကို သုံးလိုက်ပါတယ်
- server.ts မှာ /menus route နဲ့ request တွေ ၀င်လာရင် menuRouter ကို ခေါ်ပေးလိုက်ပါမယ်

```js
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./src/config/config";
import { checkAuth } from "./src/utils/auth";
import menuRouter from "./src/routers/menuRouter";


const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/menus", menuRouter);


app.post("/auth/register",......)
app.post("/auth/login",......)

app.listen(port, () => {
  console.log("Server has started on port:", port);
});

```
- use middleware ကို သုံးပြီး "/menus" နဲ့ request ၀င်လာရင် menuRouter ကိုခေါ်သုံးလိုက်ပါတယ်
- app.use("/menus", menuRouter) မှာ အရှေ့က ထည့်ပေးလိုက်တဲ့ /menus က  menuRouter ထဲ ရောက်တဲ့အခါ request url ထဲမှာ ပါလာမှာမလို့ 
```
menuRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
});
```
- menuRouter.get ထဲက route မှာ /menus ကို ထပ်ထည့်ပေးစရာမလိုတော့ပဲ "/" ကိုသား ထည့်ပေးလိုက်ရင် request url က ( http://localhost:5000/menus) လို့ ဖြစ်သွားမှာ ြဖစ်ပါတယ်
- ဆက်ပြီး server.ts ထဲမှာ ကျန်နေသေးတဲ့ /auth/login နဲ့ /auth/register route တွေကို authRouter ထဲပြောင်းထည့်လိုက်ပါမယ်

```js
// backend/src/router/authRouter.ts
import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import bcrypt from "bcrypt";
import { db } from "../db/db";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const companiesResult = await db.query(
      "insert into companies(name) values($1)  RETURNING *",
      ["Defult company"]
    );
    console.log(companiesResult.rows);
    const companiesId = companiesResult.rows[0].id;

    const text =
      "INSERT INTO users(name, email, password,companies_id) VALUES($1, $2, $3,$4) RETURNING *";
    const values = [name, email, hashedPassword, companiesId];
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;

    const locationResult = await db.query(
      "insert into locations(name,address,companies_id) values($1,$2,$3)  RETURNING *",
      ["Defult location", "Defult address", companiesId]
    );

    const locationId = locationResult.rows[0].id;

    const menusResult = await db.query(
      "insert into menus(name,price) select * from unnest($1::text[],$2::int[]) returning *",
      [
        ["mote-hinn-kharr", "shan-khout-swell"],
        [500, 1000],
      ]
    );

    const menus = menusResult.rows;
    const defaultMenuId1 = menus[0].id;
    const defaultMenuId2 = menus[1].id;
    await db.query(
      "insert into menus_locations(menus_id,locations_id) select * from unnest($1::int[],$2::int[]) returning *",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );

    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;

    await db.query(
      `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
    );

    const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name,is_required) values ('Drinks',true), ('Sizes',true) returning *"
    );

    const addonCotegoriesIds = defaultAddonCategoriesResult.rows;
    const defaultAddonCategoryId1 = addonCotegoriesIds[0].id;
    const defaultAddonCategoryId2 = addonCotegoriesIds[1].id;

    await db.query(
      `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );

    await db.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}), 
      ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);

    res.send(user);
  } catch (err) {
    console.log(err);

    res.sendStatus(500);
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  const userResult = await db.query("select * from users where email = $1", [
    email,
  ]);
  if (!userResult.rows.length) return res.sendStatus(401);
  const user = userResult.rows[0];
  const hashedPassword = user.password;
  delete user.password;
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  if (isCorrectPassword) {
    const accessToken = jwt.sign(user, config.jwtSecret);
    return res.send({ accessToken });
  }
  return res.sendStatus(401);
});

export default authRouter;
```
- menuRouter လိုပဲ authRouter ကို server.ts မှာ သုံးလိုက်ပါမယ်

```js
//server.ts

import jwt from "jsonwebtoken";
import { config } from "./src/config/config";
import { checkAuth } from "./src/utils/auth";
import menuRouter from "./src/routers/menuRouter";
import authRouter from "./src/routers/authRouter";


const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/menus", menuRouter);
app.use("/auth", authRouter);


app.listen(port, () => {
  console.log("Server has started on port:", port);
});

```
##
### Create context  and store data to context value
- user တစ်ယောက် login ၀င်တဲ့အခါ log in ၀င်လာတဲ့ email ပေါ်မူတည်ပြီး
- သက်ဆိုင်ရာdata တွေကို server ကနေ လှမ်းယူပြီး react က context အထဲမှာ သိမ်းထားဖို့ ဆက်လုပ်ပါမယ်

- AppContext.tsx မှာ context value တွေ သိမ်းဖို့ ပြင်ဆင်ပါမယ်။
- အရင်ဆုံး type တွကို type.ts မှာ ထပ်ထည့်ပါမယ်

```js
// typings/type.ts

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


```
- id နဲ့ name က interface တွေ အားလုံးနီးပါးမှာ ရှိနေတာမလို့ baseTpye တစ်ခုလုပ်ပြီး extends လုပ်လိုက်တာနဲ့ ထပ်ပြီး ရေးပေးစရာမလိုတော့ပဲ tpye လုပ်ပြီးသားဖြစ်သွားမှာပါ
- ခု context မှာ value တွေ ထပ်ထည့်ပါမယ်

```js
// AppContext.tsx

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
  menuLocations: MenuLocation[];
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
  menuLocations: [],
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
      menuLocations,
      company,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
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

- ရှင်းလင်းချက်

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
  menuLocations: MenuLocation[];
  company: Company | null;
  updateData: (value: any) => void;
  fetchData: () => void;
}
```
- type တွေကို tpye.ts ထဲကနေ import လုပ်လိုက်ပြီး context ရဲ့ defaultValue ရဲ့ type သတ်မှတ်တဲ့နေရာမှာ သုံးထားပါတယ်
```js
export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  company: null,
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);
```
- AppContext ရဲ့ မူလ တန်ဖိုးမှာ menus, menuCategories, addons, addonCategories, locations, menuLocations, company, updateData, fetchData
- စတာတွေ ရှိပါတယ်

```js
const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken: ", accessToken);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);
```
- AppProvider component တစ်ခု create လုပ်ထားပြီး data state တစ်ခု နဲ့ accessToken ကို localstroage ကနေ လှမ်းယူထားပါတယ်
- useEffect ကို သုံးပြီး accessToken ရှိရင် fetchData function ကို run ခိုင်းထားပါတယ်။
```js
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
      menuLocations,
      company,
    } = responseJson;
    updateData({
      ...data,
      menus: menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
      company,
    });
  };

```
- fetchData function ကို သတ်မှတ်ထားတာဖြစ်ပါတယ်
- config ထဲမှာ ရှိတဲ့ apiBaseUrl ( http://localhost:5000 ) ဆီ request လုပ်ထားပြီး
- reponse ပြန်လာတဲ့ data တွေကို updateData ကို သုံးပြီး context Value ကို update လုပ်ကာ သိမ်းလိုက်တာဖြစ်ပါတယ်။
- config ထဲရှိ url ကို ရနိုင်ဖို့ .env ဖိုင်နဲ့ config file ကို သတ်မှတ်ပါမယ်

```js
// frontend / .env

REACT_APP_API_BASE_URL = http://localhost:5000

```

```js
// src / config/config.ts

interface Config {
  apiBaseUrl: string;
}

export const config: Config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "",
};

```
- ခု ဆိုရင် forntend မှာ server ဆီက response ပြန်လာမယ့် data ကို context မှာ သိမ်းထားဖို့ ပြင်ဆင်ပြီးပါပြီး
- "/" route နဲ့ ၀င်လာမယ့် request ကို backend မှာ လက်ခံပြီး response ပြန်ဖို့ router folder ထဲမှာ appRouter.ts ဖိုင်တစ်ခု လုပ်ပါမယ်။

```js
// appRouter.ts

import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import bcrypt from "bcrypt";
import { db } from "../db/db";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
const appRouter = express.Router();

appRouter.get("/", checkAuth, async (req, res) => {
  //@ts-ignore
  const userEmail = req.email;

  try {
    // get user rows
    const userResult = await db.query(`select * from users where email = $1`, [
      // @ts-ignore
      req.email,
    ]);

    //get companies rows and id
    const companyId = userResult.rows[0].companies_id;
    const companiesResult = await db.query(
      `select * from companies where id = $1`,
      [companyId]
    );

    // get location rows and ids
    const locations = await db.query(
      "select * from locations where companies_id = $1",
      [companyId]
    );
    const locationIds = locations.rows.map((row) => row.id); 

    const menuLocations = await db.query(
      "select * from menus_locations where locations_id = ANY($1::int[])",
      [locationIds]
    );

    // get menu rows and id

    const menuIds = menuLocations.rows.map((row) => row.menus_id); //[7],[8],[9]
    const menus = await db.query(
      `select * from menus where id = ANY($1::int[])`,
      [menuIds]
    );

    //menu categories id and rows
    const menuMenuCategoriesResult = await db.query(
      "select * from menus_menu_categories where menus_id = ANY($1::int[])",
      [menuIds]
    );
    const menuCategoryIds = menuMenuCategoriesResult.rows.map(
      (row) => row.menu_categories_id
    );
    const menuCategoriesResult = await db.query(
      "select * from menu_categories where  id = ANY($1::int[])",
      [menuCategoryIds]
    );

    //addon categories
    const menusAddonCategoriesResult = await db.query(
      "select * from menus_addon_categories where menus_id = ANY($1::int[])",
      [menuIds]
    );
    const addonCategoryIds = menusAddonCategoriesResult.rows.map(
      (row) => row.addon_categories_id
    ); //[1,2]

    //addon
    const addonCategories = await db.query(
      "select * from addon_categories where id = ANY($1::int[])",
      [addonCategoryIds]
    );
    const addons = await db.query(
      "select * from addons where addon_categories_id = ANY($1::int[])",
      [addonCategoryIds]
    );

    const companyResult = await db.query(
      "select * from companies where id = $1",
      [companyId]
    );

    const company = companyResult.rows[0];
    res.send({
      menus: menus.rows,
      menuCategories: menuCategoriesResult.rows,
      addons: addons.rows,
      addonCategories: addonCategories.rows,
      locations: locations.rows,
      menuLocations: menuLocations.rows,
      company,
    });
  } catch (error) {
    console.log("err", error);

    res.sendStatus(500);
  }

 
});

export default appRouter;

```

```js
  const userEmail = req.email;
```
- request ထဲက emial ကို ယူထားတာပါ
```js
 // get user rows
    const userResult = await db.query(`select * from users where email = $1`, [
      // @ts-ignore
      req.email,
    ]);
```
- ရလာတဲ့ email နဲ့ တူတဲ့ rowကို user table ထဲကနေ select လုပ်လိုက်ပါတယ်
```js
  //get companies rows and id
    const companyId = userResult.rows[0].companies_id;
    const companiesResult = await db.query(
      `select * from companies where id = $1`,
      [companyId]
    );
```
- ရလာတဲ့ user ထဲက companyId ကို ယူပြီး company table မှာ ထပ်ရွေးလိုက်ပါတယ်
```js
 // get location rows and ids
    const locations = await db.query(
      "select * from locations where companies_id = $1",
      [companyId]
    );
    const locationIds = locations.rows.map((row) => row.id);
    
```
- company id ပေါ် မူတည်ပြီး ချိတ်ထားတဲ့ location တွေ ထပ်ရွေးလိုက်ပါတယ်
```js
const menuLocations = await db.query(
      "select * from menus_locations where locations_id = ANY($1::int[])",
      [locationIds]
    );

    // get menu rows and id

    const menuIds = menuLocations.rows.map((row) => row.menus_id); //[7],[8],[9]
    const menus = await db.query(
      `select * from menus where id = ANY($1::int[])`,
      [menuIds]
    );
```
- ရလာတဲ့ location id ကို သုံးပြီး အဲ့ location နဲ့ ချိတ်ထားတဲ့ menu တွေ ထပ်ယူပါတယ်
- **`ANY($1::int[])`** ဆိုတာက SQL မှာ **`IN( )`** နဲ့ တူတူပါတယ်
- **`id = ANY($1::int[])`, [menuIds]`** ဆိုတာက menuIds array ရှိ id တွေအကုန်ပါတဲ့ rows တွေ ကို select လုပ်လိုက်တာဖြစ်ပါတယ်
```js
 //menu categories id and rows
    const menuMenuCategoriesResult = await db.query(
      "select * from menus_menu_categories where menus_id = ANY($1::int[])",
      [menuIds]
    );
    const menuCategoryIds = menuMenuCategoriesResult.rows.map(
      (row) => row.menu_categories_id
    );
    const menuCategoriesResult = await db.query(
      "select * from menu_categories where  id = ANY($1::int[])",
      [menuCategoryIds]
    );
```
- menu id တွေကို သုံးပြီး menus_menu_categories table ထဲက menu_categories id တွေ ရွေးလိုက်ပါတယ်
- -ရလာတဲ့  menu_categories id  ကို သုံးပြီး menu categories table ထဲ rowတွေ ရွေးထုတ်လိုက်ပါတယ်
```js
 //addon categories
    const menusAddonCategoriesResult = await db.query(
      "select * from menus_addon_categories where menus_id = ANY($1::int[])",
      [menuIds]
    );
    const addonCategoryIds = menusAddonCategoriesResult.rows.map(
      (row) => row.addon_categories_id
    ); //[1,2]
```
- menu id တွေကို သုံးပြီး menus_addon_categories table ထဲက addon_categories id တွေ ရွေးလိုက်ပါတယ်
- -ရလာတဲ့  addon_categories id  ကို သုံးပြီး addon categories table ထဲ rowတွေ ရွေးထုတ်လိုက်ပါတယ်
```js
 //addon
    const addonCategories = await db.query(
      "select * from addon_categories where id = ANY($1::int[])",
      [addonCategoryIds]
    );
    const addons = await db.query(
      "select * from addons where addon_categories_id = ANY($1::int[])",
      [addonCategoryIds]
    );
```
- addon_categories id  တွေကို သုံးပြီ addon  table ထဲက addon တွေ ရွေးလိုက်ပါတယ်

```js
const companyResult = await db.query(
      "select * from companies where id = $1",
      [companyId]
    );

    const company = companyResult.rows[0];
```
- company id ကို သုံးပြီး companies table ထဲက data ကို select လုပ်လိုကါပတယ်
```js
  res.send({
      menus: menus.rows,
      menuCategories: menuCategoriesResult.rows,
      addons: addons.rows,
      addonCategories: addonCategories.rows,
      locations: locations.rows,
      menuLocations: menuLocations.rows,
      company,
    });
```
- နောက်ဆုံးမှာတော့ select လုပ်ထားတဲ့ data တွေကို object တစ်ခုထဲ ထည့်ပြီး response  လုပ်လိုက်တာဖြစ်ပါတယ် 
- ခု request ထဲကို email ဆိုတဲ့ propertတစ်ခုကို checkAuth.ts ကနေ ထည့်ပေးလိုက်မှာဖြစ်ပါတယ်

```js
//auth.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) return res.send(401);
  try {
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, config.jwtSecret);

    //@ts-ignore
    req["email"] = user.email;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
```
- access token ကို veriry ဖြစ်မဖြစ် စစ်လိုက်တဲ့အခါ verify ဖြစ်ချိန်မှာ ရလာတဲ့  data ကို user ဆိုပြီး သိမ်းလိုက်ပါတယ်
- request object ထဲမှာ ["eamil"] property တစ်ခု အသစ်ထည့်လိုက်ပြီး  vlaue အနေနဲ့ ခနက user အထဲက email ကို သတ်မှတ်ပေးလိုက်တာဖြစ်ပါတယ်

### အားလုံး ပြင်ဆင်ပြီးပြီ မို့  ပြီးခဲ့တဲ့ သင်ခန်းစာမှာ register လုပ်လိုက်တဲ့ user နဲ့ login ၀င်ကြည့်တဲ့ အခါ network က localhost route ရဲ့ response မှာ server က response ပြန်လာတဲ့ data တွေကို မြင်ရမှာဖြစ်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112061896003170304/image.png)
 
