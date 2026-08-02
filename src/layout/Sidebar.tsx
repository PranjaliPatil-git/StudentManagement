import {
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import PaymentsIcon from "@mui/icons-material/Payments";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BadgeIcon from "@mui/icons-material/Badge";
import DomainIcon from "@mui/icons-material/Domain";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QuizIcon from "@mui/icons-material/Quiz";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;


const menuItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard",
    },
    {
        text: "Students",
        icon: <PeopleIcon />,
        path: "/student",
    },
    {
        text: "Faculty",
        icon: <BadgeIcon />,
        path: "/faculty",
    },
    {
        text: "Student Attendance",
        icon: <SchoolIcon />,
        path: "/attendance",
    },
    {
        text: "Faculty Attendance",
        icon: <FactCheckIcon />,
        path: "/faculty-attendance",
    },
    {
        text: "Faculty Salary",
        icon: <CurrencyRupeeIcon />,
        path: "/salary",
    },
    {
        text: "Fees",
        icon: <PaymentsIcon />,
        path: "/fees",
    },
    {
        text: "Examination",
        icon: <QuizIcon />,
        path: "/examination",
    },
    {
        text: "Result",
        icon: <EmojiEventsIcon />,
        path: "/result",
    },
    {
        text: "Department",
        icon: <DomainIcon />,
        path: "/department",
    },
    {
        text: "Subject",
        icon: <MenuBookIcon />,
        path: "/subjects",
    },
    {
        text: "Timetable",
        icon: <CalendarMonthIcon />,
        path: "/timetable",
    },
    {
        text: "Logout",
        icon: <LogoutIcon />,
        path: "/",
    },
];

const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />

            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (item.text === "Logout") {
                                    // Clear token or user data
                                    navigate("/");
                                } else {
                                    navigate(item.path);
                                }
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText primary={item.text} />

                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;