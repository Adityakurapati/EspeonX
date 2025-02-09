'use client'
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import { 
  Trophy, Users, Shield, DollarSign, 
  Calendar, ChevronDown, Filter, AlertTriangle,
  ArrowUpRight, Award
} from "lucide-react"

const TournamentStats = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAntiCheatModalOpen, setIsAntiCheatModalOpen] = useState(false)
  const [expandedTournament, setExpandedTournament] = useState(null)
  
  // Sample data
  const rewardsData = {
    month: [
      { name: 'Week 1', rewards: 25000, participants: 1200, violations: 12 },
      { name: 'Week 2', rewards: 28000, participants: 1350, violations: 8 },
      { name: 'Week 3', rewards: 32000, participants: 1500, violations: 15 },
      { name: 'Week 4', rewards: 35000, participants: 1800, violations: 10 }
    ],
    quarter: [
      { name: 'Month 1', rewards: 85000, participants: 4050, violations: 35 },
      { name: 'Month 2', rewards: 95000, participants: 4500, violations: 28 },
      { name: 'Month 3', rewards: 105000, participants: 5100, violations: 42 }
    ]
  }

  const recentTournaments = [
    {
      id: 1,
      name: "Championship Series Finals",
      date: "2025-02-08",
      prizePool: 50000,
      participants: 256,
      antiCheatActions: 5,
      topWinners: [
        { name: "ProGamer123", reward: 15000, rank: 1 },
        { name: "ElitePlayer", reward: 10000, rank: 2 },
        { name: "VictoryMaster", reward: 5000, rank: 3 }
      ]
    },
    {
      id: 2,
      name: "Regional Qualifier Round",
      date: "2025-02-07",
      prizePool: 25000,
      participants: 128,
      antiCheatActions: 3,
      topWinners: [
        { name: "GameWizard", reward: 8000, rank: 1 },
        { name: "SkillMaster", reward: 5000, rank: 2 },
        { name: "ProChampion", reward: 3000, rank: 3 }
      ]
    }
  ]

  const categoryStats = [
    { name: 'Amateur', value: 45 },
    { name: 'Semi-Pro', value: 30 },
    { name: 'Professional', value: 25 }
  ]

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef']

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/10 rounded-full"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <FloatingParticles />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Tournament Rewards Dashboard
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Track tournament statistics, reward distribution, and anti-cheat measures in real-time
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Trophy, label: "Total Tournaments", value: "156", color: "from-blue-500 to-blue-600" },
            { icon: DollarSign, label: "Total Rewards", value: "$285,000", color: "from-green-500 to-green-600" },
            { icon: Users, label: "Participants", value: "12,450", color: "from-purple-500 to-purple-600" },
            { icon: Shield, label: "Anti-Cheat Actions", value: "95", color: "from-red-500 to-red-600" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon size={24} />
              </div>
              <h3 className="text-gray-400 text-sm">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Rewards Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Rewards Distribution</h2>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white/10 rounded-lg px-3 py-1"
              >
                <option value="month">Monthly</option>
                <option value="quarter">Quarterly</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rewardsData[selectedTimeframe]}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="rewards" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Participant Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Participant Categories</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {categoryStats.map((category, index) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Tournaments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Tournaments</h2>
          <div className="space-y-4">
            {recentTournaments.map((tournament) => (
              <motion.div
                key={tournament.id}
                className="bg-white/5 rounded-lg p-4"
                initial={false}
                animate={{ height: expandedTournament === tournament.id ? 'auto' : '80px' }}
              >
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedTournament(
                    expandedTournament === tournament.id ? null : tournament.id
                  )}
                >
                  <div>
                    <h3 className="font-semibold">{tournament.name}</h3>
                    <p className="text-sm text-gray-400">{tournament.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-green-400">${tournament.prizePool.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">{tournament.participants} participants</p>
                    </div>
                    <ChevronDown 
                      className={`transform transition-transform ${
                        expandedTournament === tournament.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedTournament === tournament.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <h4 className="font-semibold mb-2">Top Winners</h4>
                      <div className="space-y-2">
                        {tournament.topWinners.map((winner) => (
                          <div key={winner.name} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Award className={`
                                ${winner.rank === 1 ? 'text-yellow-400' : 
                                  winner.rank === 2 ? 'text-gray-400' : 'text-orange-400'}
                              `} />
                              <span>{winner.name}</span>
                            </div>
                            <span className="text-green-400">
                              ${winner.reward.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <AlertTriangle size={16} />
                          <span>{tournament.antiCheatActions} anti-cheat actions taken</span>
                        </div>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          View Full Report
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TournamentStats