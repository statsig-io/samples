package com.example.android.architecture.blueprints.todoapp.util

import com.statsig.androidsdk.Statsig


/**
 * Object class StatsIgUtil where all Statsig SDK features will be declared and used.
 */
object StatsIgUtil {

    private const val FEATURE_GATE_DELETE_TODO_ACCESS = "enable_delete_todo"
    private const val TEST_MOBILE_DYNAMIC_CONFIG = "mobile_dynamic_config"


    /**
     * The function to register the event without metadata in the Statsig portal.
     *
     * @param eventName Name of the event to be logged.
     */
    fun eventLogWithoutMetadata(eventName: String) {
        Statsig.logEvent(eventName)
    }

}