import React, { createContext, useContext, useState, useCallback, PropsWithChildren } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


type SnackbarContextType = (title: string, description: string) => void;

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  
  if (!context) {
      throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  
  return context; 
};

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
    const [snackbar, setSnackbar] = useState({ open: false, title: '', description: '' });

    const showSnackbar = useCallback((title:string, description: string) => {
        setSnackbar({ open: true, title, description });
        setTimeout(() => {
            setSnackbar((prev) => ({ ...prev, open: false }));
        }, 3000);
    }, []);

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar
                open={snackbar.open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                autoHideDuration={3000}
            >
                <MuiAlert onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} severity="info">
                    <strong>{snackbar.title}</strong> {snackbar.description}
                </MuiAlert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};