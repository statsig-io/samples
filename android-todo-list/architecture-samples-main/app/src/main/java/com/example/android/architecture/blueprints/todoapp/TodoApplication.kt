/*
 * Copyright 2019 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example.android.architecture.blueprints.todoapp

import android.app.Application
import android.provider.Settings
import com.example.android.architecture.blueprints.todoapp.util.StatsIgUtil
import dagger.hilt.android.HiltAndroidApp
import kotlinx.coroutines.runBlocking
import timber.log.Timber
import timber.log.Timber.DebugTree

/**
 * Application that sets up Timber in the DEBUG BuildConfig.
 * Read Timber's documentation for production setups.
 */
@HiltAndroidApp
class TodoApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        if (BuildConfig.DEBUG) Timber.plant(DebugTree())

        val deviceNameAndId = android.os.Build.MODEL + Settings.Secure.getString(
            contentResolver,
            Settings.Secure.ANDROID_ID
        )

        runBlocking {
            StatsIgUtil.init(
                this@TodoApplication,
                BuildConfig.STATSIG_CLIENT_API_KEY,
                deviceNameAndId
            )
        }
    }
}
