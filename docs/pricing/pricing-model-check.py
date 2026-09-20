#!/usr/bin/env python3
"""
Checks the pricing ideas in 2026-09-19-custom-plan-proposal.md.

Run:  python3 docs/pricing/pricing-model-check.py

Prices are per bag and copied from src/lib/plans.ts (2026-09-19). If those
change, update PLANS below and re-read the tables. This script is the
prototype of the golden test the proposal asks for (phase 1b).
"""

# (name, days covered, price). Biggest first.
PLANS = [("Long Stay", 120, 1_000_000), ("Strand", 30, 300_000), ("Mini", 7, 150_000), ("Day", 1, 60_000)]
DAY_PRICE = 60_000


def cheapest(n):
    """Lowest cost of any combination of plans covering at least n days.
    Ties: fewest pieces. Returns (cost, [plan names])."""
    best = {0: (0, [])}
    for d in range(1, n + 1):
        options = []
        for name, length, price in PLANS:
            prev = best[max(0, d - length)]
            options.append((prev[0] + price, len(prev[1]) + 1, [name] + prev[1]))
        cost, _, pieces = min(options, key=lambda o: (o[0], o[1]))
        best[d] = (cost, pieces)
    return best[n]


def split_plain(n):
    """Idea 1: take the biggest plan that fits, repeat, leftover days at the day price."""
    cost, left, pieces = 0, n, []
    for name, length, price in PLANS:
        k, left = divmod(left, length)
        cost += k * price
        pieces += [name] * k
    return cost, pieces


def split_50(n):
    """Idea 2: as above, but if what is left is MORE than half of a plan, bill that whole plan."""
    cost, left, pieces = 0, n, []
    for name, length, price in PLANS[:-1]:
        k, left = divmod(left, length)
        cost += k * price
        pieces += [name] * k
        if left > length * 0.5:
            cost += price
            pieces.append(name)
            left = 0
            break
    if left:
        cost += left * DAY_PRICE
        pieces += ["Day"] * left
    return cost, pieces


def show(pieces):
    counts = {}
    for p in pieces:
        counts[p] = counts.get(p, 0) + 1
    return " + ".join(f"{v}x {k}" for k, v in counts.items())


def main():
    print("A. Price curve of the cheapest-combination rule (per bag)")
    rows, start, prev, prev_pieces = [], 1, None, ""
    for n in range(1, 151):
        cost, pieces = cheapest(n)
        if cost != prev:
            if prev is not None:
                rows.append((start, n - 1, prev, prev_pieces))
            start, prev, prev_pieces = n, cost, show(pieces)
    rows.append((start, 150, prev, prev_pieces))
    for a, b, cost, pieces in rows:
        print(f"  {a:>3}-{b:<3} days  {cost:>9,}   {pieces}")

    print("\nB. Split ideas vs cheapest")
    print(f"  {'days':>4} | {'split':>10} | {'split+50%':>10} | {'cheapest':>10}")
    for n in (3, 10, 20, 23, 40, 46, 47, 61, 62, 75, 100):
        print(f"  {n:>4} | {split_plain(n)[0]:>10,} | {split_50(n)[0]:>10,} | {cheapest(n)[0]:>10,}")

    print("\nC. Quality of each idea over 1..150 days")
    for label, fn in (("split", split_plain), ("split+50%", split_50), ("cheapest", cheapest)):
        over = [n for n in range(1, 151) if fn(n)[0] > cheapest(n)[0]]
        under = [n for n in range(1, 151) if fn(n)[0] < cheapest(n)[0]]
        non_mono = [n for n in range(1, 150) if fn(n + 1)[0] < fn(n)[0]]
        worst = max(range(1, 151), key=lambda n: fn(n)[0] / cheapest(n)[0])
        print(f"  {label:<10} dearer than cheapest: {len(over):>3} lengths (worst {worst}d, "
              f"+{(fn(worst)[0] / cheapest(worst)[0] - 1) * 100:.0f}%) | cheaper than cheapest: {len(under)} | "
              f"places a LONGER stay costs LESS: {len(non_mono)}")

    print("\nD. What the CURRENT form charges for Strand at 31 days (rounds up by whole 30-day periods)")
    print(f"  current form: {300_000 * -(-31 // 30):,}   |   cheapest combination: {cheapest(31)[0]:,}")


if __name__ == "__main__":
    main()
