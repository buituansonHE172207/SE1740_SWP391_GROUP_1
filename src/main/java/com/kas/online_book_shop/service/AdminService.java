package com.kas.online_book_shop.service;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;

public interface AdminService {
    Admin findAdminById(Long id);


}
