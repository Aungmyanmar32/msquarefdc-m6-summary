## MSquare Programing Fullstack Course
### Episode-*75* 
### Summary For `Room(2)` 
### Create default data for new user
##
### User အသစ်တစ်ယောက် register လုပ်တဲ့အခါ အဲ့ဒီ user အတွက် နမူနာ data တွေ ကို database မှာ create လုပ်ပေးတာကို လေ့လာကြပါမယ်။
- user register လုပ်တဲ့ အခါ server ဆီမှာ register ဆိုတဲ့ route နဲ့ လက်ခံပြီး database က user table မှာ သိမ်းထားခဲ့ပါတယ်
- အဲ့ဒီ user တွေကို company နဲ့ ချိတ်ဆက်ပေးမှာဖြစ်ပါတယ်
- အရင်ဆုံး database မှာ table အသစ်တွေ create လုပ်ပါမယ်
```sql
CREATE TABLE companies (
id serial PRIMARY KEY NOT NULL,
name text NOT NULL
)
```
- companies table တစ်ခု create  လုပ်လိုက်ပါတယ်
```sql
CREATE TABLE locations (
id serial PRIMARY KEY NOT NULL,
name text NOT NULL,
address text,
companies_id integer NOT NULL REFERENCES companies
)
```
- locations table တစ်ခု create လုပ်လိုက်ပြီး companies table ထဲက id ကို FK အနေနဲ့ relation လုပ်ထားပါတယ်
```sql
CREATE TABLE menus_locations (
id serial PRIMARY KEY NOT NULL,
menus_id integer NOT NULL REFERENCES menus,
locations_id integer NOT NULL REFERENCES locations
)
```
- အထက်က လုပ်ထားတဲ့ locations table နဲ့ menus table ကို join table လုပ်လိုက်တာပါ
```sql
CREATE TABLE addon_categories (
id serial PRIMARY KEY NOT NULL,
name text NOT NULL,
is_required BOOLEAN NOT NULL
)
```
- addon_categories table တစ်ခု create  လုပ်လိုက်ပါတယ်
```sql
CREATE TABLE menus_addon_categories (
id serial PRIMARY KEY NOT NULL,
menus_id integer NOT NULL REFERENCES menus,
addon_categories_id integer NOT NULL REFERENCES addon_categories
)
```
- addon_categories နဲ့ menus table ကို join ထားတဲ့ table ပါ။

```sql
CREATE TABLE addons (
id serial PRIMARY KEY NOT NULL,
name text NOT NULL,
price integer NOT NULL
addon_categories_id integer NOT NULL REFERENCES addon_categories
)
```
- addons table တစ်ခု create လုပ်လိုက်ပြီး addon_categories table ထဲက id ကို FK အနေနဲ့ relation လုပ်ထားပါတယ်

- အရင်က လုပ်ထားတဲ့ users table မှာလည်း column အသစ်တစ်ခု ထပ်ထည့်ပါမယ်
```sql
DELETE * FROM users
```
- users table  ထဲ ရှိတဲ့ rows တွေကို အရင်ဖျက်လိုက်ပြီး
```sql
ALTER TABLE users 
ADD COLUMN companies_id integer NOT NULL REFERENCES companies;
```
- companies_id ဆိုတဲ့ column အသစ် ထပ်ထည့် ကာ companies table ထဲက id နဲ့ relation လုပ်လိုက်တာဖြစ်ပါတယ်။
##
### လိုအပ်တဲ့  table တွေ လုပ်ပြီးပြီး ဆိုတော့ register လုပ်တဲ့အခါ default data တွေ create လုပ်ပါမယ်

```js
// backend/server.ts --> /auth/register
qpp.post("/auth/register", async (req: Request, res: Response) => {
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


```
> ရှင်းလင်းချက်

```js
const companiesResult = await db.query(
      "insert into companies(name) values($1)  RETURNING *",
      ["Defult company"]
    );
    console.log(companiesResult.rows);
    const companiesId = companiesResult.rows[0].id;
```
- companies table ထဲကို default company ဆိုတဲ့ name တစ်ခု ထည့်လိုက်တာပါ
- အဲ့ဒီ company ရဲ့ id ကို companiesId ဆိုပြီး သိမ်းထားပါတယ်
```js
 const text =
      "INSERT INTO users(name, email, password,companies_id) VALUES($1, $2, $3,$4) RETURNING *";
    const values = [name, email, hashedPassword, companiesId];
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;
```
- request နဲ့အတူပါလာတဲ့ user info တွေကို users table ထဲမှာ သိမ်းလိုက်ပြီး companiesId  ကိုပါ ထည့်ပေးလိုက်ပါတယ်။
- ဒီ user  က ဒီ company နဲ့ relation (ချိတ်ထား) တာဖြစ်ပါတယ်
```js
const locationResult = await db.query(
      "insert into locations(name,address,companies_id) values($1,$2,$3)  RETURNING *",
      ["Defult location", "Defult address", companiesId]
    );

    const locationId = locationResult.rows[0].id;
```
- locations table မှာလည်း default locatios တစ်ခု ထည့်ပေးလိုက်ပြီး compaiesId နဲ့ ချိတ်ပေးထားပါတယ်
- အဲ့ဒီ locationရဲ့ id ကို locationId ဆိုပြီး သိမ်းထားပါတယ်

