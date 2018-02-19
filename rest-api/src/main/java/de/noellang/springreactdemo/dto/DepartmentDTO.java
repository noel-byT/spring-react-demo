package de.noellang.springreactdemo.dto;

import org.hibernate.validator.constraints.NotEmpty;

public class DepartmentDTO {

    Long id;

    @NotEmpty
    private String name;

}
