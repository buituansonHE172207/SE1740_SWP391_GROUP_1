package com.kas.online_book_shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
    
    @GetMapping("/home")
    public String getHome() {
        return "admin/index";
    }

    @GetMapping("/dr-profile")
    public String getProfile() {
        return "admin/dr-profile";
    }

    @GetMapping("/add-doctor")
    public String getAddDoctor() {
        return "admin/add-doctor";
    }

    @GetMapping("/add-patient")
    public String getAddPatient() {
        return "admin/add-patient";
    }

    @GetMapping("/appointment")
    public String getAppointment() {
        return "admin/appointment";
    }

    @GetMapping("/blank-page")
    public String getBlankPage() {
        return "admin/blank-page";
    }

    @GetMapping("/block-detail")
    public String getBlockDetail() {
        return "admin/block-detail";
    }

    @GetMapping("/blogs")
    public String getBlogs() {
        return "admin/blogs";
    }

    @GetMapping("/calendar")
    public String getCalendar() {
        return "admin/calendar";
    }

    @GetMapping("/chat")
    public String getChat() {
        return "admin/chat";
    }

    @GetMapping("/checkout")
    public String getCheckout() {
        return "admin/checkout";
    }

    @GetMapping("/components")
    public String getComponents() {
        return "admin/components";
    }

    @GetMapping("/doctors")
    public String getDoctors() {
        return "admin/doctors";
    }

    @GetMapping("/email")
    public String getEmail() {
        return "admin/email";
    }

    @GetMapping("/error")
    public String getError() {
        return "admin/error";
    }

    @GetMapping("/flags")
    public String getFlags() {
        return "admin/flags";
    }

    @GetMapping("/forgot-password")
    public String getForgotPassword() {
        return "admin/forgot-password";
    }

    @GetMapping("/invoice")
    public String getInvoice() {
        return "admin/invoice";
    }

    @GetMapping("/invoice-list")
    public String getInvoiceList() {
        return "admin/invoice-list";
    }

    @GetMapping("/lock-screen")
    public String getLockScreen() {
        return "admin/lock-screen";
    }

    @GetMapping("/patients")
    public String getPatients() {
        return "admin/patients";
    }

    @GetMapping("/privacy")
    public String getPrivacy() {
        return "admin/privacy";
    }

    @GetMapping("/product-detail")
    public String getProductDetail() {
        return "admin/product-detail";
    }

    @GetMapping("/review")
    public String getReview() {
        return "admin/review";
    }

    @GetMapping("/shop")
    public String getShop() {
        return "admin/shop";
    }

    @GetMapping("/shopcart")
    public String getShopcart() {
        return "admin/shopcart";
    }

    @GetMapping("/signup")
    public String getSignup() {
        return "admin/signup";
    }

    @GetMapping("/terms")
    public String getTerms() {
        return "admin/terms";
    }

    @GetMapping("/thankyou")
    public String getThankyou() {
        return "admin/thankyou";
    }
}