## MSquare Programing Fullstack Course
### Episode-*95* 
### Summary For `Room(2)` 
### Add menu item to menu category + create addon + create table
- menu category တစ်ခု edit လုပ်တဲ့နေရာမှာ menu items တွေ ထပ်ထည့်လို့ရအောင် လုပ်မှာြဖစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1124998774754922626/image.png)
- validLocationIds တွေကို လက်ရှိ category နဲ့ ချိတ်ထားတဲ့ location တွေထဲက ယူလိုက်ပါတယ်
- selectedMenusIds ဆိုပြီး state တစ်ခု လုပ်ထားပါတယ်
- mappedMenus ဆိုပြီး context ထဲက menu တွေကို လှမ်းယူထားလိုက်ပါတယ်
- အောက်မှာတော့ handleAddMenusToMenuCategory ဆိုတဲ့ FUNCTION တစ်ခုကို သတ်မှတ်ထားပြီး function ထဲမှာ
- `/menuCategories/addMenu` route ဆီ request လုပ်ထားပြီး menu category id ရယ် selectedMenusIds ရယ် validLocationIds ရယ် ကို body အနေနဲ့ ထည့်ပေးလိုက်ပါတယ်
- ဆက်ပြီး menu တွေ ပေါင်းထည့်လို့ရအောင် Autocomplete component ကို သုံးလိုက်ပါမယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125001125800726528/image.png)
- mappedMenus တွေ ကို options အနေနဲ့ ပြပေးထားပြီး တစ်ခုခုရွေးလိုက်တာနဲ့ selectedMenusIds ရဲ့ တန်ဖိုးအဖြစ် update လုပ်ပေးထားလိုက်ပါတယ်
- အောက်မှာ ADD buttonတစ်ခု ထည့်းပေးထားပြီး click လိုက်ရင် handleAddMenusToMenuCategory ဆိုတဲ့ FUNCTION ကို ခေါ်ပြီး run ပေးမှာဖြစ်ပါတယ်
-  menu category edit လုပ်တဲ့ နေရာကို ၀င်ကြည့်ပါက အခုလိုလေး  ပြပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1124999171200528454/image.png)

- Add ကနေ ၀င်လာမယ့် request ကို server မှာလက်ခံပြီး database မှာ update လုပ်မှာဖြစ်ပါတယ်

