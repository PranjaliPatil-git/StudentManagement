import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import DepartmentTable from "../components/DepartmentTable";
import AddDepartment from "./Forms/AddDepartment";

const Department = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                >
                    Department Management
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                >
                    Add Department
                </Button>
            </Box>

            <TextField
                placeholder="Search Department..."
                fullWidth
                sx={{ mb: 3 }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <DepartmentTable />

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>

                    Add Department

                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 10,
                            top: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                </DialogTitle>

                <DialogContent>

                    <AddDepartment />

                </DialogContent>

            </Dialog>

        </Box>
    );
};

export default Department;