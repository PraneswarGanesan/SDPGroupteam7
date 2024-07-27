import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import illustration from '../assets/illu-1.png';
import { Typography, TextField, Button, MenuItem } from '@mui/material';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const userInfo = { email: form.email, role: form.role };
      onLogin(userInfo);
      navigate('/');
   
  };

  return (
    <div className='Login'>
      <div className='login-bg'></div> {/* Background Color */}
      <div className='login'>
        <div className='login-container'>
          <div className='login-img'>
            <img src={illustration} alt="Illustration" />
          </div>
          <div className='login-card'>
            <div className='login-form'>
              <div className="title">
                <Typography variant='h4'><b>Login</b></Typography>
              </div>
              <form className="form" onSubmit={handleSubmit}>
                <label>Email</label>
                <TextField name='email' type='email' variant='outlined' value={form.email} onChange={handleChange} required />
                <label>Password</label>
                <TextField name='password' type='password' variant='outlined' value={form.password} onChange={handleChange} required />
                <label>Role</label>
                <TextField
                  name="role"
                  select
                  variant="outlined"
                  required
                  value={form.role}
                  onChange={handleChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                  <MenuItem value="team_lead">Team Lead</MenuItem>
                  <MenuItem value="product_manager">Product Manager</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth id="button">Login</Button>
                <Typography className="message">
                  Don't have an account?{' '}
                  <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/signup')}>
                    Sign up
                  </span>
                </Typography>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
