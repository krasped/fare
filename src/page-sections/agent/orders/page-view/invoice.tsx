import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const InvoiceDetails = () => {
  const invoice = {
    id: "INV001",
    status: "pending",
    orderNumber: "ORD001",
    date: "2024-03-15",
    client: {
      name: "John Doe",
      address: "123 Main St, City",
      email: "john@example.com",
      phone: "+1 234 567 890"
    },
    agent: {
      name: "Travel Agency",
      logo: "/placeholder.svg",
      address: "456 Agency St, City",
      phone: "+1 987 654 321"
    },
    items: [
      {
        name: "Hotel Booking",
        description: "Luxury Suite - 3 nights",
        price: 1200
      }
    ]
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...");
  };

  const handleSendToClient = () => {
    console.log("Sending to client...");
  };

  const total = invoice.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Payment Details */}
        <Card className="p-6 bg-gray-50">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  invoice.status === "pending"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-green-100 text-green-700"
                )}
              >
                {invoice.status === "pending" ? "Pending Payment" : "Approved"}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Account Number</p>
              <p className="font-medium">**** **** **** 4242</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Due Date</p>
              <p className="font-medium">{invoice.date}</p>
            </div>
          </div>
        </Card>

        {/* Right Column - Invoice Preview */}
        <Card className="p-6 bg-white">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <img
                src={invoice.agent.logo}
                alt="Agency Logo"
                className="h-12 w-auto"
              />
              <div className="text-right">
                <div className="text-sm text-gray-600">Invoice #</div>
                <div className="font-semibold">{invoice.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="font-semibold">Bill To:</h3>
                <div className="text-sm text-gray-600">
                  <p>{invoice.client.name}</p>
                  <p>{invoice.client.address}</p>
                  <p>{invoice.client.phone}</p>
                </div>
              </div>

              <div className="space-y-2 text-right">
                <h3 className="font-semibold">Issue Date:</h3>
                <p className="text-sm text-gray-600">{invoice.date}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Description</h3>
              <table className="w-full">
                <thead className="text-sm text-gray-600">
                  <tr>
                    <th className="text-left py-2">Item</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          {item.description}
                        </div>
                      </td>
                      <td className="text-right py-3">
                        ${item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td className="py-3 font-semibold">Total</td>
                    <td className="text-right py-3 font-semibold">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleDownloadPDF}
              >
                <Download className="h-4 w-4" />
                PDF
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={handleSendToClient}
              >
                <Send className="h-4 w-4" />
                Send to Client
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceDetails;