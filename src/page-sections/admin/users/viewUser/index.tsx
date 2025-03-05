// export { default as ViewUser } from "./ViewUser";

import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import { TabContext, TabPanel } from "@mui/lab";
// CUSTOM PAGE SECTION COMPONENTS
import Layout from "./ViewUser";
import GeneralInfo from "./tabs/general";
import Post from "./tabs/activityLog";
import Approval from "./tabs/approval";
import Documents from "./tabs/documents";
import Subscriptions from "./tabs/subscription";
import { User } from "../usersPage";
import { UserDocuments } from "../documentsPage";
// import Projects from "../projects";
// import Activity from "../activity";
// import Campaigns from "../campaigns";
// import Documents from "../documents";
// import Connections from "../connections";

const ProfilePageView = ({data, onlyDocuments}: {data: User| UserDocuments |undefined, onlyDocuments?:boolean}) => {
  const [tabValue, setTabValue] = useState(onlyDocuments? "3" : "1");
  const handleTabChange = (_: SyntheticEvent, value: string) => setTabValue(value);
  console.log(data)
  return (
    <Box pt={2} pb={4}>
      <TabContext value={tabValue}>
        <Layout data={data as User} onlyDocuments={onlyDocuments} handleTabList={handleTabChange}>
          {!onlyDocuments && <TabPanel value="1">
            <GeneralInfo data={data as User} />
          </TabPanel>}

          {!onlyDocuments && <TabPanel value="2">
            <Approval/>
          </TabPanel>}

          <TabPanel value="3">
            <Documents />
          </TabPanel>

          {!onlyDocuments && <TabPanel value="4">
            <Subscriptions />
          </TabPanel>}

         {!onlyDocuments &&  <TabPanel value="5">
            <Post/>
          </TabPanel>}
        </Layout>
      </TabContext>
    </Box>
  );
};

export default ProfilePageView;

