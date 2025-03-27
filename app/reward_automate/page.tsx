'use client'
import React, { useState, useEffect } from 'react';
import { Crosshair, Sword, Shield, Zap, Trophy, Medal, Brain, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import sendETH from '../EthTransfer';

const gameData = {
  valorant: {
    teamA: {
      name: 'CSA',
      acc_id: "0x2E7358E129E8Cde6E495B01C2202926DBb898A2C",
      metrics: {
        aimAccuracy: {
          score: 75,
          details: 'Headshot %: 32%, First Shot Accuracy: 68%'
        },
        teamStrategy: {
          score: 85,
          details: 'Site Execute Success: 65%, Retake Success: 70%'
        },
        utilityUsage: {
          score: 90,
          details: 'Utility Damage/Round: 45, Flash Assists: 8/game'
        },
        economyManagement: {
          score: 45,
          details: 'Eco Round Win %: 25%, Force Buy Success: 40%'
        }
      },
      topAgents: ['Jett', 'Sova', 'Omen']
    },
    teamB: {
      name: 'CSB',
      acc_id: "0xBab04b1a4142d6682B034973c0566d3c343262bB",
      metrics: {
        aimAccuracy: {
          score: 80,
          details: 'Headshot %: 35%, First Shot Accuracy: 72%'
        },
        teamStrategy: {
          score: 95,
          details: 'Site Execute Success: 75%, Retake Success: 80%'
        },
        utilityUsage: {
          score: 85,
          details: 'Utility Damage/Round: 52, Flash Assists: 10/game'
        },
        economyManagement: {
          score: 60,
          details: 'Eco Round Win %: 30%, Force Buy Success: 45%'
        }
      },
      topAgents: ['Reyna', 'Viper', 'Killjoy']
    }
  },
  bgmi: {
    teamA: {
      name: 'CSA',
      acc_id: "0x2E7358E129E8Cde6E495B01C2202926DBb898A2C",
      metrics: {
        aimAccuracy: {
          score: 82,
          details: 'Headshot %: 28%, Average Damage: 450'
        },
        teamStrategy: {
          score: 88,
          details: 'Rotation Success: 75%, Position Advantage: 80%'
        },
        utilityUsage: {
          score: 70,
          details: 'Utility Effectiveness: 65%, Smoke Coverage: 75%'
        },
        economyManagement: {
          score: 85,
          details: 'Loot Distribution: 85%, Vehicle Usage: 90%'
        }
      },
      topAgents: ['Assault', 'Scout', 'Support']
    },
    teamB: {
      name: 'CSB',
      acc_id: "0xBab04b1a4142d6682B034973c0566d3c343262bB",
      metrics: {
        aimAccuracy: {
          score: 78,
          details: 'Headshot %: 25%, Average Damage: 420'
        },
        teamStrategy: {
          score: 92,
          details: 'Rotation Success: 85%, Position Advantage: 88%'
        },
        utilityUsage: {
          score: 75,
          details: 'Utility Effectiveness: 70%, Smoke Coverage: 80%'
        },
        economyManagement: {
          score: 80,
          details: 'Loot Distribution: 80%, Vehicle Usage: 85%'
        }
      },
      topAgents: ['Rusher', 'Sniper', 'IGL']
    }
  },
  freefire: {
    teamA: {
      name: 'CSA',
      acc_id: "0x2E7358E129E8Cde6E495B01C2202926DBb898A2C",
      metrics: {
        aimAccuracy: {
          score: 85,
          details: 'Headshot %: 40%, Kill/Death: 2.5'
        },
        teamStrategy: {
          score: 75,
          details: 'Zone Control: 70%, Rush Success: 65%'
        },
        utilityUsage: {
          score: 80,
          details: 'Skill Usage: 75%, Character Synergy: 85%'
        },
        economyManagement: {
          score: 90,
          details: 'Resource Management: 88%, Upgrades Efficiency: 92%'
        }
      },
      topAgents: ['Alok', 'K', 'Chrono']
    },
    teamB: {
      name: 'CSB',
      acc_id: "0xBab04b1a4142d6682B034973c0566d3c343262bB",
      metrics: {
        aimAccuracy: {
          score: 88,
          details: 'Headshot %: 45%, Kill/Death: 2.8'
        },
        teamStrategy: {
          score: 82,
          details: 'Zone Control: 80%, Rush Success: 75%'
        },
        utilityUsage: {
          score: 85,
          details: 'Skill Usage: 82%, Character Synergy: 88%'
        },
        economyManagement: {
          score: 78,
          details: 'Resource Management: 75%, Upgrades Efficiency: 80%'
        }
      },
      topAgents: ['DJ Alok', 'Skyler', 'Dimitri']
    }
  }
};

const calculateTeamStrength = (metrics) => {
  return Object.values(metrics).reduce((acc, val) => acc + val.score, 0) / Object.values(metrics).length;
};


export default function EsportsComparison() {
  const [selectedGame, setSelectedGame] = useState('valorant');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [winner, setWinner] = useState(null);
  const [teamA, setTeamA] = useState(gameData[selectedGame].teamA);
  const [teamB, setTeamB] = useState(gameData[selectedGame].teamB);

  useEffect(() => {
    setTeamA(gameData[selectedGame].teamA);
    setTeamB(gameData[selectedGame].teamB);
    setAnalysisComplete(false);
  }, [selectedGame]);

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'aimAccuracy': return <Crosshair className="w-5 h-5" />;
      case 'teamStrategy': return <Brain className="w-5 h-5" />;
      case 'utilityUsage': return <Zap className="w-5 h-5" />;
      case 'economyManagement': return <Shield className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);

  const handleAutomate = (accId:any) => () => {
    console.log("Transaction Started");
    console.log("ACC ID:", winner.acc_id);

    setIsLoading(true);
    setLoadingProgress(0);

    try {
      sendETH("0xd03ea8624C8C5987235048901fB614fDcA89b117", accId.toString())
        .then((result) => {
          console.log("Transaction Successful:", result);
          setTransactionComplete(true);
          setLoadingProgress(100);
          setTimeout(() => {
            setTransactionComplete(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Transaction Failed:", error);
          setLoadingProgress(0);
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error in handleTrading:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };


  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const scoreA = calculateTeamStrength(teamA.metrics);
      const scoreB = calculateTeamStrength(teamB.metrics);
      setWinner(scoreA > scoreB ? teamA : teamB);
      setAnalysisComplete(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const ProgressBar = ({ value }) => (
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-purple-500 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const TeamCard = ({ team, animate }) => (
    <Card className="w-full max-w-md bg-gray-900 text-white">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-purple-400" />
          {team.name}
        </h2>

        <div className="space-y-6">
          {Object.entries(team.metrics).map(([metric, data]) => (
            <div key={metric} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getMetricIcon(metric)}
                  <span className="capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <span className="text-sm font-medium">{data.score}%</span>
              </div>
              <ProgressBar value={data.score} />
              <p className="text-sm text-gray-400">{data.details}</p>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-semibold mb-2">Top Agents/Roles</h3>
            <div className="flex flex-wrap gap-2">
              {team.topAgents.map(agent => (
                <span key={agent} className="px-3 py-1 bg-purple-900 rounded-full text-sm">
                  {agent}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl space-y-8">
        <div className="flex justify-center mb-8">
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-48 bg-gray-900 text-white border-purple-500">
              <SelectValue placeholder="Select Game" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border-purple-500">
              <SelectItem value="valorant">Valorant</SelectItem>
              <SelectItem value="bgmi">BGMI</SelectItem>
              <SelectItem value="freefire">Free Fire</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="transform transition-all duration-500 hover:scale-105">
            <TeamCard team={teamA} animate={isAnalyzing} />
          </div>
          <div className="transform transition-all duration-500 hover:scale-105">
            <TeamCard team={teamB} animate={isAnalyzing} />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="bg-purple-600 hover:bg-purple-700 text-white transform transition-all duration-300 hover:scale-105"
          >
            {isAnalyzing ? (
              <span className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Analyzing Strategies...
              </span>
            ) : (
              'Start Analysis'
            )}
          </Button>
        </div>

        {analysisComplete && (
          <div className="animate-fadeIn">
            <Card className="bg-gray-900 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Medal className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-xl font-bold">Strategic Analysis</h3>
                    <p className="text-gray-400">Based on game performance and team coordination</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <Alert className="bg-purple-900 border-purple-700 text-white">
                    <AlertDescription className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                      Team {winner.name} shows superior strategic advantage
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Strengths:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      <li>Superior performance metrics</li>
                      <li>Better team coordination and strategy</li>
                      <li>More efficient resource management</li>
                      <li>Higher team synergy with agent/role composition</li>
                    </ul>
                    <button
                      className='bg-slate-700 px-6 py-4 hover:bg-slate-800 rounded-xl'
                      onClick={handleAutomate(winner.acc_id)}
                    >
                      Start Transfer to {winner.name}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}