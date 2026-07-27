import { X, Mountain, Clock, ArrowUpRight, Camera } from "lucide-react";
import type { Trail } from "../data";

function getDifficultyColor(d: string) {
  if (d === "Easy" || d === "Easy-Moderate") return "bg-trail-green";
  if (d === "Moderate" || d === "Moderate-Hard") return "bg-amber-600";
  if (d === "Hard") return "bg-orange-700";
  return "bg-red-800";
}

export function TrailCard({ trail, onClick }: { trail: Trail; onClick: (t: Trail) => void }) {
  return (
    <button
      className="bg-sand rounded-xl overflow-hidden text-left group transition-all duration-300 hover:-translate-y-1 hover:shadow-card w-full"
      onClick={() => onClick(trail)}
    >
      <div className="overflow-hidden h-[180px] relative">
        <img
          src={trail.image}
          alt={trail.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {trail.imageIsReal && (
          <span className="absolute top-2 left-2 bg-black/40 text-white/80 text-[10px] font-body tracking-wider uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
            <Camera size={10} /> Photo
          </span>
        )}
        <span
          className={`absolute top-2 right-2 text-[10px] font-body tracking-wider uppercase px-2 py-0.5 rounded-full text-white ${getDifficultyColor(trail.difficulty)}`}
        >
          {trail.difficulty}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-[20px] text-deep-forest leading-tight">{trail.name}</h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="font-body text-[12px] text-stone">{trail.distance}</span>
          <span className="font-body text-[12px] text-stone">{trail.duration}</span>
          <span className="font-body text-[12px] text-stone">{trail.elevation}</span>
        </div>
        <p className="font-body text-[14px] text-deep-forest/65 mt-2 line-clamp-2 leading-relaxed">
          {trail.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {trail.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full border border-stone/25 text-stone font-body text-[10px] tracking-wider uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export function TrailPanel({ trail, onClose }: { trail: Trail; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="absolute right-0 top-0 h-full w-full md:w-[55vw] lg:w-[45vw] bg-warm-white overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="relative h-[35vh]">
          <img src={trail.image} alt={trail.name} className="w-full h-full object-cover" />
          {trail.imageIsReal && (
            <span className="absolute top-4 left-4 bg-black/50 text-white/80 text-[11px] font-body tracking-wider uppercase px-2 py-1 rounded flex items-center gap-1">
              <Camera size={12} /> Real Photo
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-warm-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 md:p-10">
          <h2 className="font-display text-[32px] md:text-[42px] text-deep-forest leading-tight">{trail.name}</h2>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className={`text-[11px] font-body tracking-wider uppercase px-3 py-1 rounded-full text-white ${getDifficultyColor(trail.difficulty)}`}>
              {trail.difficulty}
            </span>
            <span className="font-body text-[13px] text-stone flex items-center gap-1"><ArrowUpRight size={12} /> {trail.elevation}</span>
            <span className="font-body text-[13px] text-stone flex items-center gap-1"><Clock size={12} /> {trail.distance}</span>
            <span className="font-body text-[13px] text-stone">{trail.duration}</span>
          </div>
          <div className="w-full h-[1px] bg-deep-forest/10 my-6" />
          <p className="font-body text-[17px] text-deep-forest/80 leading-[1.7]">{trail.description}</p>
          <div className="mt-8">
            <h4 className="font-body text-[12px] tracking-[0.15em] uppercase text-stone mb-3 font-medium">Tips</h4>
            <ul className="space-y-2.5">
              {trail.tips.map((tip, i) => (
                <li key={i} className="font-body text-[15px] text-deep-forest/75 flex items-start gap-2.5">
                  <span className="text-ocean mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ocean" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h4 className="font-body text-[12px] tracking-[0.15em] uppercase text-stone mb-3 font-medium">Best For</h4>
            <div className="flex flex-wrap gap-2">
              {trail.bestFor.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full border border-deep-forest/15 text-deep-forest/80 font-body text-[13px]">{tag}</span>
              ))}
            </div>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean/10 text-ocean font-body text-[14px]">
            <Mountain size={15} /> {trail.region}
          </div>
        </div>
      </div>
    </div>
  );
}
