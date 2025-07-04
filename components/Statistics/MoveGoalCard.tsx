'use client'

import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useState }   from 'react'
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'

export default function MoveGoalCard() {
  const [goal, setGoal] = useState(400)

  return (
    <Card className="w-full md:max-w-xs bg-[#0b0e11] text-white">
      <CardHeader>
        <CardTitle className="text-white">Move Goal</CardTitle>
        <p className="text-sm text-muted-foreground">
          Set your daily activity goal.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-4">
        {/* +/- controls */}
        <div className="flex items-center gap-10">
          <button
            className="h-10 w-10 rounded-full bg-[#181c21] flex items-center justify-center"
            onClick={() => setGoal((g) => Math.max(100, g - 50))}
          >
            <Minus className="h-4 w-4" />
          </button>

          <motion.div
            key={goal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-5xl font-extrabold"
          >
            {goal}
          </motion.div>

          <button
            className="h-10 w-10 rounded-full bg-[#181c21] flex items-center justify-center"
            onClick={() => setGoal((g) => g + 50)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <span className="text-xs tracking-wide">CALORIES / DAY</span>

        {/* mini bar sparkline */}
        <div className="flex gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              style={{ height: `${20 + Math.sin(i) * 10 + 10}px` }}
              className="w-3 rounded bg-[#00b4ff]"
            />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <button className="w-full py-2 rounded-lg bg-white text-[#02152b] font-semibold">
          Set Goal
        </button>
      </CardFooter>
    </Card>
  )
}
