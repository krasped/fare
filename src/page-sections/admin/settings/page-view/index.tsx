import { Box, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import { SyntheticEvent, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import AccountSettings from "../account";
import Layout from "../Layout";
import SystemSettings from "../system";

const SettingsPageView = () => {
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (_: SyntheticEvent, value: string) =>
    setTabValue(value);
  return (
    <Box pt={2} pb={4}>
      <H6 fontSize={18}>Settings</H6>
      <Paragraph color="text.secondary" mb={3}>
        Manage your account settings and system preferences.
      </Paragraph>
      <TabContext value={tabValue}>

        <Layout handleTabList={handleTabChange}>
          <TabPanel value="1">
            <AccountSettings />
          </TabPanel>

          <TabPanel value="2">
            <SystemSettings />
          </TabPanel>
          
        </Layout>
      </TabContext>

    </Box>
  );
};

export default SettingsPageView;


// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { RefreshCw, ChevronDown, Upload, HelpCircle } from "lucide-react";

// export default function Settings() {
//   const { toast } = useToast();
//   const [profileData, setProfileData] = useState({
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "+1234567890"
//   });

//   const [systemSettings, setSystemSettings] = useState({
//     emailNotifications: true,
//     smsNotifications: false,
//     timezone: "UTC",
//     sessionTimeout: "30",
//     backupFrequency: "daily",
//     passwordLength: "8",
//     requireSymbols: true
//   });

//   const handleProfileUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast({
//       title: "Profile Updated",
//       description: "Your profile has been updated successfully."
//     });
//   };

//   const handleSystemUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast({
//       title: "System Settings Updated",
//       description: "Your system settings have been updated successfully."
//     });
//   };

//   const handleBackupNow = () => {
//     toast({
//       title: "Backup Started",
//       description: "System backup has been initiated. You will be notified when complete."
//     });
//   };

//   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       toast({
//         title: "Logo Uploaded",
//         description: "Company logo has been updated successfully."
//       });
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
//         <p className="text-muted-foreground">
//           Manage your account settings and system preferences.
//         </p>
//       </div>

//       <Tabs defaultValue="account" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="account">Account Settings</TabsTrigger>
//           <TabsTrigger value="system">System Settings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="account" className="space-y-4">
//           <form onSubmit={handleProfileUpdate} className="space-y-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Profile Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input
//                       id="name"
//                       value={profileData.name}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, name: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={profileData.email}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, email: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       value={profileData.phone}
//                       onChange={(e) =>
//                         setProfileData({ ...profileData, phone: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Company Branding</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted">
//                       <label htmlFor="logo-upload" className="cursor-pointer">
//                         <Upload className="w-8 h-8 text-muted-foreground" />
//                         <input
//                           id="logo-upload"
//                           type="file"
//                           className="hidden"
//                           accept="image/*"
//                           onChange={handleLogoUpload}
//                         />
//                       </label>
//                     </div>
//                     <div className="space-y-1">
//                       <Label>Company Logo</Label>
//                       <p className="text-sm text-muted-foreground">
//                         Upload your company logo (recommended size: 200x200px)
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="flex justify-end">
//               <Button type="submit" className="w-32">
//                 Save Changes
//               </Button>
//             </div>
//           </form>
//         </TabsContent>

//         <TabsContent value="system" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Notification Settings</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Email Notifications</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Receive system alerts via email
//                   </p>
//                 </div>
//                 <Switch
//                   checked={systemSettings.emailNotifications}
//                   onCheckedChange={(checked) =>
//                     setSystemSettings({ ...systemSettings, emailNotifications: checked })
//                   }
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>SMS Notifications</Label>
//                   <p className="text-sm text-muted-foreground">
//                     Receive urgent alerts via SMS
//                   </p>
//                 </div>
//                 <Switch
//                   checked={systemSettings.smsNotifications}
//                   onCheckedChange={(checked) =>
//                     setSystemSettings({ ...systemSettings, smsNotifications: checked })
//                   }
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Timezone Settings</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex-1">
//                   <Label>System Timezone</Label>
//                   <Select
//                     value={systemSettings.timezone}
//                     onValueChange={(value) =>
//                       setSystemSettings({ ...systemSettings, timezone: value })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select timezone" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="UTC">UTC</SelectItem>
//                       <SelectItem value="America/New_York">Eastern Time</SelectItem>
//                       <SelectItem value="America/Chicago">Central Time</SelectItem>
//                       <SelectItem value="America/Denver">Mountain Time</SelectItem>
//                       <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="mt-6"
//                   onClick={() => {
//                     toast({
//                       title: "Timezone Updated",
//                       description: "System timezone has been auto-detected and updated."
//                     });
//                   }}
//                 >
//                   Auto-Detect
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Collapsible>
//             <CollapsibleTrigger asChild>
//               <Card className="cursor-pointer hover:bg-accent/50">
//                 <CardHeader>
//                   <div className="flex items-center justify-between">
//                     <CardTitle>Security Settings</CardTitle>
//                     <ChevronDown className="h-4 w-4" />
//                   </div>
//                 </CardHeader>
//               </Card>
//             </CollapsibleTrigger>
//             <CollapsibleContent className="mt-2">
//               <Card>
//                 <CardContent className="pt-6 space-y-4">
//                   <div className="space-y-2">
//                     <Label>Session Timeout</Label>
//                     <Select
//                       value={systemSettings.sessionTimeout}
//                       onValueChange={(value) =>
//                         setSystemSettings({ ...systemSettings, sessionTimeout: value })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select timeout duration" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="15">15 minutes</SelectItem>
//                         <SelectItem value="30">30 minutes</SelectItem>
//                         <SelectItem value="60">60 minutes</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Minimum Password Length</Label>
//                     <Select
//                       value={systemSettings.passwordLength}
//                       onValueChange={(value) =>
//                         setSystemSettings({ ...systemSettings, passwordLength: value })
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select minimum length" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="8">8 characters</SelectItem>
//                         <SelectItem value="10">10 characters</SelectItem>
//                         <SelectItem value="12">12 characters</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <Label>Require Special Characters</Label>
//                       <p className="text-sm text-muted-foreground">
//                         Passwords must include symbols
//                       </p>
//                     </div>
//                     <Switch
//                       checked={systemSettings.requireSymbols}
//                       onCheckedChange={(checked) =>
//                         setSystemSettings({ ...systemSettings, requireSymbols: checked })
//                       }
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </CollapsibleContent>
//           </Collapsible>

//           <Card>
//             <CardHeader>
//               <CardTitle>Data Backup Settings</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex-1">
//                   <Label>Backup Frequency</Label>
//                   <Select
//                     value={systemSettings.backupFrequency}
//                     onValueChange={(value) =>
//                       setSystemSettings({ ...systemSettings, backupFrequency: value })
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select backup frequency" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="daily">Daily</SelectItem>
//                       <SelectItem value="weekly">Weekly</SelectItem>
//                       <SelectItem value="monthly">Monthly</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="mt-6"
//                   onClick={handleBackupNow}
//                 >
//                   <RefreshCw className="w-4 h-4 mr-2" />
//                   Backup Now
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="flex justify-end">
//             <Button onClick={handleSystemUpdate} className="w-32">
//               Save Changes
//             </Button>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
