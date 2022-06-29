package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author : M-Prageeth
 * @created : 24/06/2022 - 8:48 AM
 **/
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Customer {
    @Id
    private String id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String address;
    private double salary;
}
