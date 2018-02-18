package de.noellang.springreactdemo.module.employee.impl;

import de.noellang.springreactdemo.domain.Employee;
import de.noellang.springreactdemo.module.employee.EmployeeRepository;
import de.noellang.springreactdemo.module.employee.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }
}
