'use client'
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeftRight, Loader2, Plus, X } from "lucide-react"

const Home = () => {
  const [selectedSkin, setSelectedSkin] = useState(null)
  const [isTradingStarted, setIsTradingStarted] = useState(false)
  const [selectedTrader, setSelectedTrader] = useState(null)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  
  const [skins, setSkins] = useState([
    { id: 1, img: "https://ik.imagekit.io/j9wgmlnwk/image.png?updatedAt=1739043884431", name: "Dragon Scale", value: 245, rarity: "Legendary" },
    { id: 2, img: "https://ik.imagekit.io/j9wgmlnwk/night_owl?updatedAt=1739043883165", name: "Night Owl", value: 180, rarity: "Rare" },
    { id: 3, img: "https://ik.imagekit.io/j9wgmlnwk/golden_rush?updatedAt=1739043883262", name: "Golden Rush", value: 320, rarity: "Epic" },
    { id: 4, img: "https://ik.imagekit.io/j9wgmlnwk/arctic_frost?updatedAt=1739043883525", name: "Arctic Frost", value: 195, rarity: "Rare" },
  ])

  const traders = [
    { id: 1, name: "Pro Trader", img: "https://ik.imagekit.io/j9wgmlnwk/image(1).png?updatedAt=1739043096087", success: 98, trades: 1200, speciality: "Rare Items" },
    { id: 2, name: "Skin Master", img: "https://ik.imagekit.io/j9wgmlnwk/image(3).png?updatedAt=1739043107914", success: 95, trades: 856, speciality: "Epic Items" },
    { id: 3, name: "Elite Dealer", img: "https://ik.imagekit.io/j9wgmlnwk/image(5).png?updatedAt=1739043142956", success: 97, trades: 2300, speciality: "Legendary Items" },
    { id: 4, name: "Ultimate Collector", img: "https://ik.imagekit.io/j9wgmlnwk/image.png?updatedAt=1739043040065", success: 96, trades: 1800, speciality: "Exclusive Items" },
    { id: 5, name: "Mystic Trader", img: "https://ik.imagekit.io/j9wgmlnwk/image(2).png?updatedAt=1739043096333", success: 94, trades: 1450, speciality: "Mythical Items" },
    { id: 6, name: "Shadow Merchant", img: "https://ik.imagekit.io/j9wgmlnwk/image(4).png?updatedAt=1739043143257", success: 99, trades: 2750, speciality: "Dark Items" },
];


  useEffect(() => {
    if (selectedTrader) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [selectedTrader])

  const filteredSkins = skins
    .filter(skin => 
      skin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skin.rarity.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "value") return b.value - a.value
      return 0
    })

  const loadMoreSkins = () => {
    const newSkins = [
      { id: skins.length + 1, img: "https://ik.imagekit.io/j9wgmlnwk/image(5).png", name: "New Skin", value: 210, rarity: "Epic" },
      { id: skins.length + 2, img: "https://ik.imagekit.io/j9wgmlnwk/image(6).png", name: "Rare Find", value: 275, rarity: "Rare" },
      { id: skins.length + 3, img: "https://ik.imagekit.io/j9wgmlnwk/image(7).png", name: "Epic Loot", value: 340, rarity: "Legendary" },
    ]
    setSkins(prev => [...prev, ...newSkins])
  }

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
    <div className="relative min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 md:p-8">
      <FloatingParticles />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-white text-center max-w-6xl w-full"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Skin Trading Hub
          </span>
        </h1>

        {/* Search and Sort Controls */}
        {!isTradingStarted && (
          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Search skins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="name">Sort by Name</option>
              <option value="value">Sort by Value</option>
            </select>
          </div>
        )}
        
        {/* Selected Skin Display */}
        <AnimatePresence>
          {selectedSkin && !isTradingStarted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl mb-2">Selected Skin</h2>
                <button
                  onClick={() => setSelectedSkin(null)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <motion.img 
                  src={selectedSkin.img}
                  alt={selectedSkin.name}
                  className="w-32 h-32 rounded-lg object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <div>
                  <p className="text-xl">{selectedSkin.name}</p>
                  <p className="text-green-400">${selectedSkin.value}</p>
                  <p className="text-sm text-purple-300">{selectedSkin.rarity}</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsTradingStarted(true)}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Trading
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trader Selection */}
        <AnimatePresence>
          {isTradingStarted && !selectedTrader && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <h2 className="text-2xl mb-6">Select Your Trader</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {traders.map((trader, index) => (
                  <motion.div
                    key={trader.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedTrader(trader)}
                    className="p-4 bg-white/10 rounded-xl backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all"
                  >
                    <img src={trader.img} alt={trader.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
                    <h3 className="text-xl font-semibold">{trader.name}</h3>
                    <p className="text-green-400">Success Rate: {trader.success}%</p>
                    <p className="text-sm text-gray-300">Total Trades: {trader.trades}</p>
                    <p className="text-sm text-purple-300">Speciality: {trader.speciality}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trading Status */}
        <AnimatePresence>
          {selectedTrader && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm"
            >
              <h2 className="text-2xl mb-4">Trading in Progress</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <motion.div 
                  className="text-center"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <img src={selectedSkin.img} alt={selectedSkin.name} className="w-20 h-20 rounded-lg mb-2" />
                  <p>{selectedSkin.name}</p>
                </motion.div>
                <div className="text-2xl">
                  <ArrowLeftRight className="animate-pulse" />
                </div>
                <motion.div 
                  className="text-center"
                  animate={{ x: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <img src={selectedTrader.img} alt={selectedTrader.name} className="w-20 h-20 rounded-full mb-2" />
                  <p>{selectedTrader.name}</p>
                </motion.div>
              </div>
              <div className="mt-6 w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <p className="text-yellow-400">Processing trade... {loadingProgress}%</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skin Grid */}
        {!selectedTrader && (
          <motion.div layout>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              <AnimatePresence>
                {filteredSkins.map((skin, index) => (
                  <motion.div
                    key={skin.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      transition: { delay: index * 0.05 }
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedSkin(skin)}
                    className={`relative cursor-pointer group ${
                      selectedSkin?.id === skin.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={skin.img}
                      alt={skin.name}
                      className="w-full aspect-square object-cover rounded-lg shadow-lg transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center">
                      <p className="text-white font-semibold">{skin.name}</p>
                      <p className="text-green-400">${skin.value}</p>
                      <p className="text-sm text-purple-300">{skin.rarity}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.button
              onClick={loadMoreSkins}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Load More Skins
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Home