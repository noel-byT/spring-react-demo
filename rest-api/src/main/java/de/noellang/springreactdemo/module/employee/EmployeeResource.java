package de.noellang.springreactdemo.module.employee;

import de.noellang.springreactdemo.domain.Employee;
import de.noellang.springreactdemo.module.employee.request.AddEmployeeRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/employee", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmployeeResource {

    private EmployeeService employeeService;
    private ModelMapper modelMapper;

    public EmployeeResource(EmployeeService employeeService, ModelMapper modelMapper) {
        this.employeeService = employeeService;
        this.modelMapper = modelMapper;
    }

    /* @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<Employee> employees = employeeService.findAll();
        return ResponseEntity.ok(employees);
        /* return ResponseEntity.ok(employees.stream()
            .map(employee -> modelMapper.map(employee, EmployeeDTO.class))
            .collect(Collectors.toList())
        ); */
    /* } */

    @GetMapping
    public Page<Employee> getAllEmployees(Pageable pageable) {
        return employeeService.findAllByPage(pageable);
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

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value = "/add")
    public ResponseEntity<?> addEmployee(@Valid @RequestBody AddEmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeRequest, employee);

        // TODO: Fehlerbehandlung? Was, wenn es schief geht?
        // Und wie bekommen wir die ID vom gespeicherten Objekt zurück?

        // TODO: save nicht als void, sondern Employee und dann Exception Throw (SpringReactSQLError)
        employeeService.save(employee);

        return ResponseEntity.ok("git gud");
    }

}
