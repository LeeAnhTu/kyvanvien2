package org.example.api.controller;


import lombok.AllArgsConstructor;
import org.example.api.dto.WalletTransactionDTO;
import org.example.api.service.WalletTransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/transactions")
public class WalletTransactionController {
    private final WalletTransactionService walletTransactionService;


    // Lấy lịch sử nạp
    @GetMapping("")
    public ResponseEntity<List<WalletTransactionDTO>> getTransactionHistory() {
        // Gọi phương thức dịch vụ để lấy dữ liệu
        List<WalletTransactionDTO> transaction = walletTransactionService.getTransactions();

        // Trả về danh sách DTO dưới dạng phản hồi
        return ResponseEntity.ok(transaction);
    }

    // Lấy lịch sử tổng nạp
    @GetMapping("/total")
    public ResponseEntity<List<WalletTransactionDTO>> getTotalAmountByWallet() {
        // Gọi phương thức dịch vụ để lấy dữ liệu
        List<WalletTransactionDTO> transaction = walletTransactionService.fetchWalletTransactionSummaries();

        // Trả về danh sách DTO dưới dạng phản hồi
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/add")
    public ResponseEntity<WalletTransactionDTO> addTransaction(@RequestParam Long userId, @RequestParam double amount) {
        // Tạo giao dịch và cập nhật ví
        try {
            WalletTransactionDTO transactionDTO = walletTransactionService.createTransaction(userId, amount);
            return ResponseEntity.ok(transactionDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Hoặc bạn có thể trả về một thông báo lỗi cụ thể
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<WalletTransactionDTO>> getTransactionsByUserId(
            @RequestParam Long userId) {

        try {
            List<WalletTransactionDTO> transactions = walletTransactionService.getTransactionsByUserId(userId);
            return ResponseEntity.ok(transactions);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
