## MSquare Programing Fullstack Course
### Episode-*78* 
### Summary For `Room(2)` 
## Protected Routes
### log in ၀င်ထားတဲ့ user ဖြစ်မှသာ menu, setting အစရှိတဲ့ route တွေ ၀င်လို့ရအောင် protect လုပ်မှာဖြစ်ပါတယ်။
- frontend ထဲက src အောက်မှာ Routes folder တစ်ခုလုပ်ပါမယ်။
- Routes folder ထဲမှာမှ  Router.tsx နဲ့ PrivateRoute component နှစ်ခု လုပ်ပါမယ်။
```js
// Router.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import App from "../App";
import Menus from "../components/Menus";
import { MenuDetail } from "../components/MenuDetail";
import MenuCategories from "../components/MenuCategories";
import Addons from "../components/Addons";
import AddonCategories from "../components/AddonCategories";
import Setting from "../components/Setting";
import Login from "../components/Login";
import Register from "../components/Register";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={App} />
          <Route path="/menus" Component={Menus} />
          <Route path="/menu-categories" Component={MenuCategories} />
          <Route path="/addons" Component={Addons} />
          <Route path="/addon-categories" Component={AddonCategories} />
          <Route path="/settings" Component={Setting} />
        </Route>
        <Route path="/login" Component={Login} />
        <Route path="/logout" Component={Logout} />
        <Route path="register" Component={Register} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

```
- `<Route path="route-name" Component={component-name} />` path မှာ သွားချင်တဲ့ route ကို ထည့်ပေးရမှာဖြစ်ပြီး component မှာတော့ path ထဲက route ကို ၀င်လာရင် ပြချင်တဲ့ component ကို ထည့်ပေးရမှာဖြစ်ပါတယ်
- အဲ့ဒီ route တစ်ခုချင်းစီကို Routes ( အများ S ပါ) နဲ့ ပြန်အုပ်လိုက်ပါတယ်
- route တစ်ခုချင်းစီကို အုပ်ထားတဲ့ Routes ကို react router dom က  BrowserRouter နဲ့ ပြန် wrap လိုက်ပြီး Router component တစ်ခုအဖြစ် export လုပ်ထားတာဖြစ်ပါတယ်။

### syntax
```js
<BrowserRouter>
  <Routes>
    <Route path="route-name(/menus)"  Component={component-name(Menus)} />
  <Routes>
</BrowserRouter>

```

 **`/login`** **`/logout`** **`/register`** route 3 ခုက လွဲ ပြီး ကျန်တဲ့ route တွေကို **PrivateRoute** အောက်မှာ ထည့်ပေးထားပါတယ်။
```js
//PrivateRoute.tsx

import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { accessToken } = useContext(AppContext);
  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;

```
- PrivateRoute.tsx ထဲမှာတော့ accessToken ရှိမရှိ စစ်လိုက်ပြီး ရှိခဲ့ရင်တော့ သူ့အောက်မှာ ထည့်ပေးထားတဲ့ route တွေဆီ react-router-dom က Outlet component ကို သုံးပြီး သွားခွင့်ပြုလိုက်ပြီး  မရှိခဲ့ရင်တော့ log in ၀င်ခိုင်းလိုက်တာဖြစ်ပါတယ်။
- index.tsx မှာလည်း route တွေ create လုပ်စရာမလိုတော့ပဲ Router component ကိုပဲ render လုပ်ပေးလိုက်ရင် ရပါပြီး

```js
//index.tsx

import ReactDOM from "react-dom/client";
import "./index.css";
import AppProvider from "./contexts/AppContext";
import Router from "./Routes/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <AppProvider>
      <Router />
    </AppProvider>
  </>
);
```
- ခု **foodie pos** app ကို စမ်းကြည့်ပါက **`/login`** **`/logout`** **`/register`** route 3 ခုက လွဲ ပြီး ကျန်တဲ့ ဘယ် route ကိုပဲ သွားသွား login ၀င်ခိုင်းမှာ ဖြစ်ပြီး login ၀င်ပြီးလို့ accessToken ရလာမှသာ ကျန်တဲ့ route တွေဆီ သွားလို့ရမှာ ဖြစ်ပါတယ်။

##
### Location update လုပ်တာ မပြီးသေးတဲ့အတွက် summary မှာ မထည့်ထားပါခင်ဗျာ


