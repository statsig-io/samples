package com.example.android.architecture.blueprints.todoapp.util

import android.app.Application
import com.statsig.androidsdk.DynamicConfig
import com.statsig.androidsdk.Statsig
import com.statsig.androidsdk.StatsigUser


/**
 * Object class StatsIgUtil where all Statsig SDK features will be declared and used.
 */
object StatsIgUtil {

    private const val FEATURE_GATE_DELETE_TODO_ACCESS = "enable_delete_todo"
    private const val TEST_MOBILE_DYNAMIC_CONFIG = "mobile_dynamic_config"

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

}