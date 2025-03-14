import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Trash2, Edit, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertLogoSchema, type CompanyLogo } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Extended schema for form validation
const logoFormSchema = insertLogoSchema.extend({
  displayOrder: z.coerce.number().min(1, "Display order must be at least 1"),
});

type LogoFormValues = z.infer<typeof logoFormSchema>;

export default function LogoManagement() {
  const [logos, setLogos] = useState<CompanyLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<CompanyLogo | null>(null);
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);
  const { toast } = useToast();

  // Form for adding a new logo
  const addForm = useForm<LogoFormValues>({
    resolver: zodResolver(logoFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      altText: "",
      displayOrder: 1,
      isActive: true,
    },
  });

  // Form for editing an existing logo
  const editForm = useForm<LogoFormValues>({
    resolver: zodResolver(logoFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      altText: "",
      displayOrder: 1,
      isActive: true,
    },
  });

  // Fetch all logos
  const fetchLogos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/logos');
      if (!response.ok) {
        throw new Error('Failed to fetch logos');
      }
      const data = await response.json();
      setLogos(data.logos);
      setError(null);
    } catch (err) {
      console.error('Error fetching logos:', err);
      setError('Failed to load logos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  // Add a new logo
  const onAddSubmit = async (data: LogoFormValues) => {
    try {
      const response = await fetch('/api/logos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add logo');
      }

      toast({
        title: "Success",
        description: "Logo added successfully",
      });

      // Reset form and close dialog
      addForm.reset();
      setIsAddDialogOpen(false);
      
      // Refresh logos
      fetchLogos();
    } catch (err) {
      console.error('Error adding logo:', err);
      toast({
        title: "Error",
        description: "Failed to add logo",
        variant: "destructive",
      });
    }
  };

  // Edit an existing logo
  const onEditSubmit = async (data: LogoFormValues) => {
    if (!currentLogo) return;

    try {
      const response = await fetch(`/api/logos/${currentLogo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update logo');
      }

      toast({
        title: "Success",
        description: "Logo updated successfully",
      });

      // Reset form and close dialog
      editForm.reset();
      setIsEditDialogOpen(false);
      setCurrentLogo(null);
      
      // Refresh logos
      fetchLogos();
    } catch (err) {
      console.error('Error updating logo:', err);
      toast({
        title: "Error",
        description: "Failed to update logo",
        variant: "destructive",
      });
    }
  };

  // Delete a logo
  const handleDelete = async (id: number) => {
    try {
      setDeleteInProgress(id);
      const response = await fetch(`/api/logos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete logo');
      }

      toast({
        title: "Success",
        description: "Logo deleted successfully",
      });
      
      // Refresh logos
      fetchLogos();
    } catch (err) {
      console.error('Error deleting logo:', err);
      toast({
        title: "Error",
        description: "Failed to delete logo",
        variant: "destructive",
      });
    } finally {
      setDeleteInProgress(null);
    }
  };

  // Open edit dialog with selected logo data
  const handleEditClick = (logo: CompanyLogo) => {
    setCurrentLogo(logo);
    editForm.reset({
      name: logo.name,
      imageUrl: logo.imageUrl,
      altText: logo.altText || "",
      displayOrder: logo.displayOrder,
      isActive: logo.isActive,
    });
    setIsEditDialogOpen(true);
  };

  if (loading && logos.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4 min-h-[70vh] flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Company Logo Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage the company logos displayed in the "Trusted By" section
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New Logo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Logo</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="/images/logos/company.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="altText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Company logo" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Active</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value ?? false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Logo</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-destructive/20 text-destructive p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium text-muted-foreground border-b">
          <div className="col-span-1">ID</div>
          <div className="col-span-2">Image</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-2">URL</div>
          <div className="col-span-1">Order</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Actions</div>
        </div>

        {logos.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No logos found. Add a new one to get started.
          </div>
        ) : (
          logos.map((logo) => (
            <div key={logo.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0 hover:bg-accent/10">
              <div className="col-span-1 font-mono">{logo.id}</div>
              <div className="col-span-2">
                <div className="h-12 w-24 bg-background rounded-md flex items-center justify-center overflow-hidden">
                  <img
                    src={logo.imageUrl}
                    alt={logo.altText || logo.name}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
              <div className="col-span-2">{logo.name}</div>
              <div className="col-span-2 truncate text-xs text-muted-foreground">{logo.imageUrl}</div>
              <div className="col-span-1">{logo.displayOrder}</div>
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  logo.isActive ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' : 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500'
                }`}>
                  {logo.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="col-span-2 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(logo)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleDelete(logo.id)}
                  disabled={deleteInProgress === logo.id}
                >
                  {deleteInProgress === logo.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Logo</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/images/logos/company.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="altText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Text</FormLabel>
                    <FormControl>
                      <Input placeholder="Company logo" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Logo</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}