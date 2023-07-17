## MSquare Programing Fullstack Course
### Episode-*101* 
### Summary For `Room(2)`
## Next Auth 
### Authentication for Next.js
- next js မှာ log in / out နဲ့ Authentication  အတွက် next-auth ဆိုတဲ့ package တစ်ခုကို အသုံးပြုလို့ ရပါတယ်
- ခု သင်ခန်းစာမှာတော့ next auth ကို သုံးပြီး google account နဲ့ log in/out လုပ်လို့ရအောင် လေ့လာသွားကြပါမယ်
- အရင်ဆုံး မိမိ project မှာ next-auth ကို ထည့်ပါ။
```console
npm i next-auth
```
- ပြီးရင် google developer website မှာ credentail ကုဒ်တွေ create သွားလုပ်ပါမယ်
[https://console.developers.google.com/apis/credentials](https://console.developers.google.com/apis/credentials)
- project တစ်ခု create လုပ်ပေးပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130345485283106836/image.png)
- ပြီးရင် create credentail --> 0auth client ID ကို နှိပ်ပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130345907590795284/image.png)

-  Configure consent screen ကို နှိပ်ပါ
- 
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130346027526918145/image.png)

- app name နဲ့ email တွေ ဖြည့်ပြီး save ပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130346368276373555/image.png)

- ပြီးရင် credential ကို ပြန်သွားပြီး credentail တစ်ခု ကို အောက်ပါအတိုင်း create လုပ်လိုက်ပါ

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130349115268677732/image.png)

- Application type မှာ Web application ကို ရွေးပါ
- 
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130347199142834227/image.png)

- Authorized redirect URIs မှာ `http://localhost:3000/api/auth/callback/google` ကို Add ပေးပါ
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130347263932235786/image.png)
- create နှိပ်လိုက်ပါက box တစ်ခု ပေါ်လာမှာဖြစ်ပါတယ် 

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130347374594752582/image.png)
- Client ID နဲ့ secret key တွေကို copy လုပ်ထားပေးပါ
##
### Setup next auth in project
- အရင်ဆုံး copy လုပ်ထားတဲ့ Client ID နဲ့ secret key တွေကို .env မှာ သိမ်းပြီး config ကနေ သုံးလို့ရအောင် သတ်မှတ်ပါမယ်

```js
// .env
# Environment variables declared in this file are automatically made available to Prisma.

# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

  

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

  

DATABASE_URL="postgresql://postgres:1234@localhost:5432/mydb?schema=public"

  

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api

  

GOOGLE_CLIENT_ID=762948475479-fh816tgk5vjimgkp23qr53ilp1c25np9.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=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
```
```js
//config/config.ts

interface Config {
  apiBaseUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};

```
- `pages--> api --> auth folder` တစ်ခုလုပ်ပြီး `[...nextauth].ts` ဆိုတဲ့ file တစ်ခု လုပ်ပေးပါ
- folder နဲ့ file နာမည်တွေကို အပေါ်မှာ ရေးထားတဲ့ အတိုင်း အတိအကျ လုပ်ပေးရပါမယ်
- `[...nextauth].ts` ထဲမှာ Google provider နဲ့ setup လုပ်ပါမယ်

```js
import { config } from "@/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
```
- Provider အနေနဲ့ Google ကို သုံးထားပြီး signIn လုပ်တဲ့အခါ /auth/signin ဆိုတဲ့ route ကို ပြခိုင်းထားပါတယ်
- pages folder အောက်မှာ auth --> singin --> index.tsx ဆိုပြီး ဖိုင်တစ်ခု ထပ်လုပ်လိုက်ပါမယ်
```js
// pages / auth / signin / index.tsx

import Layout from "@/components/Layout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Layout>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
          onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        >
          Sign in
        </Button>
      </Box>
    </Layout>
  );
};

export default SignIn;

```
- sign in button တစ်ခု လုပ်ထားပါတယ်
-  sign in button နှိပ်လိုက်ရင် next auth က `signIn` function ကို ခေါ်လိုက်ပြီး provider အဖြစ် google , callbackUrl အဖြစ် `/backoffice` ကို ထည့်ပေးလိုက်ပါတယ်
- sing in ၀င်ပြီးတာနဲ့ backoffice page ကို သွားခိုင်းထားတာဖြစ်ပါတယ်
##
## ADD layout
- app ထဲကို ၀င်လိုက်တာနဲ့  အရင် react project လို  app bar လေးနဲ့ sign out button လေး နဲ့ ပြပေးမှာဖြစ်ပါတယ်
- src folder အောက်မှာ components folder တစ်ခုလုပ်ပါ
- components folder အောက်မှာ layout.tsx ဖိုင်တစ်ခုလုပ်ပါမယ်
```js
// layout.tsx

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { data } = useSession();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h4">Foodie App</Typography>
          </Box>
          <span />
          {data && (
            <Button
              color="inherit"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              Sign out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;
```
- Next auth က `useSession()`  ကို သုံးပြီး signin လုပ်ထားတဲ့ data ကို လှမ်းယူထားပါတယ်
- app bar ေလးတစ်ခု ထည့်ပေးထားပြီး sign out button တစ်ခုထည့်ပေးထားပါတယ်
- data ရှိခဲ့ရင် sign out button ကို ပြပေးပြီး နှိပ်လိုက်ချိန်မှာ next auth က signOut function ကို ခေါ်ပြီး sign in page ကို redirect လုပ်လိုက်တာဖြစ်ပါတယ်
##
### `/backoffice` route ကို ၀င်လာတဲ့ login ၀င်ထားတာရှိမရှိ စစ်ပြီး login မ၀င်ထားရင် login page ကို redirect လုပ်ပေးလိုက်ရမှာဖြစ်ပါတယ်
```js
// pages/backoffice / index.tsx

// pages / backoffice / index.tsx
import Layout from "@/components/layout";
import { config } from "@/config/config";
import { Box, Button, TextField } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BackofficeApp = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data && status !== "loading") {
      router.push("auth/signin");
    }
  }, [data]);

  return (
    <Layout>
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
        welcome to back office
      </Box>
    </Layout>
  );
};

export default BackofficeApp;


```
##
### နောက်ဆုံးအဆင့်အနေနဲ့ next auth ကို သုံးနိုင်ဖို့  _app.tsx မှာ `<SessionProvider>`နဲ့ wrap လုပ်ပေးရမှာဖြစ်ပါတယ်
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130482252485251143/image.png)
- ခု ဆိုရင် /backoffice route ကို ၀င်ကြည့်လိုက်တာနဲ့ signin page ကို ရောက်သွားမှာဖြစ်ပြီး sign in ၀င်လိုက်ပါက backoffice page ကို ပြပေးမှာဖြစ်ပြီး အပေါ်က app bar မှာ sign out buttonလေး လဲ ပြပေးလာမှာဖြစ်ပါတယ်

![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130482471843139615/image.png)
![enter image description here](https://cdn.discordapp.com/attachments/1076154921562411008/1130482571227181197/image.png)
