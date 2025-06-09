"use client"

import React from "react";
import { useState } from 'react'
import { useRouter } from "next/navigation"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useUser } from "../../contexts/UserContext"

const Header: React.FC = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useUser()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
   <AppBar position="static" className="bg-blue-500">
    <Toolbar className="flex justify-between">
      <div className="flex items-center">
        {/* <IconButton edge='start' color="inherit" aria-label="menu" className="mr-2">
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" className="text-white">
          MyApp
        </Typography>
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Button color="inherit" className="text-white" onClick={() => router.push("/sign_up")}>サインアップ</Button>
            <Button color="inherit" className="text-white" onClick={() => router.push("/login")}>ログイン</Button>
          </>
        ) : (
          <>
            <Button onClick={() => router.push(`/user/${user.id}`)} color="inherit" className="text-white">マイページ</Button>
            <Button color="inherit" className="text-white">一覧画面</Button>
            <Button onClick={() => router.push('/user/dashboard')} color="inherit" className="text-white">ダッシュボード</Button>

            <IconButton color="inherit" onClick={handleMenuOpen} className="text-white">
              <AccountCircleOutlinedIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                className: "mt-2",
              }}
            >
              <MenuItem onClick={() => router.push('/user/article/create')}>記事作成</MenuItem>
              <MenuItem onClick={() => router.push('/user/article/[user_id]/edit')}>ユーザー編集</MenuItem>
              <MenuItem onClick={handleMenuClose}>ログアウト</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </Toolbar>
   </AppBar>
  );
};

export default Header;