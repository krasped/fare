// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Inbox,
//   Send,
//   File,
//   Plus,
//   Trash2,
//   Star,
//   Archive,
//   Mail,
// } from "lucide-react";

// interface Email {
//   id: number;
//   from: string;
//   to: string;
//   subject: string;
//   content: string;
//   date: string;
//   read: boolean;
//   folder: "inbox" | "sent" | "drafts" | "trash";
// }

// const initialEmails: Email[] = [
//   {
//     id: 1,
//     from: "john@example.com",
//     to: "me@agency.com",
//     subject: "New Lead Opportunity",
//     content: "Hi, I have a new lead for you to review...",
//     date: "2024-03-15 10:30",
//     read: false,
//     folder: "inbox",
//   },
//   {
//     id: 2,
//     from: "me@agency.com",
//     to: "sarah@client.com",
//     subject: "Travel Package Details",
//     content: "Here are the details of the travel package...",
//     date: "2024-03-14 15:45",
//     read: true,
//     folder: "sent",
//   },
// ];

// const EmailPageView = () => {
//   const [emails, setEmails] = useState<Email[]>(initialEmails);
//   const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
//   const [composing, setComposing] = useState(false);
//   const [newEmail, setNewEmail] = useState({
//     to: "",
//     subject: "",
//     content: "",
//   });

//   const filteredEmails = emails.filter((email) => email.folder === selectedFolder);

//   const sendEmail = () => {
//     if (newEmail.to && newEmail.subject) {
//       const email: Email = {
//         id: emails.length + 1,
//         from: "me@agency.com",
//         to: newEmail.to,
//         subject: newEmail.subject,
//         content: newEmail.content,
//         date: new Date().toISOString(),
//         read: true,
//         folder: "sent",
//       };
//       setEmails([...emails, email]);
//       setNewEmail({ to: "", subject: "", content: "" });
//       setComposing(false);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight text-red-500">Email</h1>
//         <p className="text-muted-foreground mt-2">
//           Manage your email communications.
//         </p>
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         <div className="col-span-3 space-y-4">
//           <Button
//             className="w-full justify-start"
//             variant="outline"
//             onClick={() => setComposing(true)}
//           >
//             <Plus className="mr-2 h-4 w-4" />
//             Compose
//           </Button>

//           <nav className="space-y-2">
//             <Button
//               variant={selectedFolder === "inbox" ? "secondary" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setSelectedFolder("inbox")}
//             >
//               <Inbox className="mr-2 h-4 w-4" />
//               Inbox
//             </Button>
//             <Button
//               variant={selectedFolder === "sent" ? "secondary" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setSelectedFolder("sent")}
//             >
//               <Send className="mr-2 h-4 w-4" />
//               Sent
//             </Button>
//             <Button
//               variant={selectedFolder === "drafts" ? "secondary" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setSelectedFolder("drafts")}
//             >
//               <File className="mr-2 h-4 w-4" />
//               Drafts
//             </Button>
//             <Button
//               variant={selectedFolder === "trash" ? "secondary" : "ghost"}
//               className="w-full justify-start"
//               onClick={() => setSelectedFolder("trash")}
//             >
//               <Trash2 className="mr-2 h-4 w-4" />
//               Trash
//             </Button>
//           </nav>
//         </div>

//         <div className="col-span-9">
//           {composing ? (
//             <Card className="p-6">
//               <div className="space-y-4">
//                 <Input
//                   placeholder="To"
//                   value={newEmail.to}
//                   onChange={(e) =>
//                     setNewEmail({ ...newEmail, to: e.target.value })
//                   }
//                 />
//                 <Input
//                   placeholder="Subject"
//                   value={newEmail.subject}
//                   onChange={(e) =>
//                     setNewEmail({ ...newEmail, subject: e.target.value })
//                   }
//                 />
//                 <Textarea
//                   placeholder="Write your message here..."
//                   className="min-h-[200px]"
//                   value={newEmail.content}
//                   onChange={(e) =>
//                     setNewEmail({ ...newEmail, content: e.target.value })
//                   }
//                 />
//                 <div className="flex justify-end gap-2">
//                   <Button variant="outline" onClick={() => setComposing(false)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={sendEmail}>Send</Button>
//                 </div>
//               </div>
//             </Card>
//           ) : (
//             <Card className="divide-y">
//               {filteredEmails.map((email) => (
//                 <div
//                   key={email.id}
//                   className={`p-4 hover:bg-muted/50 cursor-pointer ${
//                     !email.read ? "font-medium" : ""
//                   }`}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-2">
//                       <Mail className="h-4 w-4" />
//                       <div>
//                         <p className="text-sm">
//                           {selectedFolder === "sent" ? email.to : email.from}
//                         </p>
//                         <p className="text-base">{email.subject}</p>
//                         <p className="text-sm text-muted-foreground line-clamp-1">
//                           {email.content}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="text-sm text-muted-foreground">
//                       {new Date(email.date).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailPageView;