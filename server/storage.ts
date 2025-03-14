import { 
  users, 
  companyLogos, 
  type User, 
  type InsertUser,
  type CompanyLogo,
  type InsertLogo
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface with CRUD methods for both users and logos
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Logo methods
  getAllLogos(): Promise<CompanyLogo[]>;
  getActiveLogo(): Promise<CompanyLogo[]>;
  getLogo(id: number): Promise<CompanyLogo | undefined>;
  createLogo(logo: InsertLogo): Promise<CompanyLogo>;
  updateLogo(id: number, logo: Partial<InsertLogo>): Promise<CompanyLogo | undefined>;
  deleteLogo(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Logo methods
  async getAllLogos(): Promise<CompanyLogo[]> {
    return await db.select().from(companyLogos).orderBy(companyLogos.displayOrder);
  }

  async getActiveLogo(): Promise<CompanyLogo[]> {
    return await db
      .select()
      .from(companyLogos)
      .where(eq(companyLogos.isActive, true))
      .orderBy(companyLogos.displayOrder);
  }

  async getLogo(id: number): Promise<CompanyLogo | undefined> {
    const [logo] = await db.select().from(companyLogos).where(eq(companyLogos.id, id));
    return logo;
  }

  async createLogo(logo: InsertLogo): Promise<CompanyLogo> {
    const [newLogo] = await db.insert(companyLogos).values(logo).returning();
    return newLogo;
  }

  async updateLogo(id: number, logo: Partial<InsertLogo>): Promise<CompanyLogo | undefined> {
    const [updatedLogo] = await db
      .update(companyLogos)
      .set(logo)
      .where(eq(companyLogos.id, id))
      .returning();
    return updatedLogo;
  }

  async deleteLogo(id: number): Promise<boolean> {
    const [deletedLogo] = await db
      .delete(companyLogos)
      .where(eq(companyLogos.id, id))
      .returning();
    return !!deletedLogo;
  }
}

export const storage = new DatabaseStorage();
