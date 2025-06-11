// ユーザーの編集画面
"use client";

import { useState } from "react";
import axios from "axios";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Typography } from "@mui/material";
import { useUser } from "../../../../contexts/UserContext"

const UserEdit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [skills, setSkills] = useState([
    { skillId: "", experienceYears: "" },
  ]);
  const { user } = useUser()

  const jobTypes = [
    { label: "フロントエンド", value: "frontend" },
    { label: "バックエンド", value: "backend" },
    { label: "フルスタック", value: "fullstack" },
    { label: "DevOps", value: "devops" },
    { label: "デザイナー", value: "designer" },
  ];

  const skillList = [
    { id: 1, name: "Ruby" },
    { id: 2, name: "HTML" },
    { id: 3, name: "JavaScript" },
    { id: 4, name: "React" },
    { id: 5, name: "Rails" },
  ];

  const experienceYearsOptions = [
    { label: "1年", value: 1 },
    { label: "3年", value: 3 },
    { label: "5年以上", value: 5 },
  ];

  const handleSkillChange = (index: number, field: string, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { skillId: "", experienceYears: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
        {
          user: {
            name,
            description,
            job_type: jobType,
            github_account: githubUsername,
            skills: skills.map((s) => ({
              skill_id: s.skillId,
              experience_years: s.experienceYears,
            })),
          },
        },
        {
          headers: {
            "access-token": token,
            "client": client,
            "uid": uid,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("更新成功:", response.data);
    } catch (error) {
      console.error("更新失敗:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6 max-w-2xl mx-auto">
      <Typography variant="h5" className="text-center">ユーザー編集</Typography>

      <TextField
        fullWidth
        label="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="自己紹介"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel>職種</InputLabel>
        <Select
          value={jobType}
          label="職種"
          onChange={(e) => setJobType(e.target.value)}
        >
          {jobTypes.map((job) => (
            <MenuItem key={job.value} value={job.value}>
              {job.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <TextField
        fullWidth
        label="GitHubユーザー名"
        value={githubUsername}
        onChange={(e) => setGithubUsername(e.target.value)}
      /> */}

      <div className="space-y-4">
        <Typography variant="h6">スキル</Typography>

        {skills.map((skill, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <FormControl fullWidth>
              <InputLabel>スキル</InputLabel>
              <Select
                value={skill.skillId}
                label="スキル"
                onChange={(e) =>
                  handleSkillChange(index, "skillId", e.target.value)
                }
              >
                {skillList.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>経験年数</InputLabel>
              <Select
                value={skill.experienceYears}
                label="経験年数"
                onChange={(e) =>
                  handleSkillChange(index, "experienceYears", e.target.value)
                }
              >
                {experienceYearsOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}

        <Button variant="outlined" onClick={addSkill}>
          スキルを追加
        </Button>
      </div>

      <Button
        variant="contained"
        type="submit"
        className="w-full mt-4"
      >
        保存する
      </Button>
    </form>
  );
}

export default UserEdit