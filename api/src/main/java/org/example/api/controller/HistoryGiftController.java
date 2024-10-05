package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.HistoryGiftDTO;
import org.example.api.entity.HistoryGift;
import org.example.api.service.HistoryGiftService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/history-gift")
public class HistoryGiftController {
    private final HistoryGiftService historyGiftService;

    // Lấy lịch sử tặng quà
    @GetMapping("")
    public ResponseEntity<List<HistoryGiftDTO>> getGiftHistory() {
        // Gọi phương thức dịch vụ để lấy dữ liệu
        List<HistoryGiftDTO> giftHistory = historyGiftService.getGiftHistory();

        // Trả về danh sách DTO dưới dạng phản hồi
        return ResponseEntity.ok(giftHistory);
    }

    // Lấy lịch sử tặng quà theo userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<HistoryGiftDTO>> getGiftHistoryByUserId(@PathVariable Long userId) {
        // Gọi phương thức dịch vụ để lấy dữ liệu
        List<HistoryGiftDTO> giftHistory = historyGiftService.getGiftHistoryByUserId(userId);

        // Trả về danh sách DTO dưới dạng phản hồi
        return ResponseEntity.ok(giftHistory);
    }

    // Thực hiện tặng quà
    @PostMapping("/gift")
    public ResponseEntity<String> giftToUser(@RequestParam Long userId,
                                             @RequestParam Double amount,
                                             @RequestParam Long storyId) {
        try {
            historyGiftService.giftToUser(userId, amount, storyId);
            return ResponseEntity.ok("Gift successful!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
