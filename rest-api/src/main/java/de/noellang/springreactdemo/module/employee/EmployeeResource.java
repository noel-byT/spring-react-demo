package de.noellang.springreactdemo.module.employee;

import com.fasterxml.jackson.databind.util.BeanUtil;
import de.noellang.springreactdemo.domain.Employee;
import de.noellang.springreactdemo.dto.EmployeeDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/employee", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmployeeResource {

    private EmployeeService employeeService;
    private ModelMapper modelMapper;

    public EmployeeResource(EmployeeService employeeService, ModelMapper modelMapper) {
        this.employeeService = employeeService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<Employee> employees = employeeService.findAll();
        System.out.println(employees.get(0).getId());
        return ResponseEntity.ok(employees);
        /* return ResponseEntity.ok(employees.stream()
            .map(employee -> modelMapper.map(employee, EmployeeDTO.class))
            .collect(Collectors.toList())
        ); */
    }

    @CrossOrigin
    @PatchMapping(value = "/{employeeId}")
    public ResponseEntity<?> updateEmployee(@Valid @RequestBody Employee employee, @PathVariable Long employeeId) {
        // Employee employeeToUpdate = employeeService.findById(employeeId);
        // Employee updatedEmployeeData = modelMapper.map(employeeDto, Employee.class);

       //  BeanUtils.copyProperties(updatedEmployeeData, employeeToUpdate);

        employeeService.save(employee);
        return ResponseEntity.ok("git gud");
    }

}
