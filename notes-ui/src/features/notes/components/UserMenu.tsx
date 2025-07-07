import { useAuth } from "@/features/auth/hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function UserMenu() {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
    handleMenuClose();
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={handleProfileClick}
      >
        <Avatar
          sx={{
            bgcolor: "#FFD600",
            color: "#222",
            width: 45,
            height: 45,
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          {user ? getInitials(user.name) : ""}
        </Avatar>
        <Typography
          variant="body1"
          sx={{ ml: 1.5, fontWeight: 600, color: "text.primary" }}
        >
          {user?.name}
        </Typography>
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout} sx={{ width: 175 }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
