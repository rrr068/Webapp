// ログインuserの詳細画面

"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Star, Article, PersonAdd } from '@mui/icons-material';
import { Button } from '@mui/material';
import { UserProfile } from '../../../types/UserProfile';
import { Axios } from 'axios';