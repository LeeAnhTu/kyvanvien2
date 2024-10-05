package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.HistoryGiftDTO;
import org.example.api.entity.*;
import org.example.api.mapper.HistoryGiftMapper;
import org.example.api.repository.HistoryGiftRepository;
import org.example.api.repository.StoryRepository;
import org.example.api.repository.UserRepository;
import org.example.api.repository.WalletRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class HistoryGiftService {

    private final HistoryGiftRepository historyGiftRepository;

    private final UserRepository userRepository;

    private final StoryRepository storyRepository;

    private final WalletRepository walletRepository;


    public List<HistoryGiftDTO> getGiftHistory() {
        List<HistoryGift>  historyGifts =historyGiftRepository.findAll();

        return historyGifts.stream()
                .sorted(Comparator.comparing(HistoryGift::getCreateAt).reversed())
                .map(HistoryGiftMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<HistoryGiftDTO> getGiftHistoryByUserId(Long userId) {
        List<HistoryGift>  historyGifts =historyGiftRepository.findByUserId(userId);

        return historyGifts.stream()
                .sorted(Comparator.comparing(HistoryGift::getCreateAt).reversed())
                .map(HistoryGiftMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void giftToUser(Long userId, Double amount, Long storyId) {
        // Lấy thông tin người tặng và người nhận
        User sender = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Người dùng không tồn tại"));
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new IllegalArgumentException("Câu chuyện không tồn tại"));
        User receiver = story.getUser();  // Giả sử Story có thuộc tính `User`

        // Lấy ví của người tặng và người nhận
        Wallet senderWallet = sender.getWallet();
        Wallet receiverWallet = receiver.getWallet();

        // Kiểm tra số dư trong ví của người tặng
        if (senderWallet.getBalance() < amount) {
            throw new IllegalArgumentException("Số dư trong ví không đủ");
        }

        // Trừ tiền trong ví của người tặng
        senderWallet.setBalance(senderWallet.getBalance() - amount);

        // Cộng tiền vào ví của người nhận
        receiverWallet.setBalance(receiverWallet.getBalance() + amount);

        // Lưu lịch sử tặng quà
        HistoryGift historyGift = new HistoryGift();
        historyGift.setUser(sender);
        historyGift.setStory(story);
        historyGift.setAmount(amount);
        historyGift.setCreateAt(new Date());
        historyGiftRepository.save(historyGift);

        // Cập nhật thông tin ví
        walletRepository.save(senderWallet);
        walletRepository.save(receiverWallet);
    }

}
