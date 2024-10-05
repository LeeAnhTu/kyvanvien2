package org.example.api.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUtils {
    public static String removeDiacritics(String s) {
        // Thay thế các ký tự đặc biệt trước khi chuẩn hóa
        s = s.replaceAll("đ", "d").replaceAll("Đ", "D");

        // Chuẩn hóa và loại bỏ các dấu
        String normalized = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("");
    }
}