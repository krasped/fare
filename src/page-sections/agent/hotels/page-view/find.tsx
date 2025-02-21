// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Search, Star } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { HotelSearchResults } from "@/components/hotels/HotelSearchResults";

// interface PersonCount {
//   adults: number;
//   children: { count: number; ages: number[] };
//   infants: number;
// }

// interface SearchCriteria {
//   location: string;
//   persons: PersonCount;
//   rooms: string;
//   stars: string;
// }

// const FindMyHotel = () => {
//   const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
//     location: "",
//     persons: {
//       adults: 2,
//       children: { count: 0, ages: [] },
//       infants: 0,
//     },
//     rooms: "1",
//     stars: "3",
//   });
//   const [showResults, setShowResults] = useState(false);

//   const handlePersonChange = (type: 'adults' | 'children' | 'infants', value: string) => {
//     const numValue = parseInt(value);
//     setSearchCriteria(prev => {
//       if (type === 'children') {
//         const newAges = Array(numValue).fill(0);
//         return {
//           ...prev,
//           persons: {
//             ...prev.persons,
//             children: {
//               count: numValue,
//               ages: newAges
//             }
//           }
//         };
//       }
//       return {
//         ...prev,
//         persons: {
//           ...prev.persons,
//           [type]: numValue
//         }
//       };
//     });
//   };

//   const handleChildAgeChange = (index: number, age: string) => {
//     setSearchCriteria(prev => {
//       const newAges = [...prev.persons.children.ages];
//       newAges[index] = parseInt(age);
//       return {
//         ...prev,
//         persons: {
//           ...prev.persons,
//           children: {
//             ...prev.persons.children,
//             ages: newAges
//           }
//         }
//       };
//     });
//   };

//   const handleSearch = () => {
//     console.log("Search criteria:", searchCriteria);
//     setShowResults(true);
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-4xl font-bold tracking-tight text-red-500">Find My Hotel</h1>
//         <p className="text-muted-foreground mt-2">
//           Search for hotels based on your preferences
//         </p>
//       </div>

//       <Card className="p-6">
//         <div className="grid gap-6 md:grid-cols-4">
//           <div>
//             <label className="text-sm font-medium mb-2 block">Location</label>
//             <Input
//               placeholder="Enter city"
//               value={searchCriteria.location}
//               onChange={(e) =>
//                 setSearchCriteria({ ...searchCriteria, location: e.target.value })
//               }
//             />
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium mb-2 block">Adults</label>
//               <Select
//                 value={searchCriteria.persons.adults.toString()}
//                 onValueChange={(value) => handlePersonChange('adults', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[1, 2, 3, 4, 5, 6].map((num) => (
//                     <SelectItem key={num} value={num.toString()}>
//                       {num} {num === 1 ? "Adult" : "Adults"}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <label className="text-sm font-medium mb-2 block">Children (2-12 years)</label>
//               <Select
//                 value={searchCriteria.persons.children.count.toString()}
//                 onValueChange={(value) => handlePersonChange('children', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[0, 1, 2, 3, 4].map((num) => (
//                     <SelectItem key={num} value={num.toString()}>
//                       {num} {num === 1 ? "Child" : "Children"}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {searchCriteria.persons.children.count > 0 && (
//               <div className="space-y-2">
//                 <label className="text-sm font-medium block">Child Ages</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {Array.from({ length: searchCriteria.persons.children.count }).map((_, index) => (
//                     <Select
//                       key={index}
//                       value={searchCriteria.persons.children.ages[index]?.toString()}
//                       onValueChange={(value) => handleChildAgeChange(index, value)}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder={`Child ${index + 1} age`} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Array.from({ length: 11 }).map((_, age) => (
//                           <SelectItem key={age + 2} value={(age + 2).toString()}>
//                             {age + 2} years
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="text-sm font-medium mb-2 block">Infants (0-2 years)</label>
//               <Select
//                 value={searchCriteria.persons.infants.toString()}
//                 onValueChange={(value) => handlePersonChange('infants', value)}
//               >
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[0, 1, 2].map((num) => (
//                     <SelectItem key={num} value={num.toString()}>
//                       {num} {num === 1 ? "Infant" : "Infants"}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium mb-2 block">Rooms</label>
//             <Select
//               value={searchCriteria.rooms}
//               onValueChange={(value) =>
//                 setSearchCriteria({ ...searchCriteria, rooms: value })
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {[1, 2, 3, 4].map((num) => (
//                   <SelectItem key={num} value={num.toString()}>
//                     {num} {num === 1 ? "Room" : "Rooms"}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <label className="text-sm font-medium mb-2 block">Hotel Stars</label>
//             <Select
//               value={searchCriteria.stars}
//               onValueChange={(value) =>
//                 setSearchCriteria({ ...searchCriteria, stars: value })
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {[3, 4, 5].map((num) => (
//                   <SelectItem key={num} value={num.toString()}>
//                     {Array(num)
//                       .fill(0)
//                       .map((_, i) => (
//                         <Star
//                           key={i}
//                           className="inline-block h-4 w-4 text-yellow-400"
//                         />
//                       ))}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <Button
//           onClick={handleSearch}
//           size="lg"
//           className="mt-6 w-full md:w-auto"
//         >
//           <Search className="mr-2 h-4 w-4" />
//           Search Hotels
//         </Button>
//       </Card>

//       {showResults && <HotelSearchResults />}
//     </div>
//   );
// };

// export default FindMyHotel;