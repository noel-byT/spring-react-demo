package de.noellang.springreactdemo.module.employee;

import de.noellang.springreactdemo.domain.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EmployeeService {

    List<Employee> findAll();
    Page<Employee> findAllByPage(Pageable pageable);

    Employee findById(Long id);

    void save(Employee employee);

}
