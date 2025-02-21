// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Send } from "lucide-react";

// const contacts = [
//   { id: 1, name: "Sarah Wilson", avatar: "", status: "online" },
//   { id: 2, name: "Michael Brown", avatar: "", status: "offline" },
//   { id: 3, name: "Emma Davis", avatar: "", status: "online" },
// ];

// const messages = [
//   { id: 1, senderId: 1, text: "Hi there! How can I help you today?", timestamp: "10:30 AM" },
//   { id: 2, senderId: "me", text: "I have a question about a booking", timestamp: "10:31 AM" },
//   { id: 3, senderId: 1, text: "Sure, what would you like to know?", timestamp: "10:32 AM" },
// ];

// const Chats = () => {
//   const [selectedContact, setSelectedContact] = useState(contacts[0]);
//   const [newMessage, setNewMessage] = useState("");

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">Chats</h1>
//         <p className="text-muted-foreground mt-2">Connect with other agents in the network.</p>
//       </div>

//       <div className="grid grid-cols-12 gap-6">
//         <Card className="col-span-4 p-4">
//           <div className="space-y-4">
//             {contacts.map((contact) => (
//               <div
//                 key={contact.id}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent ${
//                   selectedContact.id === contact.id ? "bg-accent" : ""
//                 }`}
//                 onClick={() => setSelectedContact(contact)}
//               >
//                 <Avatar>
//                   <AvatarImage src={contact.avatar} />
//                   <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1">
//                   <p className="font-medium">{contact.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {contact.status === "online" ? "Online" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         <Card className="col-span-8 p-4">
//           <div className="flex flex-col h-[600px]">
//             <div className="border-b pb-4 mb-4">
//               <div className="flex items-center gap-3">
//                 <Avatar>
//                   <AvatarImage src={selectedContact.avatar} />
//                   <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{selectedContact.name}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {selectedContact.status === "online" ? "Online" : "Offline"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <ScrollArea className="flex-1 pr-4">
//               <div className="space-y-4">
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className={`flex ${
//                       message.senderId === "me" ? "justify-end" : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`max-w-[70%] rounded-lg p-3 ${
//                         message.senderId === "me"
//                           ? "bg-primary text-primary-foreground"
//                           : "bg-muted"
//                       }`}
//                     >
//                       <p>{message.text}</p>
//                       <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>

//             <div className="mt-4 flex gap-2">
//               <Input
//                 placeholder="Type a message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <Button size="icon">
//                 <Send className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Chats;