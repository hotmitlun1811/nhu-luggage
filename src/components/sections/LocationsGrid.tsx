const locations = [
  { city: "Da Nang", area: "Old Quarter", slots: 12, price: "$3/day" },
  { city: "Ho Chi Minh City", area: "District 1", slots: 8, price: "$3/day" },
  { city: "Hanoi", area: "Hoan Kiem", slots: 15, price: "$3/day" },
  { city: "Hoi An", area: "Ancient Town", slots: 6, price: "$3/day" },
];

export default function LocationsGrid() {
  return (
    <section className="w-full bg-[#0c0c0c] py-[80px]">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Section heading */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <h2
            className="text-white leading-[1.10]"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "32px",
              fontStyle: "italic",
              letterSpacing: "-0.025em",
            }}
          >
            Explore our locations —
          </h2>
          <button
            className="text-[16px] font-bold uppercase tracking-[0.057em] text-white/70 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            View All →
          </button>
        </div>

        {/* Location cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc) => (
            <div
              key={`${loc.city}-${loc.area}`}
              className="bg-white/5 border border-white/10 rounded-[8px] p-6 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              {/* New badge */}
              <span
                className="inline-block bg-[#4e4e4e] text-white text-[12px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full mb-4"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Open
              </span>

              <h3
                className="text-[16px] font-semibold text-white mb-1"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {loc.city}
              </h3>
              <p
                className="text-[14px] text-white/50 mb-4"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {loc.area}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-[16px] font-semibold text-white"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {loc.price}
                </span>
                <span
                  className="text-[14px] text-white/50"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {loc.slots} slots
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
