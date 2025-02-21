// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Plus, List, Link2, Edit, Calendar, Settings2, UploadCloud } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { Toggle } from "@/components/ui/toggle";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const agents = [
//   { id: "1", name: "John Doe" },
//   { id: "2", name: "Jane Smith" },
// ];

// interface QuotationItem {
//   id: number;
//   description: string;
//   price: number;
//   quantity: number;
// }

// interface ClientDetails {
//   name: string;
//   phone: string;
//   email: string;
// }

// interface QuotationListItem {
//   id: string;
//   date: string;
//   clientName: string;
//   status: "active" | "inactive";
//   link: string;
//   agentId: string;
// }

// export default function QuotationPageView() {
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("list");
//   const [items, setItems] = useState<QuotationItem[]>([]);
//   const [selectedAgent, setSelectedAgent] = useState<string>("all");
//   const [clientDetails, setClientDetails] = useState<ClientDetails>({
//     name: "",
//     phone: "",
//     email: "",
//   });
//   const [discount, setDiscount] = useState<number>(0);
//   const [comments, setComments] = useState<string>("");
//   const [images, setImages] = useState<string[]>([]);
//   const [logo, setLogo] = useState<string>("");
//   const [companySettings, setCompanySettings] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [quotations, setQuotations] = useState<QuotationListItem[]>([
//     {
//       id: "QT-2024-001",
//       date: "2024-03-15",
//       clientName: "John Doe",
//       status: "active",
//       link: "https://example.com/qt-2024-001",
//       agentId: "1",
//     },
//     {
//       id: "QT-2024-002",
//       date: "2024-03-16",
//       clientName: "Jane Smith",
//       status: "active",
//       link: "https://example.com/qt-2024-002",
//       agentId: "2",
//     },
//   ]);

//   const filteredQuotations = selectedAgent === "all" 
//     ? quotations 
//     : quotations.filter(q => q.agentId === selectedAgent);

//   const handleNewQuotation = () => {
//     setActiveTab("form");
//     setItems([]);
//     setClientDetails({ name: "", phone: "", email: "" });
//     setDiscount(0);
//     setComments("");
//     setImages([]);
//   };

//   const toggleQuotationStatus = (quotationId: string) => {
//     console.log('Toggling quotation status for ID:', quotationId);
    
//     setQuotations(prevQuotations => {
//       const updatedQuotations = prevQuotations.map(q => {
//         if (q.id === quotationId) {
//           const newStatus = q.status === "active" ? "inactive" as const : "active" as const;
//           console.log(`Changing status from ${q.status} to ${newStatus}`);
          
//           toast({
//             title: `Quotation ${newStatus === "active" ? "Activated" : "Deactivated"}`,
//             description: `Quotation ${quotationId} has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
//             variant: newStatus === "active" ? "default" : "destructive",
//           });

//           return {
//             ...q,
//             status: newStatus,
//             link: newStatus === "active" ? `https://example.com/${q.id}` : "deactivated",
//           };
//         }
//         return q;
//       });
      
//       console.log('Updated quotations:', updatedQuotations);
//       return updatedQuotations;
//     });
//   };

