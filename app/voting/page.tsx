"use client"

import { useState } from "react"
import { Vote ,Star} from "lucide-react";

export default function Voting() {
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "Kanto League",
      teams: [
        { id: 1, name: "Team Rocket", votes: 145, trend: "+12%" },
        { id: 2, name: "Ash & Friends", votes: 230, trend: "+18%" },
        { id: 3, name: "Gym Leaders United", votes: 189, trend: "+8%" },
        { id: 4, name: "Elite Four Challengers", votes: 167, trend: "+15%" },
      ],
    },
    {
      id: 2,
      name: "Johto Cup",
      teams: [
        { id: 5, name: "Team Mystic", votes: 178, trend: "+20%" },
        { id: 6, name: "Silver Squad", votes: 156, trend: "+5%" },
        { id: 7, name: "Gold Rush", votes: 198, trend: "+22%" },
        { id: 8, name: "Crystal Crew", votes: 134, trend: "+10%" },
      ],
    },
  ]);

  const handleVote = (tournamentId:any, teamId:any) => {
    setTournaments(
      tournaments.map((tournament) => {
        if (tournament.id === tournamentId) {
          return {
            ...tournament,
            teams: tournament.teams.map((team) => {
              if (team.id === teamId) {
                return { ...team, votes: team.votes + 1 };
              }
              return team;
            }),
          };
        }
        return tournament;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
          <Vote className="text-purple-400" />
          Team Voting
        </h1>

        <div className="space-y-8">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">{tournament.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tournament.teams.map((team) => (
                  <div
                    key={team.id}
                    className="group bg-slate-800/50 p-6 rounded-xl hover:bg-slate-800 transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white">{team.name}</h3>
                      <span className="text-green-400">{team.trend}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-300">
                        <Star className="w-4 h-4" />
                        <span>{team.votes} votes</span>
                      </div>
                      <button
                        onClick={() => handleVote(tournament.id, team.id)}
                        className="bg-purple-500 text-white px-6 py-2 rounded-xl hover:bg-purple-600 transition-colors flex items-center gap-2"
                      >
                        <Vote className="w-4 h-4" />
                        Vote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}