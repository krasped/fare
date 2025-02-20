import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Users, BedDouble } from "lucide-react";
import RoomCard from "@/components/hotels/RoomCard";
import { Card } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // This would come from an API in production
  const hotel = {
    name: "Grand Hotel Example",
    stars: 5,
    address: "123 Beach Road, Paradise City",
    images: [
      "/lovable-uploads/4469a5a3-d827-43e5-8913-b15050e3e7e6.png",
      // Add more images as needed
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe Room",
        details: {
          bedType: "King Size Bed",
          size: "45",
          amenities: ["Free Wi-Fi", "Ocean View", "Mini Bar", "Room Service"],
          image: "/lovable-uploads/4469a5a3-d827-43e5-8913-b15050e3e7e6.png",
        },
        options: [
          {
            meals: "Breakfast Included",
            cancellation: {
              allowed: true,
              date: "2024-05-01",
            },
            priceUSD: 250,
            paymentType: "card" as const,
          },
          {
            meals: "Room Only",
            cancellation: {
              allowed: true,
              date: "2024-05-01",
            },
            priceUSD: 200,
            paymentType: "card" as const,
          },
        ],
      },
      {
        id: 2,
        name: "Standard Room",
        details: {
          bedType: "Queen Size Bed",
          size: "35",
          amenities: ["Free Wi-Fi", "City View", "Coffee Maker"],
          image: "/lovable-uploads/4469a5a3-d827-43e5-8913-b15050e3e7e6.png",
        },
        options: [
          {
            meals: "Full Board",
            cancellation: {
              allowed: false,
            },
            priceUSD: 150,
            paymentType: "cash" as const,
          },
          {
            meals: "Room Only",
            cancellation: {
              allowed: false,
            },
            priceUSD: 120,
            paymentType: "cash" as const,
          },
        ],
      },
    ],
    policy: "Check-in time is 2 PM and check-out time is 12 PM...",
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 4.5,
        comment: "Great stay, wonderful service!",
      },
    ],
  };

  const handleSearch = () => {
    console.log("Searching with new parameters:", {
      rooms,
      adults,
      children,
    });
    toast.success("Search updated!");
    // Navigate back to hotels search with the new parameters
    navigate("/hotels", {
      state: {
        rooms,
        adults,
        children,
      }
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Hotel Title and Stars */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
        <div className="flex justify-center gap-1">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>{hotel.address}</span>
      </div>

      {/* Images */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={hotel.images[activeImage]}
          alt={`${hotel.name} view ${activeImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vacation Details */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-6 justify-between items-start">
          <div className="flex flex-col items-center">
            <DatePickerWithRange className="w-[280px]" />
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-muted-foreground">Check-in</span>
              <span className="text-sm text-muted-foreground">Check-out</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-muted-foreground" />
              <Input
                type="number"
                id="rooms"
                min="1"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-20"
              />
            </div>
            <Label htmlFor="rooms" className="mt-2 text-sm text-muted-foreground">
              Rooms
            </Label>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <Input
                type="number"
                id="adults"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-20"
              />
            </div>
            <Label htmlFor="adults" className="mt-2 text-sm text-muted-foreground">
              Adults
            </Label>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <Input
                type="number"
                id="children"
                min="0"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-20"
              />
            </div>
            <Label htmlFor="children" className="mt-2 text-sm text-muted-foreground">
              Children
            </Label>
          </div>

          <Button 
            onClick={handleSearch}
            variant="outline"
            className="mt-4 w-full md:w-auto"
          >
            Change Search
          </Button>
        </div>
      </Card>

      {/* Rooms */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Rooms</h2>
        {hotel.rooms.map((room) => (
          <RoomCard
            key={room.id}
            name={room.name}
            details={room.details}
            options={room.options}
            onSelect={(option) => console.log("Selected room:", room.id, option)}
          />
        ))}
      </div>

      {/* Map */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <div className="aspect-video bg-muted rounded-lg">
          {/* Map component will go here */}
        </div>
      </Card>

      {/* Policy */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Hotel Policy</h2>
        <p className="text-muted-foreground">{hotel.policy}</p>
      </Card>

      {/* Reviews */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>
        <div className="space-y-4">
          {hotel.reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{review.author}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1">{review.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HotelDetails;