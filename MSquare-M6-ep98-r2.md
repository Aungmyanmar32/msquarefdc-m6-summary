## MSquare Programing Fullstack Course
### Episode-*98* 
### Summary For `Room(2)` 
## Add new user
- ဒီနေ့သင်ခန်းစာမှာတော့ nextJS နဲ့ prisma ကို သုံးပြီး user တစ်ယောက် create လုပ်ကာ database ထဲက User table မှာ သိမ်းလိုက်တာကို လေ့လာကြည့်ရအောင်
- အရင်ဆုံး schema ဖိုင်ထဲမှာ Post table ကို ခနဖျက်လိုက်ပြီး user table မှာ ပြန်ပြင်ရေးလိုက်ပါမယ်

```js
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User{
  id Int @id @default(autoincrement())
  name String
 email String
}
```
- MUI ကို သုံးမှာမလို့ project ထဲ install လုပ်ပေးလိုက်ပါမယ်

```console
npm i @emotion/react @emotion/server @emotion/styled @mui/material
```
- ပြီးရင် backoffice folder အောက်က index.tsx မှာလည်း ခုလို ထပ်ပြင်ရေးလိုက်ပါမယ်
```js
// pages / backoffice / index.tsx

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const BackofficeApp = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  const handleCreateNewUser = async () => {
    const isValid = user.name && user.email;
    if (!isValid) return alert("Name and email are required.");
    await fetch("http://localhost:3000/api/backoffice", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          maxWidth: 200,
          margin: "0 auto",
          mt: 3,
        }}
      >
        <TextField
          placeholder="Name"
          sx={{ mb: 2 }}
          onChange={(evt) => setUser({ ...user, name: evt.target.value })}
        ></TextField>
        <TextField
          placeholder="email"
          sx={{ mb: 2 }}
          onChange={(evt) => setUser({ ...user, email: evt.target.value })}
        ></TextField>
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={handleCreateNewUser}
        >
          Create new user
        </Button>
      </Box>
    </Box>
  );
};

export default BackofficeApp;

```

- `const [user, setUser] = useState({ name: "", email: "" });`
-  user state တစ်ခုလုပ်ထားပါတယ်
```js
 const handleCreateNewUser = async () => {
    const isValid = user.name && user.email;
    if (!isValid) return alert("Name and email are required.");
    await fetch("http://localhost:3000/api/backoffice", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    });
  };
```
- `handleCreateNewUser`  function တစ်ခု သတ်မှတ်ထားပါတယ်
- function ထဲမှာတော့ user state ထဲမှာ name နဲ့ email တန်ဖိုးတွေ ရှိခဲ့ရင် /api/backoffice route ဆီ POST method နဲ့ request လုပ်ပြီး user state တန်ဖိုးကို ကို body အနေနဲ့ ထည့်ပေးလိုက်တာဖြစ်ပါတယ်
- return ထဲမှာတော့ name နဲ့ email တွေ ထည့်လို့ရမယ့် textfield နှစ်ခု လုပ်ထားပြီး အဲ့ဒီမှာ ပြောင်းလဲမှု ရှိတိုင်း user state ကို update လုပ်ထားပါတယ်
- Textfield တွေအောက်မှာတော့ Create new user ခလုတ်တစ်ခု လုပ်ထားပြီး နှိပ်လိုက်ရင် `handleCreateNewUser`  function ကို ခေါ်ပေးမှာဖြစ်ပါတယ်
- ဆက်ပြီး nextJS က api folder အောက်မှာ /api/backoffice route ဆီ ၀င်လာမယ့် request ကို လက်ခံပြီး database နဲ့ ချိတ်ဆက်လို့ရအောင် prisma client တစ်ခု လုပ်ပေးရပါမယ်
- src folder အောက်မှာ utils folder တစ်ခု လုပ်ပါမယ်
-  utils folder ထဲမှာ index.ts ဖိုင်တစ်ခုလုပ်ပြီ; prisma client ကို လုပ်ပါမယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1125497669486387330/image.png)

- ဆက်ပြီး nextJS က api folder အောက်မှာ /api/backoffice route ဆီ ၀င်လာမယ့် request ကို လက်ခံပြီး database နဲ့ ချိတ်ဆက်ပါမယ် ( **nextJS မှာ backend အတွက် code တွေကို api folder အောက်မှာ ရေးကိုရေးပေးရမှာ**ကို အရင်သင်ခန်းစာမှာ ရှင်းပြခဲ့ပါတယ်)
-  api folder အောက်မှာ backoffice အတွက် serverside code တွေ ရေးလိုရအောင် backoffice folder တစ်ခု လုပ်ပါမယ်
-  backoffice folder ထဲမှာမှ  index.ts ဖိုင် တစ်ခုလုပ်ပြီး request ကို လက်ခံကာ database မှာ create လုပ်ပေးမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1125499373619519649/image.png)

```js
import { prisma } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
```
- prisma client နဲ့ next js ရဲ့ request /response type တွေကို input လုပ်ထားပါတယ်
```js
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { .......... }
```
- request နဲ့ response ကို လက်ခံမယ် async function တစ်ခု လုပ်ထားပါတယ်

```js
const method = req.method;
  if (method === "POST") {
    const { name, email } = req.body;
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return res.send(200);
  }
```
- ၀င်လာတဲ့ request က POST method ဟုတ်မဟုတ် စစ်လိုက်ပြီး 
- မှန်ခဲ့ရင်တော့ request body ထဲက name နဲ့ email ကို ထုတ်ယူလိုက်ပါတယ်
- **`prisma.user.create`** ဆိုတာက database ထဲရှိ user table မှာ rows တစ်ခု create လုပ်မှာဖြစ်ပြီး 
-   **`data: {name,email, }`** ဆိုတာက user table ထဲရှိ name column ရဲ့ တန်ဖိုးအဖြစ် request body ထဲက name နဲ့   email column ရဲ့ တန်ဖိုးအဖြစ် request body ထဲက email နဲ့  create လုပ်ခိုင်းလိုက်တာဖြစ်ပါတယ်
- အကုန်အဆင်ပြေတယ်ဆို 200 ( OK) ကို response ပြန်ခိုင်းလိုက်ပါတယ်
##
### http://localhost:3000/backoffice ကို သွားကြည့်ပါက user အသစ် create လုပ်ရန် ပြပေးမှာဖြစ်ပါတယ်
- user အသစ် တစ်ယောက် ထည့်ပြီး create new user လုပ်ကြည့်လိုက်ပါက database က user table မှာ rows တစ်ခု တိုးလာတာကို ပြပေးမှာ ဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1125502711949950987/image.png)

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1125502789062246420/image.png)
