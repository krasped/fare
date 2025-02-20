// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { cn } from "@/utils/tailwind";
import {
  BarChart,
  Calendar,
  DollarSign,
  Users,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import { Box, Button, Card, Grid, Paper, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
// import { ThemeToggle } from "@/components/ThemeToggle";
// import { ThemeProvider } from "next-themes";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Leads",
    value: "2,350",
    change: "+15.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Pending Orders",
    value: "12",
    change: "-2.3%",
    trend: "down",
    icon: Calendar,
  },
  {
    title: "Commission Rate",
    value: "24.5%",
    change: "+4.1%",
    trend: "up",
    icon: BarChart,
  },
];

const todaysMeetings = [
  {
    id: 1,
    title: "Client Consultation - John Smith",
    time: "09:00 AM",
    duration: "30min",
    type: "Virtual",
    isAgent: false,
  },
  {
    id: 2,
    title: "Team Weekly Sync",
    time: "11:00 AM",
    duration: "1h",
    type: "In-Person",
    isAgent: false,
  },
  {
    id: 3,
    title: "Travel Package Review",
    time: "02:30 PM",
    duration: "45min",
    type: "Virtual",
    isAgent: false,
  },
  {
    id: 4,
    title: "Agent Meeting - Sarah Johnson",
    time: "10:00 AM",
    duration: "45min",
    type: "Virtual",
    isAgent: true,
  },
  {
    id: 5,
    title: "Agent Review - Mike Peters",
    time: "03:30 PM",
    duration: "30min",
    type: "In-Person",
    isAgent: true,
  },
];

