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

package com.statsig.todoapp.statistics

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.statsig.androidsdk.Statsig

import com.statsig.todoapp.R
import com.statsig.todoapp.data.Task
import com.statsig.todoapp.data.TaskRepository
import com.statsig.todoapp.util.Async
import com.statsig.todoapp.util.StatsigUtil
import com.statsig.todoapp.util.WhileUiSubscribed
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * UiState for the statistics screen.
 */
data class StatisticsUiState(
    val isEmpty: Boolean = false,
    val isLoading: Boolean = false,
    val activeTasksPercent: Float = 0f,
    val completedTasksPercent: Float = 0f
)

/**
 * ViewModel for the statistics screen.
 */
@HiltViewModel
class StatisticsViewModel @Inject constructor(
    private val taskRepository: TaskRepository
) : ViewModel() {

    private val sortOrderValue = Statsig.getConfig(StatsigUtil.ITEM_SORT).getInt(
        StatsigUtil.SORT_ORDER,
        StatsigUtil.DEFAULT_NUMBER
    )

    val uiState: StateFlow<StatisticsUiState> =
        taskRepository.getTasksStream(sortOrderValue)
            .map {
                Statsig.logEvent(StatsigUtil.TODO_LIST_VIEWED)
                Async.Success(it)
            }
            .catch<Async<List<Task>>> { emit(Async.Error(R.string.loading_tasks_error)) }
            .map { taskAsync -> produceStatisticsUiState(taskAsync) }
            .stateIn(
                scope = viewModelScope,
                started = WhileUiSubscribed,
                initialValue = StatisticsUiState(isLoading = true)
            )

    fun refresh() {
        viewModelScope.launch {
            taskRepository.refresh()
        }
    }

    private fun produceStatisticsUiState(taskLoad: Async<List<Task>>) =
        when (taskLoad) {
            Async.Loading -> {
                StatisticsUiState(isLoading = true, isEmpty = true)
            }

            is Async.Error -> {
                // TODO: Show error message?
                StatisticsUiState(isEmpty = true, isLoading = false)
            }

            is Async.Success -> {
                val stats = getActiveAndCompletedStats(taskLoad.data)
                StatisticsUiState(
                    isEmpty = taskLoad.data.isEmpty(),
                    activeTasksPercent = stats.activeTasksPercent,
                    completedTasksPercent = stats.completedTasksPercent,
                    isLoading = false
                )
            }
        }
}
