## MSquare Programing Fullstack Course
### Episode-*101* 
### Summary For `Room(2)`
## Order App
- ဒီနေ့သင်ခန်းစာမှာတော့ project ထဲမှာ နောက်ထပ် app တစ်ခု ဖြစ်တဲ့ order app ကို ပြုလုပ်သွားပါမယ်
- project ရဲ့ ပုံစံကို ပြန်ကြည့်ရအောင်
- 
![enter image description here](https://github.com/Aungmyanmar32/msquarefdc-m6-summary/blob/main/foodienext.png?raw=true)
- order app မှာဆိုရင် backoffice app လို item တွေ create လုပ်ရမယ့် function တွေ မလိုအပ်ပဲ
 - scan ဖတ်လိုက်တဲ့ **table qr code** ( `http://localhost:3000/order?locationId=1&tableId=1` ) ကနေ တစ်ဆင့် location id ကို ယူပြီး
   - လက်ရှိlocation မှာ ရှိတဲ့ menu တွေ ပြပေးခြင်း
   - menu itemမှာ ရှိတဲ့ addon category တွေ ပြပေးခြင်း
   - addon တွေ ပြပေးခြင်း
   - order တစ်ခု create / edit / cancle လုပ်ခြင်း
   - cart ထဲမှာ ပြပေးခြင်း
   - bill တွက်ပေးခြင်း
   - order comfirm လုပ်ခြင်း စတာတွေ အဓိက ထည့်ပေးရမှာဖြစ်ပါတယ်
   ##
###   File structure
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1131813768238731294/image.png)
- index.tsx မှာ ရောက်နေတဲ့ location မှာရှိတဲ့ menu category တွေနဲ့ menu တွေကို ပြပေးမှာဖြစ်ပါတယ်
- နောက်ထပ် cart ကို ၀င်ကြည့်လို့ရမယ့် button တစ်ခုလည်း ထည့်ပေးထားပါတယ်

