// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Grid, List, Search, ShoppingCart, Info } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// interface LeadPackage {
//   id: number;
//   destination: string;
//   pricePerLead: number;
//   minQuantity: number;
//   description: string;
//   availableQuantity: number;
//   image: string;
// }

// interface CartItem extends LeadPackage {
//   quantity: number;
// }

// const leadPackages: LeadPackage[] = [
//   {
//     id: 1,
//     destination: "Paris, France",
//     pricePerLead: 50,
//     minQuantity: 5,
//     description: "Quality leads for Paris tourism packages, verified contacts interested in luxury travel.",
//     availableQuantity: 100,
//     image: "/photo-1431576901776-e539bd916ba2"
//   },
//   {
//     id: 2,
//     destination: "Swiss Alps",
//     pricePerLead: 45,
//     minQuantity: 3,
//     description: "Pre-qualified leads for Swiss skiing and mountain tourism packages.",
//     availableQuantity: 75,
//     image: "/photo-1501854140801-50d01698950b"
//   },
//   {
//     id: 3,
//     destination: "Tokyo, Japan",
//     pricePerLead: 60,
//     minQuantity: 4,
//     description: "High-intent leads for Tokyo travel packages, focused on cultural tourism.",
//     availableQuantity: 50,
//     image: "/photo-1472396961693-142e6e269027"
//   },
//   {
//     id: 4,
//     destination: "Dubai, UAE",
//     pricePerLead: 75,
//     minQuantity: 3,
//     description: "Premium leads for luxury Dubai travel experiences and desert safaris.",
//     availableQuantity: 60,
//     image: "/photo-1487958449943-2429e8be8625"
//   }
// ];

// const LeadsMarketplace = () => {
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("cc");
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [selectedPackage, setSelectedPackage] = useState<LeadPackage | null>(null);
//   const [showDescription, setShowDescription] = useState(false);
//   const { toast } = useToast();

//   const addToCart = (pkg: LeadPackage) => {
//     setCartItems(prev => {
//       const existingItem = prev.find(item => item.id === pkg.id);
//       if (existingItem) {
//         return prev.map(item =>
//           item.id === pkg.id
//             ? { ...item, quantity: item.quantity + item.minQuantity }
//             : item
//         );
//       }
//       return [...prev, { ...pkg, quantity: pkg.minQuantity }];
//     });

//     toast({
//       title: "Added to Cart",
//       description: `${pkg.destination} leads added to cart`,
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

//   const updateQuantity = (id: number, newQuantity: number) => {
//     const item = cartItems.find(item => item.id === id);
//     if (!item || newQuantity < item.minQuantity) return;

//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.pricePerLead * item.quantity), 0);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex relative">
//         <div className="flex-1 space-y-8">
//           <div>
//             <h1 className="font-display text-4xl font-bold tracking-tight">Lead Marketplace</h1>
//             <p className="text-muted-foreground mt-2">
//               Browse and purchase verified travel leads for your business
//             </p>
//           </div>

//           <div className="flex items-center justify-between gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search leads..."
//                 className="pl-10"
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant={viewMode === "list" ? "secondary" : "ghost"}
//                 size="icon"
//                 onClick={() => setViewMode("list")}
//               >
//                 <List className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant={viewMode === "grid" ? "secondary" : "ghost"}
//                 size="icon"
//                 onClick={() => setViewMode("grid")}
//               >
//                 <Grid className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <div className={`grid gap-6 ${
//             viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
//           }`}>
//             {leadPackages.map((pkg) => (
//               <Card key={pkg.id} className="relative">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute top-2 right-2 z-10"
//                   onClick={() => {
//                     setSelectedPackage(pkg);
//                     setShowDescription(true);
//                   }}
//                 >
//                   <Info className="h-5 w-5" />
//                 </Button>
//                 <div className="aspect-video relative">
//                   <img
//                     src={`https://source.unsplash.com${pkg.image}`}
//                     alt={pkg.destination}
//                     className="rounded-t-lg object-cover w-full h-full"
//                   />
//                 </div>
                
//                 <div className="p-6">
//                   <h3 className="text-lg font-semibold text-center mb-4">{pkg.destination}</h3>
                  
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-sm text-muted-foreground">Min. {pkg.minQuantity}</span>
//                     <span className="text-primary font-semibold">${pkg.pricePerLead}</span>
//                   </div>

//                   <Button 
//                     className="w-full"
//                     onClick={() => addToCart(pkg)}
//                   >
//                     <ShoppingCart className="mr-2 h-4 w-4" />
//                     Add to Cart
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Cart bubble and panel */}
//         <div className="fixed right-8 bottom-8 z-50">
//           <Collapsible open={isCartOpen} onOpenChange={setIsCartOpen}>
//             <CollapsibleTrigger asChild>
//               <Button 
//                 size="icon" 
//                 className="relative rounded-full shadow-lg h-14 w-14"
//               >
//                 <ShoppingCart className="h-6 w-6" />
//                 {cartItems.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 text-xs flex items-center justify-center">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Button>
//             </CollapsibleTrigger>
            
//             <CollapsibleContent className="absolute bottom-0 right-0 mb-16">
//               <Card className="p-6 shadow-xl w-96">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-semibold">Cart</h2>
//                 </div>

//                 <div className="space-y-4 max-h-[60vh] overflow-auto">
//                   {cartItems.length === 0 ? (
//                     <p className="text-muted-foreground text-center">Your cart is empty</p>
//                   ) : (
//                     <>
//                       {cartItems.map((item) => (
//                         <Card key={item.id} className="p-3">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="font-semibold">{item.destination}</h3>
//                               <p className="text-sm text-muted-foreground">
//                                 ${item.pricePerLead} per lead
//                               </p>
//                             </div>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => removeFromCart(item.id)}
//                             >
//                               ×
//                             </Button>
//                           </div>
//                           <div className="mt-2 flex items-center gap-2">
//                             <Input
//                               type="number"
//                               value={item.quantity}
//                               onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
//                               min={item.minQuantity}
//                               max={item.availableQuantity}
//                               className="w-20"
//                             />
//                             <span className="text-sm text-muted-foreground">leads</span>
//                           </div>
//                         </Card>
//                       ))}

//                       <div className="pt-4 border-t">
//                         <div className="flex justify-between mb-4">
//                           <span className="font-semibold">Total</span>
//                           <span className="text-xl font-bold text-primary">
//                             ${calculateTotal().toFixed(2)}
//                           </span>
//                         </div>

//                         <Select
//                           value={paymentMethod}
//                           onValueChange={setPaymentMethod}
//                         >
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select payment method" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="cc">Pay with Credit Card</SelectItem>
//                             <SelectItem value="wallet">Pay with Credit Wallet</SelectItem>
//                             <SelectItem value="monthly">Pay at End of Month</SelectItem>
//                           </SelectContent>
//                         </Select>

//                         <Button className="w-full mt-4">
//                           Purchase Leads
//                         </Button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </Card>
//             </CollapsibleContent>
//           </Collapsible>
//         </div>
//       </div>

//       <Dialog open={showDescription} onOpenChange={setShowDescription}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{selectedPackage?.destination}</DialogTitle>
//             <DialogDescription>
//               {selectedPackage?.description}
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default LeadsMarketplace;