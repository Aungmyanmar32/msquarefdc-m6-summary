## MSquare Programing Fullstack Course
### Episode-*77* 
### Summary For `Room(2)` 
### Routing
- drawer ထဲက menu items တွေကို click လိုက်ရင် သက်ဆိုင်ရာ route တွေဆီ သွားပြီး သက်ဆိုင်တဲ့ component ကို ပြပေးနိုင်အောင် လုပ်ပါမယ်။
- ဆိုလိုတာက Orders ကို click လိုက်ရင် /orders ဆိုတဲ့ route ကို သွားလိုက်ပြီး Orders component ကို ပြပေးမှာဖြစ်ပါတယ်
- အရင်ဆုံး လိုအပ်မယ့် component တွေကို create လုပ်ပါမယ်။
- src/components အောက်မှာ
  - Menus.tsx
  - MenuCategories.tsx
  - Orders.tsx
  - Locations.tsx
  - Settings.tsx
  - Addons.tsx
  - AddonCategories.tsx
- စတဲ့ component တွေ လုပ်ပါမယ်
```js
//Orders.tsx
import React from "react";
import Layout from "./Layout";

const Orders = () => {
  return (
    <Layout>
      <h1>Orders page</h1>
    </Layout>
  );
};

export default Orders;

```

```js
//AddonCategories.tsx
import React from "react";
import Layoutfrom "./Layout";

const AddonCategories = () => {
  return (
    <Layout>
   
      <h1>AddonCategories page</h1>
    </Layout>
  );
};

export default AddonCategories;
```

```js
//MenuCategories.tsx
import React from "react";
import Layoutfrom "./Layout";

const MenuCategories = () => {
  return (
    <Layout>

      <h1>MenuCategories page</h1>
    </Layout>
  );
};

export default MenuCategories;

```

```js
//Addons.tsx
import React from "react";
import Layout from "./Layout";

const Addons = () => {
  return (
    <Layout>
     
      <h1>Addons page</h1>
    </Layout>
  );
};

export default Addons;
```

```js
//Locations.tsx
import React from "react";
import Layout from "./Layout";

const Locations = () => {
  return (
    <Layout>
     
      <h1>Locations page</h1>
    </Layout>
  );
};

export default Locations;
```

```js
//settings.tsx
import React from "react";
import Layout from "./Layout";

const Settings = () => {
  return (
    <Layout>
      
      <h1>Settings page</h1>
    </Layout>
  );
};

export default Settings;

```

```js
//Menus.tsx
import React from "react";
import Layout from "./Layout";

const Menus = () => {
  return (
    <Layout>
     
      <h1>Menus page</h1>
    </Layout>
  );
};

export default Menus;

```
### ဆက်ပြီး route တွေ သတ်မှတ်ပါမယ်။
```js
//index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Menus from "./components/Menus";
import Addons from "./components/Addons";
import AddonCategories from "./components/AddonCategories";
import MenuCategories from "./components/MenuCategories";
import Locations from "./components/Locations";
import Settings from "./components/Settings";

const routes = createBrowserRouter([
  {
    path: "/orders",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/addon-categories",
    element: <AddonCategories />,
  },
  {
    path: "/menu-categories",
    element: <MenuCategories />,
  },
  {
    path: "/locations",
    element: <Locations />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={routes} />);

```
### react-router-dom က Link ကို သုံးပြီး drawer-items တွေကို loop လုပ်ပြီး ပြတဲ့အချိန်မှာ route ကို ပါ တစ်ပါတည်း ထည့်ပေးလိုက်မှာဖြစ်ပါတယ်
![enter image description here](https://github.com/Aungmyanmar32/msquare-m5-summaries/blob/main/Screenshot%202023-05-13%20175251.png?raw=true)
- react-router-dom က Link ကို သုံးပြီ drawer-menu item တွေကို route တွေကိုပါ to နဲ့ ချိတ်ပေးလိုက်တာဖြစ်ပါတယ်။
- ဆက်ပြီးတော့ အောက်မှာ သီးသန့်ခွဲထားတဲ့ settigs အတွက်လဲ အထက်ပါအတိုင်း route ချိတ်ပေးလိုက်ပါမယ်
```js
 <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((menuItem) => (
          <Link
            to={menuItem.route}
            key={menuItem.id}
            style={{ textDecoration: "none", color: "#313131" }}
          >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </ListItemButton>
          </ListItem>
          </Link>
```
- ခု foodie app မှာ menu icon  ကို နှိပ်ပြီး ပြပေးတဲ့ menu items တွေကို နှိပ်စမ်းကြည့်ပါက သက်ဆိုင်ရာ route ဆီ ပို့ပေးတာကို မြင်ရမှာဖြစ်ပါတယ်
##
- App.tsx မှာ order တွေပြနိုင်ဖို့ mui table တစ်ခု နမူနာ ထည့်ထားလိုက်ပါမယ်

```js
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "./components/Layout";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function App() {
  return (
    <Layout >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
```

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112218241914384424/image.png)

