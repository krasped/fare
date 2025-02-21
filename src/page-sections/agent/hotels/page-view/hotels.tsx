// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search, Users, Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
// import { toast } from "sonner";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { useNavigate } from "react-router-dom";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// interface ChildAge {
//   id: string;
//   age: string;
// }

// const COUNTRIES = [
//   "United States",
//   "United Kingdom",
//   "Canada",
//   "Australia",
//   "Germany",
//   "France",
//   "Spain",
//   "Italy",
//   "Japan",
//   "China",
//   // Add more countries as needed
// ];

// const MEAL_PLANS = [
//   { value: "bb", label: "Bed & Breakfast" },
//   { value: "hb", label: "Half Board" },
//   { value: "fb", label: "Full Board" },
//   { value: "ai", label: "All Inclusive" },
// ];

// const Hotels = () => {
//   const [destination, setDestination] = useState("");
//   const [checkIn, setCheckIn] = useState<Date>();
//   const [checkOut, setCheckOut] = useState<Date>();
//   const [adults, setAdults] = useState("2");
//   const [children, setChildren] = useState("0");
//   const [childrenAges, setChildrenAges] = useState<ChildAge[]>([]);
//   const [rooms, setRooms] = useState("1");
//   const navigate = useNavigate();

//   // Advanced search states
//   const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
//   const [citizenship, setCitizenship] = useState<string>("");
//   const [hotelStars, setHotelStars] = useState<string>("");
//   const [mealPlan, setMealPlan] = useState<string>("");

//   const handleChildrenChange = (value: string) => {
//     setChildren(value);
//     const currentCount = parseInt(value);
//     const previousCount = childrenAges.length;

//     if (currentCount > previousCount) {
//       const newChildren = Array.from(
//         { length: currentCount - previousCount },
//         (_, index) => ({
//           id: (previousCount + index).toString(),
//           age: "2",
//         })
//       );
//       setChildrenAges([...childrenAges, ...newChildren]);
//     } else if (currentCount < previousCount) {
//       setChildrenAges(childrenAges.slice(0, currentCount));
//     }
//   };

//   const handleSearch = () => {
//     console.log({
//       destination,
//       checkIn,
//       checkOut,
//       adults,
//       children,
//       childrenAges,
//       rooms,
//       // Advanced search params
//       citizenship,
//       hotelStars,
//       mealPlan,
//     });
//     toast.success("Search initiated!");
//     navigate("/hotels/1");
//   };

//   return (
//     <div className="min-h-screen w-full">
//       {/* Hero Section with Background */}
//       <div className="relative h-[50vh] w-full overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               'url("/lovable-uploads/4469a5a3-d827-43e5-8913-b15050e3e7e6.png")',
//           }}
//         />

//         {/* Hero Text */}
//         <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
//           <h1 className="mb-4 text-6xl font-bold">
//             LET'S EXPLORE
//             <br />
//             THE WORLD WITH FAIRTRIP
//           </h1>
//           <p className="text-xl">
//             Book trips and explore new destinations with ease from anywhere
//           </p>
//         </div>
//       </div>

//       {/* Search Form */}
//       <div className="relative -mt-12 px-4">
//         <Card className="mx-auto max-w-6xl rounded-[2rem] bg-white/90 p-6 shadow-lg backdrop-blur-sm">
//           <div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
//             <Input
//               placeholder="Where are you going?"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value)}
//               className="w-full rounded-full md:w-1/4"
//             />

//             <div className="flex w-full gap-2 md:w-1/3">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full justify-start rounded-full text-left font-normal",
//                       !checkIn && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {checkIn ? format(checkIn, "PPP") : <span>Check in</span>}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={checkIn}
//                     onSelect={setCheckIn}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>

