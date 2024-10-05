package org.example.api.service;


import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendEmail(String recipientEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail); // Tài khoản nhận
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message); // Sử dụng tài khoản gửi để gửi email
    }


}
