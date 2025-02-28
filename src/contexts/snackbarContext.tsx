import React, { createContext, useContext, useState, useCallback, PropsWithChildren } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';


type SnackbarContextType = (title: string, description: string, color?: string) => void;

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  
  if (!context) {
      throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  
  return context; 
};

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
    const [snackbar, setSnackbar] = useState({ open: false, title: '', description: '', color: 'info' });
    let timouot: string | number | NodeJS.Timeout | undefined;
    const showSnackbar = useCallback((title:string, description: string, color="info") => {
        clearTimeout(timouot);
        setTimeout(() => {
            setSnackbar({ open: true, title, description, color });
            timouot = setTimeout(() => {
                setSnackbar((prev) => ({ ...prev, open: false }));
            }, 3000);
        })
        
    }, []);

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar
                open={snackbar.open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false, color: 'info' }))}
                autoHideDuration={3000}
            >
                <MuiAlert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity={snackbar?.color ? (snackbar?.color as AlertColor) : "info"}>
                    <strong>{snackbar.title}</strong> {snackbar.description}
                </MuiAlert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};