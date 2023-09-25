package com.statsig.todoapp.loginscreen

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.statsig.todoapp.R


@Composable
fun LoginScreen(
    onLoginSuccess: () -> Unit,
    onLoginFailure: () -> Unit,
    onBack: () -> Unit,
    viewModel: LoginScreenViewModel = hiltViewModel()
) {

    Column(
        modifier = Modifier.padding(20.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Spacer(modifier = Modifier.height(160.dp))
        Text(
            text = stringResource(R.string.login),
            style = TextStyle(fontSize = 20.sp, fontFamily = FontFamily.Monospace)
        )

        Spacer(modifier = Modifier.height(30.dp))
        TextField(
            label = { Text(text = stringResource(R.string.username)) },
            value = viewModel.userName.value,
            onValueChange = {
                viewModel.userName.value = it
                viewModel.validateUserName()
            },
            isError = viewModel.isUserNameValid.value
        )

        Spacer(modifier = Modifier.height(20.dp))
        TextField(
            label = { Text(text = stringResource(R.string.password)) },
            value = viewModel.password.value,
            visualTransformation = PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            onValueChange = {
                viewModel.password.value = it
                viewModel.validatePassword()
            },
            isError = viewModel.isPasswordValid.value
        )

        Spacer(modifier = Modifier.height(20.dp))
        Box(modifier = Modifier.padding(40.dp, 0.dp, 40.dp, 0.dp)) {
            Button(
                onClick = (if (viewModel.isEnabledRegisterButton.value) {
                    onLoginSuccess
                } else {
                    onLoginFailure
                }),
                shape = RectangleShape,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp),
                enabled = viewModel.isEnabledRegisterButton.value
            ) {
                Text(
                    text = stringResource(R.string.login),
                    style = TextStyle(fontSize = 20.sp, fontFamily = FontFamily.Monospace),
                    color = Color.Black
                )
            }
        }
    }

}