const HomePageView = () => {
  const [viewType, setViewType] = useState<"list" | "daily">("list");

  const renderListView = () => (
    // <div className="space-y-4">
    //   {todaysMeetings.map((meeting) => (
    //     <div 
    //       key={meeting.id} 
    //       className={cn(
    //         "flex items-center gap-4 p-4 rounded-lg border hover:bg-accent transition-colors",
    //         meeting.isAgent ? "border-destructive" : "border-primary"
    //       )}
    //     >
    //       <div className={cn(
    //         "h-10 w-10 rounded-full flex items-center justify-center",
    //         meeting.isAgent ? "bg-destructive/10" : "bg-primary/10"
    //       )}>
    //         <Clock className={cn(
    //           "h-5 w-5",
    //           meeting.isAgent ? "text-destructive" : "text-primary"
    //         )} />
    //       </div>
    //       <div className="flex-1">
    //         <h3 className="font-medium text-sm">{meeting.title}</h3>
    //         <div className="flex items-center gap-2 text-sm text-muted-foreground">
    //           <span>{meeting.time}</span>
    //           <span>•</span>
    //           <span>{meeting.duration}</span>
    //           <span>•</span>
    //           <span>{meeting.type}</span>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {todaysMeetings.map((meeting) => (
        <Paper
          key={meeting.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            border: `1px solid`,
            borderColor: meeting.isAgent ? 'error.main' : 'primary.main',
            backgroundColor:'',
            '&:hover': {
              backgroundColor: 'primary.100',
            },
          }}
        >
          <Box
            sx={{
              height: 40,
              width: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: meeting.isAgent ? 'error.light' : 'primary.light',
            }}
          >
            <AccessTime sx={{ height: 20, width: 20, color: meeting.isAgent ? 'error.main' : 'primary.main' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" fontWeight="medium">
              {meeting.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.875rem' }}>
              <span>{meeting.time}</span>
              <span>•</span>
              <span>{meeting.duration}</span>
              <span>•</span>
              <span>{meeting.type}</span>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );

  // const renderDailyView = () => (
  //   <div className="grid grid-cols-1 gap-2">
  //     {todaysMeetings
  //       .sort((a, b) => {
  //         const timeA = new Date(`1970/01/01 ${a.time}`);
  //         const timeB = new Date(`1970/01/01 ${b.time}`);
  //         return timeA.getTime() - timeB.getTime();
  //       })
  //       .map((meeting) => (
  //         <div 
  //           key={meeting.id}
  //           className={cn(
  //             "p-2 rounded-lg border",
  //             meeting.isAgent ? "border-destructive" : "border-primary",
  //             meeting.isAgent ? "bg-destructive/5" : "bg-primary/5"
  //           )}
  //         >
  //           <div className="flex items-center gap-2">
  //             <span className="font-medium">{meeting.time}</span>
  //             <span className="text-sm text-muted-foreground">({meeting.duration})</span>
  //           </div>
  //           <p className="text-sm mt-1">{meeting.title}</p>
  //         </div>
  //       ))}
  //   </div>
  // );

  const renderDailyView = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
      {todaysMeetings
        .sort((a, b) => {
          const timeA = new Date(`1970/01/01 ${a.time}`);
          const timeB = new Date(`1970/01/01 ${b.time}`);
          return timeA.getTime() - timeB.getTime();
        })
        .map((meeting) => (
          <Paper
            key={meeting.id}
            sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid`,
              borderColor: meeting.isAgent ? 'error.main' : 'primary.main',
              backgroundColor: meeting.isAgent ? 'error.50' : 'primary.50',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1" fontWeight="medium">
                {meeting.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({meeting.duration})
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {meeting.title}
            </Typography>
          </Paper>
        ))}
    </Box>
  );

  return (
    // <ThemeProvider attribute="class" defaultTheme="light">
      // <div className="space-y-8">
      //   {/* <ThemeToggle /> */}
      //   <div className="space-y-2">
      //     <h1 className="font-display text-4xl font-bold tracking-tight">
      //       Welcome to Your Travel Agency Portal
      //     </h1>
      //     <p className="text-muted-foreground">
      //       Manage your bookings, track performance, and grow your business all in one place.
      //     </p>
      //   </div>

      //   <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      //     {stats.map((stat) => (
      //       <Card key={stat.title} className="p-6">
      //         <div className="flex items-center justify-between">
      //           <stat.icon className="h-5 w-5 text-muted-foreground" />
      //           <span
      //             className={cn(
      //               "flex items-center text-sm font-medium",
      //               stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
      //             )}
      //           >
      //             {stat.trend === "up" ? (
      //               <ArrowUp className="mr-1 h-4 w-4" />
      //             ) : (
      //               <ArrowDown className="mr-1 h-4 w-4" />
      //             )}
      //             {stat.change}
      //           </span>
      //         </div>
      //         <div className="mt-4">
      //           <h2 className="font-display text-2xl font-bold">{stat.value}</h2>
      //           <p className="text-sm text-muted-foreground">{stat.title}</p>
      //         </div>
      //       </Card>
      //     ))}
      //   </div>

      //   <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      //     <Card className="col-span-4 p-6">
      //       <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
      //       <div className="mt-4 space-y-4">
      //         {[1, 2, 3].map((i) => (
      //           <div
      //             key={i}
      //             className="flex items-center gap-4 rounded-lg border p-4"
      //           >
      //             <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
      //               <Users className="h-5 w-5 text-primary" />
      //             </div>
      //             <div className="flex-1">
      //               <p className="text-sm font-medium">New lead assigned</p>
      //               <p className="text-sm text-muted-foreground">
      //                 John Doe assigned a new lead to your queue
      //               </p>
      //             </div>
      //             <p className="text-sm text-muted-foreground">2h ago</p>
      //           </div>
      //         ))}
      //       </div>
      //     </Card>

      //     <Card className="col-span-3 p-6">
      //       <div className="flex items-center justify-between mb-6">
      //         <h2 className="font-display text-lg font-semibold">
      //           My Meetings - {format(new Date(), 'MMM dd, yyyy')}
      //         </h2>
      //         <div className="flex items-center gap-2">
      //           <Button
      //             variant="outline"
      //             size="icon"
      //             onClick={() => setViewType("list")}
      //             className={cn(viewType === "list" && "bg-primary text-primary-foreground")}
      //           >
      //             <LayoutList className="h-4 w-4" />
      //           </Button>
      //           <Button
      //             variant="outline"
      //             size="icon"
      //             onClick={() => setViewType("daily")}
      //             className={cn(viewType === "daily" && "bg-primary text-primary-foreground")}
      //           >
      //             <LayoutGrid className="h-4 w-4" />
      //           </Button>
      //           <Button variant="outline" size="sm" asChild>
      //             <Link to="/app/calendar">
      //               <Calendar className="mr-2 h-4 w-4" />
      //               View All
      //             </Link>
      //           </Button>
      //         </div>
      //       </div>
      //       {viewType === "list" ? renderListView() : renderDailyView()}
      //     </Card>
      //   </div>
      // </div>
    // </ThemeProvider>
    <Box >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem', lineHeight: 1.2 }}>
          Welcome to Your Travel Agency Portal
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your bookings, track performance, and grow your business all in one place.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{paddingBottom: '16px'}}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.875rem', // text-sm
                    fontWeight: 500, // font-medium
                    color: stat.trend === 'up' ? '#34D399' : '#F87171' // text-emerald-600 или text-rose-600
                  }}
                >
                  {stat.trend === 'up' ? (
                    <ArrowUp className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDown className="mr-1 h-4 w-4" />
                  )}
                  {stat.change}
                </span>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
              Recent Activity
            </Typography>
            <Box >
              {[1, 2, 3].map((i) => (
                <Box key={i} sx={{ display: 'flex',mt: 2, alignItems: 'center', gap: 2, border: '1px solid ',borderColor: 'primary.100', borderRadius: '8px', p: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users className="h-5 w-5 text-primary" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      New lead assigned
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      John Doe assigned a new lead to your queue
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">2h ago</Typography>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
                My Meetings - {format(new Date(), 'MMM dd, yyyy')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="outlined" onClick={() => setViewType("list")} sx={{ minWidth: '40px', height: '40px', backgroundColor: viewType === "list" ? 'primary.200' : 'transparent' }}>
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button size="small" variant="outlined" onClick={() => setViewType("daily")} sx={{ minWidth: '40px', height: '40px', backgroundColor: viewType === "daily" ? 'primary.200' : 'transparent' }}>
                  <LayoutGrid  className="h-4 w-4" />
                </Button>
                <Button sx={{ height: '40px', gap: '5px'}} size="small" variant="outlined" component={Link} to="/app/calendar">
                  <Calendar  className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </Box>
            </Box>
            {viewType === "list" ? renderListView() : renderDailyView()}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePageView;
