import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Search, Star, Clock } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

// Demo data
const courses = [
  {
    id: 1,
    title: "Basics of Angular",
    description: "Introductory course for Angular and framework basics. Master Angular and build awesome apps.",
    image: "/placeholder.svg",
    topic: "Frontend",
    rating: 4.8,
    totalRatings: 245,
    totalLessons: 32,
    completedLessons: 16,
    agents: [
      { name: "John Smith", image: "/placeholder.svg" },
      { name: "Sarah Johnson", image: "/placeholder.svg" },
      { name: "Mike Brown", image: "/placeholder.svg" },
    ]
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Learn advanced React patterns and best practices for building scalable applications.",
    image: "/placeholder.svg",
    topic: "Frontend",
    rating: 4.9,
    totalRatings: 189,
    totalLessons: 28,
    completedLessons: 14,
    agents: [
      { name: "Emma Wilson", image: "/placeholder.svg" },
      { name: "David Lee", image: "/placeholder.svg" },
    ]
  },
  {
    id: 3,
    title: "Node.js Microservices",
    description: "Build scalable microservices architecture with Node.js and Docker.",
    image: "/placeholder.svg",
    topic: "Backend",
    rating: 4.7,
    totalRatings: 156,
    totalLessons: 24,
    completedLessons: 8,
    agents: [
      { name: "Alex Chen", image: "/placeholder.svg" },
      { name: "Maria Garcia", image: "/placeholder.svg" },
    ]
  },
  {
    id: 4,
    title: "Python Data Science",
    description: "Master data analysis and machine learning with Python and popular libraries.",
    image: "/placeholder.svg",
    topic: "Data Science",
    rating: 4.9,
    totalRatings: 312,
    totalLessons: 40,
    completedLessons: 22,
    agents: [
      { name: "James Wilson", image: "/placeholder.svg" },
      { name: "Sophie Martin", image: "/placeholder.svg" },
    ]
  },
  {
    id: 5,
    title: "Cloud Architecture",
    description: "Design and implement scalable cloud solutions with AWS and Azure.",
    image: "/placeholder.svg",
    topic: "DevOps",
    rating: 4.8,
    totalRatings: 178,
    totalLessons: 30,
    completedLessons: 12,
    agents: [
      { name: "Tom Baker", image: "/placeholder.svg" },
      { name: "Lisa Chen", image: "/placeholder.svg" },
    ]
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    description: "Learn modern design principles and create stunning user interfaces.",
    image: "/placeholder.svg",
    topic: "Design",
    rating: 4.7,
    totalRatings: 225,
    totalLessons: 26,
    completedLessons: 18,
    agents: [
      { name: "Anna White", image: "/placeholder.svg" },
      { name: "Chris Black", image: "/placeholder.svg" },
    ]
  },
  {
    id: 7,
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications with React Native.",
    image: "/placeholder.svg",
    topic: "Mobile",
    rating: 4.8,
    totalRatings: 198,
    totalLessons: 34,
    completedLessons: 20,
    agents: [
      { name: "Ryan Johnson", image: "/placeholder.svg" },
      { name: "Emily Davis", image: "/placeholder.svg" },
    ]
  }
];

const topics = ["All Topics", "Frontend", "Backend", "DevOps", "Data Science", "Design", "Mobile"];

export default function MyCourses() {
  const [hideCompleted, setHideCompleted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  
  console.log("Rendering MyCourses page");

  return (
    <div className="space-y-8">
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-indigo-800 text-white rounded-lg p-8 overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-display font-bold leading-tight">
            Education, talents, and career opportunities. All in one place.
          </h1>
          <p className="text-lg opacity-90">
            Grow your skill with the most reliable online courses and certifications in marketing, 
            information technology, programming, and data science.
          </p>
          <div className="relative max-w-xl">
            <Input 
              placeholder="Find your course..." 
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
          </div>
        </div>
      </div>

      {/* My Courses Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-semibold">My Courses</h2>
            <p className="text-muted-foreground mt-1">
              {courses.length} courses in progress
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Switch
                id="hide-completed"
                checked={hideCompleted}
                onCheckedChange={setHideCompleted}
              />
              <Label htmlFor="hide-completed">Hide completed</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="border-gray-100 overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  {course.topic}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                  <span className="text-xs">({course.totalRatings})</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                </div>
                <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2">
                  {course.agents.map((agent, index) => (
                    <HoverCard key={index}>
                      <HoverCardTrigger>
                        <Avatar className="border-2 border-white">
                          <AvatarImage src={agent.image} alt={agent.name} />
                        </Avatar>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-auto p-2">
                        <p className="text-sm">{agent.name}</p>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
                <Button 
                  variant="default"
                  onClick={() => window.location.href = `/courses/${course.id}`}
                >
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}