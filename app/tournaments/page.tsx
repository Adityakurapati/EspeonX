'use client'
import { useState, useEffect } from "react";
import { Trophy, Calendar, Users, ChevronRight, Loader2, Mail, KeyRound } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

async function sendVerificationEmail(email) {
  try {
    const response = await fetch('/api/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

export default function Tournaments() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [tournaments, setTournaments] = useState([
    { id: 1, name: "Kanto League", date: "2023-06-01", status: "Upcoming", participants: 128 },
    { id: 2, name: "Johto Cup", date: "2023-07-15", status: "Registration Open", participants: 64 },
    { id: 3, name: "Hoenn Challenge", date: "2023-08-30", status: "Coming Soon", participants: 256 },
  ]);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('tournaments_authenticated');
    if (isAuthenticated === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleSendCode = async () => {
    if (!userEmail) {
      setError('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    const sent = await sendVerificationEmail(userEmail);
    setIsLoading(false);
    
    if (sent) {
      setCodeSent(true);
      setError('');
    } else {
      setError('Failed to send verification code. Please try again.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, code: verificationCode }),
      });

      if (response.ok) {
        sessionStorage.setItem('tournaments_authenticated', 'true');
        setIsVerified(true);
        setError('');
      } else {
        setError('Invalid verification code');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreTournaments = () => {
    setTournaments([
      ...tournaments,
      { id: 4, name: "Sinnoh Masters", date: "2023-09-20", status: "Announced", participants: 128 },
      { id: 5, name: "Unova League", date: "2023-10-10", status: "Coming Soon", participants: 512 },
    ]);
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md transform transition-all duration-300 ease-in-out hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-6">
              <Trophy className="w-12 h-12 text-blue-500 mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-center text-white">Tournament Access</h2>
              <p className="text-gray-500 text-center mt-2">Verify your account to view tournaments</p>
            </div>
            
            <div className="space-y-6">
              {!codeSent ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    className="w-full transform transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleSendCode}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Send Verification Code
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button 
                    className="w-full transform transition-all duration-200 hover:scale-[1.02]"
                    onClick={handleVerifyCode}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Verify Code
                  </Button>
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md animate-shake">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 min-h-screen mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Tournaments</h1>
        <Trophy className="w-8 h-8 text-blue-500" />
      </div>
      
      <div className="grid gap-4 ">
        {tournaments.map((tournament, index) => (
          <Card 
            key={tournament.id} 
            className="overflow-hidden bg-slate-800/50 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{tournament.name}</h2>
                  <div className="flex flex-wrap items-center text-gray-500 gap-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {tournament.date}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tournament.participants} Players
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-blue-500 font-medium">{tournament.status}</span>
                  <Link href={`/tournaments/${tournament.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="transform transition-all duration-200 hover:scale-[1.05]"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Button 
        className="mt-8 transform transition-all duration-200 hover:scale-[1.02]"
        onClick={loadMoreTournaments}
      >
        Load More Tournaments
      </Button>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}