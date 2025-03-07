import { FC } from "react";
import { Radio, RadioProps, styled } from "@mui/material";

type StyledProps = { color?: string };

// STYLED COMPONENTS
const OuterBox = styled("div", {
  shouldForwardProp: (prop) => prop !== "color",
})<StyledProps>(({ color }) => ({
  width: 25,
  height: 25,
  padding: "1px",
  borderRadius: "50%",
  border: `1.8px solid ${color || "transparent"}`,
}));

const InnerBox = styled("div")<StyledProps>(({ color, theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: color || theme.palette.primary.main,
}));

// ==============================================================
interface Props extends RadioProps {
  icon_color?: string;
}
// ==============================================================

const ColorRadio: FC<Props> = ({ icon_color, ...props }) => (
  <Radio
    icon={
      <OuterBox>
        <InnerBox color={icon_color} />
      </OuterBox>
    }
    checkedIcon={
      <OuterBox color={icon_color}>
        <InnerBox color={icon_color} />
      </OuterBox>
    }
    sx={{ padding: 0 }}
    {...props}
  />
);

export default ColorRadio;
