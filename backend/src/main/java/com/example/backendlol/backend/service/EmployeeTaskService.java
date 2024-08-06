package com.example.backendlol.backend.service;

import com.example.backendlol.backend.model.EmployeeTask;
import com.example.backendlol.backend.repository.EmployeeTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeTaskService {

    @Autowired
    private EmployeeTaskRepository employeeTaskRepository;

    public List<EmployeeTask> getAllTasks() {
        return employeeTaskRepository.findAll();
    }

    public Optional<EmployeeTask> getTaskById(Long id) {
        return employeeTaskRepository.findById(id);
    }

    public EmployeeTask createTask(EmployeeTask task) {
        return employeeTaskRepository.save(task);
    }

    public EmployeeTask updateTask(Long id, EmployeeTask task) {
        if (employeeTaskRepository.existsById(id)) {
            task.setId(id);
            return employeeTaskRepository.save(task);
        }
        return null;
    }

    public void deleteTask(Long id) {
        employeeTaskRepository.deleteById(id);
    }

    public EmployeeTask updateTaskStatus(Long id, String status) {
        Optional<EmployeeTask> optionalTask = employeeTaskRepository.findById(id);
        if (optionalTask.isPresent()) {
            EmployeeTask task = optionalTask.get();
            task.setStatus(status);
            return employeeTaskRepository.save(task);
        }
        return null;
    }

    public List<EmployeeTask> getTasksByEmployeeId(Long employeeId) {
        return employeeTaskRepository.findByEmployeeId(employeeId);
    }
}
