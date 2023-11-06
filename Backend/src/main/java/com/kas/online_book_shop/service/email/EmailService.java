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
        helper.setSubject("Kích hoạt tài khoản Sách Trực Tuyến");
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
        helper.setSubject("Đặt lại mật khẩu Sách Trực Tuyến");
        helper.setText(html, true);

        javaMailSender.send(message);
    }

    /**
     * Send order confirmation email
     * 
     * @param to       user email
     * @param fullName user full name
     * @throws MessagingException
     */
    public void sendOrderCornfirmationEmail(String to, String fullName) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String url = "http://localhost:3000/account/";

        String html = htmlContent.setHtmlConten(fullName, "Kiểm tra đơn hàng", url,
                "Cảm ơn bạn đã đặt hàng Sách Trực Tuyến",
                "Vui lòng nhấn nút bên dưới để kiểm tra đơn hàng: ",
                "");

        helper.setFrom("sachtructuyen123@gmail.com");
        helper.setTo(to);
        helper.setSubject("Đặt hàng thành công");
        helper.setText(html, true);

        javaMailSender.send(message);
    }

    /**
     * Send order state email
     * 
     * @param to         user email
     * @param fullName   user full name
     * @param orderState order state (đã xác nhận, đang giao hàng, đã giao hàng)
     * @param endMessage message for state change (đơn hàng bị huỷ vì...)
     * @throws MessagingException
     */
    public void sendOrderStateEmail(String to, String fullName, String orderState, String endMessage)
            throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        String url = "http://localhost:3000/account/";

        String html = htmlContent.setHtmlConten(fullName, "Kiểm tra đơn hàng", url,
                "Đơn hàng của bạn " + orderState,
                "Vui lòng nhấn nút bên dưới để kiểm tra đơn hàng: ",
                endMessage);

        helper.setFrom("sachtructuyen123@gmail.com");
        helper.setTo(to);
        helper.setSubject("Đơn hàng của bạn " + orderState);
        helper.setText(html, true);

        javaMailSender.send(message);
    }

}
