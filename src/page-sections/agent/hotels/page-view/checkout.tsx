import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface BookingDetails {
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  adults: number;
  children: number;
  rate: number;
  mealPlan: string;
  totalAmount: number;
  commission?: {
    type: 'fixed' | 'percentage';
    value: number;
  };
}

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  console.log("Checkout state:", state);
  
  if (!state?.bookingDetails) {
    console.log("No booking details found");
    navigate("/hotels");
    return null;
  }

  const bookingDetails: BookingDetails = state.bookingDetails;

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const [selectedCard, setSelectedCard] = useState("new");

  const handleInputChange = (field: keyof CardDetails, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment submitted:", {
      cardDetails,
      bookingDetails,
      selectedCard
    });

    // In a real app, this would process the payment
    // For now, we'll simulate a successful payment
    toast({
      title: "Payment Successful",
      description: "Your booking has been confirmed.",
    });

    // Navigate to orders page
    navigate("/orders");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Payment Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
              
              <div className="space-y-6">
                <RadioGroup
                  value={selectedCard}
                  onValueChange={setSelectedCard}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new-card" />
                    <Label htmlFor="new-card">New Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="saved" id="saved-card" />
                    <Label htmlFor="saved-card">Use Saved Card</Label>
                  </div>
                </RadioGroup>

                {selectedCard === "new" && (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardHolder">Card Holder Name</Label>
                      <Input
                        id="cardHolder"
                        value={cardDetails.cardHolder}
                        onChange={(e) => handleInputChange("cardHolder", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                        maxLength={16}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                          maxLength={5}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Button type="submit" className="w-full">
              Pay Now ${bookingDetails.totalAmount.toFixed(2)}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <Card className="p-6 sticky top-8">
            <h2 className="text-2xl font-semibold mb-4">{bookingDetails.hotelName}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Dates</h3>
                <p>Check-in: {new Date(bookingDetails.checkIn).toLocaleDateString()}</p>
                <p>Check-out: {new Date(bookingDetails.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Guests</h3>
                <p>{bookingDetails.adults} Adult(s)</p>
                {bookingDetails.children > 0 && (
                  <p>{bookingDetails.children} Child(ren)</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Amount</h3>
                <p className="text-xl font-semibold">
                  ${bookingDetails.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;