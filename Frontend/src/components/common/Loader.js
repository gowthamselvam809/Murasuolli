import { Box, CircularProgress, Fade } from '@mui/material';
import React from 'react';

const Loader = ({ loading }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '81vh',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                zIndex: 9999,
            }}
        >
            <Fade
                in={loading}
                style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                }}
                unmountOnExit
            >
                <CircularProgress />
            </Fade>
        </Box>
    );
};

export default Loader;
