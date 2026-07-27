import { X, Waves, Check, XIcon, Camera } from "lucide-react";
import type { Beach } from "../data";

export function BeachCard({ beach, onClick }: { beach: Beach; onClick: (b: Beach) => void }) {
  return (
    <button
      className="bg-warm-white rounded-xl overflow-hidden text-left group transition-all duration-300 hover:-translate-y-1 hover:shadow-card w-full"
      onClick={() => onClick(beach)}
    >
      <div className="overflow-hidden h-[180px] relative">
        <img
          src={beach.image}
          alt={beach.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {beach.imageIsReal && (
          <span className="absolute top-2 left-2 bg-black/40 text-white/80 text-[10px] font-body tracking-wider uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
            <Camera size={10} /> Photo
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-[20px] text-deep-forest leading-tight">{beach.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i <= beach.crowdLevel ? "bg-wave-blue" : "bg-stone/25"}`} />
          ))}
          <span className="font-body text-[11px] text-stone ml-1">{beach.crowdLabel}</span>
        </div>
        <p className="font-body text-[14px] text-deep-forest/65 mt-2 line-clamp-2 leading-relaxed">{beach.description}</p>
        <div className="flex items-center gap-2 mt-3">
          {beach.activities.slice(0, 3).map((act) => (
            <span key={act} className="flex items-center text-stone"><Waves size={12} /></span>
          ))}
          <span className="font-body text-[10px] text-stone tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border border-stone/25">{beach.region}</span>
        </div>
      </div>
    </button>
  );
}

export function BeachPanel({ beach, onClose }: { beach: Beach; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="absolute right-0 top-0 h-full w-full md:w-[55vw] lg:w-[45vw] bg-warm-white overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="relative h-[35vh]">
          <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
          {beach.imageIsReal && (
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
          <h2 className="font-display text-[32px] md:text-[42px] text-deep-forest leading-tight">{beach.name}</h2>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= beach.crowdLevel ? "bg-wave-blue" : "bg-stone/25"}`} />
              ))}
              <span className="font-body text-[12px] text-stone ml-1.5">{beach.crowdLabel}</span>
            </div>
            <span className="font-body text-[12px] tracking-[0.12em] uppercase text-stone px-2 py-0.5 rounded-full border border-stone/25">{beach.region}</span>
          </div>
          <div className="w-full h-[1px] bg-deep-forest/10 my-6" />
          <p className="font-body text-[17px] text-deep-forest/80 leading-[1.7]">{beach.description}</p>
          <div className="mt-6">
            <h4 className="font-body text-[12px] tracking-[0.15em] uppercase text-stone mb-3 font-medium">Activities</h4>
            <div className="flex flex-wrap gap-2">
              {beach.activities.map((act) => (
                <span key={act} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ocean/10 text-ocean font-body text-[13px]">
                  <Waves size={13} /> {act}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-body text-[12px] tracking-[0.15em] uppercase text-stone mb-3 font-medium">Facilities</h4>
            <div className="grid grid-cols-2 gap-2">
              {beach.facilities.map((f) => (
                <div key={f.name} className="flex items-center gap-2">
                  {f.available ? <Check size={14} className="text-trail-green" /> : <XIcon size={14} className="text-red-400" />}
                  <span className={`font-body text-[14px] ${f.available ? "text-deep-forest" : "text-stone/60"}`}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 p-4 bg-sand rounded-lg">
            <p className="font-body text-[14px] text-deep-forest"><strong>Best Season:</strong> {beach.bestSeason}</p>
          </div>
          {beach.surf && (
            <div className="mt-6">
              <h4 className="font-body text-[12px] tracking-[0.15em] uppercase text-stone mb-3 font-medium">Surf Conditions</h4>
              <div className="grid grid-cols-3 gap-4">
                <div><p className="font-body text-[11px] text-stone uppercase tracking-wider">Wave Size</p><p className="font-body text-[16px] text-deep-forest font-medium">{beach.surf.waveSize}</p></div>
                <div><p className="font-body text-[11px] text-stone uppercase tracking-wider">Skill Level</p><p className="font-body text-[16px] text-deep-forest font-medium">{beach.surf.skillLevel}</p></div>
                <div><p className="font-body text-[11px] text-stone uppercase tracking-wider">Best Months</p><p className="font-body text-[16px] text-deep-forest font-medium">{beach.surf.bestMonths}</p></div>
              </div>
            </div>
          )}
          <div className="mt-8">
            <h4 className="font-body text-[12px] tracking-[0.15em] uppercase text-stone mb-3 font-medium">Tips</h4>
            <ul className="space-y-2">
              {beach.tips.map((tip, i) => (
                <li key={i} className="font-body text-[15px] text-deep-forest/75 flex items-start gap-2">
                  <span className="text-ocean mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-ocean" />{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
