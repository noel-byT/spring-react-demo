package de.noellang.springreactdemo.dto;

import de.noellang.springreactdemo.domain.Department;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class EmployeeDTO {

    private Long id;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    private String jobTitle;

    @NotNull
    private Date entryDate;

    private DepartmentDTO department;

}
