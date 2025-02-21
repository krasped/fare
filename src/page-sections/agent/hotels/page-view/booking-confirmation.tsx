// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/components/ui/use-toast";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Toggle } from "@/components/ui/toggle";
// import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

// interface PassengerDetails {
//   firstName: string;
//   lastName: string;
// }

// interface BookingDetails {
//   hotelName: string;
//   checkIn: Date;
//   checkOut: Date;
//   rooms: number;
//   adults: number;
//   children: number;
//   rate: number;
//   mealPlan: string;
// }

// const BookingConfirmation = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const bookingDetails: BookingDetails = state?.bookingDetails;

//   // Mock agent details (should come from auth context in production)
//   const agentDetails = {
//     name: "John Smith",
//     email: "john.smith@agency.com",
//     phone: "+1234567890"
//   };

//   const [leadPassenger, setLeadPassenger] = useState({
//     email: "",
//     phone: ""
//   });

//   const [adultPassengers, setAdultPassengers] = useState<PassengerDetails[]>(
//     Array(bookingDetails?.adults || 0).fill({ firstName: "", lastName: "" })
//   );

//   const [childPassengers, setChildPassengers] = useState<PassengerDetails[]>(
//     Array(bookingDetails?.children || 0).fill({ firstName: "", lastName: "" })
//   );

//   const [isRateDetailsOpen, setIsRateDetailsOpen] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("pay-later");
//   const [commissionType, setCommissionType] = useState("fixed");
//   const [commissionValue, setCommissionValue] = useState("");

//   const baseRate = bookingDetails?.rate || 0;
//   const tax = baseRate * 0.1; // 10% tax
//   const fees = baseRate * 0.05; // 5% service fees

//   const calculateTotalWithCommission = () => {
//     const baseTotal = baseRate + tax + fees;
//     if (!commissionValue) return baseTotal;

//     if (commissionType === "fixed") {
//       return baseTotal + Number(commissionValue);
//     } else {
//       const percentage = Number(commissionValue) / 100;
//       return baseTotal + (baseTotal * percentage);
//     }
//   };

//   const handleLeadPassengerChange = (field: string, value: string) => {
//     setLeadPassenger(prev => ({ ...prev, [field]: value }));
//   };

//   const handlePassengerChange = (
//     index: number,
//     field: keyof PassengerDetails,
//     value: string,
//     type: "adult" | "child"
//   ) => {
//     if (type === "adult") {
//       const newAdultPassengers = [...adultPassengers];
//       newAdultPassengers[index] = { ...newAdultPassengers[index], [field]: value };
//       setAdultPassengers(newAdultPassengers);
//     } else {
//       const newChildPassengers = [...childPassengers];
//       newChildPassengers[index] = { ...newChildPassengers[index], [field]: value };
//       setChildPassengers(newChildPassengers);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Check if card payment is selected
//     if (paymentMethod === "agent-card" || paymentMethod === "client-card") {
//       console.log("Navigating to checkout with payment details:", {
//         bookingDetails,
//         totalAmount: calculateTotalWithCommission(),
//         paymentMethod
//       });
      
//       navigate("/hotels/checkout", {
//         state: {
//           bookingDetails: {
//             ...bookingDetails,
//             totalAmount: calculateTotalWithCommission(),
//             commission: commissionValue ? {
//               type: commissionType,
//               value: Number(commissionValue)
//             } : undefined
//           },
//           leadPassenger,
//           adultPassengers,
//           childPassengers,
//           agentDetails,
//           paymentMethod
//         }
//       });
//     } else if (paymentMethod === "pay-later") {
//       console.log("Booking submitted for pay later:", {
//         bookingDetails,
//         leadPassenger,
//         adultPassengers,
//         childPassengers,
//         agentDetails,
//         paymentMethod,
//         commissionType,
//         commissionValue,
//         totalAmount: calculateTotalWithCommission()
//       });
//       toast({
//         title: "Booking Submitted",
//         description: "Your booking has been successfully submitted.",
//       });
//       navigate("/orders");
//     }
//   };

//   if (!bookingDetails) {
//     return <div>No booking details found. Please start a new booking.</div>;
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left side - Passenger Details Form */}
//         <div className="flex-1">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <Card className="p-6">
//               <h2 className="text-2xl font-semibold mb-6">Lead Passenger Details</h2>
//               <div className="grid gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="leadEmail">Email</Label>
//                   <Input
//                     id="leadEmail"
//                     type="email"
//                     value={leadPassenger.email}
//                     onChange={(e) => handleLeadPassengerChange("email", e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="leadPhone">Phone Number</Label>
//                   <Input
//                     id="leadPhone"
//                     type="tel"
//                     value={leadPassenger.phone}
//                     onChange={(e) => handleLeadPassengerChange("phone", e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             </Card>

//             <Card className="p-6">
//               <h2 className="text-2xl font-semibold mb-6">Adult Passengers</h2>
//               <div className="space-y-6">
//                 {adultPassengers.map((passenger, index) => (
//                   <div key={`adult-${index}`} className="grid gap-4">
//                     <h3 className="text-lg font-medium">Adult {index + 1}</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="grid gap-2">
//                         <Label htmlFor={`adult-${index}-firstName`}>First Name</Label>
//                         <Input
//                           id={`adult-${index}-firstName`}
//                           value={passenger.firstName}
//                           onChange={(e) => handlePassengerChange(index, "firstName", e.target.value, "adult")}
//                           required
//                         />
//                       </div>
//                       <div className="grid gap-2">
//                         <Label htmlFor={`adult-${index}-lastName`}>Last Name</Label>
//                         <Input
//                           id={`adult-${index}-lastName`}
//                           value={passenger.lastName}
//                           onChange={(e) => handlePassengerChange(index, "lastName", e.target.value, "adult")}
//                           required
//                         />
//                       </div>
//                     </div>
//                     {index < adultPassengers.length - 1 && <Separator />}
//                   </div>
//                 ))}
//               </div>
//             </Card>

