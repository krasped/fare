import { FC } from "react";
import { TabList } from "@mui/lab";
import { Button, styled } from "@mui/material";
// CUSTOM DEFINED HOOK
// import useNavigate from "@/hooks/useNavigate";
// CUSTOM COMPONENTS
import { Paragraph } from "@/components/typography";
// import { IconWrapper } from "@/components/icon-wrapper";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// CUSTOM ICON COMPONENTS
// import GroupSenior from "@/icons/GroupSenior";
// import AddUserForm from "./AddUserForm";
import DownloadOutlined from "@/icons/DownloadOutlined";

// STYLED COMPONENT
const TabListWrapper = styled(TabList)(({ theme }) => ({
  borderBottom: 0,
  [theme.breakpoints.down(727)]: { order: 3 },
}));

// ===================================================================
type HeadingAreaProps = {
}
  
// ===================================================================

const HeadingArea: FC<HeadingAreaProps> = () => {

  return (
    <FlexBetween flexWrap="wrap" gap={1}>
      <FlexBox alignItems="center">
        {/* <IconWrapper>
          <GroupSenior sx={{ color: "primary.main" }} />
        </IconWrapper> */}

        <Paragraph fontSize={16}>Invoices</Paragraph>
      </FlexBox>


        <Button
          variant="contained"
          startIcon={<DownloadOutlined />}
          // onClick={() => {setOpenModal(true)}}
        >
          Export Invoices
        </Button>
       
    </FlexBetween>
  );
};

export default HeadingArea;
