package com.kas.online_book_shop.service.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import java.lang.String;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final HtmlContent htmlContent;

    SimpleMailMessage mailMessage = new SimpleMailMessage();

    public void sendActivationEmail(String to, String fullName, String token) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // String url = "https://sachtructuyen.shop/activation/" + token;
        String url = "http://localhost:3000/activation/" + token;

        String html = htmlContent.setHtmlConten(fullName, "Kích hoạt tài khoản", url,
                "Cảm ơn bạn đã đăng ký tài khoản tại Sách Trực Tuyến",
                "Vui lòng nhấn nút bên dưới để kích hoạt tài khoản: ", "");

        helper.setFrom("sachtructuyen123@gmail.com");
        helper.setTo(to);
        helper.setSubject("Kích hoạt tài khoản SachTrucTuyen");
        helper.setText(html, true);

        javaMailSender.send(message);
    }

    public void sendResetPasswordEmail(String to, String fullName, String token) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // String url = "https://sachtructuyen.shop/reset-password/" + token;
        String url = "http://localhost:3000/reset-password/" + token;

        String html = htmlContent.setHtmlConten(fullName, "Đặt lại mật khẩu", url,
                "Bạn vừa yêu cầu đặt lại mật khẩu tại Sách Trực Tuyến",
                "Vui lòng nhấn nút bên dưới để đặt lại mật khẩu: ", 
                "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.");

        helper.setFrom("sachtructuyen123@gmail.com");
        helper.setTo(to);
        helper.setSubject("Đặt lại mật khẩu SachTrucTuyen");
        helper.setText(html, true);

        javaMailSender.send(message);
    }

}
