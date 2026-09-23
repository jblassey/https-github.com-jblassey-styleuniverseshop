import site from '../../config/site.js';

/**
 * Thin promotional strip above the header. Fully config-driven — toggle
 * or change the message in src/config/site.js (site.announcement)
 * without touching this component.
 */
export default function AnnouncementBar() {
  if (!site.announcement.enabled) return null;

  return (
    <div className="bg-black text-white text-center py-2">
      <p className="text-[11px] font-medium tracking-widest uppercase px-4">
        {site.announcement.text}
      </p>
    </div>
  );
}
