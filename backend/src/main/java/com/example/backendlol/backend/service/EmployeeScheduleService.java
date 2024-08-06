package com.example.backendlol.backend.service;

import com.example.backendlol.backend.model.EmployeeSchedule;
import com.example.backendlol.backend.model.User;
import com.example.backendlol.backend.repository.EmployeeScheduleRepository;
import com.example.backendlol.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeScheduleService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmployeeScheduleRepository employeeScheduleRepository;

    public List<User> getAllEmployees() {
        return userRepository.findByRole("employee");
    }

    public EmployeeSchedule getScheduleForEmployee(Long employeeId) {
        return employeeScheduleRepository.findByEmployeeId(employeeId);
    }

    public EmployeeSchedule saveOrUpdateSchedule(EmployeeSchedule schedule) {
        return employeeScheduleRepository.save(schedule);
    }
}
