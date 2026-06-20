"use client";

import { useMemo, useState } from "react";

function Odometer({ value }) {
  const formatted = useMemo(() => {
    const safe = Number.isFinite(value) ? value : 0;
    return safe.toFixed(2);
  }, [value]);

  return (
    <div className="odometer" aria-label={`Total cost ₹${formatted}`}>
      <span className="rupee">₹</span>
      {formatted.split("").map((char, i) => {
        const isDot = char === ".";
        return (
          <div className={`digitTrack${isDot ? " dot" : ""}`} key={i}>
            <span key={`${i}-${char}`}>{char}</span>
          </div>
        );
      })}
    </div>
  );
}

function PumpIcon() {
  return (
    <svg className="pumpIcon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="6" width="13" height="19" rx="1.5" stroke="#E8A33D" strokeWidth="1.6" />
      <rect x="7" y="9" width="7" height="6" rx="0.5" stroke="#E8A33D" strokeWidth="1.4" />
      <line x1="8.5" y1="19" x2="12.5" y2="19" stroke="#E8A33D" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M17 11h2.5a1.5 1.5 0 0 1 1.5 1.5v8a1.8 1.8 0 0 1-3.6 0"
        stroke="#E8A33D"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  const [distance, setDistance] = useState(40);
  const [mileage, setMileage] = useState(18);
  const [price, setPrice] = useState(104.5);
  const [tripType, setTripType] = useState("one-way");

  const effectiveDistance = tripType === "round" ? distance * 2 : distance;

  const litres =
    mileage > 0 ? effectiveDistance / mileage : 0;
  const totalCost = litres * price;
  const costPerKm = effectiveDistance > 0 ? totalCost / effectiveDistance : 0;

  const handleNumberChange = (setter) => (e) => {
    const v = e.target.value;
    setter(v === "" ? 0 : Math.max(0, Number(v)));
  };

  return (
    <main className="page">
      <div className="wrap">
        <div className="topbar">
          <PumpIcon />
          <span className="brandLabel">Fuel Cost Calculator</span>
        </div>

        <section className="hero">
          <p className="eyebrow">Before you leave the house</p>
          <h1 className="headline">
            What's this trip actually <em>going to cost you</em>?
          </h1>
          <p className="subtext">
            Punch in the distance, your vehicle's mileage, and today's fuel price.
            You'll get the exact litres you'll burn and what it costs — down to the rupee.
          </p>
        </section>

        <section className="console">
          <div className="panel">
            <p className="panelLabel">Trip details</p>

            <div className="field">
              <div className="fieldTop">
                <span className="fieldName">Distance</span>
                <span className="fieldUnit">km</span>
              </div>
              <div className="inputRow">
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={distance}
                  onChange={handleNumberChange(setDistance)}
                  aria-label="Distance in kilometres"
                />
              </div>
              <input
                className="slider"
                type="range"
                min="0"
                max="500"
                step="1"
                value={distance}
                onChange={handleNumberChange(setDistance)}
                aria-label="Distance slider"
              />
              <div className="tripToggle" role="group" aria-label="Trip type">
                <button
                  type="button"
                  className={`tripBtn${tripType === "one-way" ? " active" : ""}`}
                  onClick={() => setTripType("one-way")}
                >
                  One-way
                </button>
                <button
                  type="button"
                  className={`tripBtn${tripType === "round" ? " active" : ""}`}
                  onClick={() => setTripType("round")}
                >
                  Round trip
                </button>
              </div>
            </div>

            <div className="field">
              <div className="fieldTop">
                <span className="fieldName">Mileage</span>
                <span className="fieldUnit">km / litre</span>
              </div>
              <div className="inputRow">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={mileage}
                  onChange={handleNumberChange(setMileage)}
                  aria-label="Mileage in kilometres per litre"
                />
              </div>
              <input
                className="slider"
                type="range"
                min="1"
                max="60"
                step="0.5"
                value={mileage}
                onChange={handleNumberChange(setMileage)}
                aria-label="Mileage slider"
              />
            </div>

            <div className="field">
              <div className="fieldTop">
                <span className="fieldName">Fuel price</span>
                <span className="fieldUnit">₹ / litre</span>
              </div>
              <div className="inputRow">
                <span className="inputPrefix">₹</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={price}
                  onChange={handleNumberChange(setPrice)}
                  aria-label="Fuel price per litre in rupees"
                />
              </div>
              <input
                className="slider"
                type="range"
                min="0"
                max="200"
                step="0.5"
                value={price}
                onChange={handleNumberChange(setPrice)}
                aria-label="Fuel price slider"
              />
            </div>
          </div>

          <div className="readout">
            <div>
              <p className="totalLabel">Total trip cost</p>
              <div className="gaugeRow">
                <Odometer value={totalCost} />
              </div>

              <div className="statsGrid">
                <div className="statCell">
                  <span className="statValue">
                    {Number.isFinite(litres) ? litres.toFixed(2) : "0.00"}
                  </span>
                  <span className="statUnit">L</span>
                  <div className="statName">Fuel needed</div>
                </div>
                <div className="statCell">
                  <span className="statValue">
                    ₹{Number.isFinite(costPerKm) ? costPerKm.toFixed(2) : "0.00"}
                  </span>
                  <div className="statName">Cost per km</div>
                </div>
                <div className="statCell">
                  <span className="statValue">{effectiveDistance}</span>
                  <span className="statUnit">km</span>
                  <div className="statName">Total distance</div>
                </div>
                <div className="statCell">
                  <span className="statValue">
                    {mileage > 0 ? (effectiveDistance / mileage).toFixed(2) : "0.00"}
                  </span>
                  <span className="statUnit">L</span>
                  <div className="statName">{tripType === "round" ? "Round-trip fuel" : "One-way fuel"}</div>
                </div>
              </div>
            </div>

            <p className="note">
              <strong>Tip:</strong> check your vehicle's real mileage by resetting the
              trip meter after a full tank, then dividing the distance covered by
              litres filled next time — it's usually a bit lower than the brochure number.
            </p>
          </div>
        </section>

        <footer className="footer">
          <p className="creator">
            Built by <strong>Aamir Ahmad</strong> ·{" "}
            <a href="mailto:aamirahamed140@gmail.com">aamirahamed140@gmail.com</a>
          </p>
          <a
            className="builtFor"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Built for Digital Heroes
          </a>
        </footer>
      </div>
    </main>
  );
}