```js
// Add to ---> backend/src/router/menuCtegoriesRouter.ts

menuCategoriesRouter.put(
  "/addMenu",
  checkAuth,
  async (req: Request, res: Response) => {
    const { menuCategoryId, menuIds, locationIds } = req.body;
    const isValid = menuCategoryId && menuIds.length && locationIds.length;
    if (!isValid) return res.send(400);
    menuIds.forEach((menuId: number) => {
      locationIds.forEach(async (locationId: number) => {
        const menusMenuCategoriesLocations = await db.query(
          "select * from menus_menu_categories_locations where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
          [menuId, menuCategoryId, locationId]
        );
        const isExist = menusMenuCategoriesLocations.rows.length;
        if (isExist) {
          // update is_archived = false
          await db.query(
            "update menus_menu_categories_locations set is_archived = false where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
            [menuId, menuCategoryId, locationId]
          );
        } else {
          // insert new row
          await db.query(
            "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values($1, $2, $3)",
            [menuId, menuCategoryId, locationId]
          );
        }
      });
    });
    res.send(200);
  }
);
```
- ၀င်လာတဲ့ request ထဲက menuIds , locationIds, menuCategory id တွေကို  menus_menu_categories_locations table ထဲမှာ ချိတ်ပေးလိုက်တာဖြစ်ပြီး ချိတ်ထားပြီးသား is_archived true ဖြစ်နေရင် false ပြန်ပြောင်းပေးလိုက်ပြီး မရှိခဲ့ရင် အသစ် insert လုပ်ပေးလိုက်တာဖြစ်ပါတယ်
- id သုံးခုလုံးနဲ့ ချိတ်ပြီးသားလည်းဖြစ် is_archived ကလည်း false ဖြစ်နေပြီးသားဆိုရင်တော့ duplicate မဖြစ်ရအောင် table ထဲမှာ id သုံးခုလုံး တူတဲ့ rows ရှိနေပြီးသားဆို ထပ်ထည့်လို့မရအောင် unique လုပ်ပေးလိုက်ပါမယ်
```sql
ALTER TABLE menus_menu_categories_locations
ADD UNIQUE (menus_id,menu_categories_id,locations_id);
```
##
- ဆက်ပြီး အိမ်စာအနေနဲ့ လုပ်ခိုင်းထားတဲ့ Addon , table , location တွေ  CURD လုပ်လို့ရအောင် လုပ်ကြည့်ပါမယ်
- အရင် သင်ခန်းစာမှာလည်း ပုံစံ တူ တွေ ရှင်းပြပြီးသားမို့ code တွေကို အသေးစိတ် မရှင်းပြတော့ပါဘူး
- အရင်ဆုံး Addon component မှာ create addon ခလုတ်တစ်ခု ထည့်ပေးလိုက်ပါမယ်
- 
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125013431863496714/image.png)
- ဆက်ပြီး CreateAddon component တစ်ခု အသစ်လုပ်ပြီး Addon component က Create New Addon ခလုတ်ကို နှိပ်လိုက်ရင် ပြပေးနိုင်အောင် လုပ်လိုက်ပါမယ်
```js
// CrateAddon.tsx

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { getAddonCategoriesByLocationId } from "../utils";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateAddon = ({ open, setOpen }: Props) => {
  const {
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories,
    fetchData,
  } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations
  );

  const createNewAddon = async () => {
    const isValid = newAddon.name && newAddon.addonCategoryId;
    if (!isValid) return alert("Name and addon category are required.");
    await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle variant="h5">Create new addon</DialogTitle>
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
              setNewAddon({ ...newAddon, name: evt.target.value })
            }
          />
          <TextField
            type="number"
            placeholder="Price"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setNewAddon({ ...newAddon, price: Number(evt.target.value) })
            }
          />
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Addon Category</InputLabel>
              <Select
                label="Addon Category"
                value={newAddon.addonCategoryId}
                onChange={(evt) =>
                  setNewAddon({
                    ...newAddon,
                    addonCategoryId: String(evt.target.value),
                  })
                }
              >
                {validAddonCategories.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ mb: 2, mr: 2 }}>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={createNewAddon}
          >
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAddon;

```
- အရင် သင်ခန်းစာတွေကလိုပဲ dialog box နဲ့ addon အသစ်တစ်ခု create လုပ်နိုင်အောင် ပြပေးမှာဖြစ်ပါတယ်
- CreateAddon ကို Addon.tsx မှာ သုံးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125014673855619122/image.png)

- ဆက်ပြီး backend က addonRouter.tsx ထဲမှာ request ကို လက်ခံပြီး addon တစ်ခုကို db ထဲ insert လုပ်ပေးလိုက်ပါမယ်

```js
// add to--> addonRouter.ts

addonsRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, price = 0, addonCategoryId } = req.body;
  const isValid = name && addonCategoryId;
  if (!isValid) return res.send(400);
  await db.query(
    "insert into addons (name, price, addon_categories_id) values ($1, $2, $3)",
    [name, price, Number(addonCategoryId)]
  );
  res.send(200);
});
```
- req နဲ့ ပါလာတဲ့ data ကို သုံးပြီး addon table ထဲ rows တစ်ခု insert လုပ်လိုက်တာဖြစ်ပါတယ် 

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125021294723870821/image.png)
##
### location component မှာလဲ ကျန်တဲ့ component နဲ့ တူအောင် ပြန်ပြင်ရေးပြီး curd ရအောင် လုပ်လိုက်ပါမယ်

```js
// Locations.tsx
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import CreateLocation from "./CreateLocation";
import Layout from "./Layout";

const Locations = () => {
  const { locations } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  return (
    <Layout title="Locations">
      <Box sx={{ mx: 3, mt: 3 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new location
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {locations.map((item) => (
            <Link
              key={item.id}
              to={`/locations/${item.id}`}
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
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
      <CreateLocation open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Locations;

```