```js
import MenuCard from "@/components/MenuCard";
import OrderLayout from "@/components/OrderLayout";
import ViewCartBar from "@/components/ViewCartBar";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getMenusByMenuCategoryId } from "@/utils/client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { MenuCategories as MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderApp = () => {
  const router = useRouter();
  const query = router.query;
  const selectedLocationId = query.locationId as string;
  const { menuCategories, menus, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenus = () => {
    const isValid = selectedLocationId && selectedMenuCategory;
    if (!isValid) return;
    const menuCategoryId = String(selectedMenuCategory.id);
    const validMenus = getMenusByMenuCategoryId(
      menus,
      menuCategoryId,
      menusMenuCategoriesLocations,
      selectedLocationId
    );

    return validMenus.map((item) => {
      const href = { pathname: `/order/menus/${item.id}`, query };
      return <MenuCard key={item.id} menu={item} href={href} />;
    });
  };

  return (
    <OrderLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(evt, value) => setValue(value)}
            variant="scrollable"
          >
            {menuCategories.map((item) => {
              return (
                <Tab
                  key={item.id}
                  label={item.name}
                  onClick={() => setSelectedMenuCategory(item)}
                />
              );
            })}
          </Tabs>
        </Box>
        <Box sx={{ p: 3, display: "flex" }}>{renderMenus()}</Box>
        <ViewCartBar />
      </Box>
    </OrderLayout>
  );
};

export default OrderApp;

```
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1131867072822005891/image.png)
- Menu တစ်ခုခု ကို နှိပ်လိုက်ရင်တော့ order folder အောက်က /menus ကို ရောက်သွားမှာဖြစ်ပါတယ်
- menus folder ထဲမှာတော့ နှိပ်လိုက်တဲ့ menu id ကို dynamic route နဲ့ လက်ခံထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1131867792002523146/image.png)
```js
import AddonCategories from "@/components/AddonCategories";
import OrderLayout from "@/components/OrderLayout";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { CartItem, addToCart, selectCart } from "@/store/slices/cartSlice";
import { generateRandomId, getAddonCategoriesByMenuId } from "@/utils/client";
import { Box, Button, Typography } from "@mui/material";
import {
  Addons as Addon,
  AddonCategories as AddonCategory,
} from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Menu = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const { menus, addons, addonCategories, menusAddonCategories } =
    useAppSelector(appData);
  const { items } = useAppSelector(selectCart);

  const menuId = router.query.id as string;
  const menu = menus.find((item) => item.id === Number(menuId));
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const validAddonCategories = getAddonCategoriesByMenuId(
    addonCategories,
    menuId,
    menusAddonCategories
  );
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );

  useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.isRequired
    );
    if (requiredAddonCategories.length) {
      if (!selectedAddons.length) {
        setIsDisabled(true);
      } else {
        const requiredAddons = selectedAddons.filter((item) => {
          const addonCategory = validAddonCategories.find(
            (validAddonCategory) =>
              validAddonCategory.id === item.addonCategoryId
          );
          if (addonCategory?.isRequired) {
            return true;
          }
          return false;
        });
        const hasSelectedAllRequiredAddons =
          requiredAddonCategories.length === requiredAddons.length;
        const isDisabled = hasSelectedAllRequiredAddons ? false : true;
        setIsDisabled(isDisabled);
      }
    }
  }, [selectedAddons, validAddonCategories]);

  const handleAddToCart = () => {
    if (!menu) return;
    const cartItem: CartItem = {
      id: generateRandomId(),
      menu,
      quantity,
      addons: selectedAddons,
    };
    dispatch(addToCart(cartItem));
    router.push({ pathname: "/order", query });
  };

  const handleAddonSelect = (selected: boolean, addon: Addon) => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategory;
    if (addonCategory.isRequired) {
      const addonWtihSameAddonCategory = selectedAddons.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      let newSelectedAddons: Addon[] = [];
      if (addonWtihSameAddonCategory) {
        const filteredAddons = selectedAddons.filter(
          (item) => item.id !== addonWtihSameAddonCategory.id
        );
        newSelectedAddons = [...filteredAddons, addon];
      } else {
        newSelectedAddons = [...selectedAddons, addon];
      }
      setSelectedAddons(newSelectedAddons);
    } else {
      if (selected) {
        setSelectedAddons([...selectedAddons, addon]);
      } else {
        setSelectedAddons([
          ...selectedAddons.filter(
            (selectedAddon) => selectedAddon.id !== addon.id
          ),
        ]);
      }
    }
  };

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  return (
    <OrderLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {menu?.name}
        </Typography>
        <AddonCategories
          validAddonCategories={validAddonCategories}
          validAddons={validAddons}
          selectedAddons={selectedAddons}
          onChange={(checked, item) => handleAddonSelect(checked, item)}
        />
        <QuantitySelector
          value={quantity}
          onDecrease={handleQuantityDecrease}
          onIncrease={handleQuantityIncrease}
        />
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleAddToCart}
          sx={{ mt: 3, width: "fit-content" }}
        >
          Add to cart
        </Button>
      </Box>
    </OrderLayout>
  );
};
export default Menu;

```
> ရှင်းလင်းချက်
```js
  const menuId = router.query.id as string;
  const menu = menus.find((item) => item.id === Number(menuId));
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const validAddonCategories = getAddonCategoriesByMenuId(
    addonCategories,
    menuId,
    menusAddonCategories
  );
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );

```
- menu id ကို လှမ်းယူလိုက်ပြီး အဲ့ဒီ menu နဲ့ ချိတ်ထားတဲ့ Addon category တွေ နဲ့ addon တွေ ရွေးထုတ်လိုက်တာပါ

