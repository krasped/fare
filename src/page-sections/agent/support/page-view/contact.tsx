// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Mail, Phone, MapPin } from "lucide-react";

// const Contact = () => {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">Contact Us</h1>
//         <p className="text-muted-foreground mt-2">Get in touch with our support team.</p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <Card className="p-6">
//           <form className="space-y-6">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Name</label>
//               <Input placeholder="Your name" />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Email</label>
//               <Input type="email" placeholder="your@email.com" />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium">Message</label>
//               <Textarea
//                 placeholder="How can we help you?"
//                 className="min-h-[150px]"
//               />
//             </div>

//             <Button className="w-full">Send Message</Button>
//           </form>
//         </Card>

//         <Card className="p-6">
//           <h2 className="text-lg font-semibold mb-6">Contact Information</h2>
          
//           <div className="space-y-6">
//             <div className="flex items-center gap-4">
//               <div className="rounded-full bg-primary/10 p-3">
//                 <Mail className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="font-medium">Email</p>
//                 <p className="text-sm text-muted-foreground">support@travelagency.com</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="rounded-full bg-primary/10 p-3">
//                 <Phone className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="font-medium">Phone</p>
//                 <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="rounded-full bg-primary/10 p-3">
//                 <MapPin className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <p className="font-medium">Address</p>
//                 <p className="text-sm text-muted-foreground">
//                   123 Travel Street<br />
//                   New York, NY 10001
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Contact;