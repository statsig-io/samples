package com.statsig.todoapp.util

import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

object StatsigUtil {

    const val DEFAULT_NUMBER = 0
    const val APP_OPENED = "app_opened"
    const val APP_BACKGROUNDED = "app_backgrounded"
    const val TODO_CREATED = "todo_created"
    const val TODO_UPDATED = "todo_updated"
    const val TODO_DELETED = "todo_deleted"
    const val TODO_LIST_LOADED = "todo_loaded"
    const val TODO_LIST_VIEWED = "list_viewed"
    const val ITEM_SORT = "item_sorting"
    const val SORT_ORDER = "sort_order"

    fun getCurrentDateTime(): String {
        val current = Calendar.getInstance().time
        val formatter = SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS", Locale.getDefault())
        return formatter.format(current).toString()
    }

}