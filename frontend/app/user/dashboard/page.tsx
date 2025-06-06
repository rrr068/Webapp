// userのダッシュボード画面

"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Star, Article, PersonAdd } from '@mui/icons-material';
import { Button } from '@mui/material';
import { UserProfile } from '../../../types/UserProfile';

const Dashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // API呼び出しでユーザー情報を取得 (ダミーデータで代用)
    const fetchProfile = async () => {
      const fetchedProfile: UserProfile = {
        name: 'John Doe',
        rating: 4.5, // 例えばAPIから取得した評価
        articleCount: 10, // 記事数
        followersCount: 150, // フォロワー数
        followingCount: 80, // フォロー数
      };
      setProfile(fetchedProfile);
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-8">
      <Box className="max-w-3xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="text-center">
          <Typography variant="h4" className="text-gray-800 font-semibold">
            {/* {profile.name}のマイページ */}
          </Typography>
        </div>

        {/* ユーザー情報 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 自分の評価 */}
          <Card className="bg-white shadow-lg p-4">
            <CardContent>
              <div className="flex items-center space-x-2">
                <Star color="primary" />
                <Typography variant="h6" className="text-gray-700">
                  評価
                </Typography>
              </div>
              <Typography variant="h5" className="text-gray-800 mt-2">
                {/* {profile.rating ? profile.rating : '評価なし'} */}
                /5
              </Typography>
            </CardContent>
          </Card>

          {/* 記事数 */}
          <Card className="bg-white shadow-lg p-4">
            <CardContent>
              <div className="flex items-center space-x-2">
                <Article color="primary" />
                <Typography variant="h6" className="text-gray-700">
                  記事数
                </Typography>
              </div>
              <Typography variant="h5" className="text-gray-800 mt-2">
                {/* {profile.articleCount} */}
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* フォローとフォロワー数 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* フォロワー数 */}
          <Card className="bg-white shadow-lg p-4">
            <CardContent>
              <div className="flex items-center space-x-2">
                <PersonAdd color="primary" />
                <Typography variant="h6" className="text-gray-700">
                  フォロワー
                </Typography>
              </div>
              <Typography variant="h5" className="text-gray-800 mt-2">
                {/* {profile.followersCount} */}
              </Typography>
            </CardContent>
          </Card>

          {/* フォロー数 */}
          <Card className="bg-white shadow-lg p-4">
            <CardContent>
              <div className="flex items-center space-x-2">
                <PersonAdd color="primary" />
                <Typography variant="h6" className="text-gray-700">
                  フォロー
                </Typography>
              </div>
              <Typography variant="h5" className="text-gray-800 mt-2">
                {/* {profile.followingCount} */}
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* ボタン */}
        <div className="text-center">
          <Button variant="contained" color="primary" className="mt-6">
            設定を変更する
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Dashboard