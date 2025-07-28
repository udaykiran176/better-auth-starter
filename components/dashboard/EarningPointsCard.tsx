"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

// Mock data for points
const points = 1540;
const percentChange = 12.5; // e.g., +12.5% from last week
const pointsData = [2, 4, 3, 7, 5, 6, 4, 7, 8, 10];

export default function EarningPointsCard() {
  // Generate SVG points
  const chartWidth = 180;
  const chartHeight = 60;
  const maxPoints = Math.max(...pointsData);
  const minPoints = Math.min(...pointsData);
  const pointsCount = pointsData.length;
  const stepX = chartWidth / (pointsCount - 1);
  const stepY = (val: number) => {
    if (maxPoints === minPoints) return chartHeight / 2;
    return chartHeight - ((val - minPoints) / (maxPoints - minPoints)) * (chartHeight - 10) - 5;
  };
  const svgPoints = pointsData.map((p, i) => `${i * stepX},${stepY(p)}`).join(" ");

  return (
    <Card className="w-full rounded-2xl shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-gray-500 font-medium">Earning Points</CardTitle>
        <CardDescription className="mb-2">get points by completing lessons</CardDescription>
        <div className="text-3xl font-extrabold text-gray-900">{points.toLocaleString()} <span className="text-base font-normal text-gray-500">pts</span></div>
        <div className={`text-sm ${percentChange >= 0 ? "text-green-600" : "text-red-600"} mt-1`}>
          {percentChange >= 0 ? "+" : "-"}{Math.abs(percentChange)}% from last week
        </div>
      </CardHeader>
      <CardContent>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-16 mt-2">
          <polyline
            fill="none"
            stroke="#7C3AED"
            strokeWidth="3"
            points={svgPoints}
          />
          {pointsData.map((p, i) => (
            <circle key={i} cx={i * stepX} cy={stepY(p)} r="3" fill="#7C3AED" />
          ))}
        </svg>
      </CardContent>
    </Card>
  );
}
