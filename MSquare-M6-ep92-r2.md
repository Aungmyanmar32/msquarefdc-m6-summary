## MSquare Programing Fullstack Course
### Episode-*92* 
### Summary For `Room(2)` 
## Menu Categories (CURD) part 4
### Delete menu in Edit menu category
- menu category တစ်ခု edit and update လုပ်တဲ့အခါ ချိတ်ထားတဲ့ menu တွေပါ ဖြူတ်လို့ေအာင် ဆက်လုပ်ပါမယ်
![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122121777452154910/image.png)
- open နဲ့ selectMenu ဆိုတဲ့ state နှစ်ခု သတ်မှတ်ထားပါတယ်
- useNavigate ကို လဲ navigate အဖြစ်သတ်မှတ်ထားပြီး selectedLocationId ကိုလဲ lacalstroage ကနေ လှမ်းယူလိုက်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122122676065021952/image.png)
 - ***handleRemoveMenuFromMenuCategory***  function တစ်ခု သတ်မှတ်လိုက်ပါတယ်
 - အထဲမှာတော့ server ဆီ ***/menuCategories/removeMenu*** route နဲ့ request လုပ်ထားပြီး `selectedMenuId , menuCategoryId , selectedLocationId` ကို body အနေနဲ့  ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
 
 ![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122124227038945300/image.png)
```js
 <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
            {validMenus.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <MenuCard menu={item} />
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setSelectedMenu(item);
                    }}
                    variant="contained"
                    color="error"
                    sx={{ mt: 1, width: "fit-content" }}
                  >
                    Remove
                  </Button>
                </Box>
```
- အရင်သင်ခန်းစာက EditManuCategory page မှာ menu တွေ ပြတဲ့နေရာကို ပြန်ပြင်ရေးထားတာဖြစ်ပါတယ်
- Menu card နဲ့ ချိတ်ထားတဲ့ menu တွေကို loop လုပ်ပြီး ပြထားပေးပြီး menu တစ်ခုချင်းဆီအောက်မှာ Remove button လေးတစ်ခု ထည့်ပေးလိုက်ပါတယ်
- Remove button ကို နှိပ်လိုက်တဲ့ အချိန်မှာ open state ရဲ့ တန်ဖိုးကို open အဖြစ် update လုပ်လိုက်ပြီး selectedMenu ရဲ့ တန်ဖိုးအဖြစ် လက်ရှိ loop လုပ်နေတဲ့ menu ကို သတ်မှတ်ပေးလိုက်တာဖြစ်ပါတယ်
- Remove button ကို နှိပ်လိုက်တဲ့ အချိန်မှာ DeleteDialog box ကို ပြပေးပြီး menu ကို removed လုပ်လို့ရအောင် လုပ်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122176788483821679/image.png)

- DeleteDialog component ကို ခေါ်သုံးထားပြီး 
   -open state  ကို  open props အဖြစ်
   - setOpen function ကို  setOpen  props အဖြစ်
   - handleRemoveMenuFromMenuCategory function ကို  callback အဖြစ်
- ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- ခု frontend ဘက်မှာတော့ menu item ကို remove လုပ်ဖို့ ပြင်ဆင်ပြီးပါပြီး
- frontend က ၀င်လာမယ့် request ကို backend မှာ လက်ခံပြီး remove and update လုပ်ပေးပါမယ်