```js
//CreateLocations.tsx

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { getAccessToken } from "../utils";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateLocation = ({ open, setOpen }: Props) => {
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });
  const { fetchData, company } = useContext(AppContext);
  const accessToken = getAccessToken();

  const createLocation = async () => {
    const isValid = newLocation.name && newLocation.address && company;
    if (!isValid) return alert("Name and address are required");
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newLocation.name,
        address: newLocation.address,
        companyId: company.id,
      }),
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new location</DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <TextField
          onChange={(evt) =>
            setNewLocation({ ...newLocation, name: evt.target.value })
          }
          placeholder="Location name"
          sx={{ width: "100%" }}
        />
        <TextField
          onChange={(evt) =>
            setNewLocation({ ...newLocation, address: evt.target.value })
          }
          placeholder="Address"
          sx={{ width: "100%", mt: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={createLocation}>
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLocation;
```

```js
//EditLocation.tsx

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Location } from "../typings/types";
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditLocation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const locationId = params.id as string;
  const { locations, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const accessToken = getAccessToken();
  const [location, setLocation] = useState<Location>();

  const updateLocation = async () => {
    const isValid = location?.name && location.address;
    if (!isValid) return alert("Name and address are required.");
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    accessToken && fetchData(accessToken);
  };

  const handleDeleteLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate("/locations");
  };

  useEffect(() => {
    if (locations.length) {
      const validLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setLocation(validLocation);
    }
  }, [locations]);

  if (!location) return null;

  return (
    <Layout title="Edit Location">
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
            defaultValue={location.name}
            onChange={(evt) =>
              setLocation({ ...location, name: evt.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            defaultValue={location.address}
            onChange={(evt) =>
              setLocation({ ...location, address: evt.target.value })
            }
          />

          <Button
            variant="contained"
            onClick={updateLocation}
            sx={{ width: "fit-content", mt: 3 }}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure you want to delete this location?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteLocation}
        />
      </Box>
    </Layout>
  );
};

export default EditLocation;

```
```js
// Add to ---> Router.tsx

<Route  path="/locations/:id"  Component={EditLocation}  />

```

```js
// backend/src/router/ locationRouter.ts
import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
const locationsRouter = express.Router();

locationsRouter.put("/:id", checkAuth, async (req: Request, res: Response) => {
  const locationId = req.params.id;
  const { name, address } = req.body;
  const isValid = locationId && name && address;
  if (!isValid) return res.send(400);
  const existingLocation = await db.query(
    "select * from locations where id = $1",
    [locationId]
  );
  const hasExistingLocation = existingLocation.rows.length;
  if (!hasExistingLocation) return res.send(400);
  await db.query("update locations set name = $1, address = $2 where id = $3", [
    name,
    address,
    locationId,
  ]);
  res.send(200);
});

locationsRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, address, companyId } = req.body;
  const isValid = name && address && companyId;
  if (!isValid) return res.send(400);
  await db.query(
    "insert into locations (name, address, companies_id) values($1, $2, $3)",
    [name, address, companyId]
  );
  res.send(200);
});

locationsRouter.delete(
  "/:id",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.id;
    if (!locationId) return res.send(400);
    const existingLocation = await db.query(
      "select * from locations where id = $1",
      [locationId]
    );
    const hasExistingLocation = existingLocation.rows.length;
    if (!hasExistingLocation) return res.send(400);
    await db.query("update locations set is_archived = true where id = $1", [
      locationId,
    ]);
    res.send(200);
  }
);

export default locationsRouter;

```

- Location component ကို အရင်လို စုပြီး မလုပ်တော့ပဲ EditLocation နဲ့ CreateLocation component တွေ ခွဲပြီးတော့ ကျန် component တွေနဲ့ ပုံစံတူအောင် ပြင်ရေးလိုက်တာဖြစ်ပါတယ်
- logic တွေက addon တွေ menu တွေ curd လုပ်တာနဲ့ တူတူပဲမလို့ ထပ်မရှင်းပြတော့ပါဘူး

