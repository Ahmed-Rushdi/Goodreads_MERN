import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Avatar,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "../styles/profile-info.css"; // Import the CSS file

export default function UserProfile() {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [profilePhoto, setProfilePhoto] = useState(
    "https://placehold.co/150x150"
  );
  const [editMode, setEditMode] = useState({ username: false, email: false });

  const handleEditClick = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveChanges = () => {
    // Handle save changes logic (e.g., API call)
    setEditMode({ username: false, email: false });
    alert("Changes saved!");
  };

  return (
    <Box className="user-profile-container">
      <Typography variant="h3" className="user-profile-title">
        User Profile
      </Typography>

      <Grid container spacing={2} alignItems="left">
        <Grid item xs={12}>
          <Avatar
            alt="Profile Photo"
            src={profilePhoto}
            className="user-profile-avatar"
          />
          <IconButton
            color="primary"
            component="label"
            className="user-profile-edit-icon"
          >
            <EditIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setProfilePhoto(URL.createObjectURL(e.target.files[0]))
              }
            />
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            className="user-profile-textfield"
            value={username}
            disabled={!editMode.username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleEditClick("username")}>
                  <EditIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            className="user-profile-textfield"
            value={email}
            disabled={!editMode.email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleEditClick("email")}>
                  <EditIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            className="user-profile-save-button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
