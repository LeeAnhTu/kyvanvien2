package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.WalletTransactionDTO;
import org.example.api.entity.User;
import org.example.api.entity.Wallet;
import org.example.api.entity.Wallettransaction;
import org.example.api.mapper.WalletTransactionMapper;
import org.example.api.repository.UserRepository;
import org.example.api.repository.WalletRepository;
import org.example.api.repository.WallettransactionRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class WalletTransactionService {
    private final WallettransactionRepository wallettransactionRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;


    public List<WalletTransactionDTO> getTransactions() {
        List<Wallettransaction> transactions = wallettransactionRepository.findAll();

        return transactions.stream()
                .sorted(Comparator.comparing(Wallettransaction::getCreatedAt).reversed()) // Sắp xếp giảm dần theo createdAt
                .map(WalletTransactionMapper::toDTO) // Chuyển sang DTO
                .collect(Collectors.toList()); // Thu thập kết quả vào List
    }

//    public List<WalletTransactionDTO> fetchWalletTransactionSummaries() {
//        List<Wallettransaction> transactions = wallettransactionRepository.findTotalAmountByWallet();
//
//        return transactions.stream()
//                .collect(Collectors.groupingBy(
//                        t -> t.getWallet().getWalletId(),
//                        Collectors.summingDouble(Wallettransaction::getAmount)
//                ))
//                .entrySet().stream()
//                .map(entry -> {
//                    WalletTransactionDTO dto = new WalletTransactionDTO();
//                    dto.setWalletId(entry.getKey());
//                    dto.setTotal(entry.getValue());
//                    return dto;
//                })
//                .collect(Collectors.toList());
//    }

    public List<WalletTransactionDTO> fetchWalletTransactionSummaries() {
        return wallettransactionRepository.findTotalAmountByWallet();
    }



    public List<WalletTransactionDTO> getTransactionsByUserId(Long userId) {
        // Tìm ví theo userId
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(() ->
                new RuntimeException("Wallet not found for walletId: " + userId)
        );
        User user = userRepository.findById(userId).orElseThrow(() ->new RuntimeException("User not found for UserId: " + userId));
        if (wallet == null) {
            throw new RuntimeException("Wallet not found for userId: " + userId);
        }

        // Lấy danh sách giao dịch của ví và sắp xếp theo ngày tạo từ mới nhất đến cũ nhất
        List<Wallettransaction> transactions = wallettransactionRepository.findByWallet_WalletId(wallet.getWalletId());

        return transactions.stream()
                .sorted((t1, t2) -> t2.getCreatedAt().compareTo(t1.getCreatedAt())) // Sắp xếp theo ngày tạo
                .map(WalletTransactionMapper::toDTO)
                .collect(Collectors.toList());
    }

    public WalletTransactionDTO createTransaction(Long userId, double amount) {
        // Tìm ví theo userId
        Wallet wallet = walletRepository.findByUserId(userId).orElseThrow(() ->
                new RuntimeException("Wallet not found for walletId: " + userId)
        );

        if (wallet == null) {
            throw new RuntimeException("Wallet not found for userId: " + userId);
        }

        // Tạo giao dịch
        Wallettransaction transaction = new Wallettransaction();
        transaction.setWallet(wallet);
        transaction.setAmount(amount);
        transaction.setCreatedAt(new Date());

        // Lưu giao dịch vào cơ sở dữ liệu
        wallettransactionRepository.save(transaction);

        // Cập nhật số kim cương cho ví
        double newBalance = wallet.getBalance() + amount;
        wallet.setBalance(newBalance);
        walletRepository.save(wallet);

        // Trả về DTO
        return WalletTransactionMapper.toDTO(transaction);
    }

}
