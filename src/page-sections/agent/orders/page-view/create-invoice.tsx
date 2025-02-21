// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useToast } from "@/components/ui/use-toast";
// import { Download, Mail, Plus, Trash2 } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface InvoiceItem {
//   name: string;
//   price: number;
//   quantity: number;
// }

// const CreateInvoice = () => {
//   const { toast } = useToast();
//   const [orderStatus, setOrderStatus] = useState("pending");
//   const [orderNumber, setOrderNumber] = useState("204");
//   const [orderDate, setOrderDate] = useState("");
//   const [billTo, setBillTo] = useState("");
//   const [billToAddress, setBillToAddress] = useState("");
//   const [billToPhone, setBillToPhone] = useState("");
//   const [billFrom, setBillFrom] = useState("");
//   const [billFromAddress, setBillFromAddress] = useState("");
//   const [billFromPhone, setBillFromPhone] = useState("");
//   const [items, setItems] = useState<InvoiceItem[]>([]);

//   const addItem = () => {
//     setItems([...items, { name: "", price: 0, quantity: 0 }]);
//   };

//   const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
//     const newItems = [...items];
//     newItems[index] = { 
//       ...newItems[index], 
//       [field]: typeof value === 'string' ? parseFloat(value) || value : value 
//     };
//     setItems(newItems);
//   };

//   const removeItem = (index: number) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const calculateSubtotal = () => {
//     return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const handleSave = () => {
//     toast({
//       title: "Invoice saved",
//       description: "The invoice has been saved successfully.",
//     });
//   };

//   const handleCancel = () => {
//     window.history.back();
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Form Section */}
//         <Card className="p-6">
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <Label className="text-base font-semibold">Order Status</Label>
//               <RadioGroup
//                 defaultValue={orderStatus}
//                 onValueChange={setOrderStatus}
//                 className="flex gap-4"
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="pending" id="pending" />
//                   <Label htmlFor="pending">Pending</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="processing" id="processing" />
//                   <Label htmlFor="processing">Processing</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="delivered" id="delivered" />
//                   <Label htmlFor="delivered">Delivered</Label>
//                 </div>
//               </RadioGroup>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Order Number</Label>
//                   <Input 
//                     value={orderNumber}
//                     onChange={(e) => setOrderNumber(e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Order Date</Label>
//                   <Input 
//                     type="date"
//                     value={orderDate}
//                     onChange={(e) => setOrderDate(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-8">
//               <div className="space-y-4">
//                 <Label>Bill to</Label>
//                 <Input 
//                   value={billTo}
//                   onChange={(e) => setBillTo(e.target.value)}
//                 />
//                 <Input 
//                   placeholder="Bill to Address"
//                   value={billToAddress}
//                   onChange={(e) => setBillToAddress(e.target.value)}
//                 />
//                 <Input 
//                   placeholder="Bill to Phone"
//                   value={billToPhone}
//                   onChange={(e) => setBillToPhone(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-4">
//                 <Label>Bill From</Label>
//                 <Input 
//                   value={billFrom}
//                   onChange={(e) => setBillFrom(e.target.value)}
//                 />
//                 <Input 
//                   placeholder="Bill from Address"
//                   value={billFromAddress}
//                   onChange={(e) => setBillFromAddress(e.target.value)}
//                 />
//                 <Input 
//                   placeholder="Bill from Phone"
//                   value={billFromPhone}
//                   onChange={(e) => setBillFromPhone(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <Button 
//                 variant="secondary" 
//                 onClick={addItem}
//                 className="flex items-center gap-2"
//               >
//                 <Plus className="h-4 w-4" />
//                 Add New Item
//               </Button>

//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Description</TableHead>
//                     <TableHead>Hours</TableHead>
//                     <TableHead>Rate</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead></TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {items.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>
//                         <Input
//                           value={item.name}
//                           onChange={(e) => updateItem(index, "name", e.target.value)}
//                           placeholder="Item description"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           type="number"
//                           value={item.quantity}
//                           onChange={(e) => updateItem(index, "quantity", e.target.value)}
//                           placeholder="Hours"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           type="number"
//                           value={item.price}
//                           onChange={(e) => updateItem(index, "price", e.target.value)}
//                           placeholder="Rate"
//                         />
//                       </TableCell>
//                       <TableCell>
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </TableCell>
//                       <TableCell>
//                         <Button 
//                           variant="ghost" 
//                           size="icon"
//                           onClick={() => removeItem(index)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>

//             <div className="flex justify-between items-center">
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Subtotal</span>
//                   <span>${calculateSubtotal().toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span>${calculateSubtotal().toFixed(2)}</span>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" onClick={handleCancel}>
//                   Cancel
//                 </Button>
//                 <Button onClick={handleSave}>
//                   Save
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* Preview Section */}
//         <Card className="p-6 bg-white">
//           <div className="space-y-8">
//             <div className="flex justify-between items-start">
//               <img src="/placeholder.svg" alt="Company Logo" className="h-12" />
//               <div className="text-right">
//                 <div className="text-sm text-muted-foreground">Invoice #</div>
//                 <div className="font-semibold">{orderNumber}</div>
//               </div>
//             </div>

//             <div className="flex justify-between gap-8">
//               <div className="space-y-1">
//                 <div className="font-semibold">Bill To:</div>
//                 <div>{billTo}</div>
//                 <div className="text-sm text-muted-foreground">{billToAddress}</div>
//                 <div className="text-sm text-muted-foreground">{billToPhone}</div>
//               </div>

//               <div className="space-y-1 text-right">
//                 <div className="inline-flex gap-2">
//                   <span className={`px-3 py-1 rounded-full text-sm ${
//                     orderStatus === 'pending' 
//                       ? 'bg-purple-100 text-purple-700' 
//                       : 'bg-green-100 text-green-700'
//                   }`}>
//                     {orderStatus === 'pending' ? 'Pending Payment' : 'Approved'}
//                   </span>
//                 </div>
//                 <div className="font-semibold mt-4">Payment Details:</div>
//                 <div className="text-sm text-muted-foreground">
//                   Account: {billFromPhone}
//                 </div>
//                 <div className="text-sm text-muted-foreground">
//                   Due date: {orderDate}
//                 </div>
//               </div>
//             </div>

//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Description</TableHead>
//                   <TableHead className="text-right">Hours</TableHead>
//                   <TableHead className="text-right">Rate</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {items.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{item.name}</TableCell>
//                     <TableCell className="text-right">{item.quantity}</TableCell>
//                     <TableCell className="text-right">${item.price}</TableCell>
//                     <TableCell className="text-right">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>

//             <div className="flex justify-between items-center">
//               <div className="space-x-2">
//                 <Button variant="outline" size="sm">
//                   <Download className="h-4 w-4 mr-2" />
//                   PDF
//                 </Button>
//                 <Button variant="secondary" size="sm">
//                   <Mail className="h-4 w-4 mr-2" />
//                   Send to Client
//                 </Button>
//               </div>
//               <div className="text-right">
//                 <div className="text-sm text-muted-foreground">Total Amount</div>
//                 <div className="text-2xl font-bold">
//                   ${calculateSubtotal().toFixed(2)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CreateInvoice;