- NavBar ထဲက Foodie POS နောက်မှာ လက်ရှိရောက်နေတဲ့ page ရဲ့ title ကို ပြပေးအောင် ဆက်လုပ်ကြပါမယ်

- layout component မှာ title ဆိုတဲ့ props တစ် ထပ်လက်ခံလိုက်ပြီး navbar component ဆီ ပို့ပေးလိုက်မှာဖြစ်ပါတယ်

```js
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: Props) => {
  return (
    <div>
      <NavBar title={title} />
      {children}
    </div>
  );
};

export default Layout;
```
- Navbar component မှာ title props ကို လက်ခံပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112221565241790484/image.png)

- title props ကို လက်ခံထားပြီး navbarTitle ဆိုတဲ့ variable မှာ Foodie POS နဲ့ တွဲပြီးသိမ်းထားလိုက်ပါတယ်
- အောက်က Foodie POS ကို ပြတဲ့နေရာမှာ navbarTitle ကိုပြပေးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112222209323302962/image.png)

- အခု layout ကို သုံးတဲ့ component တွေ တိုင်းမှာ title ကို props အနေနဲ့ ထည့်ပေးလို့ရပါပြီး
- နမူနာအနေနဲ့ locations component မှာ title တစ်ခု ထည့်ပြပါမယ်

```js
import Layout from "./Layout";

const Locations = () => {
  return (
    <Layout title="Locations">
      <h1>Locations</h1>
    </Layout>
  );
};

export default Locations;
```
- Layout component  ကို ခေါ်သုံးတဲ့အခါ props အနေနဲ့ လက်ရှိ component ရဲ့ နာမည်ကိုပဲ ထည့်ပေးလိုက်တာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112226636146941952/image.png)
- location route ထဲ ၀င်ကြည့်တဲ့အခါ အထက်ပါအတိုင်း ပြပေးမှာဖြစ်ပါတယ်
- ကျန် component တွေမှာလည်း Layout ကို ခေါ်သုံးတဲ့နေရာမှာ title props တွေကို လိုက်ထည့်ပေးလိုက်ပါ။
##
### Show menu
- menu page ထဲ ရောက်တဲ့အခါ context ထဲမှာ သိမ်းထားတဲ့ menu item တွေကို mui card ကို သုံးပြီး ပြပေးပါမယ်

```js
//Menus.tsx

import { useContext } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Menus = () => {
  const { menus } = useContext(AppContext);
  const sampleMenuImageUrl =
    "https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/Spicy%20seasoned%20seafood%20noodles.png";
  return (
    <Layout title="Menus">
      <Box sx={{ ml: 3, mt: 5, display: "flex" }}>
        {menus.map((menu) => {
          return (
            <Card sx={{ maxWidth: 345, mr: 5 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sampleMenuImageUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {menu.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </Layout>
  );
};

export default Menus;
```
```
 const sampleMenuImageUrl =
    "https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/Spicy%20seasoned%20seafood%20noodles.png";
    
<Card sx={{ maxWidth: 345, mr: 5 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={sampleMenuImageUrl}
                  alt="green iguana"
                />
```
-- ပုံကိုတော့ နမူနာအနေနဲ့ ပဲ ထည့်ပေးထားတာဖြစ်ပါတယ်
```js
 <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {menu.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography>
                </CardContent>
```
- context ထဲက meuns array ကို loop လုပ်ပြီး mui cardContent ထဲမှာ name တွေ ပြပေးလိုကတာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112231593453572157/image.png)

##
### Location
- ဆက်ပြီး context ထဲရှိ location arrray ကို သုံးပြီး location တွေကို ပြကြည့်ပါမယ်

```js
// Locations.tsx

import { useContext, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { config } from "../config/config";

const Locations = () => {
  const { locations} = useContext(AppContext);


  return (
    <Layout title="Locations">
      <Box sx={{ ml: 3, mt: 5 }}>
        {locations.map((location, index) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ mr: 3 }}>
                {index + 1}.
              </Typography>
              <TextField defaultValue={location.name} sx={{ mr: 3 }} />
              <TextField defaultValue={location.address} sx={{ mr: 3 }} />
              <Button variant="contained">Update</Button>
            </Box>
          );
        })}
       
      </Box>
    </Layout>
  );
};

export default Locations;

```
- context ထဲက location array ကို လှမ်းယူလိုက်ပြီး loop လုပ်ကာ mui text field နဲ့ ပြပေးထားတာဖြစ်ပါတယ် ။ နောက်ပိုင်းကျရင် Update လုပ်လို့ရအောင်လဲ Update button လေး ကြိုထည့်ပေးထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112235436958568478/image.png)

- ဆက်ပြီး location အသစ်တွေ ထပ်လုပ်လို့ရအောင် လုပ်ပါမယ်