```js
 useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.isRequired
    );
    if (requiredAddonCategories.length) {
      if (!selectedAddons.length) {
        setIsDisabled(true);
      } else {
        const requiredAddons = selectedAddons.filter((item) => {
          const addonCategory = validAddonCategories.find(
            (validAddonCategory) =>
              validAddonCategory.id === item.addonCategoryId
          );
          if (addonCategory?.isRequired) {
            return true;
          }
          return false;
        });
        const hasSelectedAllRequiredAddons =
          requiredAddonCategories.length === requiredAddons.length;
        const isDisabled = hasSelectedAllRequiredAddons ? false : true;
        setIsDisabled(isDisabled);
      }
    }
  }, [selectedAddons, validAddonCategories]);
```
- useEffect ထဲမှာတော့ user က addon တစ်ခု ရွေးလိုက်တိုင်း အဲ့ဒီ addon ရှိနေတဲ့ addon category ဟာ required ဖြစ်မဖြစ်စစ်လိုက်ပြီး
- required ဖြစ်တဲ့ category ပါလာပါက တစ်ခုခုကို ရွေးထားမှ add to cart ခလုတ်ကို နှိပ်လို့ရအောင် လုပ်ထားတာဖြစ်ပါတယ်
```js
 const handleAddToCart = () => {
    if (!menu) return;
    const cartItem: CartItem = {
      id: generateRandomId(),
      menu,
      quantity,
      addons: selectedAddons,
    };
    dispatch(addToCart(cartItem));
    router.push({ pathname: "/order", query });
  };
```
- Add to Cart ခလုတ်ကိုနှိပ်လိုက်ချိန်မှာ run မယ့် function ဖြစ်ပါတယ်
- ရွေးထားmenu item နဲ့ addon တွေကို random id တစ်ခုနဲ့ cartItem object မှာ သိမ်းပြီး store ထဲက cart slice မှာရှိတဲ့ addToCart action ကို dispatch လုပ်ပေးလိုက်တာပါ
```js
 const handleAddonSelect = (selected: boolean, addon: Addon) => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategory;
    if (addonCategory.isRequired) {
      const addonWtihSameAddonCategory = selectedAddons.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      let newSelectedAddons: Addon[] = [];
      if (addonWtihSameAddonCategory) {
        const filteredAddons = selectedAddons.filter(
          (item) => item.id !== addonWtihSameAddonCategory.id
        );
        newSelectedAddons = [...filteredAddons, addon];
      } else {
        newSelectedAddons = [...selectedAddons, addon];
      }
      setSelectedAddons(newSelectedAddons);
    } else {
      if (selected) {
        setSelectedAddons([...selectedAddons, addon]);
      } else {
        setSelectedAddons([
          ...selectedAddons.filter(
            (selectedAddon) => selectedAddon.id !== addon.id
          ),
        ]);
      }
    }
  };
```
- addon တစ်ခု ရွေးလိုက်တိုင်း optional လား required လား စစ်ပြီး
- optional ဆိုရင်တော့ selectedAddon state ကို update လုပ်ပြီး ရွေးထားတာကို ထပ်ထည့်ပေးလိုက်ပါတယ်
- required ဖြစ်ခဲ့ရင်တော့ ရွေးထားတဲ့ addon ဟာ  category တူမတူ ထပ်စစ်လိုက်ပါတယ်။ required ဖြစ်တဲ့ addon category မှာ item( addon ) တစ်ခုသာရွေးပေးရမှာ ဖြစ်လို့  category တူတဲ့ required addon တစ်ခုရွေးပြီးသားမှာ နောက်ထပ်တစ်ခု ထပ်ရွေးခဲ့ရင် အရင် ရွေးထားတဲ့ addon ကို ဖြုတ်ပြီး နောက်ထပ်ရွေးတဲ့ addon ကို selectedAddon stateမှာ update လုပ်ပေးလိုက်ပါတယ်
```js
 const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };
```
- ဒါကတော့ Quantity ( အရေအတွက်) ကို တိုး/လျော့ လုပ်ပေးမယ့် function တွေဖြစ်ပါတယ်
```js
 return (
    <OrderLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {menu?.name}
        </Typography>
        <AddonCategories
          validAddonCategories={validAddonCategories}
          validAddons={validAddons}
          selectedAddons={selectedAddons}
          onChange={(checked, item) => handleAddonSelect(checked, item)}
        />
        <QuantitySelector
          value={quantity}
          onDecrease={handleQuantityDecrease}
          onIncrease={handleQuantityIncrease}
        />
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleAddToCart}
          sx={{ mt: 3, width: "fit-content" }}
        >
          Add to cart
        </Button>
      </Box>
    </OrderLayout>
  );
```
- reteurn ထဲမှာတော့ seltcted menu ရယ် သူနဲ့ ချိတ်ပေးထားတဲ့ addon / category တွေရယ် အရေအတွက်ရွေးလို့ရမယ့် ခလုတ်တွေရယ် ကို render လုပ်ပြီး ပြပေးထားတာပဲ ဖြစ်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1131874649907675238/image.png)
- အချုပ်အားဖြင့် menus router ( page) မှာ order page ကနေ နှိပ်လိုက်တဲ့ menu နဲ့ ချိတ်ထားတဲ့ addon တွေကို ပြပေးထားပြီး addon တစ်ခု ရွေးလိုက်ရင် required ဖြစ်မဖြစ်စစ်ပြီး required ဖြစ်တဲ့ category တစ်ခုမှာ item တစ်ခုပဲ ရွေးလို့ရအောင် လုပ်ထားတာပဲဖြစ်ပါတယ်
- နောက်ထပ် required ဖြစ်တာတွေ ရွေးထားမထား စစ်ပြီး add to cart button ကို အလုပ်လုပ်အောင် ထိန်းချုပ်ထားပါတယ်
- quantity မှာလည်း 1 အောက်ငယ်ရင် `-` လို့မရအောင် သတ်မှတ်ထားပါတယ်
##
### Cart page
- menu တစ်ခုကို ရွေးပြီး လိုအပ်တဲ့ addon တွေ ထည့်ပြီးရင် add to cart လုပ်လိုက်ပါက order app page ကို ပြန်ရောက်သွားမှာဖြစ်ပြီး အောက်နားက cart info bar မှာ ခုလိုပြပေးနေမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1131877002362769488/image.png)
- အဲ့ဒီ cart bar ကို နှိပ်ကြည့်လိုက်ရင် order လုပ်ထားတဲ့ menu item တွေ ပြပေးအောင် order folder အောက်မှာ cart folder တစ်ခုလုပ်ပြီးခုလိုသတ်မှတ်ပေးထားပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1131883250156056666/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1131877455200784434/image.png)

