import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/illu-1.png';
import { Typography, TextField, Button, MenuItem } from '@mui/material';
import '../styles/Signup.css';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: '',
    company: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    nav('/');
  };

  return (
    <div className='signup-container'>
      <div className='signup-bg'></div>
      <div className='signup-img'>
        <img src={illustration} alt="Illustration" />
      </div>
      <div className='signup-card'>
        <div className='signup-form'>
          <div className="title">
            <Typography variant='h4'><b>Signup</b></Typography>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label className='signuplabel'>First Name</label>
            <TextField className='signup-input' name='firstName' type='text' variant='outlined' value={form.firstName} onChange={handleChange} required />
            <label className='signuplabel'>Last Name</label>
            <TextField className='signup-input'  name='lastName' type='text' variant='outlined' value={form.lastName} onChange={handleChange} required />
            <label className='signuplabel' >Username</label>
            <TextField className='signup-input'  name='username' type='text' variant='outlined' value={form.username} onChange={handleChange} required />
            <label className='signuplabel' >Role</label>
            <TextField
              name="role"
              select
              variant="outlined"
              required
              value={form.role}
              onChange={handleChange}
              className='signup-input' 
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="team_lead">Team Lead</MenuItem>
              <MenuItem value="product_manager">Product Manager</MenuItem>
            </TextField>
            <label  className='signuplabel' >Company</label>
            <TextField className='signup-input'  name='company' type='text' variant='outlined' value={form.company} onChange={handleChange} required />
            <label className='signuplabel'>Email</label>
            <TextField  className='signup-input'  name='email' type='email' variant='outlined' value={form.email} onChange={handleChange} required />
            <label className='signuplabel' >Password</label>
            <TextField className='signup-input'  name='password' type='password' variant='outlined' value={form.password} onChange={handleChange} required />
            <Button type='submit' variant='contained' color='primary' fullWidth id="button">Signup</Button>
            <Typography className="message">
              Already have an account?{' '}
              <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => nav('/login')}>
                Login
              </span>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
