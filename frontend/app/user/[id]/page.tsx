"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../../../contexts/UserContext'
import { Typography, Box, Chip, Card, CardContent } from '@mui/material'

type SkillCategory = {
  id: number;
  name: string;
};

type Skill = {
  id: number;
  name: string;
  skill_category: SkillCategory;
};

type UserSkill = {
  id: number;
  experience_years: number;
  experience_years_text: string;
  skill: Skill;
};

type JobType = {
  id: number;
  name: string;
};

type DetailedUser = {
  id: number;
  name: string;
  description: string;
  github_account: string;
  job_type: JobType;
  user_skills: UserSkill[];
};

const UserDetail = () => {
  const { user } = useUser();
  const [detailedUser, setDetailedUser] = useState<DetailedUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      const accessToken = localStorage.getItem('access-token');
      const client = localStorage.getItem('client');
      const uid = localStorage.getItem('uid');

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
          {
            headers: {
              'access-token': accessToken,
              client,
              uid,
            },
          }
        );
        console.log('詳細ユーザーデータ:', res.data);
        setDetailedUser(res.data);
      } catch (err) {
        console.error('ユーザー詳細の取得に失敗しました:', err);
      }
    };

    fetchUser();
  }, [user]);

  if (!detailedUser) return <p>読み込み中...</p>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{detailedUser.name}</Typography>
          <Typography variant="body2" gutterBottom>
            {detailedUser.description}
          </Typography>
          <Typography variant="body2" gutterBottom>
            職種: {detailedUser.job_type?.name ?? '未設定'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            GitHub: {detailedUser.github_account || '未設定'}
          </Typography>
          <Box mt={2}>
            <Typography variant="subtitle1">スキル</Typography>
            {detailedUser.user_skills.map((us) => (
              <Chip
                key={us.skill.id}
                label={`${us.skill.name}（${us.experience_years_text}）`}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetail;
