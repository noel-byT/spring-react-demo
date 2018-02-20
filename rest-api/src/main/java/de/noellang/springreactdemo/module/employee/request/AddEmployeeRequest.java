package de.noellang.springreactdemo.module.employee.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class AddEmployeeRequest {

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @NotEmpty
    private String jobTitle;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date entryDate;

}
