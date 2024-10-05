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
public class HistoryGiftDTO {
    private Long hgId;
    private Long userId;
    private String userName;
    private Long storyId;
    private String storyName;
    private Double Amount;
    private Date createAt;
}
