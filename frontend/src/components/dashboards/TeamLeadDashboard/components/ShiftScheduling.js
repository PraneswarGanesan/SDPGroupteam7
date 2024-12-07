import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import TeamLeadSidePanel from '../TeamLeadSidePanel';

const ShiftScheduling = () => {
  const [teams, setTeams] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newScheduleDateTime, setNewScheduleDateTime] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [timeOffRequests, setTimeOffRequests] = useState([]);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const teamLeadId = localStorage.getItem('id');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/teams/by-lead/${teamLeadId}`);
        const teamsData = response.data;
        setTeams(teamsData);

        const allEmployees = teamsData.flatMap(team =>
          team.memberUsernames.map((username, index) => ({
            username,
            id: team.memberIds[index],
          }))
        );
        setEmployeeOptions(allEmployees);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [teamLeadId]);

  useEffect(() => {
    const fetchSchedules = async () => {
      if (selectedEmployee) {
        try {
          const token = localStorage.getItem('token'); // Retrieve token from local storage
    
          if (!token) {
            console.error('No token found in local storage');
            return;
          }
    
          const response = await axios.get(`http://localhost:8080/api/schedules/username/${selectedEmployee.username}`, {
            headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
          });
    
          console.log('Fetched schedules:', response.data); // Log response data for debugging
          setSchedules(response.data);
        } catch (error) {
          console.error('Error fetching schedules:', error.response ? error.response.data : error.message);
        }
      }
    };
    
    

    fetchSchedules();
  }, [selectedEmployee]);

  useEffect(() => {
    const fetchTimeOffRequests = async () => {
      if (selectedEmployee) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/api/timeoffs/by-employee/${selectedEmployee.username}`, {
           
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          console.log(selectedEmployee.username);
          setTimeOffRequests(response.data);
        } catch (error) {
          console.error('Error fetching time off requests:', error);
        }
      }
    };
    

    fetchTimeOffRequests();
  }, [selectedEmployee]);

  useEffect(() => {
    if (selectedTeam && selectedTeam.memberUsernames) {
      const employees = selectedTeam.memberUsernames.map((username, index) => ({
        username,
        id: selectedTeam.memberIds[index],
      }));
      setEmployeeOptions(employees);
    } else {
      setEmployeeOptions([]);
    }
  }, [selectedTeam]);

  const handleAddSchedule = async () => {
    if (selectedEmployee && newScheduleDateTime) {
      try {
        const payload = {
          employeeId: selectedEmployee.id,
          employeeUsername: selectedEmployee.username,
          scheduleDateTime: newScheduleDateTime,
        };

        const response = await axios.post('http://localhost:8080/api/schedules', payload);
        setSchedules((prev) => [...prev, response.data]);
        setNewScheduleDateTime('');
        setSelectedEmployee(null);
      } catch (error) {
        console.error('Error adding schedule:', error);
      }
    } else {
      alert('Please select an employee and set a schedule date and time.');
    }
  };

  const handleEditSchedule = async () => {
    if (editingSchedule && newScheduleDateTime) {
      try {
        const updatedSchedule = {
          ...editingSchedule,
          scheduleDateTime: newScheduleDateTime,
        };

        const response = await axios.put(`http://localhost:8080/api/schedules/${editingSchedule.id}`, updatedSchedule);
        setSchedules((prev) =>
          prev.map((sched) => (sched.id === editingSchedule.id ? response.data : sched))
        );
        setEditingSchedule(null);
        setNewScheduleDateTime('');
      } catch (error) {
        console.error('Error updating schedule:', error);
      }
    } else {
      alert('Please set a schedule date and time.');
    }
  };

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      await axios.delete(`http://localhost:8080/api/schedules/${scheduleId}`);
      setSchedules((prev) => prev.filter((sched) => sched.id !== scheduleId));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleOpenStatusDialog = (requestId) => {
    setSelectedRequestId(requestId);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = async () => {
    if (selectedRequestId && status) {
      try {
        const payload = { status };

        await axios.put(`http://localhost:8080/api/timeoffs/update-status/${selectedRequestId}`, payload, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setTimeOffRequests((prev) =>
          prev.map((req) =>
            req.id === selectedRequestId ? { ...req, status } : req
          )
        );
        setStatusDialogOpen(false);
      } catch (error) {
        console.error('Error updating time-off status:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <TeamLeadSidePanel />
      <Typography variant="h4" gutterBottom>
        Shift Scheduling
      </Typography>

      {/* Team Details */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Teams</Typography>
        <List>
          {teams.map((team) => (
            <ListItem
              key={team.id}
              button
              onClick={() => setSelectedTeam(team)}
            >
              <ListItemText
                primary={`Team: ${team.name}`}
                secondary={`Project: ${team.project.name} - Lead: ${team.leadUsername}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Select Employee */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Select Employee</Typography>
        <br></br>
        <Autocomplete
          options={employeeOptions}
          getOptionLabel={(option) => option.username}
          onChange={(event, value) => {
            setSelectedEmployee(value || null);
            setNewScheduleDateTime('');
            setEditingSchedule(null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Employee"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Paper>

      {/* Assign Schedule */}
      {selectedEmployee && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Assign Schedule</Typography>

          <br></br>
          <TextField
            label="Schedule Date & Time"
            type="datetime-local"
            value={newScheduleDateTime}
            onChange={(e) => setNewScheduleDateTime(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {editingSchedule ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEditSchedule}
            >
              Update Schedule
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSchedule}
            >
              Add Schedule
            </Button>
          )}
        </Paper>
      )}

      {/* Time-Off Requests */}
      {selectedEmployee && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Time-Off Requests</Typography>
          <List>
            {timeOffRequests.length ? (
              timeOffRequests.map((request) => (
                <ListItem key={request.id}>
                  <ListItemText
                    secondary={`Status: ${request.status} - Requested Time: ${request.requestDate}`}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenStatusDialog(request.id)}
                    sx={{ ml: 2 }}
                  >
                    Change Status
                  </Button>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No time-off requests available." />
              </ListItem>
            )}
          </List>
        </Paper>
      )}

      {/* Existing Schedules */}
      {selectedEmployee && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Existing Schedules</Typography>
          {schedules.length ? (
            <List>
              {schedules.map((schedule) => (
                <ListItem key={schedule.id}>
                  <ListItemText
                    primary={`Schedule Date & Time: ${schedule.scheduleDateTime}`}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setEditingSchedule(schedule);
                      setNewScheduleDateTime(schedule.scheduleDateTime);
                    }}
                    sx={{ ml: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No existing schedules.</Typography>
          )}
        </Paper>
      )}

      {/* Dialog for Changing Time-Off Status */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Change Time-Off Request Status</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <FormControlLabel value="Approved" control={<Radio />} label="Approved" />
              <FormControlLabel value="Rejected" control={<Radio />} label="Rejected" />
              <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusChange}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShiftScheduling;
