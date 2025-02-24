import { FC, useState } from "react";
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
import Add from "@/icons/Add";
// import AddUserForm from "./AddUserForm";
import { Modal } from "@/components/modal";
import DownloadIcon from "@/icons/DownloadIcon";
import DeleteOutlined from "@/icons/DeleteOutlined";
import DownloadOutlined from "@/icons/DownloadOutlined";
import AddCompaignForm from "./AddCompaignForm";

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
  // const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  // const navigate = useNavigate();

  return (
    <FlexBetween flexWrap="wrap" gap={1}>
      <FlexBox alignItems="center">
        {/* <IconWrapper>
          <GroupSenior sx={{ color: "primary.main" }} />
        </IconWrapper> */}

        <Paragraph fontSize={16}>Campaigns</Paragraph>
      </FlexBox>

      <FlexBox gap={1}>

        <Button
          variant="contained"
          startIcon={<DownloadOutlined />}
          // onClick={() => {setOpenModal(true)}}
        >
          Generate Report
        </Button>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {setOpenModal(true)}}
        >
          New Campaign
        </Button>
      </FlexBox>

      <Modal open={openModal} handleClose={handleCloseModal}>
        <AddCompaignForm
          handleCancel={handleCloseModal}
          // data={isEdit ? data : null}
        />
      </Modal>
    </FlexBetween>
  );
};

export default HeadingArea;
