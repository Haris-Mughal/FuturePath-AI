import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import TimelineCard from "@/components/TimelineCard";

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  impact: string;
}

const Timeline = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { timeline, inputs } = (location.state as { timeline: TimelineEvent[]; inputs: any }) || {};

  if (!timeline) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No timeline data. Run a simulation first.</p>
          <Link to="/simulate" className="text-primary hover:underline">Go to Simulation</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-4">
          <Link to="/simulate" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-display text-xl font-bold gradient-text">FuturePath</span>
        </div>
        <button
          onClick={() => navigate("/simulate")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          New Simulation
        </button>
      </nav>

      <main className="relative z-10 max-w-2xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Your <span className="gradient-text">Future Timeline</span>
          </h1>
          {inputs && (
            <p className="text-muted-foreground text-sm">
              {inputs.careerPath} · {inputs.riskTolerance} risk · Goal: {inputs.mainGoal}
            </p>
          )}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {timeline.map((event: TimelineEvent, i: number) => (
              <TimelineCard key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timeline;
