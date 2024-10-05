package org.example.api.service;


import lombok.AllArgsConstructor;
import org.example.api.dto.GiftRequestDTO;
import org.example.api.entity.GiftRequest;
import org.example.api.entity.User;
import org.example.api.entity.Wallet;
import org.example.api.mapper.GiftRequestMapper;
import org.example.api.repository.GiftRequestRepository;
import org.example.api.repository.UserRepository;
import org.example.api.repository.WalletRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GiftRequestService {
    private final GiftRequestRepository giftRequestRepository;

    private final UserRepository userRepository;

    private final WalletRepository walletRepository;

    private final EmailService emailService;

    public List<GiftRequestDTO> getAllGiftRequests() {
        List<GiftRequest> chapters = giftRequestRepository.findAll();
        return chapters.stream()
                .sorted(Comparator.comparing(GiftRequest::getRequestDate).reversed())
                .map(GiftRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<GiftRequestDTO> getGiftHistoryByUserId(Long userId) {
        List<GiftRequest>  giftRequests =giftRequestRepository.findByUserId(userId);

        return giftRequests.stream()
                .sorted(Comparator.comparing(GiftRequest::getRequestDate).reversed())
                .map(GiftRequestMapper::toDTO)
                .collect(Collectors.toList());
    }

    public GiftRequestDTO getGiftRequestById(Long id) {
        Optional<GiftRequest> giftRequestOptional = giftRequestRepository.findById(id);
        if (giftRequestOptional.isPresent()) {
            return GiftRequestMapper.toDTO(giftRequestOptional.get());
        } else {
            throw new RuntimeException("Không tìm thấy yêu cầu với ID: " + id);
        }
    }

    // Tạo yêu cầu
    public GiftRequestDTO createRequest(Long userId, Integer cardValue, Integer diamondsUsed) {
        // Kiểm tra số kim cương có đủ không
        Optional<Wallet> walletOptional = walletRepository.findByUserId(userId);

        // Kiểm tra nếu không tìm thấy wallet
        if (walletOptional.isEmpty()) {
            throw new RuntimeException("Không tìm thấy ví cho người dùng với ID: " + userId);
        }

        Wallet wallet = walletOptional.get();
        Double userDiamonds = wallet.getBalance();

        // Kiểm tra số kim cương
        if (userDiamonds < diamondsUsed) {
            throw new RuntimeException("Không đủ kim cương để tạo yêu cầu.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại với ID: " + userId));

        // Tạo yêu cầu mới
        GiftRequest giftRequest = new GiftRequest();
        giftRequest.setUser(user);
        giftRequest.setCardValue(cardValue);
        giftRequest.setDiamondsUsed(diamondsUsed);
        giftRequest.setRequestDate(new Date());
        giftRequest.setStatus("Đang Xử Lý");

        // Lưu yêu cầu vào database
        giftRequest = giftRequestRepository.save(giftRequest);

        // Trừ số kim cương trong ví
        double newBalance = userDiamonds - diamondsUsed;
        wallet.setBalance(newBalance); // Cập nhật số dư
        walletRepository.save(wallet); // Lưu thay đổi vào database

        // Gửi email thông báo cho admin
//        String userEmail = user.getEmail(); // Email của người dùng
//        String subject = "Yêu cầu đổi quà từ người dùng";
//        String cardValueTo = String.valueOf(cardValue); // Giá trị thẻ (cần chuyển đổi thành chuỗi nếu cần)
//
//        emailService.sendEmail(userEmail, subject, cardValueTo); // Gửi email
        // Gửi email thông báo cho cả người dùng và admin
        String userEmail = user.getEmail(); // Email của người dùng
        String adminEmail = "vietkhoi998@gmail.com"; // Email của admin
        String subjectForAdmin = "Yêu cầu đổi quà từ người dùng";
        String bodyForAdmin = "Người dùng " + userEmail + " đã gửi yêu cầu đổi quà thẻ Viettel trị giá " + cardValue + " VND.";

        // Gửi email cho admin
        emailService.sendEmail(adminEmail, subjectForAdmin, bodyForAdmin);

        // Gửi email cho người dùng
        String subjectForUser = "Bạn đã yêu cầu đổi quà cho Kỳ Văn Viện";
        String bodyForUser = "Chào bạn,\n\nBạn đã gửi yêu cầu đổi quà thẻ Viettel trị giá " + cardValue + " VND. Chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian sớm nhất.\n\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!";

        // Gửi email cho người dùng
        emailService.sendEmail(userEmail, subjectForUser, bodyForUser);

        return GiftRequestMapper.toDTO(giftRequest); // Chuyển đổi và trả về DTO
    }



    // Đồng ý yêu cầu
    public GiftRequestDTO approveRequest(Long requestId, Long adminId, String adminResponse) {
        Optional<GiftRequest> optionalRequest = giftRequestRepository.findById(requestId);
        if (optionalRequest.isPresent()) {
            User admin = userRepository.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + adminId));
            GiftRequest giftRequest = optionalRequest.get();
            giftRequest.setStatus("Đã Xử Lý");
            giftRequest.setAdminResponse(adminResponse);
            giftRequest.setAdminResponseDate(new Date());
            giftRequest.setAdmin(admin);  // Cập nhật ID admin phê duyệt
            giftRequestRepository.save(giftRequest);

            User user = userRepository.findById(optionalRequest.get().getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + optionalRequest.get().getUser().getId()));

            String userEmail = user.getEmail(); // Email của người dùng

            // Gửi email cho người dùng
            String subjectForUser = "Yêu cầu đổi quà của bạn cho Kỳ Văn Viện";
            String bodyForUser = "Chào bạn,\n\nYêu cầu đổi quà thẻ Viettel trị giá " + optionalRequest.get().getCardValue() + " VND. Đã được đồng ý, hãy vào phần lịch sử giao dịch trên web hoặc ứng dụng để xem chi tiết.\n\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!";

            // Gửi email cho người dùng
            emailService.sendEmail(userEmail, subjectForUser, bodyForUser);

            return GiftRequestMapper.toDTO(giftRequest);
        }
        return null; // Hoặc ném exception nếu yêu cầu không tồn tại
    }

    // Từ chối yêu cầu
    public GiftRequestDTO rejectRequest(Long requestId, Long adminId, String adminResponse) {
        Optional<GiftRequest> optionalRequest = giftRequestRepository.findById(requestId);
        if (optionalRequest.isPresent()) {
            Optional<Wallet> walletOptional = walletRepository.findByUserId(optionalRequest.get().getUser().getId());

            // Kiểm tra nếu không tìm thấy wallet
            if (walletOptional.isEmpty()) {
                throw new RuntimeException("Không tìm thấy ví cho người dùng với ID: " + optionalRequest.get().getUser().getId());
            }
            User admin = userRepository.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + adminId));
            GiftRequest giftRequest = optionalRequest.get();
            giftRequest.setStatus("Từ Chối");
            giftRequest.setAdminResponse(adminResponse);
            giftRequest.setAdminResponseDate(new Date());
            giftRequest.setAdmin(admin);  // Cập nhật ID admin từ chối
            giftRequestRepository.save(giftRequest);

            double newBalance = walletOptional.get().getBalance() + giftRequest.getDiamondsUsed();
            Wallet wallet = walletOptional.get();
            wallet.setBalance(newBalance); // Cập nhật số dư
            walletRepository.save(wallet);

            User user = userRepository.findById(optionalRequest.get().getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + optionalRequest.get().getUser().getId()));

            String userEmail = user.getEmail(); // Email của người dùng

            // Gửi email cho người dùng
            String subjectForUser = "Yêu cầu đổi quà của bạn cho Kỳ Văn Viện";
            String bodyForUser = "Chào bạn,\n\nYêu cầu đổi quà thẻ Viettel trị giá " + optionalRequest.get().getCardValue() + " VND. Không được phê duyệt, hãy vào phần lịch sử giao dịch trên web hoặc ứng dụng để xem chi tiết.\n\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi!";

            // Gửi email cho người dùng
            emailService.sendEmail(userEmail, subjectForUser, bodyForUser);

            return GiftRequestMapper.toDTO(giftRequest);
        }
        return null; // Hoặc ném exception nếu yêu cầu không tồn tại
    }


}
