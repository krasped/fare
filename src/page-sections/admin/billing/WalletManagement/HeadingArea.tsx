import { FC, useState } from "react";
import { TabList } from "@mui/lab";
import { Button, styled } from "@mui/material";
import { Paragraph } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
import Add from "@/icons/Add";
import { Modal } from "@/components/modal";
import RechargeWalletForm from "./RechargeWalletForm";

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
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <FlexBetween flexWrap="wrap" gap={1}>
      <FlexBox alignItems="center">

        <Paragraph fontSize={16}>Wallet</Paragraph>
      </FlexBox>

        <Button
          variant="contained"
          onClick={() => {setOpenModal(true)}}
        >
          Recharge Wallet
        </Button>

      <Modal open={openModal} handleClose={handleCloseModal}>
        <RechargeWalletForm
          handleCancel={handleCloseModal}
        />
      </Modal>
    </FlexBetween>
  );
};

export default HeadingArea;
