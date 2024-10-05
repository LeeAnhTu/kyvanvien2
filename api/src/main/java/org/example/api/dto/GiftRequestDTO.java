package org.example.api.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GiftRequestDTO {
    private Long rgId;

    private Long userId;

    private String userName;

    private Long adminId;

    private String adminName;

    private Integer cardValue;

    private Integer diamondsUsed;

    private Date requestDate;

    private String status;

    private String adminResponse;

    private Date adminResponseDate;

}