//             {childPassengers.length > 0 && (
//               <Card className="p-6">
//                 <h2 className="text-2xl font-semibold mb-6">Child Passengers</h2>
//                 <div className="space-y-6">
//                   {childPassengers.map((passenger, index) => (
//                     <div key={`child-${index}`} className="grid gap-4">
//                       <h3 className="text-lg font-medium">Child {index + 1}</h3>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="grid gap-2">
//                           <Label htmlFor={`child-${index}-firstName`}>First Name</Label>
//                           <Input
//                             id={`child-${index}-firstName`}
//                             value={passenger.firstName}
//                             onChange={(e) => handlePassengerChange(index, "firstName", e.target.value, "child")}
//                             required
//                           />
//                         </div>
//                         <div className="grid gap-2">
//                           <Label htmlFor={`child-${index}-lastName`}>Last Name</Label>
//                           <Input
//                             id={`child-${index}-lastName`}
//                             value={passenger.lastName}
//                             onChange={(e) => handlePassengerChange(index, "lastName", e.target.value, "child")}
//                             required
//                           />
//                         </div>
//                       </div>
//                       {index < childPassengers.length - 1 && <Separator />}
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Agent Details Card */}
//             <Card className="p-6">
//               <h2 className="text-2xl font-semibold mb-6">Agent Details</h2>
//               <div className="grid gap-4">
//                 <div className="grid gap-2">
//                   <Label>Name</Label>
//                   <Input value={agentDetails.name} disabled />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label>Email</Label>
//                   <Input value={agentDetails.email} disabled />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label>Phone</Label>
//                   <Input value={agentDetails.phone} disabled />
//                 </div>
//               </div>
//             </Card>

//             {/* Payment Methods Card */}
//             <Card className="p-6">
//               <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>
//               <RadioGroup
//                 value={paymentMethod}
//                 onValueChange={setPaymentMethod}
//                 className="space-y-4"
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="pay-later" id="pay-later" />
//                   <Label htmlFor="pay-later">Pay Later</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="agent-card" id="agent-card" />
//                   <Label htmlFor="agent-card">Pay with Agent Card</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="client-card" id="client-card" />
//                   <Label htmlFor="client-card">Pay with Client Card</Label>
//                 </div>
//               </RadioGroup>
//             </Card>

//             {/* Commission Card */}
//             <Card className="p-6">
//               <h2 className="text-2xl font-semibold mb-6">Commission</h2>
//               <div className="space-y-4">
//                 <div className="flex gap-4">
//                   <Toggle
//                     pressed={commissionType === "fixed"}
//                     onPressedChange={() => setCommissionType("fixed")}
//                   >
//                     Fixed Amount
//                   </Toggle>
//                   <Toggle
//                     pressed={commissionType === "percentage"}
//                     onPressedChange={() => setCommissionType("percentage")}
//                   >
//                     Percentage
//                   </Toggle>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="commission">
//                     {commissionType === "fixed" ? "Amount ($)" : "Percentage (%)"}
//                   </Label>
//                   <Input
//                     id="commission"
//                     type="number"
//                     value={commissionValue}
//                     onChange={(e) => setCommissionValue(e.target.value)}
//                     min="0"
//                     step={commissionType === "percentage" ? "0.1" : "1"}
//                   />
//                 </div>
//               </div>
//             </Card>

//             <Button type="submit" className="w-full">
//               Confirm Booking
//             </Button>
//           </form>
//         </div>

//         {/* Right side - Booking Overview */}
//         <div className="lg:w-1/3">
//           <Card className="p-6 sticky top-8">
//             <h2 className="text-2xl font-semibold mb-4">{bookingDetails.hotelName}</h2>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">Dates</h3>
//                 <p>Check-in: {bookingDetails.checkIn.toLocaleDateString()}</p>
//                 <p>Check-out: {bookingDetails.checkOut.toLocaleDateString()}</p>
//               </div>
//               <Separator />
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">Rooms & Guests</h3>
//                 <p>{bookingDetails.rooms} Room(s)</p>
//                 <p>{bookingDetails.adults} Adult(s)</p>
//                 {bookingDetails.children > 0 && <p>{bookingDetails.children} Child(ren)</p>}
//               </div>
//               <Separator />
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">Meal Plan</h3>
//                 <p>{bookingDetails.mealPlan}</p>
//               </div>
//               <Separator />
//               <div>
//                 <Collapsible
//                   open={isRateDetailsOpen}
//                   onOpenChange={setIsRateDetailsOpen}
//                   className="space-y-2"
//                 >
//                   <CollapsibleTrigger className="flex justify-between w-full">
//                     <h3 className="text-sm font-medium text-muted-foreground">Rate Details</h3>
//                     <p className="text-xl font-semibold">
//                       ${calculateTotalWithCommission().toFixed(2)}
//                     </p>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent className="space-y-2">
//                     <div className="flex justify-between">
//                       <span>Base Rate</span>
//                       <span>${baseRate.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Tax</span>
//                       <span>${tax.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Fees</span>
//                       <span>${fees.toFixed(2)}</span>
//                     </div>
//                     {commissionValue && (
//                       <div className="flex justify-between">
//                         <span>Commission</span>
//                         <span>
//                           ${(calculateTotalWithCommission() - (baseRate + tax + fees)).toFixed(2)}
//                         </span>
//                       </div>
//                     )}
//                   </CollapsibleContent>
//                 </Collapsible>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingConfirmation;