//   const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogo(reader.result as string);
//         toast({
//           title: "Logo uploaded successfully",
//           description: "Your company logo has been updated.",
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const addItem = () => {
//     setItems([
//       ...items,
//       { id: items.length + 1, description: "", price: 0, quantity: 1 },
//     ]);
//   };

//   const updateItem = (
//     index: number,
//     field: keyof QuotationItem,
//     value: string | number
//   ) => {
//     const newItems = [...items];
//     newItems[index] = { ...newItems[index], [field]: value };
//     setItems(newItems);
//   };

//   const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const taxAmount = subtotal * 0.18;
//   const total = subtotal + taxAmount - discount;

//   const generateQuotationLink = () => {
//     toast({
//       title: "Quotation Link Generated",
//       description: "The link has been copied to your clipboard",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b">
//           <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
//             <div className="flex-1" />
//             <TabsList className="relative h-12 bg-transparent mx-auto">
//               <TabsTrigger 
//                 value="list" 
//                 className="relative z-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-transparent transition-all duration-200"
//               >
//                 <List className="h-4 w-4 mr-2" />
//                 Quotation List
//               </TabsTrigger>
//               <TabsTrigger 
//                 value="form"
//                 className="relative z-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-transparent transition-all duration-200"
//               >
//                 New Quotation
//               </TabsTrigger>
//               <TabsTrigger 
//                 value="settings"
//                 className="relative z-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-transparent transition-all duration-200"
//               >
//                 <Settings2 className="h-4 w-4 mr-2" />
//                 Settings
//               </TabsTrigger>
//             </TabsList>
//             <div className="flex-1 flex justify-end">
//               <Button onClick={handleNewQuotation} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200">
//                 <Plus className="h-4 w-4 mr-2" />
//                 New Quotation
//               </Button>
//             </div>
//           </div>
//         </div>

//         <TabsContent value="list" className="p-4 max-w-7xl mx-auto">
//           <Card className="p-6 shadow-lg backdrop-blur-sm bg-white/50 dark:bg-gray-900/50">
//             <div className="mb-4">
//               <Select value={selectedAgent} onValueChange={setSelectedAgent}>
//                 <SelectTrigger className="w-[200px]">
//                   <SelectValue placeholder="Filter by Agent" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Agents</SelectItem>
//                   {agents.map(agent => (
//                     <SelectItem key={agent.id} value={agent.id}>
//                       {agent.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid grid-cols-6 gap-4 font-semibold bg-primary text-primary-foreground p-3 rounded-md mb-4">
//               <div>ID</div>
//               <div>Date</div>
//               <div>Client Name</div>
//               <div>Status</div>
//               <div>Link</div>
//               <div>Actions</div>
//             </div>
//             {filteredQuotations.map((quotation) => (
//               <div
//                 key={quotation.id}
//                 className="grid grid-cols-6 gap-4 p-3 items-center border-b last:border-0 hover:bg-muted/50 transition-colors duration-200"
//               >
//                 <div className="font-medium">{quotation.id}</div>
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4 text-muted-foreground" />
//                   {quotation.date}
//                 </div>
//                 <div>{quotation.clientName}</div>
//                 <div>
//                   <Toggle
//                     pressed={quotation.status === "active"}
//                     onPressedChange={() => toggleQuotationStatus(quotation.id)}
//                     variant="outline"
//                     className="w-full justify-center data-[state=on]:bg-green-500 data-[state=on]:text-white data-[state=on]:border-green-500 data-[state=off]:bg-destructive/10 data-[state=off]:text-destructive data-[state=off]:border-destructive"
//                     aria-label="Toggle activation status"
//                   >
//                     <div className="flex items-center gap-2">
//                       {quotation.status === "active" ? (
//                         <>
//                           <span className="h-2 w-2 rounded-full bg-green-300 animate-pulse" />
//                           Active
//                         </>
//                       ) : (
//                         <>
//                           <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
//                           Inactive
//                         </>
//                       )}
//                     </div>
//                   </Toggle>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Link2 className={`h-4 w-4 ${quotation.status === "active" ? "text-primary" : "text-muted-foreground"}`} />
//                   {quotation.status === "active" ? (
//                     <a href={quotation.link} className="text-primary hover:underline">
//                       View
//                     </a>
//                   ) : (
//                     <span className="text-muted-foreground">Deactivated</span>
//                   )}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Button variant="outline" size="sm" className="flex items-center gap-1 hover:bg-primary hover:text-primary-foreground">
//                     <Edit className="h-4 w-4" />
//                     Edit
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </Card>
//         </TabsContent>

//         <TabsContent value="form">
//           <div className="container mx-auto px-4 py-8">
//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white rounded-t-lg">
//               <div className="container mx-auto text-center">
//                 <img
//                   src={logo || "/placeholder.svg"}
//                   alt="Company Logo"
//                   className="mx-auto h-20 w-auto mb-4"
//                 />
//                 <h1 className="text-3xl font-bold mb-2">Quotation</h1>
//                 <p className="text-xl">#QT-{new Date().getFullYear()}-{Math.floor(Math.random() * 1000)}</p>
//               </div>
//             </div>

//             <div className="container mx-auto px-4 py-8">
//               <div className="grid md:grid-cols-2 gap-8 mb-8">
//                 <Card className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Client Details</h2>
//                   <div className="space-y-4">
//                     <Input
//                       placeholder="Client Name"
//                       value={clientDetails.name}
//                       onChange={(e) =>
//                         setClientDetails({ ...clientDetails, name: e.target.value })
//                       }
//                     />
//                     <Input
//                       placeholder="Phone Number"
//                       value={clientDetails.phone}
//                       onChange={(e) =>
//                         setClientDetails({ ...clientDetails, phone: e.target.value })
//                       }
//                     />
//                     <Input
//                       placeholder="Email"
//                       type="email"
//                       value={clientDetails.email}
//                       onChange={(e) =>
//                         setClientDetails({ ...clientDetails, email: e.target.value })
//                       }
//                     />
//                   </div>
//                 </Card>

//                 <Card className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Agent Details</h2>
//                   <div className="space-y-2">
//                     <p><strong>Name:</strong> {agents.find(agent => agent.id === "1")?.name}</p>
//                     <p><strong>Email:</strong> john@example.com</p>
//                     <p><strong>Phone:</strong> +1 234 567 890</p>
//                   </div>
//                 </Card>
//               </div>

//               <Card className="mb-8">
//                 <div className="p-6">
//                   <div className="grid grid-cols-4 gap-4 mb-4 bg-primary text-primary-foreground p-3 rounded-md">
//                     <div>Description</div>
//                     <div>Price</div>
//                     <div>Quantity</div>
//                     <div>Total</div>
//                   </div>

//                   {items.map((item, index) => (
//                     <div
//                       key={item.id}
//                       className={`grid grid-cols-4 gap-4 p-3 ${
//                         index % 2 === 0 ? "bg-muted" : ""
//                       }`}
//                     >
//                       <Input
//                         value={item.description}
//                         onChange={(e) =>
//                           updateItem(index, "description", e.target.value)
//                         }
//                         placeholder="Item description"
//                       />
//                       <Input
//                         type="number"
//                         value={item.price}
//                         onChange={(e) =>
//                           updateItem(index, "price", parseFloat(e.target.value))
//                         }
//                         placeholder="Price"
//                       />
//                       <Input
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) =>
//                           updateItem(index, "quantity", parseInt(e.target.value))
//                         }
//                         placeholder="Qty"
//                       />
//                       <div className="flex items-center">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </div>
//                     </div>
//                   ))}