```js
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CartItem,
  emptyCart,
  removeFromCart,
  selectCart,
} from "@/store/slices/cartSlice";
import { addOrder } from "@/store/slices/ordersSlice";
import { getCartTotalPrice } from "@/utils/client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Addons as Addon } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Review = () => {
  const { items, isLoading } = useAppSelector(selectCart);
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !items.length) {
      const query = router.query;
      const isValid = query.locationId && query.tableId;
      isValid && router.push({ pathname: "/order", query });
    }
  }, [items, router.query]);

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return addons.map((item) => {
      return (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{item.name}</Typography>
          <Typography>{item.price}</Typography>
        </Box>
      );
    });
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const confirmOrder = async () => {
    const { locationId, tableId } = query;
    const isValid = locationId && tableId && items.length;
    if (!isValid) return alert("Required locationId and tableId");
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      }
    );
    const orderCreated = await response.json();
    dispatch(addOrder(orderCreated));
    router.push({ pathname: `/order/activeOrder/${orderCreated.id}`, query });
  };

  if (!items.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "500px" },
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
          Review your order
        </Typography>
        {items.map((cartItem, index) => {
          const { menu, addons, quantity } = cartItem;
          return (
            <Box key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    mr: 1,
                    backgroundColor: "green",
                  }}
                >
                  {quantity}
                </Avatar>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6">{menu.name}</Typography>
                  <Typography variant="h6">{menu.price}</Typography>
                </Box>
              </Box>
              <Box sx={{ pl: 6 }}>{renderAddons(addons)}</Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 3,
                  mt: 1,
                }}
              >
                <DeleteIcon
                  sx={{ mr: 2, cursor: "pointer" }}
                  onClick={() => handleRemoveFromCart(cartItem)}
                />
                <EditIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    router.push({
                      pathname: `menuUpdate/${cartItem.id}`,
                      query: router.query,
                    })
                  }
                />
              </Box>
            </Box>
          );
        })}
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Typography variant="h4">
            Total: {getCartTotalPrice(items)}
          </Typography>
        </Box>
        <Box sx={{ mt: 3, textAlign: "center" }} onClick={confirmOrder}>
          <Button variant="contained">Confirm order</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Review;

```
> ရှင်းလင်းချက်

- ဒီ page မှာတော့ order ထဲက items တွေကို edit/update and delete လုပ်လို့ရအောင် နဲ့ order မှာ လို့ ရအောင် ပြုလုပ်ပေးထားပါတယ်
- confirm လုပ်လိုက်ပါက database ထဲရှိ  order line table တွေမှာ row တွေ create လုပ်ပြီး သိမ်းပေးလိုက်မှာဖြစ်ပါတယ်
- delete လုပ်လိုက်ရင်တော့ cart slice ထဲက removeFromCart action ကို dispatch လုပ်ပြီး item ကို ဖြူတ်ပေးလိုက်ပါတယ်
- edit  ကို နှိပ်လိုက်ရင်တော့ နောက်ထပ် menuUpdate route ကို redirect လုပ်ပြီး ပို့ပေးလိုက်မှာဖြစ်ပါတယ်
##
### Menu update
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1131883449553260624/image.png)

```js
import AddonCategories from "@/components/AddonCategories";
import OrderLayout from "@/components/OrderLayout";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { selectCart, updateCart } from "@/store/slices/cartSlice";
import { getAddonCategoriesByMenuId } from "@/utils/client";
import { Box, Button, Typography } from "@mui/material";
import {
  Addons as Addon,
  AddonCategories as AddonCategory,
} from "@prisma/client";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const MenuUpdate = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const { addons, addonCategories, menusAddonCategories } =
    useAppSelector(appData);
  const { items } = useAppSelector(selectCart);
  const cartItemId = router.query.id as string;
  const cartItem = items.find((item) => item.id === cartItemId);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const validAddonCategories = cartItem
    ? getAddonCategoriesByMenuId(
        addonCategories,
        String(cartItem?.menu.id),
        menusAddonCategories
      )
    : [];
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );

  const handleUpdateCart = () => {
    if (!cartItem) return;
    dispatch(
      updateCart({
        id: cartItemId,
        menu: cartItem.menu,
        addons: selectedAddons,
        quantity,
      })
    );
    router.push({ pathname: "/order/cart", query });
  };

  const handleAddonSelect = (selected: boolean, addon: Addon) => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategory;
    if (addonCategory.isRequired) {
      const addonWtihSameAddonCategory = selectedAddons.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      let newSelectedAddons: Addon[] = [];
      if (addonWtihSameAddonCategory) {
        const filteredAddons = selectedAddons.filter(
          (item) => item.id !== addonWtihSameAddonCategory.id
        );
        newSelectedAddons = [...filteredAddons, addon];
      } else {
        newSelectedAddons = [...selectedAddons, addon];
      }
      setSelectedAddons(newSelectedAddons);
    } else {
      if (selected) {
        setSelectedAddons([...selectedAddons, addon]);
      } else {
        setSelectedAddons([
          ...selectedAddons.filter(
            (selectedAddon) => selectedAddon.id !== addon.id
          ),
        ]);
      }
    }
  };

  useEffect(() => {
    if (cartItem) {
      const selectedAddon = items.find(
        (item) => item.menu.id === cartItem.menu.id
      )?.addons as Addon[];
      setSelectedAddons(selectedAddon);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem, items]);

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  return (
    <OrderLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          {cartItem?.menu?.name}
        </Typography>
        <AddonCategories
          validAddonCategories={validAddonCategories}
          validAddons={validAddons}
          selectedAddons={selectedAddons}
          onChange={(checked, item) => handleAddonSelect(checked, item)}
        />
        <QuantitySelector
          value={quantity}
          onDecrease={handleQuantityDecrease}
          onIncrease={handleQuantityIncrease}
        />
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleUpdateCart}
          sx={{ mt: 3, width: "fit-content" }}
        >
          Update
        </Button>
      </Box>
    </OrderLayout>
  );
};
export default MenuUpdate;

```
- menu update မှာတော့ addon တွေ နဲ့ quantity ကို ပြင်လို့ရအောင် သတ်မှတ်ပေးထားပါတယ်
- addon တွေ ထပ်ထည့်/ဖြုတ် လိုက်တဲ့အချိန်မှာ အပေါ်က menu item မှာကလိုပဲ addon category တူမတူ နဲ့ required ဖြစ်မဖြစ် စစ်လိုက်ပြီး အရင်ရှိပြီးသား addon တွေမှာ အသစ်ပြန်ရွေးလိုက်တဲ့ addon တွေကို အစားထိုးပေးလိုက်တာပဲဖြစ်ပါတယ်