##
### ဆက်ပြီး Tables component ကိုလဲ location လိုမျိုးပဲ ပြောင်းလိုက်ပါမယ်
```js
//Table.tsx

import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { getSelectedLocationId } from "../utils";
import CreateTable from "./CreateTable";
import Layout from "./Layout";

const Tables = () => {
  const { tables } = useContext(AppContext);
  const selectedLocationId = getSelectedLocationId();
  const validTables = tables.filter(
    (item) => item.locations_id === Number(selectedLocationId)
  );
  const [open, setOpen] = useState(false);

  return (
    <Layout title="Addons">
      <Box sx={{ mx: 3, mt: 3 }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new table
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {validTables.map((item) => (
            <Link
              key={item.id}
              to={`/tables/${item.id}`}
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
              </Paper>
            </Link>
          ))}
        </Box>
      </Box>
      <CreateTable open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Tables;
```
```js
// CreateTable.tsx

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { getAccessToken, getSelectedLocationId } from "../utils";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const CreateTable = ({ open, setOpen }: Props) => {
  const [newTable, setNewTable] = useState("");
  const { fetchData } = useContext(AppContext);
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
    accessToken && fetchData(accessToken);
    setOpen(false);
  };

  return (
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
  );
};

export default CreateTable;
```

```js
// EditTable.tsx

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Table } from "../typings/types";
import { getAccessToken } from "../utils";
import DeleteDialog from "./DeleteDialog";
import Layout from "./Layout";

const EditTable = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tableId = params.id as string;
  const { tables, fetchData } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const accessToken = getAccessToken();
  const [table, setTable] = useState<Table>();

  const updateTable = async () => {
    const isValid = table?.name;
    if (!isValid) return alert("Table name is required");
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    });
    accessToken && fetchData(accessToken);
  };

  const handleDeleteTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables/${tableId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    accessToken && fetchData(accessToken);
    setOpen(false);
    navigate("/tables");
  };

  useEffect(() => {
    if (tables.length) {
      const validTable = tables.find((item) => item.id === Number(tableId));
      validTable && setTable(validTable);
    }
  }, [tables]);

  if (!table) return null;

  return (
    <Layout title="Edit Table">
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
            defaultValue={table.name}
            onChange={(evt) => setTable({ ...table, name: evt.target.value })}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={updateTable}
            sx={{ width: "fit-content", mt: 3 }}
          >
            Update
          </Button>
        </Box>
        <DeleteDialog
          title="Are you sure you want to delete this table?"
          open={open}
          setOpen={setOpen}
          callback={handleDeleteTable}
        />
      </Box>
    </Layout>
  );
};

export default EditTable;
```

```js
// Add to ---> Router.tsx

<Route  path="/tables/:id"  Component={EditTable}  />
```

```js
// backend/src/router/ tableRouter.ts

import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";
const tablesRouter = express.Router();

tablesRouter.get(
  "/:locationId",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    if (!locationId) return res.send(400);
    const tablesResult = await db.query(
      "select * from tables where locations_id = $1",
      [locationId]
    );
    res.send(tablesResult.rows);
  }
);

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

tablesRouter.put("/:id", checkAuth, async (req: Request, res: Response) => {
  const tableId = req.params.id;
  const { name } = req.body;
  const isValid = tableId && name;
  if (!isValid) return res.send(400);
  const existingTable = await db.query("select * from tables where id = $1", [
    tableId,
  ]);
  const hasExistingTable = existingTable.rows.length > 0;
  if (!hasExistingTable) return res.send(400);
  await db.query("update tables set name = $1 where id = $2", [name, tableId]);
  res.send(200);
});

tablesRouter.delete("/:id", checkAuth, async (req: Request, res: Response) => {
  const tableId = req.params.id;
  if (!tableId) return res.send(400);
  const existingTable = await db.query("select * from tables where id = $1", [
    tableId,
  ]);
  const hasExistingTable = existingTable.rows.length;
  if (!hasExistingTable) return res.send(400);
  await db.query("update tables set is_archived = true where id = $1", [
    tableId,
  ]);
  res.send(200);
});

export default tablesRouter;
```
##
### Component တွေ အကုန်လုံး CURD လုပ်လို့ရပါပြီး
- တစ်ခုကျန်နေသးတာက Data တွေ လှမ်းယူပေးတဲ့ appRouter မှာ is_archived = flase ဖြစ်တဲ့ ဟာတွေ ပဲ ယူလို့ရအောင် စစ်ပေးရပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1125027911058071643/image.png)