```js
// locations.tsx
import { useContext, useState } from "react";
import Layout from "./Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button, TextField, Typography } from "@mui/material";
import { config } from "../config/config";

const Locations = () => {
  const { locations, fetchData, company } = useContext(AppContext);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });
  const accessToken = localStorage.getItem("accessToken");

  const createNewLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    fetchData();
    setNewLocation({ name: "", address: "", companyId: company?.id });
  };

  return (
    <Layout title="Locations">
      <Box sx={{ ml: 3, mt: 5 }}>
        {locations.map((location, index) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" sx={{ mr: 3 }}>
                {index + 1}.
              </Typography>
              <TextField defaultValue={location.name} sx={{ mr: 3 }} />
              <TextField defaultValue={location.address} sx={{ mr: 3 }} />
              <Button variant="contained">Update</Button>
            </Box>
          );
        })}
        <h1>Create New Location</h1>
        <Box sx={{ ml: 5, display: "flex", alignItems: "center" }}>
          <TextField
            value={newLocation.name}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          />
          <TextField
            value={newLocation.address}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Button variant="contained" onClick={createNewLocation}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Locations;

```
- ရှင်းလင်းချက်
```js
 const { locations, fetchData, company } = useContext(AppContext);
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });
  const accessToken = localStorage.getItem("accessToken");
```
- context ထဲက fetchData နဲ့ company  ကို ထပ်ယူလိုက်ပါတယ်
- newLocation ဆိုတဲ့ state တစ်ခု သတ်မှတ်လိုက်ပြီး မူလတန်ဖိုးကို database မှာ ရှိတဲ့ locations table ထဲက ပုံစံအတိုင်း သတ်မှတ်ပေးထားလိုက်ပါတယ်
- accessToken ကိုလည်း localStorage ကနေ လှမ်းယူထားပါတယ်

```js
const createNewLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    fetchData();
    setNewLocation({ name: "", address: "", companyId: company?.id });
  };
```
- create button ကို နှိပ်လိုက်တဲ့ အချိန်မှာ run မယ့် createNewLocation  function ပါ
- ဆာဗာဆီ locations route နဲ့ request လုပ်ထားပြီး newLocation object ( state) ကို request body အနေနဲ့ ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- ပြီးရင် context ထဲက fetchData function ကို သုံးပြီး sever ဆီက data တွေအားလုံးကို request ထပ်လုပ်လိုက်ထညးပါတယ်
- နောက်ဆုံးမှာတော့ newLocation state ရဲ့ တန်ဖိုးကို နဂို အနေအထားအတိုင်း ပြန်သတ်မှတ်ပေးလိုက်တာဖြစ်ပါတယ်
```js
<h1>Create New Location</h1>
        <Box sx={{ ml: 5, display: "flex", alignItems: "center" }}>
          <TextField
            value={newLocation.name}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          />
          <TextField
            value={newLocation.address}
            sx={{ mr: 3 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Button variant="contained" onClick={createNewLocation}>
            Create
          </Button>
        </Box>
```
- Mui text input နှစ်ခု နဲ့  Create Button တစ်ခု ထပ်ထည့်ထားပါတယ်
- TextField ထဲမှာ တစ်ခုခု ထည့်လိုက်တိုင်း newLocation state ကို update လုပ်ပေးထားပါတယ်
- Create Button ကို နှိပ်လိုက်ချိန်မှာတော့ အထက်မှာ သတ်မှတ်ထားတဲ့ CreateNewLocation function ကို အလုပ်လုပ်ခိုင်းလိုက်ပါတယ်
- backend serverမှာ /location route နဲ့ ၀င်လာမယ့် request ကို လက်ခံပြီး location အသစ်ကို database မှာ သိမ်းလိုက်မှာ ဖြစ်ပါတယ်။
- backend မှာ locationRouter.ts ဖိုင် အသစ်တစ်ခု ကို src/router folder ထဲမှာ လုပ်ပါမယ်

```js
// backend/src/router/locationRouter.ts

import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "../db/db";
const locationsRouter = express.Router();



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

export default locationsRouter;
```
- name / address / companyId ပါမပါ စစ်လိုက်ပြီး 
- မပါခဲ့ရင် 400 ( bad request) ကို response လုပ်လိုက်ကာ
- ပါလာတယ်ဆိုရင် database မှာ သိမ်းလိုက်တာဖြစ်ပါတယ်
- ခု locationRouter ကို server.ts မှာ ခေါ်သုံးပေးပါမယ်

```js
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import menuRouter from "./src/routers/menuRouter";
import authRouter from "./src/routers/authRouter";
import appRouter from "./src/routers/appRouter";
import locationRouter from "./src/routers/locationRouter";

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

app.use("/menus", menuRouter);
app.use("/auth", authRouter);
app.use("/", appRouter);
app.use("/locations", locationRouter);

app.listen(port, () => {
  console.log("Server has started on port:", port);
});

```
- Foddie POS app မှာ location အသစ်တစ်ခု လုပ်ကြည့်ပါက Location ပြတဲ့နေရာမှာ ချက်ချင်းပေါ်လာမှာဖြစ်ပြီး database မှာလည်း သိမ်းထားပေးတာကို မြင်ရမှာဖြစ်ေပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1112242245836480663/image.png)
