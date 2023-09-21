package com.example.android.architecture.blueprints.todoapp.util

import android.app.Application
import com.statsig.androidsdk.DynamicConfig
import com.statsig.androidsdk.Statsig
import com.statsig.androidsdk.StatsigUser


/**
 * Object class StatsIgUtil where all Statsig SDK features will be declared and used.
 */
object StatsIgUtil {

    const val DEFAULT_NUMBER = -1
    private const val FEATURE_GATE_DELETE_TODO_ACCESS = "enable_delete_todo"
    private const val TEST_MOBILE_DYNAMIC_CONFIG = "mobile_dynamic_config"
    const val LOG_EVENT_APP_OPENED = "app opened"
    const val LOG_EVENT_APP_BACKGROUNDED = "app backgrounded"
    const val LOG_EVENT_TODO_CREATED = "todo_created"
    const val LOG_EVENT_TODO_UPDATED = "todo_updated"
    const val LOG_EVENT_TODO_DELETED = "todo_deleted"
    const val LOG_EVENT_TODO_LIST_LOADED = "todo_loaded"
    const val LOG_EVENT_TODO_LIST_VIEWED = "list_viewed"
    const val EXPERIMENT_ITEM_SORT = "item_sorting"
    const val EXPERIMENT_PARAMETER_SORT_ORDER = "sort_order"

    /**
     * Suspended init function to initialize the Statsig SDK.
     *
     * @param application Application level context.
     * @param key Client API key.
     * @param userId User ID.
     */
    suspend fun init(application: Application, key: String, userId: String) {
        Statsig.initialize(application, key, StatsigUser(userId))
    }

    /**
     * The function to get Dynamic Configuration object for mobile_dynamic_config.
     *
     * @return DynamicConfig object that will return a JSON.
     */
    fun testMobileDynamicConfig(): DynamicConfig {
        return Statsig.getConfig(TEST_MOBILE_DYNAMIC_CONFIG)
    }

    /**
     * Feature Gate function to check if access to delete of to-do list is granted.
     *
     * @return Boolean value of Feature Gate of FEATURE_GATE_DELETE_TODO_ACCESS.
     */
    fun isDeleteTodoFeatureEnabled(): Boolean {
        return Statsig.checkGate(FEATURE_GATE_DELETE_TODO_ACCESS)
    }

    /**
     * The function to register the event without metadata in the Statsig portal.
     *
     * @param eventName Name of the event to be logged.
     */
    fun eventLogWithoutMetadata(eventName: String) {
        Statsig.logEvent(eventName)
    }

    /**
     * The function to register the event with metadata in the Statsig portal.
     *
     * @param eventName Name of the event to be logged.
     */
    fun eventLogWithMetadata(
        eventName: String,
        value: String,
        metadata: Map<String, String>? = null
    ) {
        Statsig.logEvent(eventName, value, metadata)
    }

    /**
     * The Experiment function for item_sorting.
     *
     * @param experimentName Name of the experiment.
     */
    fun sortingExperiment(experimentName: String): DynamicConfig {
        return Statsig.getExperiment(experimentName)
    }

}