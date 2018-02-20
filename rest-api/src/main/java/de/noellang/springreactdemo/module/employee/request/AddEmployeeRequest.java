package de.noellang.springreactdemo.module.employee.request;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

@Data
public class AddEmployeeRequest {

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    private String jobTitle;

}
