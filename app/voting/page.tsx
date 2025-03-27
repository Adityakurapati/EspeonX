'use client'
import { useState } from "react"
import { Vote, Star } from "lucide-react"
import PolicyProposals from "./PolicyProposals"
import sendETH from '../EthTransfer'

export default function Voting() {
  // Track loading state per tournament
  const [loadingStates, setLoadingStates] = useState({});
  const [transactionStates, setTransactionStates] = useState({});
  const [errorStates, setErrorStates] = useState({});

  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "Kanto League",
      votedFor: null,
      teams: [
        { id: 1, name: "Team Rocket", votes: 145, trend: "+12%", address: "0xd03ea8624C8C5987235048901fB614fDcA89b117" },
        { id: 2, name: "Ash & Friends", votes: 230, trend: "+18%", address: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC" },
        { id: 3, name: "Gym Leaders United", votes: 189, trend: "+8%", address: "0xd03ea8624C8C5987235048901fB614fDcA89b117" },
        { id: 4, name: "Elite Four Challengers", votes: 167, trend: "+15%", address: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC" },
      ],
    },
    {
      id: 2,
      name: "Johto Cup",
      votedFor: null,
      teams: [
        { id: 5, name: "Team Mystic", votes: 178, trend: "+20%", address: "0xd03ea8624C8C5987235048901fB614fDcA89b117" },
        { id: 6, name: "Silver Squad", votes: 156, trend: "+5%", address: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC" },
        { id: 7, name: "Gold Rush", votes: 198, trend: "+22%", address: "0xd03ea8624C8C5987235048901fB614fDcA89b117" },
        { id: 8, name: "Crystal Crew", votes: 134, trend: "+10%", address: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC" },
      ],
    },
  ])

  const handleETHTransfer = async (teamAddress, tournamentId) => {
    // Set loading state for this specific tournament
    setLoadingStates(prev => ({
      ...prev,
      [tournamentId]: true
    }));

    try {
      const result = await sendETH(
        "0xd03ea8624C8C5987235048901fB614fDcA89b117",
        teamAddress
      );
      console.log("Transaction Successful:", result);
      
      setTransactionStates(prev => ({
        ...prev,
        [tournamentId]: true
      }));

      // Clear transaction success state after 3 seconds
      setTimeout(() => {
        setTransactionStates(prev => ({
          ...prev,
          [tournamentId]: false
        }));
      }, 3000);

    } catch (error) {
      console.error("Transaction Failed:", error);
      setErrorStates(prev => ({
        ...prev,
        [tournamentId]: true
      }));

      // Clear error state after 3 seconds
      setTimeout(() => {
        setErrorStates(prev => ({
          ...prev,
          [tournamentId]: false
        }));
      }, 3000);
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        [tournamentId]: false
      }));
    }
  };

  const handleVote = async (tournamentId, teamId) => {
    // Check if any transaction is already processing for this tournament
    if (loadingStates[tournamentId]) {
      return;
    }

    const tournament = tournaments.find(t => t.id === tournamentId);
    
    // Check if this tournament already has a vote
    if (tournament.votedFor !== null) {
      return;
    }

    const team = tournament.teams.find(t => t.id === teamId);
    
    // Start ETH transfer
    await handleETHTransfer(team.address, tournamentId);
    
    // Update voting state only after successful transaction
    if (!errorStates[tournamentId]) {
      setTournaments(
        tournaments.map((tournament) => {
          if (tournament.id === tournamentId && tournament.votedFor === null) {
            return {
              ...tournament,
              votedFor: teamId,
              teams: tournament.teams.map((team) => {
                if (team.id === teamId) {
                  return { ...team, votes: team.votes + 1 }
                }
                return team
              }),
            }
          }
          return tournament
        })
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-8">
      <PolicyProposals />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
          <Vote className="text-purple-400" />
          Team Voting
        </h1>
        <div className="space-y-8">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {tournament.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {tournament.teams.map((team) => {
                  const isVoted = tournament.votedFor === team.id;
                  const hasVoted = tournament.votedFor !== null;
                  const isDisabled = hasVoted && !isVoted;
                  const isLoading = loadingStates[tournament.id];
                  const isTransactionComplete = transactionStates[tournament.id];
                  const hasError = errorStates[tournament.id];

                  return (
                    <div
                      key={team.id}
                      className={`group p-6 rounded-xl transition-all ${
                        isDisabled
                          ? "bg-slate-900/50 opacity-50"
                          : isVoted
                          ? "bg-slate-800 border-2 border-purple-500"
                          : "bg-slate-800/50 hover:bg-slate-800"
                      }`}
                    >
                      
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {team.name}
                        </h3>
                         
                        <span className="text-green-400">{team.trend}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-purple-300">
                          <Star className="w-4 h-4" />
                          <span>{team.votes} votes</span>
                        </div>
                        <div className="space-y-2">
                          {isVoted ? (
                            <span className="bg-purple-500/50 text-white px-6 py-2 rounded-xl flex items-center gap-2">
                              <Vote className="w-4 h-4" />
                              Voted
                            </span>
                          ) : (
                            <button
                              onClick={() => handleVote(tournament.id, team.id)}
                              disabled={hasVoted || isLoading}
                              className={`bg-purple-500 text-white px-6 py-2 rounded-xl transition-colors flex items-center gap-2 ${
                                hasVoted || isLoading
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-purple-600"
                              }`}
                            >
                              <Vote className="w-4 h-4" />Vote
                            </button>
                          )}
                          
                         
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}