```js
// Add to --> backend/src/route/menuCategories.tsx

menuCategoriesRouter.put("/removeMenu", async (req: Request, res: Response) => {
  const { menuId, menuCategoryId, locationId } = req.body;
  const isValid = menuId && menuCategoryId && locationId;
  if (!isValid) return res.send(400);
  const menusMenuCategoriesLocations = await db.query(
    "select * from menus_menu_categories_locations where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
    [menuId, menuCategoryId, locationId]
  );
  const hasMenusMenuCategoriesLocations =
    menusMenuCategoriesLocations.rows.length;
  if (!hasMenusMenuCategoriesLocations) return res.send(400);
  await db.query(
    "update menus_menu_categories_locations set is_archived = true where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
    [menuId, menuCategoryId, locationId]
  );
  res.send(200);
});

```
- ရှင်းလင်းချက်
```
  const { menuId, menuCategoryId, locationId } = req.body;
  const isValid = menuId && menuCategoryId && locationId;
  if (!isValid) return res.send(400);
```
- အရင်ဆုံး request body ထဲမှာ  *menuId*,  *menuCategoryId*,  *locationId* တွေ ပါမပါ စစ်လိုက်ပြီး မပါခဲ့ရင် bad request ပဲ response ပြန်ပေးလိုက်ပါတယ်
```js
  const menusMenuCategoriesLocations = await db.query(
    "select * from menus_menu_categories_locations where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
    [menuId, menuCategoryId, locationId]
  );
  const hasMenusMenuCategoriesLocations =
    menusMenuCategoriesLocations.rows.length;
  if (!hasMenusMenuCategoriesLocations) return res.send(400);
```
- ၀င်လာတဲ့ id တွေ အကုန်တူတဲ့ row ကို  menusMenuCategoriesLocations  table မှာ ရှိမရှိ စစ်လိုက်ပြီး မရှိခဲ့ရင် bad request ပဲ response ပြန်ပေးလိုက်ပါတယ်
```js
  await db.query(
    "update menus_menu_categories_locations set is_archived = true where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
    [menuId, menuCategoryId, locationId]
  );
  res.send(200);
```
- လိုအပ်တဲ့ data တွေလဲပါ id တွေ အကုန်တူတဲ့ row လဲရှိခဲ့ရင် တော့ အဲ့ဒီ row ထဲက is_archived တန်ဖိုး true လုပ်ပေးလိုက်ဖြစ်ပါတယ်
- ခု menu category edit လုပ်တဲ့နေရာမှာ menu item တစ်ခု remove လုပ်ကြည့်ပါက အောက်ကပုံလို remove လုပ်ပေးလိုက်တာမြင်ရမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122181233233903697/image.png)
- hot dish ဆိုတဲ့ menu category မှာ hhh2 နဲ့  ရခိုင်မုန့်တီ menu item နှစ်ခုရှိပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122181763142262794/image.png)
-  ရခိုင်မုန့်တီ ကို remove လုပ်ကြည့်တဲ့အခါ Delete Dialog ပေါ်လာပြီး တကယ်ဖျက်မလားမေးပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122181830230151259/image.png)
- confirm လုပ်ပေးလိုက်တဲ့အခါ menu item မှာ  ရခိုင်မုန့်တီ  မရှိတော့တာကို မြင်ရမှာဖြစ်ပါတယ်
##
### ဆက်ပြီး menu category တစ်ခုလုံး delete လုပ်လို့ရအောင် လုပ်သွားပါမယ်
```js
// Added to EditMenuCategory.tsx

 const [openDeleteMenuCategoryDialog, setOpenDeleteMenuCategoryDialog] =
    useState(false);
```
- ***openDeleteMenuCategoryDialog*** state တစ်ခု သတ်မှတ်လိုက်ပြီး initial value အဖြစ် false ထားတားပါတယ်
```js
// Added to EditMenuCategory.tsx

 const handleDeleteMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories/${menuCategoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: selectedLocationId,
      }),
    });
    accessToken && fetchData(accessToken);
    navigate("/menuCategories");
  }; 
  ``` 
  - ***handleDeleteMenuCategory***  function တစ်ခု သတ်မှတ်ထားပါတယ်
  -  menucategory id ကို request params အနေနဲ့ ထည့်ပြီး /menuCategories route ကို delete method နဲ့ request လုပ်ထားပါတယ်
  - body အနေနဲ့ selectedLocationId ကို ထည့်ပေးထားပါတယ်
  - request ပြီးတဲ့ အချိန်မှာ fetchdata ကို ပြန်ခေါ်ပေးလိုက်ပြီး /menuCategories ဆီ ပြန်ပို့ပေးထားပါတယ်
  
  ![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122187721935425606/image.png)
  - delete button တစ်ခုကို return လုပ်တဲ့အထဲမှာ ထပ်ထည့်လိုက်ပြီး click လုပ်လိုက်ရင် openDeleteMenuCategoryDialog ရဲ့ value ကို true အဖြစ် update လုပ်လိုက်တာဖြစ်ပါတယ်
  - menu category ကို delete လုပ်တဲ့ ပုံစံကိုလဲ menu တွေ remove လုပ်တဲ့အတိုင်း DeleteDialog component ကို သုံးပြီး လုပ်ပေးလိုက်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1074216733889527919/1122189339116445706/image.png)

- DeleteDialog component ကို ခေါ်သုံးထားပြီး 
   -openDeleteMenuCategoryDialog state  ကို  open props အဖြစ်
   - setOpenDeleteMenuCategoryDialogfunction ကို  setOpen  props အဖြစ်
   - handleDeleteMenuCategory function ကို  callback အဖြစ်
- ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- ခု frontend ဘက်မှာတော့ menu category ကို delete လုပ်ဖို့ ပြင်ဆင်ပြီးပါပြီး
- frontend က ၀င်လာမယ့် request ကို backend မှာ လက်ခံပြီး remove and update လုပ်ပေးပါမယ်

```js
// Add to menuCategoryRouter.ts

menuCategoriesRouter.delete("/:id", async (req: Request, res: Response) => {
  const isValid = req.params.id && req.body.locationId;
  if (!isValid) return res.send(400);
  const menuCategoryId = req.params.id as string;
  const locationId = req.body.locationId as string;
  const menusMenuCategoriesLocations = await db.query(
    "select * from menus_menu_categories_locations where menu_categories_id = $1 and locations_id = $2",
    [menuCategoryId, locationId]
  );
  const hasMenusMenuCategoriesLocations =
    menusMenuCategoriesLocations.rows.length;
  if (!hasMenusMenuCategoriesLocations) return res.send(400);
  menusMenuCategoriesLocations.rows.forEach(async (item) => {
    const menusMenuCategoriesLocationsId = item.id;
    await db.query(
      "update menus_menu_categories_locations set is_archived = true where id = $1",
      [menusMenuCategoriesLocationsId]
    );
  });
  res.send(200);
});
```
- menu တွေကို remove လုပ်တုန်းကလိုပဲ လိုအပ် data တွေ နဲ့  update လုပ်မယ့် table ထဲမှာ id တွေ တူတဲ့ row ရှိမရှိ စစ်ပြီး အကုန်ရှိခဲ့ရင် is_archived ကို true လုပ်ပေးလိုက်တာဖြစ်ပါတယ်
