package com.tech.course_mania.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tech.course_mania.model.Course;
import com.tech.course_mania.model.Enroll;
import com.tech.course_mania.model.User;
import com.tech.course_mania.service.CourseService;
import com.tech.course_mania.service.EnrollService;
import com.tech.course_mania.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollController {

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private EnrollService enrollService;

    @PostMapping("/{userId}/{courseId}/newEnrollment")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Enroll> newEnrollment(@PathVariable Integer userId, @PathVariable Long courseId,
            @RequestBody Enroll enroll) {

        User user = userService.getUserById(userId);
        Course course = courseService.getCourseById(courseId);
        enroll.setUser(user);
        enroll.setCourse(course);
        return new ResponseEntity<>(enrollService.newEnrollment(enroll), HttpStatus.CREATED);
    }

    // Endpoint to get all enrollments
    @GetMapping("readEnrollments")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<List<Enroll>> getAllEnrollments() {
        List<Enroll> enrollments = enrollService.getAllEnrollments();
        return new ResponseEntity<>(enrollments, HttpStatus.OK);
    }

    // Endpoint to delete an enrollment by ID
    @DeleteMapping("removeEnrollment/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> removeEnrollment(@PathVariable Integer id) {
        enrollService.removeEnrollment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
