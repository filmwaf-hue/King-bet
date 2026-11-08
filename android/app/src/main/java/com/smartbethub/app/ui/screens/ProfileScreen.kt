package com.smartbethub.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.smartbethub.app.ui.theme.*

@Composable
fun ProfileScreen(
    navController: NavController,
    language: String,
    onLanguageChange: (String) -> Unit
) {
    val isSw = language == "sw"

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(DarkBackground)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // User Profile Header Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = NavyCard),
                border = androidx.compose.foundation.BorderStroke(1.dp, ElectricBlue.copy(alpha = 0.3f))
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(CircleShape)
                            .background(ElectricBlue.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            Icons.Filled.Person,
                            contentDescription = "User",
                            tint = CyanAccent,
                            modifier = Modifier.size(32.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(16.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "filmwaf@gmail.com",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Surface(
                            shape = RoundedCornerShape(4.dp),
                            color = PurpleAccent.copy(alpha = 0.25f),
                            border = androidx.compose.foundation.BorderStroke(1.dp, PurpleAccent.copy(alpha = 0.6f))
                        ) {
                            Text(
                                text = "PERMANENT SYSTEM ADMINISTRATOR",
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Black,
                                color = PurpleAccent
                            )
                        }
                    }
                }
            }
        }

        // Language Switcher Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = NavySecondary),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color.DarkGray)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (isSw) "Lugha ya Mfumo" else "Application Language",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Button(
                            onClick = { onLanguageChange("en") },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (language == "en") ElectricBlue else NavyCard
                            )
                        ) {
                            Text("English")
                        }

                        Button(
                            onClick = { onLanguageChange("sw") },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (language == "sw") ElectricBlue else NavyCard
                            )
                        ) {
                            Text("Kiswahili")
                        }
                    }
                }
            }
        }

        // Statistics Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = NavyCard),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color.DarkGray)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = if (isSw) "Rekodi za Matokeo (Ledger)" else "Verified Ledger Performance",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text(text = "78.4%", fontSize = 18.sp, fontWeight = FontWeight.Black, color = WinGreen)
                            Text(text = if (isSw) "Ushindi" else "Win Rate", fontSize = 11.sp, color = TextMuted)
                        }
                        Column {
                            Text(text = "142", fontSize = 18.sp, fontWeight = FontWeight.Black, color = Color.White)
                            Text(text = if (isSw) "Jumla ya Mechi" else "Total Tips", fontSize = 11.sp, color = TextMuted)
                        }
                        Column {
                            Text(text = "+24.8%", fontSize = 18.sp, fontWeight = FontWeight.Black, color = CyanAccent)
                            Text(text = "ROI", fontSize = 11.sp, color = TextMuted)
                        }
                    }
                }
            }
        }

        // Admin Access Button
        item {
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { navController.navigate("admin") },
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = NavySecondary),
                border = androidx.compose.foundation.BorderStroke(1.dp, ElectricBlue.copy(alpha = 0.4f))
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Filled.AdminPanelSettings,
                        contentDescription = "Admin",
                        tint = CyanAccent,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = if (isSw) "Dashibodi ya Msimamizi (Admin)" else "Admin Management Console",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = if (isSw) "Ongeza mechi, rekebisha matokeo & VIP" else "Publish tips, set WON/LOST and manage members",
                            fontSize = 11.sp,
                            color = TextMuted
                        )
                    }
                    Icon(
                        Icons.Filled.ChevronRight,
                        contentDescription = "Go",
                        tint = TextMuted
                    )
                }
            }
        }
    }
}
