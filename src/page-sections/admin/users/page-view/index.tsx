import { Box, Grid } from "@mui/material";
// CUSTOM PAGE SECTION COMPONENTS
import { H6, Paragraph } from "@/components/typography";
import { SyntheticEvent, useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import Users from "../usersPage";
import Layout from "../Layout";
import UsersDocuments from "../documentsPage";

const UserListPageView = () => {
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (_: SyntheticEvent, value: string) =>
    setTabValue(value);
  return (
    <Box pt={2} pb={4}>
      <H6 fontSize={18}>User Management</H6>
      <Paragraph color="text.secondary" mb={3}>
        Manage users, roles, documents, and permissions.
      </Paragraph>
      <TabContext value={tabValue}>

        <Layout handleTabList={handleTabChange}>
          <TabPanel value="1">
            <Users />
          </TabPanel>

          <TabPanel value="2">
            <UsersDocuments />
          </TabPanel>
          
        </Layout>
      </TabContext>

    </Box>
  );
};

export default UserListPageView;