```js
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
```
- menus table မှာလည်း menu item နှစ်ခု create လုပ်လိုက်ပြီး 
- လုပ်ထားတဲ့ menu item နှစ်ခုရဲ့ id တွေကိုလဲ သိမ်းထားလိုက်ပါတယ်
```js
 await db.query(
      "insert into menus_locations(menus_id,locations_id) select * from unnest($1::int[],$2::int[]) returning *",
      [
        [defaultMenuId1, defaultMenuId2],
        [locationId, locationId],
      ]
    );
```
- အထက်က location နဲ့  menus တွေရဲ့ join table မှာလည်း id တွေ သွားထည့်ပြီး ချိတ်ဆက်လိုက်ပါတယ်
```js
   const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) values ('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
    );
    const defaultMenuCategories = menuCategoriesResult.rows;
    const defaultMenuCategoryId1 = defaultMenuCategories[0].id;
    const defaultMenuCategoryId2 = defaultMenuCategories[1].id;

```
- menu_categories table ထဲမှာလည်း defaultMenuCategories နှစ်ခု create လုပ်ထားလိုက်ပြီး id  တွေ ထုတ်ယူထားပါတယ်
```js
    await db.query(
      `insert into menus_menu_categories (menus_id, menu_categories_id) values(${defaultMenuId1}, ${defaultMenuCategoryId1}), (${defaultMenuId2}, ${defaultMenuCategoryId2})`
    );
```
- ရလာတဲ့ defaultMenuCategories id တွေကို menu နဲ့ join table ဖြစ်တဲ့ menus_menu_categories table ထဲ ချိတ်ဆက်ပေးထားလိုက်ပါတယ်။
```js
 const defaultAddonCategoriesResult = await db.query(
      "insert into addon_categories (name,is_required) values ('Drinks',true), ('Sizes',true) returning *"
    );

    const addonCotegoriesIds = defaultAddonCategoriesResult.rows;
    const defaultAddonCategoryId1 = addonCotegoriesIds[0].id;
    const defaultAddonCategoryId2 = addonCotegoriesIds[1].id;
```
- addon_categories table ထဲမှာ Drinks နဲ့ Sizes ဆိုတဲ့ addon နှစ်ခု ထည့်လိုက်ပြီး id တွေ ထုတ်သိမ်းထားပါတယ်
```js
await db.query(
      `insert into menus_addon_categories (menus_id, addon_categories_id) values (${defaultMenuId1}, ${defaultAddonCategoryId1}), (${defaultMenuId2}, ${defaultAddonCategoryId2})`
    );
```
- ရလာတဲ့ addon_categories id နဲ့ menu id တွေကို join table ထဲမှာ ချိတ်ဆက်ပေးထားပါတယ်
```js
await db.query(`insert into addons (name, price, addon_categories_id) values ('Cola', 50, ${defaultAddonCategoryId1}), ('Pepsi', 50, ${defaultAddonCategoryId1}), 
      ('Large', 30, ${defaultAddonCategoryId2}), ('Normal', 0, ${defaultAddonCategoryId2})`);

```
- Cola နဲ့ Pepsi addon နှစ်ခု လုပ်လိုက်ပြီး drinks categories နဲ့ ချိတ်ဆက်ထားပါတယ်
- နောက်ထပ် large နဲ့ Normal addon နှစ်ခု ထပ်ထည့်လိုက်ပြီး Sizes categories နဲ့ ချိတ်ဆက်ထားပါတယ်
```js
 res.send(user);
```
- နောက်ဆုံး password ဖယ်ထားတဲ့ user object ကို response ပြန်လိုက်ပါတယ်။
- ခု user အသစ်တစ်ယောက်ကို register လုပ်ကြည့်ပါက database table တွေမှာ အထက်မှာ ထည့်ထားတဲ့ data (rows) တွေ ၀င်လာတာကို မြင်ရမှာဖြစ်ပါတယ်
