import { pgTable, foreignKey, serial, integer, text, boolean, timestamp, varchar, unique, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// 用户表
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 产品表
export const productImages = pgTable("cafe1316_product_images", {
  id: serial("id").primaryKey().notNull(),
  product_id: integer("product_id").references(() => products.id, { onDelete: "cascade" }),
  image_url: text("image_url").notNull(),
  is_primary: boolean("is_primary").default(false),
  created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const productCategories = pgTable("cafe1316_product_categories", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  parent_id: integer("parent_id"),
  created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
},
  (table) => {
    return {
      product_categories_parent_id_fkey: foreignKey({
        columns: [table.parent_id],
        foreignColumns: [table.id],
        name: "cafe1316_product_categories_parent_id_fkey"
      }),
    }
  });

export const products = pgTable("cafe1316_products", {
  id: serial("id").primaryKey().notNull(),
  sku: varchar("sku", { length: 50 }).notNull(),
  product_name: varchar("product_name", { length: 255 }).notNull(),
  origin: varchar("origin", { length: 100 }),
  description: text("description"),
  roasting: varchar("roasting", { length: 50 }),
  material: varchar("material", { length: 100 }),
  brand: varchar("brand", { length: 100 }),
  original_price: numeric("original_price", { precision: 10, scale: 2 }).notNull(),
  discounted_price: numeric("discounted_price", { precision: 10, scale: 2 }),
  unit: varchar("unit", { length: 50 }).notNull(),
  amount: integer("amount").notNull(),
  product_type: varchar("product_type", { length: 50 }).notNull(),
  category_id: integer("category_id").references(() => productCategories.id),
  created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  image_url: text("image_url"),
  is_hot: boolean("is_hot").default(false),
  color: varchar("color", { length: 50 }),
  size: varchar("size", { length: 50 }),
  weight: numeric("weight", { precision: 10, scale: 2 }),
  specifications: text("specifications"),
},
  (table) => {
    return {
      products_sku_key: unique("cafe1316_products_sku_key").on(table.sku),
    }
  });

// 订单表
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  total: integer('total').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}); 