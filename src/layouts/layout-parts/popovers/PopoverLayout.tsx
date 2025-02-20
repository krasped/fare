import React, { FC, PropsWithChildren } from "react";
import { Box, Button, Divider, Popover } from "@mui/material";
// CUSTOM COMPONENT
import { H4 } from "@/components/typography";

// ===================================================================
interface PopoverLayoutProps extends PropsWithChildren {
  title: string | JSX.Element;
  hiddenViewButton?: boolean;
  popoverOpen: boolean;
  popoverClose: () => void;
  handleButton?: () => void;
  anchorRef: React.MutableRefObject<null>;
  minWidth?: number | string;
  maxWidth?: number | string;
}
// ===================================================================

const PopoverLayout: FC<PopoverLayoutProps> = (props) => {
  const {
    children,
    anchorRef,
    popoverOpen,
    popoverClose,
    minWidth = 250,
    maxWidth = 375,
    hiddenViewButton,
    title = "Notifications",
  } = props;

  return (
    <Popover
      open={popoverOpen}
      onClose={popoverClose}
      anchorEl={anchorRef.current}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      slotProps={{
        paper: {
          sx: { minWidth, maxWidth, width: "100%", padding: "0.5rem 0" },
        },
      }}
    >
      <H4 fontSize={16} fontWeight="500" p={2} pt={1.5}>
        {title}
      </H4>
      <Divider />

      {children}

      {!hiddenViewButton ? (
        <Box p={1} pb={0.5}>
          <Button variant="text" fullWidth disableRipple>
            View all Notifications
          </Button>
        </Box>
      ) : null}
    </Popover>
  );
};

export default PopoverLayout;
