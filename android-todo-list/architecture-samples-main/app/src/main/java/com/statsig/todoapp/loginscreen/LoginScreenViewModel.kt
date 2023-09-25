package com.statsig.todoapp.loginscreen

import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import timber.log.Timber
import javax.inject.Inject


@HiltViewModel
class LoginScreenViewModel @Inject constructor() : ViewModel() {

    private var userLogin: UserLogin = UserLogin()

    var userName: MutableState<String> = mutableStateOf(userLogin.name)
    var isUserNameValid: MutableState<Boolean> = mutableStateOf(false)
    private var userNameErrMsg: MutableState<String> = mutableStateOf("")

    var password: MutableState<String> = mutableStateOf(userLogin.password)
    var isPasswordValid: MutableState<Boolean> = mutableStateOf(false)
    private var passwordErrMsg: MutableState<String> = mutableStateOf("")

    var isEnabledRegisterButton: MutableState<Boolean> = mutableStateOf(false)

    private fun shouldEnabledRegisterButton() {
        isEnabledRegisterButton.value = userNameErrMsg.value.isEmpty()
                && passwordErrMsg.value.isEmpty()
                && userName.value.isNotEmpty()
                && password.value.isNotEmpty()
    }

    fun validateUserName() {
        if (userName.value.length >= 15) {
            isUserNameValid.value = true
            userNameErrMsg.value = "User Name should be less than 15 chars"
        } else {
            isUserNameValid.value = false
            userNameErrMsg.value = ""
        }
        shouldEnabledRegisterButton()
    }

    fun validatePassword() {
        if (password.value != "123") {
            isPasswordValid.value = true
            passwordErrMsg.value = "Password should be 123"
        } else if (password.value.isEmpty() || password.value.isBlank()) {
            isPasswordValid.value = false
            passwordErrMsg.value = "Password should not be blank"
        } else {
            isPasswordValid.value = false
            passwordErrMsg.value = ""
        }
        shouldEnabledRegisterButton()
    }

    fun register() {
        userLogin.name = userName.value
        userLogin.password = password.value
        Timber.d("username", userName.value)
        Timber.d("password", password.value)
        Timber.d("userLogin", userLogin.toString())
    }

}