//                   <Button onClick={addItem} className="mt-4">
//                     <Plus className="mr-2 h-4 w-4" /> Add Item
//                   </Button>

//                   <div className="mt-6 space-y-2">
//                     <div className="flex justify-between">
//                       <span>Subtotal:</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Discount:</span>
//                       <Input
//                         type="number"
//                         value={discount}
//                         onChange={(e) => setDiscount(parseFloat(e.target.value))}
//                         className="w-32"
//                       />
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Tax (18%):</span>
//                       <span>${taxAmount.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between bg-primary text-primary-foreground p-3 rounded-md">
//                       <span>Total to Pay:</span>
//                       <span>${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               <Card className="mb-8 p-6">
//                 <h2 className="text-xl font-semibold mb-4">Comments</h2>
//                 <Textarea
//                   value={comments}
//                   onChange={(e) => setComments(e.target.value)}
//                   placeholder="Add your comments here..."
//                   className="min-h-[100px]"
//                 />
//               </Card>

//               <Card className="mb-8 p-6">
//                 <h2 className="text-xl font-semibold mb-4">Images</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {images.map((image, index) => (
//                     <div key={index} className="aspect-square bg-muted rounded-lg">
//                       <img
//                         src={image}
//                         alt={`Quotation image ${index + 1}`}
//                         className="w-full h-full object-cover rounded-lg"
//                       />
//                     </div>
//                   ))}
//                   <Button
//                     variant="outline"
//                     className="aspect-square flex flex-col items-center justify-center"
//                   >
//                     <UploadCloud className="h-8 w-8 mb-2" />
//                     <span>Add Image</span>
//                   </Button>
//                 </div>
//               </Card>

//               <Card className="mb-8 p-6">
//                 <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
//                 <Textarea
//                   placeholder="Enter terms and conditions..."
//                   className="min-h-[100px]"
//                 />
//               </Card>

//               <Card className="mb-8">
//                 <div className="grid md:grid-cols-2 gap-8 p-6">
//                   <div>
//                     <h3 className="font-semibold mb-4">Agent Signature</h3>
//                     <div className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center">
//                       Click to sign
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold mb-4">Client Signature</h3>
//                     <div className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center">
//                       Client will sign digitally
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
//                 <div className="grid md:grid-cols-3 gap-4 items-center">
//                   <div />
//                   <div className="text-center">
//                     <p className="font-semibold">Contact Information</p>
//                     <p>support@example.com</p>
//                     <p>+1 234 567 890</p>
//                   </div>
//                   <div className="flex justify-end">
//                     <Button
//                       onClick={generateQuotationLink}
//                       variant="secondary"
//                       className="w-full md:w-auto"
//                     >
//                       Generate Quotation Link
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </TabsContent>

//         <TabsContent value="settings" className="p-4">
//           <Card className="p-6">
//             <h2 className="text-2xl font-semibold mb-6">Quotation Settings</h2>
            
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-medium mb-4">Company Logo</h3>
//                 <div className="flex items-center gap-4">
//                   {logo && (
//                     <img
//                       src={logo}
//                       alt="Company Logo"
//                       className="w-32 h-32 object-contain border rounded-lg"
//                     />
//                   )}
//                   <div className="flex flex-col gap-2">
//                     <Button variant="outline" className="flex items-center gap-2" asChild>
//                       <label>
//                         <UploadCloud className="h-4 w-4" />
//                         Upload Logo
//                         <input
//                           type="file"
//                           accept="image/*"
//                           className="hidden"
//                           onChange={handleLogoUpload}
//                         />
//                       </label>
//                     </Button>
//                     <p className="text-sm text-muted-foreground">
//                       Recommended size: 200x200px. Max file size: 2MB
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-medium mb-4">Company Information</h3>
//                 <div className="grid gap-4">
//                   <div>
//                     <label className="text-sm font-medium">Company Name</label>
//                     <Input
//                       value={companySettings.name}
//                       onChange={(e) =>
//                         setCompanySettings({ ...companySettings, name: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium">Email</label>
//                     <Input
//                       type="email"
//                       value={companySettings.email}
//                       onChange={(e) =>
//                         setCompanySettings({ ...companySettings, email: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium">Phone</label>
//                     <Input
//                       value={companySettings.phone}
//                       onChange={(e) =>
//                         setCompanySettings({ ...companySettings, phone: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium">Address</label>
//                     <Textarea
//                       value={companySettings.address}
//                       onChange={(e) =>
//                         setCompanySettings({ ...companySettings, address: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Button className="w-full">Save Settings</Button>
//             </div>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }