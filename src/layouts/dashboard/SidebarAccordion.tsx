import { FC, Fragment, PropsWithChildren, useEffect, useState } from "react";
import { Box, Collapse, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
// CUSTOM DEFINED HOOK
import useLocation from "@/hooks/useLocation";
// CUSTOM STYLED COMPONENTS
import {
  ItemText,
  BulletIcon,
  ICON_STYLE,
  AccordionButton,
  ChevronRightStyled,
  AccordionExpandPanel,
  CollapsedAccordionButton,
} from "../layout-parts/styles/sidebar";
// NAVIGATION ITEM TYPE
import { Navigations } from "@/layouts/layout-parts/navigation";
import { isDark } from "@/utils/constants";

// ==============================================================
interface SidebarAccordionProps extends PropsWithChildren {
  item: Navigations;
  sidebarCompact: 0 | 1;
}
// ==============================================================

const SidebarAccordion: FC<SidebarAccordionProps> = (props) => {
  const { item, children, sidebarCompact } = props;
    const theme = useTheme()

  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [hasActive, setHasActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => setCollapsed((state) => !state);

  const find = item?.children?.find((li) => li.path === pathname);

  useEffect(() => {
    if (find) {
      setCollapsed(true);
      setHasActive(1);
    }

    return () => {
      setCollapsed(false);
      setHasActive(0);
    };
  }, [find]);

  return (
    <Fragment>
      {!collapsed ? 
      <CollapsedAccordionButton onClick={handleClick}>
        <Box pl="7px" display="flex" alignItems="center">
          {/* ICON SHOW IF EXIST */}
          {item.icon ? <item.icon sx={ICON_STYLE(hasActive)} /> : null}

          {/* BULLET ICON SHOW IF ANY TEXT EXIST  */}
          {item.iconText ? <BulletIcon active={hasActive} /> : null}

          <ItemText compact={sidebarCompact} active={hasActive}>
            {t(item.name!)}
          </ItemText>
        </Box>

        <ChevronRightStyled
          active={hasActive}
          compact={sidebarCompact}
          className="accordionArrow"
          collapsed={collapsed ? 1 : 0}
        />
      </CollapsedAccordionButton>
       :
      <AccordionButton onClick={handleClick}>
        <Box pl="7px" display="flex" alignItems="center">
          {/* ICON SHOW IF EXIST */}
          {item.icon ? <item.icon sx={ICON_STYLE(hasActive)} /> : null}

          {/* BULLET ICON SHOW IF ANY TEXT EXIST  */}
          {item.iconText ? <BulletIcon active={hasActive} /> : null}

          <ItemText compact={sidebarCompact} active={hasActive}>
            {t(item.name!)}
          </ItemText>
        </Box>

        <ChevronRightStyled
          active={hasActive}
          compact={sidebarCompact}
          className="accordionArrow"
          collapsed={collapsed ? 1 : 0}
        />
      </AccordionButton>
       }

      <Collapse sx={{
        padding: "10px",
         backgroundColor: isDark(theme)
              ? theme.palette.grey[800]
              : "white",
              borderBottom: "1px solid rgba(230, 230, 230, 1)",
              borderRight: "1px solid rgba(230, 230, 230, 1)",
              borderLeft: "1px solid rgba(230, 230, 230, 1)",
              borderRadius: "0 0 10px 10px",
      }} in={collapsed} unmountOnExit>
        <AccordionExpandPanel className="expand">
          {children}
        </AccordionExpandPanel>
      </Collapse>
    </Fragment>
  );
};

export default SidebarAccordion;
