//Source: https://mui.com/material-ui/react-snackbar/
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RejectEndSessionSnackbarProps {
    rejectEndSessionSnackBarIsOpen: boolean;
    onClose: () => void;
}

export default function SimpleSnackbar({

    rejectEndSessionSnackBarIsOpen,
    onClose,
}: RejectEndSessionSnackbarProps) {
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        onClose();
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={rejectEndSessionSnackBarIsOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                action={action}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    End session request rejected
                </Alert>
            </Snackbar>
        </div>
    );
}