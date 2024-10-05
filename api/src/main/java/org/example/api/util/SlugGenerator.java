package org.example.api.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class SlugGenerator {
    public static String toSlug(String input) {
        // Xóa khoảng trắng ở đầu và cuối chuỗi, thay thế khoảng trắng còn lại bằng dấu gạch ngang
        String nowhitespace = input.trim().replaceAll("\\s+", "-");

        // Chuyển đổi các ký tự đặc biệt như Đ thành d
        String replaced = nowhitespace
                .replaceAll("[Đ]", "d")
                .replaceAll("[đ]", "d");

        // Chuyển đổi sang dạng phân tách Unicode (NFD) để dễ dàng loại bỏ các ký tự phụ
        String normalized = Normalizer.normalize(replaced, Normalizer.Form.NFD);

        // Loại bỏ các ký tự không phải chữ cái, số hoặc dấu gạch ngang
        String slug = Pattern.compile("[^\\p{L}\\p{Nd}-]").matcher(normalized).replaceAll("");

        // Thay thế các khoảng trắng liên tiếp bằng dấu gạch ngang
        slug = slug.replaceAll("-{2,}", "-");

        // Chuyển đổi tất cả các ký tự thành chữ thường
        return slug.toLowerCase();
    }
}
