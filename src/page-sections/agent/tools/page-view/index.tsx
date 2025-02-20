import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, CheckCircle, Clock, GraduationCap, RefreshCcw, Trash2 } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Demo data
const topicsData = [
  { name: "Sales Skills", value: 80, color: "#4CAF50" },
  { name: "Customer Service", value: 65, color: "#2196F3" },
  { name: "Product Knowledge", value: 45, color: "#9C27B0" },
  { name: "Marketing", value: 30, color: "#FF9800" },
];

const updates = [
  { title: "New Course Available", description: "Advanced Booking Techniques", type: "new" },
  { title: "Certification Due", description: "Complete Sales Mastery by next week", type: "due" },
  { title: "Achievement Unlocked", description: "Completed Customer Service Module", type: "achievement" },
];

const coursesInProgress = [
  { 
    name: "Platform Basics",
    agent: "John Smith",
    progress: 75,
    completed: 16,
    total: 25,
    topic: "Product",
  },
  {
    name: "Advanced Booking",
    agent: "Sarah Johnson",
    progress: 30,
    completed: 6,
    total: 20,
    topic: "Sales",
  },
  {
    name: "Customer Service",
    agent: "Mike Brown",
    progress: 90,
    completed: 18,
    total: 20,
    topic: "Service",
  },
];

const CoursesPageView = () => {
  const { toast } = useToast();
  console.log("Rendering Courses page");

  const handleResetProgress = (courseName: string) => {
    toast({
      title: "Progress Reset",
      description: `Progress for ${courseName} has been reset.`,
    });
  };

  const handleDelete = (courseName: string) => {
    toast({
      title: "Course Deleted",
      description: `${courseName} has been removed from your courses.`,
    });
  };

  const handleMarkComplete = (courseName: string) => {
    toast({
      title: "Course Completed",
      description: `Congratulations! You've completed ${courseName}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">My Academy</h1>
        <p className="text-muted-foreground mt-2">Enhance your travel industry knowledge</p>
      </div>
      
      {/* Metrics Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 due this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +3 this quarter
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Split Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Section - Topics Graph */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Topics of Interest</CardTitle>
              <CardDescription>Your learning focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart
                  layout="vertical"
                  data={topicsData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Bar dataKey="value" fill="#8884d8">
                    {topicsData.map((entry) => (
                      <Bar key={entry.name} dataKey="value" fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Updates */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
              <CardDescription>Recent activity and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {updates.map((update, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{update.title}</h4>
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Courses Overview Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Courses Overview</CardTitle>
              <CardDescription>Track your ongoing courses</CardDescription>
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4 py-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-3">Course Name</div>
              <div className="col-span-3">Agent Name</div>
              <div className="col-span-4">Progress</div>
              <div className="col-span-2">Actions</div>
            </div>
            <div className="space-y-6">
              {coursesInProgress.map((course, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 font-medium">{course.name}</div>
                  <div className="col-span-3 text-muted-foreground">{course.agent}</div>
                  <div className="col-span-4">
                    <div className="space-y-1">
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {course.progress}% ({course.completed}/{course.total} completed)
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleResetProgress(course.name)}
                      className="h-8 w-8 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(course.name)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleMarkComplete(course.name)}
                      className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesPageView;