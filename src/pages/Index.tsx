import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GitCompare, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <span className="font-display text-xl font-bold gradient-text">FuturePath</span>
        <Link
          to="/simulate"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass-card text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            AI-Powered Life Simulation
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Preview Your Future
            <br />
            <span className="gradient-text">Before Making Life Decisions</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            AI-powered simulation that shows possible life outcomes based on your choices.
          </p>

          <Link to="/simulate">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-semibold text-primary-foreground bg-primary hover:brightness-110 transition-all animate-pulse-glow"
            >
              Simulate My Future
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl w-full"
        >
          {[
            {
              icon: Clock,
              title: "10-Year Timeline",
              desc: "See milestones, struggles, and breakthroughs mapped across a decade.",
            },
            {
              icon: Sparkles,
              title: "AI Predictions",
              desc: "Powered by advanced AI to generate realistic life scenarios.",
            },
            {
              icon: GitCompare,
              title: "Compare Paths",
              desc: "Simulate two decisions side-by-side and see which path leads where.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 text-left hover:border-primary/30 transition-colors"
            >
              <f.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
