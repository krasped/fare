import { FC, SyntheticEvent } from "react";
import { TabContext, TabList } from "@mui/lab";
import { Button, IconButton, styled, Tab } from "@mui/material";
// CUSTOM DEFINED HOOK
import useNavigate from "@/hooks/useNavigate";
// CUSTOM COMPONENTS
import { Paragraph } from "@/components/typography";
import { IconWrapper } from "@/components/icon-wrapper";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// CUSTOM ICON COMPONENTS
import GroupSenior from "@/icons/GroupSenior";
import Add from "@/icons/Add";
import AddUserForm from "../AddUserForm";
import { Modal } from "@/components/modal";
import { Close } from "@mui/icons-material";

// STYLED COMPONENT
const TabListWrapper = styled(TabList)(({ theme }) => ({
  borderBottom: 0,
  [theme.breakpoints.down(727)]: { order: 3 },
}));

// ===================================================================
type HeadingAreaProps = {
  value: string;
  changeTab: (_: SyntheticEvent, newValue: string) => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  data: any;//user data
};
// ===================================================================

const HeadingArea: FC<HeadingAreaProps> = ({ value, changeTab, isEdit, setIsEdit, data, openModal, setOpenModal }) => {
  // const [isEdit, setIsEdit] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  // const navigate = useNavigate();

  return (
    <FlexBetween flexWrap="wrap" gap={1}>
      <FlexBox alignItems="center">
        <IconWrapper>
          <GroupSenior sx={{ color: "primary.main" }} />
        </IconWrapper>

        <Paragraph fontSize={16}>Users</Paragraph>
      </FlexBox>

      <TabContext value={value}>
        <TabListWrapper variant="scrollable" onChange={changeTab}>
          <Tab disableRipple label="All" value="" />
          <Tab disableRipple label="Free Trial" value="Free Trial" />
          <Tab disableRipple label="Basic" value="Basic" />
          <Tab disableRipple label="Standard" value="Standard" />
          <Tab disableRipple label="Premium" value="Premium" />
        </TabListWrapper>
      </TabContext>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {setIsEdit(false); setOpenModal(true)}}
      >
        Add New User
      </Button>
      <Modal open={openModal} handleClose={handleCloseModal}>
      <IconButton
                  aria-label="close"
                  onClick={() => handleCloseModal()}
                  sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                  })}
                >
                  <Close />
                </IconButton>
        <AddUserForm
          handleCancel={handleCloseModal}
          data={isEdit ? data : null}
        />
      </Modal>
    </FlexBetween>
  );
};

export default HeadingArea;
