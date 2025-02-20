import { useState, createContext, PropsWithChildren } from "react";

// ==============================================================
interface ContextProps {
  sidebarCompact: boolean;
  showMobileSideBar: boolean;
  handleSidebarCompactToggle: () => void;
  handleCloseMobileSidebar: () => void;
  handleOpenMobileSidebar: () => void;
}
// ==============================================================

export const LayoutContext = createContext({} as ContextProps);

const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  // HANDLE SIDE BAR TOGGLE FOR LARGE DEVICE
  const handleSidebarCompactToggle = () => setSidebarCompact(!sidebarCompact);

  // HANDLE SIDE BAR OPEN FOR SMALL DEVICE
  const handleOpenMobileSidebar = () => setShowMobileSideBar(true);

  // HANDLE SIDE BAR CLOSE FOR SMALL DEVICE
  const handleCloseMobileSidebar = () => setShowMobileSideBar(false);

  return (
    <LayoutContext.Provider
      value={{
        sidebarCompact,
        showMobileSideBar,
        handleSidebarCompactToggle,
        handleCloseMobileSidebar,
        handleOpenMobileSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
