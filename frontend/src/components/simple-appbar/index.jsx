import { AppBar, Toolbar, Typography } from '@mui/material';

const SimpleAppBar = () => {

return (
    <>
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Credit Card Payments
            </Typography>
        </Toolbar>
        </AppBar>
    </>
    );
};

export default SimpleAppBar;