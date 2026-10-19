import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";
import fs from "fs";
import path from "path";

const dbPath = process.env.SQLITE_PATH
  ? path.resolve(process.env.SQLITE_PATH)
  : path.resolve(process.cwd(), "data", "alegra.sqlite");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS alegra_packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    volunteer_focus TEXT NOT NULL,
    price_range TEXT NOT NULL,
    is_featured INTEGER DEFAULT 0,
    content TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS alegra_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    author TEXT DEFAULT 'Alegra Team',
    published_at INTEGER,
    tags TEXT
  );

  CREATE TABLE IF NOT EXISTS alegra_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    package_name TEXT,
    message TEXT NOT NULL,
    num_adults INTEGER DEFAULT 2,
    num_children INTEGER DEFAULT 0,
    created_at INTEGER
  );
`);

export const db = drizzle(sqlite, { schema });
