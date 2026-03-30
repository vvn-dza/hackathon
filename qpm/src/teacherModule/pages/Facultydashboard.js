import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CountUp = ({ end, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
};

export default function Facultydashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Questions", value: 1240, emoji: "❓" },
    { label: "Papers Generated", value: 85, emoji: "📄" },
    { label: "Recent Activity", value: 12, emoji: "📊" },
  ];

  const actions = [
    {
      title: "Question Bank",
      desc: "Manage and organize your question repository for all subjects.",
      emoji: "🗂️",
      path: "/faculty-dashboard/questions",
    },
    {
      title: "Generate Paper",
      desc: "Quickly generate new question papers using predefined patterns.",
      emoji: "✨",
      path: "/faculty-dashboard/generate",
    },
  ];

  return (
    <Box sx={{ maxWidth: "900px" }}>
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      {/* Page Header */}
      <Box sx={{ mb: "32px", animation: "fadeUp 0.4s ease" }}>
        <Typography sx={{ fontSize: "48px", mb: 1 }}>📋</Typography>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Faculty Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: "#9B9A97", fontSize: "15px" }}>
          Manage your question bank and generate papers for your subjects.
        </Typography>
      </Box>

      <Divider sx={{ mb: "32px", borderColor: "#E9E9E7" }} />

      {/* Stats Section */}
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 500,
          color: "#9B9A97",
          textTransform: "uppercase",
          letterSpacing: "1px",
          mb: "12px",
        }}
      >
        OVERVIEW
      </Typography>
      <Grid container spacing={2} sx={{ mb: "40px" }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={stat.label}>
            <Box
              sx={{
                p: "20px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E9E9E7",
                borderRadius: "10px",
                transition: "box-shadow 0.15s ease",
                animation: `fadeUp 0.4s ease ${index * 0.06}s forwards`,
                opacity: 0,
                "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.07)" },
              }}
            >
              <Typography sx={{ fontSize: "24px", mb: 1 }}>{stat.emoji}</Typography>
              <Typography sx={{ fontFamily: '"Fira Code", monospace', fontSize: "28px", fontWeight: 600, color: "#37352F" }}>
                <CountUp end={stat.value} />
              </Typography>
              <Typography variant="caption" sx={{ color: "#9B9A97", fontSize: "13px" }}>
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 500,
          color: "#9B9A97",
          textTransform: "uppercase",
          letterSpacing: "1px",
          mb: "12px",
        }}
      >
        QUICK ACTIONS
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action, index) => (
          <Grid item xs={12} sm={6} key={action.title}>
            <Box
              onClick={() => navigate(action.path)}
              sx={{
                p: "24px",
                height: "100%",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E9E9E7",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                animation: `fadeUp 0.4s ease ${(index + 3) * 0.06}s forwards`,
                opacity: 0,
                "&:hover": {
                  backgroundColor: "#FAFAFA",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  "& .arrow": { transform: "translateX(3px)", color: "#37352F" },
                },
              }}
            >
              <Typography sx={{ fontSize: "36px", mb: "12px" }}>{action.emoji}</Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#37352F" }}>
                {action.title}
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "#9B9A97", mt: "4px", lineHeight: 1.6 }}>
                {action.desc}
              </Typography>
              <Box
                className="arrow"
                sx={{
                  mt: "20px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#9B9A97",
                  transition: "all 0.15s ease",
                }}
              >
                Open →
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