//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-full justify-start rounded-full text-left font-normal",
//                       !checkOut && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {checkOut ? format(checkOut, "PPP") : <span>Check out</span>}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     mode="single"
//                     selected={checkOut}
//                     onSelect={setCheckOut}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-between rounded-full md:w-1/4"
//                 >
//                   <Users className="mr-2 h-4 w-4" />
//                   <span>
//                     {parseInt(adults) + parseInt(children)} Guest
//                     {parseInt(adults) + parseInt(children) > 1 ? "s" : ""},{" "}
//                     {rooms} Room{rooms !== "1" ? "s" : ""}
//                   </span>
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-80 p-4">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span>Adults</span>
//                     <Select value={adults} onValueChange={setAdults}>
//                       <SelectTrigger className="w-24">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
//                           <SelectItem key={num} value={num.toString()}>
//                             {num}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <span>Children</span>
//                     <Select value={children} onValueChange={handleChildrenChange}>
//                       <SelectTrigger className="w-24">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Array.from({ length: 5 }, (_, i) => i).map((num) => (
//                           <SelectItem key={num} value={num.toString()}>
//                             {num}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <span>Rooms</span>
//                     <Select value={rooms} onValueChange={setRooms}>
//                       <SelectTrigger className="w-24">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
//                           <SelectItem key={num} value={num.toString()}>
//                             {num}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {childrenAges.length > 0 && (
//                     <div className="space-y-2">
//                       <span className="text-sm font-medium">Children Ages</span>
//                       <div className="grid grid-cols-2 gap-2">
//                         {childrenAges.map((child, index) => (
//                           <Select
//                             key={child.id}
//                             value={child.age}
//                             onValueChange={(age) => {
//                               setChildrenAges(
//                                 childrenAges.map((c) =>
//                                   c.id === child.id ? { ...c, age } : c
//                                 )
//                               );
//                             }}
//                           >
//                             <SelectTrigger>
//                               <SelectValue
//                                 placeholder={`Child ${index + 1} age`}
//                               />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {Array.from({ length: 17 }, (_, i) => i + 1).map(
//                                 (age) => (
//                                   <SelectItem key={age} value={age.toString()}>
//                                     {age} year{age > 1 ? "s" : ""}
//                                   </SelectItem>
//                                 )
//                               )}
//                             </SelectContent>
//                           </Select>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </PopoverContent>
//             </Popover>

//             <Button
//               onClick={handleSearch}
//               size="lg"
//               className="w-full rounded-full md:w-auto"
//             >
//               <Search className="mr-2 h-4 w-4" />
//               Search
//             </Button>
//           </div>

//           {/* Advanced Search Section */}
//           <div className="mt-4">
//             <Collapsible
//               open={isAdvancedOpen}
//               onOpenChange={setIsAdvancedOpen}
//               className="w-full"
//             >
//               <CollapsibleTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-2">
//                   {isAdvancedOpen ? <ChevronUp /> : <ChevronDown />}
//                   Advanced Search
//                 </Button>
//               </CollapsibleTrigger>
//               <CollapsibleContent className="mt-4 space-y-4">
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                   <Select value={citizenship} onValueChange={setCitizenship}>
//                     <SelectTrigger className="rounded-full">
//                       <SelectValue placeholder="Select Citizenship" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {COUNTRIES.map((country) => (
//                         <SelectItem key={country} value={country}>
//                           {country}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select value={hotelStars} onValueChange={setHotelStars}>
//                     <SelectTrigger className="rounded-full">
//                       <SelectValue placeholder="Hotel Stars" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {[1, 2, 3, 4, 5].map((stars) => (
//                         <SelectItem key={stars} value={stars.toString()}>
//                           {stars} Star{stars > 1 ? "s" : ""}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <Select value={mealPlan} onValueChange={setMealPlan}>
//                     <SelectTrigger className="rounded-full">
//                       <SelectValue placeholder="Meal Plan" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {MEAL_PLANS.map((plan) => (
//                         <SelectItem key={plan.value} value={plan.value}>
//                           {plan.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </CollapsibleContent>
//             </Collapsible>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Hotels;