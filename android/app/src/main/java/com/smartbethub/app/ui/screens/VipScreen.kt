package com.smartbethub.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.smartbethub.app.ui.theme.*

@Composable
fun VipScreen(navController: NavController, language: String) {
    val isSw = language == "sw"
    var selectedPlan by remember { mutableStateOf("monthly") }
    var selectedProvider by remember { mutableStateOf("mpesa") }
    var phoneNumber by remember { mutableStateOf("") }
    var paymentSubmitted by remember { mutableStateOf(false) }

    val providers = listOf(
        "mpesa" to "Vodacom M-Pesa",
        "tigo" to "Tigo Pesa",
        "airtel" to "Airtel Money",
        "halopesa" to "Halopesa",
        "selcom" to "Card / Selcom"
    )

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // VIP Header
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = NavySecondary),
                border = androidx.compose.foundation.BorderStroke(1.dp, GoldVip.copy(alpha = 0.6f))
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        Icons.Filled.Star,
                        contentDescription = "VIP",
                        tint = GoldVip,
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "SMART BET HUB VIP",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Black,
                        color = GoldVip
                    )
                    Text(
                        text = if (isSw) "Pata tiketi za uhakika, odds 10+, na matokeo sahihi kila siku" else "Unlock exclusive high-confidence accumulators, VIP bankers & correct scores",
                        fontSize = 12.sp,
                        color = TextMuted,
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                    )
                }
            }
        }

        // Plan Selection
        item {
            Text(
                text = if (isSw) "Chagua Kifurushi" else "Select Your Subscription",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                // Weekly
                Card(
                    modifier = Modifier
                        .weight(1f)
                        .clickable { selectedPlan = "weekly" },
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = if (selectedPlan == "weekly") ElectricBlue.copy(alpha = 0.15f) else NavyCard
                    ),
                    border = androidx.compose.foundation.BorderStroke(
                        1.dp,
                        if (selectedPlan == "weekly") ElectricBlue else Color.DarkGray
                    )
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = if (isSw) "Wiki 1 (Siku 7)" else "1 Week (7 Days)",
                            fontSize = 12.sp,
                            color = TextMuted
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "TZS 25,000",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Black,
                            color = Color.White
                        )
                        Text(
                            text = "~ $10 USD",
                            fontSize = 11.sp,
                            color = CyanAccent
                        )
                    }
                }

                // Monthly
                Card(
                    modifier = Modifier
                        .weight(1f)
                        .clickable { selectedPlan = "monthly" },
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = if (selectedPlan == "monthly") GoldVip.copy(alpha = 0.15f) else NavyCard
                    ),
                    border = androidx.compose.foundation.BorderStroke(
                        1.dp,
                        if (selectedPlan == "monthly") GoldVip else Color.DarkGray
                    )
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = if (isSw) "Mwezi 1 (Siku 30)" else "1 Month (30 Days)",
                                fontSize = 12.sp,
                                color = TextMuted
                            )
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = GoldVip.copy(alpha = 0.2f)
                            ) {
                                Text(
                                    text = "SAVE 35%",
                                    modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp),
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = GoldVip
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = "TZS 75,000",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Black,
                            color = Color.White
                        )
                        Text(
                            text = "~ $30 USD",
                            fontSize = 11.sp,
                            color = GoldVip
                        )
                    }
                }
            }
        }

        // Mobile Money Payment Method
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = NavyCard),
                border = androidx.compose.foundation.BorderStroke(1.dp, ElectricBlue.copy(alpha = 0.3f))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (isSw) "Njia ya Malipo (Tanzania Mobile Money)" else "Payment Method (Tanzania Mobile Money)",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    providers.forEach { (key, label) ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable { selectedProvider = key }
                                .padding(vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            RadioButton(
                                selected = selectedProvider == key,
                                onClick = { selectedProvider = key },
                                colors = RadioButtonDefaults.colors(selectedColor = ElectricBlue)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = label,
                                color = Color.White,
                                fontSize = 14.sp
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    OutlinedTextField(
                        value = phoneNumber,
                        onValueChange = { phoneNumber = it },
                        label = { Text(if (isSw) "Namba ya Simu (mf. 0754123456)" else "Phone Number (e.g. 0754123456)") },
                        modifier = Modifier.fillMaxWidth(),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = ElectricBlue,
                            unfocusedBorderColor = Color.DarkGray,
                            focusedTextColor = Color.White,
                            unfocusedTextColor = Color.White
                        )
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = { paymentSubmitted = true },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = GoldVip),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = if (isSw) "Lipa Sasa (Tuma Push USSD)" else "Pay Now (Trigger USSD Push)",
                            fontWeight = FontWeight.Bold,
                            color = Color.Black
                        )
                    }

                    if (paymentSubmitted) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = WinGreen.copy(alpha = 0.15f),
                            border = androidx.compose.foundation.BorderStroke(1.dp, WinGreen.copy(alpha = 0.4f)),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(
                                modifier = Modifier.padding(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    Icons.Filled.CheckCircle,
                                    contentDescription = "Success",
                                    tint = WinGreen
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = if (isSw) "Ombi la malipo limetumwa kwenye simu yako! Weka namba ya siri (PIN) ili kukamilisha." else "USSD Push sent to your phone! Enter PIN on your phone to complete activation.",
                                    fontSize = 12.sp,
                                    color = WinGreen
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
