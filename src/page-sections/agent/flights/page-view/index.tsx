// import { useState } from "react";
// import { format } from "date-fns";
// import { Calendar, Clock, Plane, Users } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { DatePicker } from "@/components/ui/date-picker";
// import { useToast } from "@/components/ui/use-toast";

// interface FlightPrice {
//   date: string;
//   price: number;
// }

// const cabinClasses = [
//   { value: "economy", label: "Economy" },
//   { value: "premium", label: "Premium Economy" },
//   { value: "business", label: "Business" },
//   { value: "first", label: "First Class" },
// ];

// const dateRanges = [
//   { value: "3days", label: "±3 Days" },
//   { value: "1week", label: "±1 Week" },
//   { value: "2weeks", label: "±2 Weeks" },
//   { value: "1month", label: "±1 Month" },
// ];

// const passengerTypes = [
//   { type: "adult", label: "Adults (12+ years)" },
//   { type: "child", label: "Children (2-11 years)" },
//   { type: "infant", label: "Infants (0-2 years)" },
// ];

// // Demo data for April 10-16, 2024
// const dates = [
//   "2024-04-10",
//   "2024-04-11",
//   "2024-04-12",
//   "2024-04-13",
//   "2024-04-14",
//   "2024-04-15",
//   "2024-04-16",
// ];

// const generatePriceGrid = () => {
//   const grid: { [key: string]: { [key: string]: number } } = {};
//   dates.forEach(departureDate => {
//     grid[departureDate] = {};
//     dates.forEach(returnDate => {
//       // Only generate prices for return dates that are after or equal to departure date
//       if (new Date(returnDate) >= new Date(departureDate)) {
//         grid[departureDate][returnDate] = Math.floor(Math.random() * (600 - 300) + 300);
//       }
//     });
//   });
//   return grid;
// };

// const mockPriceGrid = generatePriceGrid();

// export default function BestPriceFlightsPageView() {
//   const { toast } = useToast();
//   const [tripType, setTripType] = useState("return");
//   const [cabinClass, setCabinClass] = useState("economy");
//   const [directOnly, setDirectOnly] = useState(false);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [departureDate, setDepartureDate] = useState<Date>();
//   const [returnDate, setReturnDate] = useState<Date>();
//   const [dateRange, setDateRange] = useState("3days");
//   const [hoveredRow, setHoveredRow] = useState<string | null>(null);
//   const [hoveredCol, setHoveredCol] = useState<string | null>(null);
//   const [passengers, setPassengers] = useState({
//     adult: 1,
//     child: 0,
//     infant: 0,
//   });

//   const handleSearch = () => {
//     toast({
//       title: "Searching flights",
//       description: "This would fetch real flight data in production.",
//     });
//   };

//   const getPriceColor = (price: number) => {
//     const allPrices = Object.values(mockPriceGrid)
//       .flatMap(dateObj => Object.values(dateObj))
//       .filter(price => price !== undefined);
//     const minPrice = Math.min(...allPrices);
//     const maxPrice = Math.max(...allPrices);
//     if (price === minPrice) return "text-green-600 font-bold";
//     if (price === maxPrice) return "text-red-600 font-bold";
//     return "text-gray-600";
//   };

//   return (
//     <div className="container mx-auto py-6 space-y-6">
//       <h1 className="text-3xl font-bold text-red-500">Best Price Flight Search</h1>
      
//       <Card className="p-6">
//         <div className="grid gap-6">
//           <div className="flex items-center gap-4">
//             <RadioGroup
//               defaultValue={tripType}
//               onValueChange={setTripType}
//               className="flex items-center gap-4"
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="return" id="return" />
//                 <Label htmlFor="return">Return</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="oneway" id="oneway" />
//                 <Label htmlFor="oneway">One Way</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>From</Label>
//               <div className="flex gap-2">
//                 <Plane className="h-5 w-5" />
//                 <input
//                   type="text"
//                   placeholder="Departure Airport"
//                   className="flex-1 p-2 border rounded"
//                   value={from}
//                   onChange={(e) => setFrom(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label>To</Label>
//               <div className="flex gap-2">
//                 <Plane className="h-5 w-5" />
//                 <input
//                   type="text"
//                   placeholder="Arrival Airport"
//                   className="flex-1 p-2 border rounded"
//                   value={to}
//                   onChange={(e) => setTo(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>Departure Date</Label>
//               <DatePicker date={departureDate} setDate={setDepartureDate} />
//             </div>
//             {tripType === "return" && (
//               <div className="space-y-2">
//                 <Label>Return Date</Label>
//                 <DatePicker date={returnDate} setDate={setReturnDate} />
//               </div>
//             )}
//           </div>

