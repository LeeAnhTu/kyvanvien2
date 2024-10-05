package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.GiftRequestDTO;
import org.example.api.entity.GiftRequest;
import org.example.api.service.GiftRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/gift-request")
public class GiftRequestController {
    private final GiftRequestService giftRequestService;

    @GetMapping("")
    public ResponseEntity<List<GiftRequestDTO> >getGiftRequests() {
        List<GiftRequestDTO>  giftRequest = giftRequestService.getAllGiftRequests();
        return ResponseEntity.ok(giftRequest);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GiftRequestDTO> >getGiftRequestsByUserId(@PathVariable Long userId) {
        List<GiftRequestDTO>  giftRequest = giftRequestService.getGiftHistoryByUserId(userId);
        return ResponseEntity.ok(giftRequest);
    }

    @GetMapping("/{id}")
    public GiftRequestDTO getGiftRequestById(@PathVariable Long id) {
        return giftRequestService.getGiftRequestById(id);
    }

    @PostMapping
    public ResponseEntity<GiftRequestDTO> createRequest(
            @RequestParam Long userId,
            @RequestParam Integer cardValue,
            @RequestParam Integer diamondsUsed) {
        try {
            GiftRequestDTO createdRequest = giftRequestService.createRequest(userId, cardValue, diamondsUsed);
            return ResponseEntity.ok(createdRequest);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Bạn có thể tùy chỉnh phản hồi này
        }
    }

    @PutMapping("/approve/{requestId}")
    public ResponseEntity<GiftRequestDTO> approveRequest(
            @PathVariable Long requestId,
            @RequestParam Long adminId,
            @RequestParam String adminResponse) {

        GiftRequestDTO approvedRequest = giftRequestService.approveRequest(requestId, adminId, adminResponse);
        if (approvedRequest != null) {
            return ResponseEntity.ok(approvedRequest);
        }
        return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy yêu cầu
    }

    @PutMapping("/reject/{requestId}")
    public ResponseEntity<GiftRequestDTO> rejectRequest(
            @PathVariable Long requestId,
            @RequestParam Long adminId,
            @RequestParam String adminResponse) {

        GiftRequestDTO rejectedRequest = giftRequestService.rejectRequest(requestId, adminId, adminResponse);
        if (rejectedRequest != null) {
            return ResponseEntity.ok(rejectedRequest);
        }
        return ResponseEntity.notFound().build(); // Trả về 404 nếu không tìm thấy yêu cầu
    }
}
