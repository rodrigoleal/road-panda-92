import { config } from "@/lib/config";

export default function AdUnit({ id, className = "" }) {
    const isEnabled = config.features.ads.enabled;

    if (!isEnabled) return null;

    return (
        <div id={id} className={`ad-unit bg-zinc-100 flex items-center justify-center py-4 text-xs text-zinc-400 border border-dashed border-zinc-300 ${className}`}>
            ADVERTISEMENT SPACE ({id})
        </div>
    );
}
