import LoginForm from "../../components/LoginForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 bg-cover bg-center">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Pokemon Game</h1>
      <LoginForm />
    </main>
  )
}

