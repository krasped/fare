import { FC, PropsWithChildren } from "react";
import { alpha, styled, SxProps } from "@mui/material";
import SimpleBar, { Props } from "simplebar-react";

// STYLED COMPONENT
const StyledScrollBar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": { backgroundColor: alpha(theme.palette.grey[400], 0.6) },
    "&.simplebar-visible:before": { opacity: 1 },
  },
  "& .simplebar-track.simplebar-vertical": { width: 9 },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": { height: 6 },
  "& .simplebar-mask": { zIndex: "inherit" },
}));

// ========================================================
interface ScrollbarProps extends Props {
  sx?: SxProps;
}
// ========================================================

const Scrollbar: FC<PropsWithChildren<ScrollbarProps>> = ({
  children,
  sx,
  ...props
}) => {
  return (
    <StyledScrollBar sx={sx} {...props}>
      {children}
    </StyledScrollBar>
  );
};

export default Scrollbar;
