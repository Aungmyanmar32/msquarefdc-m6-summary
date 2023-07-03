//appRouter.ts

import Express, { Request, Response } from "express";
import { db } from "../../db/db";
import { checkAuth } from "../auth/auth";

export const appRouter = Express.Router();

appRouter.get("/data", checkAuth, async (req: Request, res: Response) => {
  const menus = await db.query("select * from menus");
  const menuCategories = await db.query("select * from menu_categories");
  const addons = await db.query("select * from addons");
  const addonCategories = await db.query("select * from addon_categories");
  const locations = await db.query("select * from locations");
  const menusLocations = await db.query("select * from menus_locations");

  res.send({
    menus: menus.rows,
    menuCategories: menuCategories.rows,
    addons: addons.rows,
    addonCategories: addonCategories.rows,
    locations: locations.rows,
    menusLocations: menusLocations.rows,
  });
});
