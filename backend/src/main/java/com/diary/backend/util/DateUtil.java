package com.diary.backend.util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateUtil {
    public static Date getStartOfMonth(LocalDate date) {
        LocalDate firstDayOfMonth = date.withDayOfMonth(1);
        return Date.from(firstDayOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public static Date getEndOfMonth(LocalDate date) {
        LocalDate lastDayOfMonth = date.withDayOfMonth(date.lengthOfMonth());
        return Date.from(lastDayOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}
