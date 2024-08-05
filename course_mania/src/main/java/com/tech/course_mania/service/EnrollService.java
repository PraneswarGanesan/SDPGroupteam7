package com.tech.course_mania.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.tech.course_mania.model.Enroll;
import com.tech.course_mania.repository.EnrollRepository;

@Service
public class EnrollService {

    @Autowired
    private EnrollRepository enrollRepository;

    // newEnrollment
    public Enroll newEnrollment(@NonNull Enroll enroll) {
        return enrollRepository.save(enroll);
    }

    // getEnrollments
    public List<Enroll> getAllEnrollments() {
        return enrollRepository.findAll();
    }

    // deleteEnrollments
    public void removeEnrollment(@NonNull Integer id) {
        enrollRepository.deleteById(id);
    }
}
