"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Trophy, ChevronRight, Star, Vote, Users, Calendar, MapPin, Coins } from "lucide-react";

// Tournament Details Component
export function TournamentDetails() {
  const { id } = useParams();
  const [nftId, setNftId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
          <Trophy className="text-purple-400" />
          Tournament Details
        </h1>

        {!showDetails ? (
          <div className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Setup your NFT ID</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your NFT ID"
                  value={nftId}
                  onChange={(e) => setNftId(e.target.value)}
                  className="w-full p-4 bg-slate-800 text-white border border-purple-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white px-6 py-4 rounded-xl hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" />
                Enter Tournament
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 text-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-purple-400">Tournament #{id}</h2>
                <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300">
                  Active
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">Date</span>
                  </div>
                  <p>2023-06-15</p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-semibold">Location</span>
                  </div>
                  <p>Pokémon Stadium</p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-semibold">NFT ID</span>
                  </div>
                  <p>{nftId}</p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm font-semibold">Prize Pool</span>
                  </div>
                  <p>1,000,000 PokéCoins</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Participating Teams</h3>
                <div className="space-y-3">
                  {["Team Rocket", "Ash & Friends", "Gym Leaders United", "Elite Four Challengers"].map((team, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="text-purple-400" />
                        <span>{team}</span>
                      </div>
                      <ChevronRight className="text-purple-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}