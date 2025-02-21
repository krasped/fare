// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Badge } from "@/components/ui/badge";
// import { CalendarDays, MapPin, Users } from "lucide-react";
// import { Box, IconButton, styled } from "@mui/material";
// import { FlexBetween, FlexBox } from "@/components/flexbox";
// import { H6 } from "@/components/typography";
// import TabList from "@mui/lab/TabList";
// import { ReactNode, SyntheticEvent } from "react";
// // ICON COMPONENTS
// import DateRange from "@/icons/DateRange";
// import Bratislava from "@/icons/Bratislava";
// import MapMarkerIcon from "@/icons/MapMarkerIcon";
// import { AvatarLoading } from "@/components/avatar-loading";
// import { AvatarBadge } from "@/components/avatar-badge";
// import { CameraAlt } from "@mui/icons-material";

// const agentProfile = {
//   name: "John Smith",
//   type: "Agency",
//   location: "Paris",
//   joinDate: "March 15, 2023",
//   avatar: "/placeholder.svg",
//   summary: "Experienced travel agency with over 10 years in luxury travel planning. Specializing in European destinations and customized tour packages.",
//   agents: [
//     { name: "Sarah Johnson", role: "Junior Agent", avatar: "/placeholder.svg", location: "Paris" },
//     { name: "Mike Wilson", role: "Senior Agent", avatar: "/placeholder.svg", location: "Lyon" },
//   ],
//   documents: [
//     { name: "Bank Account Approval", status: "Verified", date: "2023-04-01" },
//     { name: "Company Registration", status: "Verified", date: "2023-03-15" },
//     { name: "Insurance Certificate", status: "Pending", date: "2024-03-20" },
//   ],
// };

// const ContentWrapper = styled("div")({
//   zIndex: 1,
//   padding: 24,
//   marginTop: 55,
//   position: "relative",
// });

// const CoverPicWrapper = styled("div")({
//   top: 0,
//   left: 0,
//   height: 125,
//   width: "100%",
//   overflow: "hidden",
//   position: "absolute",
// });

// const StyledFlexBetween = styled(FlexBetween)({
//   margin: "auto",
//   flexWrap: "wrap",
// });

// const StyledTabList = styled(TabList)(({ theme }) => ({
//   borderBottom: 0,
//   paddingLeft: 16,
//   paddingRight: 16,
//   [theme.breakpoints.up("sm")]: {
//     "& .MuiTabs-flexContainer": { justifyContent: "center" },
//   },
// }));

// // =======================================================================
// type LayoutProps = {
//   children: ReactNode;
//   handleTabList: (_: SyntheticEvent, value: string) => void;
// };
// // =======================================================================

// const Profile = () => {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="font-display text-4xl font-bold tracking-tight">Profile</h1>
//         <p className="text-muted-foreground mt-2">Manage your profile information</p>
//       </div>

//       <Card className="p-6">
//         <div className="flex flex-col items-center space-y-4 text-center">
//           {/* <Avatar className="h-24 w-24">
//             <AvatarImage src={agentProfile.avatar} alt={agentProfile.name} />
//             <AvatarFallback>{agentProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//           </Avatar> */}
//         <ContentWrapper>

//           <FlexBox justifyContent="center">
//             <AvatarBadge
//               badgeContent={
//                 <label htmlFor="icon-button-file">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     id="icon-button-file"
//                     style={{ display: "none" }}
//                   />

//                   <IconButton aria-label="upload picture" component="span">
//                     <CameraAlt
//                       sx={{ fontSize: 16, color: "background.paper" }}
//                     />
//                   </IconButton>
//                 </label>
//               }
//             >
//               <AvatarLoading
//                 alt={agentProfile.name}
//                 borderSize={2}
//                 percentage={60}
//                 src="agentProfile.avatar"
//                 sx={{ width: 100, height: 100 }}
//               />
//             </AvatarBadge>
//           </FlexBox>

//           <Box mt={2}>
//             <H6 fontSize={18} textAlign="center">
//               {agentProfile.name}
//             </H6>

//             <StyledFlexBetween paddingTop={1} maxWidth={340}>
//               <ListItem title={agentProfile.type} Icon={Bratislava} />
//               <ListItem title="New York" Icon={MapMarkerIcon} />
//               <ListItem title="Joined March 17" Icon={DateRange} />
//             </StyledFlexBetween>
//           </Box>

//           {/* <div>
//             <h2 className="text-2xl font-bold">{agentProfile.name}</h2>
//             <div className="flex items-center justify-center gap-2 mt-2">
//               <Badge variant="secondary">{agentProfile.type}</Badge>
//               <div className="flex items-center text-muted-foreground">
//                 <MapPin className="w-4 h-4 mr-1" />
//                 {agentProfile.location}
//               </div>
//               <div className="flex items-center text-muted-foreground">
//                 <CalendarDays className="w-4 h-4 mr-1" />
//                 Joined {agentProfile.joinDate}
//               </div>
//             </div>
//           </div> */}
//         </ContentWrapper>

//         </div>
//       </Card>

//       <Tabs defaultValue="overview" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="agency">Agency</TabsTrigger>
//           <TabsTrigger value="documents">Documents</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-4">
//           <Card>
//             <CardContent className="pt-6">
//               <h3 className="text-lg font-semibold mb-2">Summary</h3>
//               <p className="text-muted-foreground">{agentProfile.summary}</p>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="agency" className="space-y-4">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="grid gap-6 md:grid-cols-2">
//                 {agentProfile.agents.map((agent) => (
//                   <div key={agent.name} className="flex items-center space-x-4">
//                     <Avatar>
//                       <AvatarImage src={agent.avatar} alt={agent.name} />
//                       <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="font-medium">{agent.name}</p>
//                       <p className="text-sm text-muted-foreground">{agent.role}</p>
//                       <div className="flex items-center text-sm text-muted-foreground">
//                         <MapPin className="w-3 h-3 mr-1" />
//                         {agent.location}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="documents" className="space-y-4">
//           <Card>
//             <CardContent className="pt-6">
//               <div className="space-y-4">
//                 {agentProfile.documents.map((doc) => (
//                   <div key={doc.name} className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium">{doc.name}</p>
//                       <p className="text-sm text-muted-foreground">Updated {doc.date}</p>
//                     </div>
//                     <Badge variant={doc.status === "Verified" ? "secondary" : "outline"}>
//                       {doc.status}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Profile;

// // ============================================================================================
// type ListItemProps = {
//   title: string;
//   Icon: (props: SvgIconProps) => JSX.Element;
// };

// type BoxItemProps = {
//   amount: string;
//   title: string;
//   color: string;
// };
// // ============================================================================================

// function ListItem({ title, Icon }: ListItemProps) {
//   return (
//     <FlexBox gap={1} alignItems="center">
//       <Icon sx={{ fontSize: 14, color: "text.secondary" }} />
//       <Paragraph color="text.secondary">{title}</Paragraph>
//     </FlexBox>
//   );
// }