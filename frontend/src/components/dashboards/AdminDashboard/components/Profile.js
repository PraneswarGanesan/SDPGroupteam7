import React, { useState, useEffect } from 'react';
import SidePanel from '../AdminSidePanel';
import { TextField, Button, Grid, Card, CardContent, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    id: null,
    username: '',
    email: '',
    password: ''
  });
  const [editFields, setEditFields] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem('id');
      const username = localStorage.getItem('username');
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/auth/profile/${username}`);
          setProfile({
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            password: ''
          });
          setEditFields({
            username: response.data.username,
            email: response.data.email,
            password: ''
          });
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        navigate('/login'); // Redirect to login if no ID in local storage
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {};
    if (editFields.username !== profile.username) updates.username = editFields.username;
    if (editFields.email !== profile.email) updates.email = editFields.email;
    if (editFields.password) updates.password = editFields.password;

    if (Object.keys(updates).length > 0) {
        try {
            const id = localStorage.getItem('id');
            await axios.put(`http://localhost:8080/api/auth/users/${id}`, updates, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setProfile({ ...profile, ...updates });
            setOpenDialog(false);
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
        }
    } else {
        console.log('No fields updated');
    }
};

  const handleDelete = async () => {
    try {
      const id = localStorage.getItem('id');
      await axios.delete(`http://localhost:8080/api/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/login');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div>
      <SidePanel />
      <h2>Profile</h2>
      <Card>
        <CardContent>
          <IconButton onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
          <CardContent>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
          </CardContent>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  value={editFields.username}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={editFields.email}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={editFields.password}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
