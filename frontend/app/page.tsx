"use client"

import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


export default function Home() {
  return (
    <div>
      <Container maxWidth="md" className="text-center py-10">
      {/* アプリの内容説明 */}
      <Typography variant="h4" gutterBottom className="text-blue-600 font-bold">
        MyApp
      </Typography>
      <Typography variant="body1" className="text-gray-700 mb-6">
        MyAppは、あなたの生活をより便利にするためのアプリです。
        直感的なUIと強力な機能を提供し、あなたのタスク管理をサポートします。
      </Typography>

      <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
        会員登録
      </Button>
    </Container>
    </div>
  );
}
