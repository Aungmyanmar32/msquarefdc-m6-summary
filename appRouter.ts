import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import bcrypt from "bcrypt";
import { db } from "../db/db";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import { fileUpload } from "../utils/fileUpload";
const appRouter = express.Router();

appRouter.get("/", checkAuth, async (req, res) => {
  //@ts-ignore
  const userEmail = req.email;
  console.log(userEmail);

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
    const locationIds = locations.rows.map((row) => row.id); //[4,5]
    console.log(locations.rows);

    const menusMenuCategoriesLocations = await db.query(
      "select * from menus_menu_categories_locations where is_archived= false AND locations_id = ANY($1::int[]) ",
      [locationIds]
    );
    // get menu rows and id

    const menuIds = menusMenuCategoriesLocations.rows.map(
      (row) => row.menus_id
    ); //[7],[8],[9]
    const menus = await db.query(
      `select * from menus where id = ANY($1::int[])`,
      [menuIds]
    );

    const menuCategoryIds = menusMenuCategoriesLocations.rows.map(
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
      "select * from addon_categories where is_archived= false and id = ANY($1::int[])",
      [addonCategoryIds]
    );
    const addons = await db.query(
      "select * from addons where is_archived= false and addon_categories_id = ANY($1::int[]) ",
      [addonCategoryIds]
    );

    const companyResult = await db.query(
      "select * from companies where id = $1",
      [companyId]
    );

    const company = companyResult.rows[0];

    const tablesResult = await db.query(
      "select * from tables where is_archived= false and locations_id = ANY($1::int[])",
      [locationIds]
    );
    res.send({
      menus: menus.rows,
      menuCategories: menuCategoriesResult.rows,
      addons: addons.rows,
      addonCategories: addonCategories.rows,
      menuAddonCategories: menusAddonCategoriesResult.rows,
      locations: locations.rows,
      tables: tablesResult.rows,
      menusMenuCategoriesLocations: menusMenuCategoriesLocations.rows,
      company,
    });
  } catch (error) {
    console.log("err", error);

    res.sendStatus(500);
  }
});

appRouter.post("/assets", (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error: any) => {
      if (error) {
        return res.sendStatus(500);
      }

      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.send({ assetUrl });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default appRouter;