//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label>Cabin Class</Label>
//               <Select value={cabinClass} onValueChange={setCabinClass}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {cabinClasses.map((cabin) => (
//                     <SelectItem key={cabin.value} value={cabin.value}>
//                       {cabin.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Passengers</Label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue>
//                     <div className="flex items-center gap-2">
//                       <Users className="h-4 w-4" />
//                       <span>{Object.values(passengers).reduce((a, b) => a + b, 0)} Passengers</span>
//                     </div>
//                   </SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                   {passengerTypes.map((type) => (
//                     <div key={type.type} className="p-2 flex items-center justify-between">
//                       <span>{type.label}</span>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() =>
//                             setPassengers((prev) => ({
//                               ...prev,
//                               [type.type]: Math.max(0, prev[type.type as keyof typeof passengers] - 1),
//                             }))
//                           }
//                         >
//                           -
//                         </Button>
//                         <span>{passengers[type.type as keyof typeof passengers]}</span>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() =>
//                             setPassengers((prev) => ({
//                               ...prev,
//                               [type.type]: prev[type.type as keyof typeof passengers] + 1,
//                             }))
//                           }
//                         >
//                           +
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Date Range</Label>
//               <Select value={dateRange} onValueChange={setDateRange}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {dateRanges.map((range) => (
//                     <SelectItem key={range.value} value={range.value}>
//                       {range.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Checkbox
//               id="directOnly"
//               checked={directOnly}
//               onCheckedChange={(checked) => setDirectOnly(checked as boolean)}
//             />
//             <Label htmlFor="directOnly">Direct flights only</Label>
//           </div>

//           <Button onClick={handleSearch} className="w-full">
//             Search Flights
//           </Button>
//         </div>
//       </Card>

//       {/* Price Grid */}
//       <Card className="p-6">
//         <h2 className="text-xl font-semibold mb-4">Price Grid</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="border p-2">Departure / Return</th>
//                 {dates.map((date) => (
//                   <th key={date} className="border p-2">
//                     {format(new Date(date), "MMM d")}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {dates.map((departureDate) => (
//                 <tr
//                   key={departureDate}
//                   onMouseEnter={() => setHoveredRow(departureDate)}
//                   onMouseLeave={() => setHoveredRow(null)}
//                   className={cn(
//                     hoveredRow === departureDate && "bg-accent/50"
//                   )}
//                 >
//                   <td className="border p-2">
//                     {format(new Date(departureDate), "MMM d")}
//                   </td>
//                   {dates.map((returnDate) => {
//                     const price = mockPriceGrid[departureDate]?.[returnDate];
//                     return (
//                       <td
//                         key={`${departureDate}-${returnDate}`}
//                         onMouseEnter={() => setHoveredCol(returnDate)}
//                         onMouseLeave={() => setHoveredCol(null)}
//                         className={cn(
//                           "border p-2 text-center cursor-pointer hover:bg-accent transition-colors",
//                           (hoveredCol === returnDate ||
//                             hoveredRow === departureDate) &&
//                             "bg-accent/50",
//                           new Date(returnDate) >= new Date(departureDate)
//                             ? getPriceColor(price)
//                             : "bg-gray-100"
//                         )}
//                         onClick={() => {
//                           if (price) {
//                             toast({
//                               title: "Flight Selected",
//                               description: `Selected flight combination: ${format(
//                                 new Date(departureDate),
//                                 "MMM d"
//                               )} - ${format(new Date(returnDate), "MMM d")}`,
//                             });
//                           }
//                         }}
//                       >
//                         {new Date(returnDate) >= new Date(departureDate)
//                           ? `$${price}`
//                           : "-"}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       {/* Price Suggestions */}
//       <Card className="p-6 bg-muted">
//         <div className="flex items-start gap-2">
//           <Clock className="h-5 w-5 text-primary mt-1" />
//           <div>
//             <h3 className="font-semibold">Price Tip</h3>
//             <p className="text-sm text-muted-foreground">
//               Traveling on Tuesday, April 16 could save you up to 40% on your flight costs!
//             </p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }