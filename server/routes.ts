import express, { type Express, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLogoSchema } from "@shared/schema";
import { ZodError } from "zod";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, company, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !company || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
      }
      
      // In a real application, you would save this to a database
      // For now, we'll just return a success response
      return res.status(200).json({ 
        success: true, 
        message: 'Message received! We will contact you shortly.' 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      });
    }
  });

  // API routes for company logos
  // GET all logos
  app.get('/api/logos', async (req, res) => {
    try {
      const logos = await storage.getAllLogos();
      return res.status(200).json({ logos });
    } catch (error) {
      console.error('Error fetching logos:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch logos' 
      });
    }
  });

  // GET active logos
  app.get('/api/logos/active', async (req, res) => {
    try {
      const logos = await storage.getActiveLogo();
      return res.status(200).json({ logos });
    } catch (error) {
      console.error('Error fetching active logos:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch active logos' 
      });
    }
  });

  // GET a specific logo
  app.get('/api/logos/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const logo = await storage.getLogo(id);
      
      if (!logo) {
        return res.status(404).json({ 
          success: false, 
          message: 'Logo not found' 
        });
      }
      
      return res.status(200).json({ logo });
    } catch (error) {
      console.error(`Error fetching logo:`, error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch logo' 
      });
    }
  });

  // POST create a new logo
  app.post('/api/logos', async (req, res) => {
    try {
      const logoData = insertLogoSchema.parse(req.body);
      const newLogo = await storage.createLogo(logoData);
      return res.status(201).json({ 
        success: true, 
        logo: newLogo 
      });
    } catch (error) {
      console.error('Error creating logo:', error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid logo data', 
          errors: error.errors 
        });
      }
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create logo' 
      });
    }
  });

  // PUT update a logo
  app.put('/api/logos/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const logoExists = await storage.getLogo(id);
      
      if (!logoExists) {
        return res.status(404).json({ 
          success: false, 
          message: 'Logo not found' 
        });
      }
      
      const updateData = req.body;
      const updatedLogo = await storage.updateLogo(id, updateData);
      
      return res.status(200).json({ 
        success: true, 
        logo: updatedLogo 
      });
    } catch (error) {
      console.error(`Error updating logo:`, error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update logo' 
      });
    }
  });

  // DELETE a logo
  app.delete('/api/logos/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const logoExists = await storage.getLogo(id);
      
      if (!logoExists) {
        return res.status(404).json({ 
          success: false, 
          message: 'Logo not found' 
        });
      }
      
      await storage.deleteLogo(id);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Logo deleted successfully' 
      });
    } catch (error) {
      console.error(`Error deleting logo:`, error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to delete logo' 
      });
    }
  });

  // Serve static logo files and images
  const uploadsDir = path.join(__dirname, '../public/uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/api/uploads', express.static(path.join(__dirname, '../public/uploads')));
  
  // Serve static files from the public directory
  app.use('/images', express.static(path.join(__dirname, '../public/images')));

  const httpServer = createServer(app);

  return httpServer;
}
