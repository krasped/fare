import { Box, ButtonBase, styled } from "@mui/material";
// CUSTOM COMPONENTS
import { Paragraph, Span } from "@/components/typography";
// CUSTOM ICON COMPONENT
import ChevronRight from "@/icons/ChevronRight";
// CUSTOM UTILS METHOD
import { isDark } from "@/utils/constants";

// ==============================================================
type Active = { active: number };
type Compact = { compact: number };
type ActiveCompact = Active & Compact;
type CollapseCompact = ActiveCompact & { collapsed: number };
// ==============================================================

export const SidebarWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "compact",
})<Compact>(({ theme, compact }) => ({
  width: 280,
  height: "100vh",
  position: "fixed",
  zIndex: theme.zIndex.drawer,
  backgroundColor: "#fff",
  transition: "width 200ms ease",
  borderRight: `1px dashed ${theme.palette.grey[200]}`,
  ...(compact && { width: 86, "&:hover": { width: 280 } }),
  ...(isDark(theme) && {
    border: 0,
    backgroundColor: theme.palette.background.default,
  }),
}));

// COMMON ICON STYLE
export const ICON_STYLE = (active: number) => ({
  fontSize: 28,
  color: active ? "primary.main" : "text.secondary",
});

// SIDEBAR ACCORDION RELATED STYLED COMPONENTS
export const AccordionExpandPanel = styled("div")({
  "&.expand": { "& .expand": { paddingLeft: 8 } },
});

export const BulletIcon = styled("div", {
  shouldForwardProp: (prop) => prop !== "active",
})<Active>(({ theme, active }) => ({
  width: 4,
  height: 4,
  marginLeft: "10px",
  marginRight: "8px",
  overflow: "hidden",
  borderRadius: "50%",
  background: theme.palette.text.secondary,
  ...(active && {
    background: theme.palette.primary.main,
    boxShadow: `0px 0px 0px 3px ${
      isDark(theme) ? theme.palette.grey[700] : theme.palette.primary[100]
    }`,
  }),
}));

export const AccordionButton = styled(ButtonBase)(({ theme }) => ({
  height: 48,
  width: "100%",
  padding: "0 10px",
  borderTop: "1px solid rgba(230, 230, 230, 1)",
  borderRight: "1px solid rgba(230, 230, 230, 1)",
  borderLeft: "1px solid rgba(230, 230, 230, 1)",
  // marginBottom: 15,
  borderRadius: "10px 10px 0 0",
  justifyContent: "space-between",
  backgroundColor: isDark(theme)
      ? theme.palette.grey[800]
      : "white",
  ".MuiSvgIcon-root": { color: theme.palette.primary.main },
  // "&:hover": {
  //   boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25)',
  //   borderRadius: "10px 10px 0 0",
  //   backgroundColor: theme.palette.primary[25],
  // },
}));

export const CollapsedAccordionButton = styled(ButtonBase)(({ theme }) => ({
  height: 48,
  width: "100%",
  padding: "0 10px",
  border: "1px solid rgba(230, 230, 230, 1)",
  marginBottom: 15,
  borderRadius: "10px",
  justifyContent: "space-between",
  backgroundColor: isDark(theme)
      ? theme.palette.grey[800]
      : "white",
  ".MuiSvgIcon-root": { color: theme.palette.primary.main },
  "&:hover": {
    boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25)',
    borderRadius: "10px",
    backgroundColor: isDark(theme)
    ? theme.palette.primary[400]:
    theme.palette.primary[25],
  },
}));

export const ChevronRightStyled = styled(ChevronRight, {
  shouldForwardProp: (prop) =>
    prop !== "collapsed" && prop !== "compact" && prop !== "active",
})<CollapseCompact>(({ collapsed, compact, active, theme }) => ({
  fontSize: 18,
  color: theme.palette.grey[400],
  transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
  transform: collapsed ? "rotate(90deg)" : "rotate(0deg)",
  ...(compact && { opacity: 0, width: 0 }),
  ...(active && { color: theme.palette.primary.main }),
  ...(theme.direction === "rtl" && {
    rotate: "180deg",
    transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
  }),
}));

export const ItemText = styled(Span, {
  shouldForwardProp: (prop) => prop !== "compact" && prop !== "active",
})<ActiveCompact>(({ theme, compact, active }) => ({
  fontSize: 16,
  fontWeight: 400,
  whiteSpace: "nowrap",
  paddingLeft: "0.8rem",
  transition: "all 0.15s ease",
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  ...(compact && { opacity: 0, width: 0, paddingLeft: 0 }),
}));

// MULTI LEVEL MENU RELATED STYLED COMPONENTS
export const NavItemButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "active",
})<Active>(({ theme, active }) => ({
  height: 48,
  width: "100%",
  border: "1px solid rgba(230, 230, 230, 1)",
  borderRadius: "10px",
  marginBottom: 15,
  padding: "0 10px",
  backgroundColor: isDark(theme)
      ? theme.palette.grey[800]
      : "white",
  justifyContent: "flex-start",
  "&.Mui-disabled": { opacity: 0.6 },
  "& > .MuiSvgIcon-root": { color: theme.palette.primary.main },
  ...(active && {
    borderRadius: "10px",
    boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25)',
    // color: theme.palette.primary.main,
    backgroundColor: isDark(theme)
      ? theme.palette.grey[800]
      : theme.palette.primary[50],
  }),

  "&:hover": {
    boxShadow: '0px 4px 11px 0px rgba(0, 0, 0, 0.25)',
    borderRadius: "10px",
    backgroundColor: isDark(theme)
      ? theme.palette.primary[400]:
      theme.palette.primary[25],
    // "& > span, & > .MuiSvgIcon-root": { color: theme.palette.primary.main },
  },
}));

export const ListLabel = styled(Paragraph, {
  shouldForwardProp: (prop) => prop !== "compact",
})<Compact>(({ theme, compact }) => ({
  fontSize: 12,
  marginTop: 20,
  marginLeft: 15,
  fontWeight: 600,
  marginBottom: 10,
  textTransform: "uppercase",
  color: theme.palette.text.primary,
  ...(compact && { opacity: 0, width: 0 }),
}));

export const ExternalLink = styled("a")(({ theme }) => ({
  overflow: "hidden",
  whiteSpace: "pre",
  marginBottom: "8px",
  textDecoration: "none",
  color: theme.palette.text.primary,
}));
