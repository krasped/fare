import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, CheckCircle2, Circle, MoreVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
  dueDate: string;
  createdAt: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Review new leads",
    description: "Review and categorize new sales leads",
    status: "todo",
    assignedTo: "John Doe",
    dueDate: "2024-03-20",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "Update client presentation",
    description: "Update the sales deck with new features",
    status: "in-progress",
    assignedTo: "Sarah Wilson",
    dueDate: "2024-03-22",
    createdAt: "2024-03-14",
  },
  {
    id: 3,
    title: "Send follow-up emails",
    description: "Follow up with potential clients",
    status: "done",
    assignedTo: "Michael Brown",
    dueDate: "2024-03-18",
    createdAt: "2024-03-13",
  },
];

const Todo = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>("all");

  // Calculate metrics
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((task) => task.status === "todo").length;
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;

  const todoPercentage = (totalTasks > 0) ? (todoTasks / totalTasks) * 100 : 0;
  const inProgressPercentage = (totalTasks > 0) ? (inProgressTasks / totalTasks) * 100 : 0;
  const donePercentage = (totalTasks > 0) ? (doneTasks / totalTasks) * 100 : 0;

  // Filter tasks by agent
  const filteredTasks = selectedAgent === "all" 
    ? tasks 
    : tasks.filter(task => task.assignedTo === selectedAgent);

  // Get unique agents from tasks
  const uniqueAgents = Array.from(new Set(tasks.map(task => task.assignedTo)));

  const addTask = () => {
    if (newTask.title.trim()) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        status: "todo",
        assignedTo: newTask.assignedTo || "Current User", // In a real app, this would be the logged-in user
        dueDate: newTask.dueDate,
        createdAt: format(new Date(), "yyyy-MM-dd"),
      };
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "", assignedTo: "", dueDate: "" });
      setIsDialogOpen(false);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.status = result.destination.droppableId as TaskStatus;
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold tracking-tight">Todo</h1>
        <p className="text-muted-foreground mt-2">
          Manage your tasks and assignments.
        </p>
      </div>

      {/* Filter and Add Task Section */}
      <div className="flex justify-between items-center">
        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Agents</SelectItem>
            {uniqueAgents.map((agent) => (
              <SelectItem key={agent} value={agent}>
                {agent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label>Title</label>
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label>Description</label>
                <Textarea
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label>Assigned To</label>
                <Select
                  value={newTask.assignedTo}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, assignedTo: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label>Due Date</label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={addTask}>Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Metrics Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-muted-foreground">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{todoTasks}</span>
                <span className="text-muted-foreground">{Math.round(todoPercentage)}%</span>
              </div>
              <Progress value={todoPercentage} className="h-2" />
              <p className="text-muted-foreground">Todo</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{inProgressTasks}</span>
                <span className="text-muted-foreground">{Math.round(inProgressPercentage)}%</span>
              </div>
              <Progress value={inProgressPercentage} className="h-2" />
              <p className="text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{doneTasks}</span>
                <span className="text-muted-foreground">{Math.round(donePercentage)}%</span>
              </div>
              <Progress value={donePercentage} className="h-2" />
              <p className="text-muted-foreground">Done</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-4">
            <h2 className="font-semibold mb-4">To Do</h2>
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {getTasksByStatus("todo").map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 border rounded-lg bg-white"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Circle className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{task.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Due: {task.dueDate} | Assigned: {task.assignedTo}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  setTasks(
                                    tasks.map((t) =>
                                      t.id === task.id
                                        ? { ...t, status: "in-progress" }
                                        : t
                                    )
                                  )
                                }
                              >
                                Move to In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  setTasks(
                                    tasks.map((t) =>
                                      t.id === task.id
                                        ? { ...t, status: "done" }
                                        : t
                                    )
                                  )
                                }
                              >
                                Move to Done
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Card>

          <Card className="p-4">
            <h2 className="font-semibold mb-4">In Progress</h2>
            <Droppable droppableId="in-progress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {getTasksByStatus("in-progress").map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 border rounded-lg bg-white"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Circle className="h-4 w-4 text-blue-500" />
                              <span className="font-medium">{task.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Due: {task.dueDate} | Assigned: {task.assignedTo}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  setTasks(
                                    tasks.map((t) =>
                                      t.id === task.id
                                        ? { ...t, status: "todo" }
                                        : t
                                    )
                                  )
                                }
                              >
                                Move to Todo
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  setTasks(
                                    tasks.map((t) =>
                                      t.id === task.id
                                        ? { ...t, status: "done" }
                                        : t
                                    )
                                  )
                                }
                              >
                                Move to Done
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Card>

          <Card className="p-4">
            <h2 className="font-semibold mb-4">Done</h2>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-2"
                >
                  {getTasksByStatus("done").map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 border rounded-lg bg-white"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              <span className="font-medium line-through">
                                {task.title}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-through">
                              {task.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              Due: {task.dueDate} | Assigned: {task.assignedTo}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  setTasks(
                                    tasks.map((t) =>
                                      t.id === task.id
                                        ? { ...t, status: "todo" }
                                        : t
                                    )
                                  )
                                }
                              >
                                Move to Todo
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  setTasks(
                                    tasks.map((t) =>
                                      t.id === task.id
                                        ? { ...t, status: "in-progress" }
                                        : t
                                    )
                                  )
                                }
                              >
                                Move to In Progress
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Card>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Todo;
