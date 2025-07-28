"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

// You can pass weekData as props, or import it from a shared location
const weekData = [
  { day: "Sun", time: 3 },
  { day: "Mon", time: 5 },
  { day: "Tue", time: 2 },
  { day: "Wed", time: 6 },
  { day: "Thu", time: 7 },
  { day: "Fri", time: 5 },
  { day: "Sat", time: 3 },
];

export default function WeeklyLearningGoalCard() {
  const [goal, setGoal] = useState(7); // days/week

  const handleIncrement = () => {
    if (goal < 7) setGoal(goal + 1);
  };

  const handleDecrement = () => {
    if (goal > 1) setGoal(goal - 1);
  };

  return (
    <Card className="w-full rounded-2xl shadow-lg px-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Weekly Learning Goal</CardTitle>
            <CardDescription>Set your weekly learning days target</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleDecrement}
              disabled={goal <= 1}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{goal}</span>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleIncrement}
              disabled={goal >= 7}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* Bar Chart */}
        <div className="w-full flex items-end gap-2 h-40 mb-4">
          {weekData.map((d) => (
            <div key={d.day} className="flex flex-col items-center justify-end flex-1">
              <div
                style={{ height: `${d.time * 1.5}rem` }}
                className="w-8 rounded-lg bg-blue-500 border-2 border-blue-400"
              ></div>
              <span className="text-xs mt-1 text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
