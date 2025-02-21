// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/components/ui/use-toast";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Plus, UserCheck, UserX, GraduationCap } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// interface Course {
//   id: string;
//   title: string;
//   required: boolean;
// }

// interface Agent {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   plan: string;
//   active: boolean;
//   monthlyFee: number;
//   about: string;
//   assignedCourses: Course[];
// }

// const availableCourses = [
//   { id: "1", title: "Basics of Angular", required: false },
//   { id: "2", title: "Advanced React Patterns", required: false },
//   { id: "3", title: "Node.js Microservices", required: false },
//   { id: "4", title: "Python Data Science", required: false },
//   { id: "5", title: "Cloud Architecture", required: false },
// ];

// const plans = [
//   { id: "basic", name: "Basic Plan", price: 29.99 },
//   { id: "pro", name: "Pro Plan", price: 49.99 },
//   { id: "enterprise", name: "Enterprise Plan", price: 99.99 },
// ];

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone number must be at least 10 characters"),
//   plan: z.string(),
//   about: z.string().optional(),
//   courses: z.array(z.object({
//     id: z.string(),
//     required: z.boolean()
//   })).optional(),
// });

// const ManageAgents = () => {
//   const { toast } = useToast();
//   const [agents, setAgents] = useState<Agent[]>([
//     {
//       id: "1",
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "+1234567890",
//       plan: "basic",
//       active: true,
//       monthlyFee: 29.99,
//       about: "Experienced travel agent",
//       assignedCourses: [{ id: "1", title: "Basics of Angular", required: true }],
//     },
//   ]);

//   const [open, setOpen] = useState(false);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       plan: "basic",
//       about: "",
//       courses: [],
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     console.log("Form submitted:", values);
//     const newAgent: Agent = {
//       id: (agents.length + 1).toString(),
//       name: values.name,
//       email: values.email,
//       phone: values.phone,
//       plan: values.plan,
//       active: true,
//       monthlyFee: plans.find(p => p.id === values.plan)?.price || 29.99,
//       about: values.about || "",
//       assignedCourses: values.courses?.map(course => ({
//         ...availableCourses.find(ac => ac.id === course.id)!,
//         required: course.required,
//       })) || [],
//     };

//     setAgents([...agents, newAgent]);
//     toast({
//       title: "Agent Created",
//       description: `${newAgent.name} has been added to your agency`,
//     });
//     setOpen(false);
//     form.reset();
//   };

//   const handleToggleAgent = (agentId: string) => {
//     setAgents(agents.map(agent => {
//       if (agent.id === agentId) {
//         const newStatus = !agent.active;
//         toast({
//           title: newStatus ? "Agent Activated" : "Agent Deactivated",
//           description: `Agent ${agent.name} has been ${newStatus ? 'activated' : 'deactivated'}`,
//         });
//         return { ...agent, active: newStatus };
//       }
//       return agent;
//     }));
//   };

//   const totalMonthlyFees = agents.reduce((sum, agent) => 
//     agent.active ? sum + agent.monthlyFee : sum, 0
//   );

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">Manage Agents</h1>
//         <p className="text-muted-foreground mt-2">Add and manage agents in your agency</p>
//       </div>

//       <div className="flex justify-end">
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="w-4 h-4 mr-2" />
//               Add Agent
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle>Add New Agent</DialogTitle>
//             </DialogHeader>
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="John Doe" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input type="email" placeholder="john@example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone Number</FormLabel>
//                       <FormControl>
//                         <Input placeholder="+1234567890" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="plan"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Plan</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a plan" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {plans.map((plan) => (
//                             <SelectItem key={plan.id} value={plan.id}>
//                               {plan.name} (${plan.price}/month)
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="courses"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Assigned Courses</FormLabel>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {availableCourses.map((course) => (
//                           <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg">
//                             <Checkbox
//                               checked={form.watch("courses")?.some((c) => c.id === course.id)}
//                               onCheckedChange={(checked) => {
//                                 const currentCourses = form.getValues("courses") || [];
//                                 if (checked) {
//                                   form.setValue("courses", [...currentCourses, { id: course.id, required: false }]);
//                                 } else {
//                                   form.setValue(
//                                     "courses",
//                                     currentCourses.filter((c) => c.id !== course.id)
//                                   );
//                                 }
//                               }}
//                             />
//                             <div className="flex-1">
//                               <label className="font-medium">
//                                 {course.title}
//                               </label>
//                             </div>
//                             {form.watch("courses")?.some((c) => c.id === course.id) && (
//                               <div className="flex items-center space-x-2">
//                                 <Switch
//                                   checked={form.watch("courses")?.find((c) => c.id === course.id)?.required}
//                                   onCheckedChange={(checked) => {
//                                     const currentCourses = form.getValues("courses") || [];
//                                     form.setValue(
//                                       "courses",
//                                       currentCourses.map((c) =>
//                                         c.id === course.id ? { ...c, required: checked } : c
//                                       )
//                                     );
//                                   }}
//                                 />
//                                 <span className="text-sm text-muted-foreground">Required</span>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="about"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>About</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Tell us about the agent..."
//                           className="resize-none"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit">Create Agent</Button>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Your Agents</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Monthly Fee</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {agents.map((agent) => (
//                 <TableRow key={agent.id}>
//                   <TableCell>{agent.name}</TableCell>
//                   <TableCell>{agent.email}</TableCell>
//                   <TableCell>
//                     <Badge variant={agent.active ? "default" : "destructive"}>
//                       {agent.active ? "Active" : "Inactive"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>${agent.monthlyFee.toFixed(2)}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <Switch
//                         checked={agent.active}
//                         onCheckedChange={() => handleToggleAgent(agent.id)}
//                       />
//                       {agent.active ? (
//                         <UserCheck className="w-4 h-4 text-green-500" />
//                       ) : (
//                         <UserX className="w-4 h-4 text-red-500" />
//                       )}
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div className="mt-4 text-right">
//             <p className="text-lg font-semibold">
//               Total Monthly Fees: ${totalMonthlyFees.toFixed(2)}
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <GraduationCap className="w-5 h-5" />
//             Academy Progress
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Agent</TableHead>
//                 <TableHead>Course</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Required</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {agents.map((agent) =>
//                 agent.assignedCourses.map((course) => (
//                   <TableRow key={`${agent.id}-${course.id}`}>
//                     <TableCell>{agent.name}</TableCell>
//                     <TableCell>{course.title}</TableCell>
//                     <TableCell>
//                       <Badge variant="secondary">Not Started</Badge>
//                     </TableCell>
//                     <TableCell>
//                       {course.required ? (
//                         <Badge variant="destructive">Required</Badge>
//                       ) : (
//                         <Badge variant="secondary">Optional</Badge>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ManageAgents;
