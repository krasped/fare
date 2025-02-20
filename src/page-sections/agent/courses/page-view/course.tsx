import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Demo data
const courseData = {
  id: "1",
  title: "Basics of Angular",
  currentLesson: {
    title: "Introduction to Components",
    videoUrl: "https://www.youtube.com/embed/Kehf5Qa9HZ4",
    description: "Learn the fundamentals of Angular components, their lifecycle, and how to create them effectively.",
    instructor: {
      name: "John Smith",
      title: "Senior Frontend Developer",
      avatar: "/placeholder.svg"
    }
  },
  sections: [
    {
      title: "Getting Started",
      duration: "1h 30m",
      lessons: [
        { id: "1.1", title: "Course Overview", completed: true, duration: "10m" },
        { id: "1.2", title: "Setting Up Your Environment", completed: true, duration: "20m" },
        { id: "1.3", title: "Introduction to Components", completed: false, duration: "30m" },
        { id: "1.4", title: "Basic Angular Concepts", completed: false, duration: "30m" }
      ]
    },
    {
      title: "Components Deep Dive",
      duration: "2h",
      lessons: [
        { id: "2.1", title: "Component Communication", completed: false, duration: "30m" },
        { id: "2.2", title: "Lifecycle Hooks", completed: false, duration: "30m" },
        { id: "2.3", title: "Content Projection", completed: false, duration: "30m" },
        { id: "2.4", title: "Component Styling", completed: false, duration: "30m" }
      ]
    },
    {
      title: "Services and Dependency Injection",
      duration: "1h 45m",
      lessons: [
        { id: "3.1", title: "Introduction to Services", completed: false, duration: "25m" },
        { id: "3.2", title: "Dependency Injection", completed: false, duration: "25m" },
        { id: "3.3", title: "HTTP Client", completed: false, duration: "25m" },
        { id: "3.4", title: "Error Handling", completed: false, duration: "30m" }
      ]
    }
  ]
};

export default function CourseDetails() {
  const { id } = useParams();
  const [course] = useState(courseData);
  console.log("Rendering CourseDetails page for course:", id);

  const toggleLessonComplete = (lessonId: string) => {
    console.log("Toggling lesson completion:", lessonId);
    // In a real app, this would update the backend
  };

  return (
    <div className="flex gap-6">
      {/* Left side - Video and Lesson Details */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">{course.title}</h1>
          <h2 className="text-xl text-muted-foreground mt-2">{course.currentLesson.title}</h2>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={course.currentLesson.videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Lesson Information */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">About this lesson</h3>
            <p className="text-muted-foreground">
              {course.currentLesson.description}
            </p>
            
            <Separator className="my-4" />
            
            <div className="flex items-center space-x-4">
              <img
                src={course.currentLesson.instructor.avatar}
                alt={course.currentLesson.instructor.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{course.currentLesson.instructor.name}</h4>
                <p className="text-sm text-muted-foreground">{course.currentLesson.instructor.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Course Content */}
      <Card className="w-80">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Course Content</h3>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <Accordion type="single" collapsible className="space-y-4">
              {course.sections.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start text-left">
                      <span className="font-medium">{section.title}</span>
                      <span className="text-sm text-muted-foreground">{section.duration}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-start space-x-2 text-sm p-2 rounded hover:bg-accent"
                        >
                          <Checkbox
                            id={lesson.id}
                            checked={lesson.completed}
                            onCheckedChange={() => toggleLessonComplete(lesson.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={lesson.id}
                              className="flex justify-between cursor-pointer"
                            >
                              <span className={lesson.completed ? "text-muted-foreground line-through" : ""}>
                                {lesson.title}
                              </span>
                              <span className="text-muted-foreground">{lesson.duration}</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}