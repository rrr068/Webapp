// ログインuserの詳細画面

"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Star, Article, PersonAdd } from '@mui/icons-material';
import { Button } from '@mui/material';
import { UserProfile } from '../../../types/UserProfile';
import axios from 'axios';
import { useUser } from "../../../contexts/UserContext"

const UserDetail = () => {
  const { user } = useUser()
  return (
    <>
      {user.id}
      {user.name}
    </>
  )
}

export default UserDetail