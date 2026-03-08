import { motion } from "framer-motion";
import type { TimelineEvent } from "@/pages/Timeline";

const TimelineCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-14"
    >
      {/* Dot */}
      <div className="absolute left-3 top-4 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

      <div className="glass-card rounded-2xl p-5 hover:border-primary/30 transition-colors">
        <span className="text-xs font-semibold text-primary font-display">{event.year}</span>
        <h3 className="font-display font-semibold text-foreground text-lg mt-1">{event.title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium">
          {event.impact}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
