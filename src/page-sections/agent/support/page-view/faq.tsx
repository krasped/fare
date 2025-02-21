// import { Card } from "@/components/ui/card";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// const faqs = [
//   {
//     question: "How do I create a new booking?",
//     answer: "To create a new booking, navigate to the Orders section and click on 'New Booking'. Follow the step-by-step process to select travel dates, accommodation, and enter guest details."
//   },
//   {
//     question: "How are commissions calculated?",
//     answer: "Commissions are calculated based on the total booking value and your agency tier. Standard commission rates range from 10-15%, with potential bonuses for high-volume bookings."
//   },
//   {
//     question: "When can I withdraw my earnings?",
//     answer: "Earnings become available for withdrawal after the guest's stay is completed and the payment clearing period (typically 30 days) has passed. You can view your available balance in the Withdrawals section."
//   },
//   {
//     question: "How do I contact support?",
//     answer: "You can contact support by creating a new ticket in the Support section, or by using the Contact form for general inquiries. For urgent matters, please use the emergency contact number provided in your agency dashboard."
//   }
// ];

// const FAQ = () => {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">FAQ</h1>
//         <p className="text-muted-foreground mt-2">Find answers to commonly asked questions.</p>
//       </div>

//       <Card className="p-6">
//         <Accordion type="single" collapsible className="w-full">
//           {faqs.map((faq, index) => (
//             <AccordionItem key={index} value={`item-${index}`}>
//               <AccordionTrigger>{faq.question}</AccordionTrigger>
//               <AccordionContent>{faq.answer}</AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </Card>
//     </div>
//   );
// };

// export default FAQ;