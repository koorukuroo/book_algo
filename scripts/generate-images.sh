#!/bin/bash
# Generate chapter hero illustrations via Higgsfield API
API_KEY="hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
BASE="http://localhost:8092"

submit() {
  local slug="$1"
  local prompt="$2"
  curl -s -X POST "$BASE/api/v1/generate" \
    -H "X-API-Key: $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"prompt\":$(python3 -c "import json,sys; print(json.dumps(sys.argv[1]))" "$prompt"),\"model\":\"nano_banana_pro\",\"resolution\":\"2k\",\"aspect_ratio\":\"16:9\",\"unlimited\":false}" | python3 -c "import sys,json; d=json.load(sys.stdin); print(f\"{sys.argv[1]} {d.get('item_id','')}\")" "$slug"
}

# Submit all jobs in parallel
submit "ch02" "Cute cartoon illustration: a person standing in front of a row of slot machines, looking confused which one to pull. Each slot machine has different glowing icons. Soft pastel colors, friendly mood, decision under uncertainty concept" &
submit "ch03" "Cute cartoon illustration: cheerful librarian sorting colorful books on shelves with magical organizing dust. Books fly into perfect order. Soft pastel colors, warm library atmosphere, sorting algorithm concept" &
submit "ch04" "Cute cartoon illustration: a cozy desk with frequently-used items arranged in concentric rings around a coffee mug. Most-used items closest. Books fading into background shelves. Soft pastel colors, organized desk, memory cache concept" &
submit "ch05" "Cute cartoon illustration: a cheerful person juggling multiple colorful task icons in the air - laundry, emails, dishes, calendar. One large task glows as priority. Soft pastel colors, time management concept" &
submit "ch06" "Cute cartoon illustration: a fortune teller looking into a crystal ball that shows three different probability distribution curves. Calm wise atmosphere, soft pastel colors, predicting the future concept" &
submit "ch07" "Cute cartoon illustration: split scene - left side complex tangled string fitting every dot perfectly, right side simple smooth curve. Person looking thoughtful. Soft pastel colors, simplicity wins concept" &
submit "ch08" "Cute cartoon illustration: a person stretching a rubber band labeled 'rules' to expand a small box into a bigger one with a glowing solution inside. Soft pastel colors, problem relaxation concept" &
submit "ch09" "Cute cartoon illustration: a person rolling a giant die at a fork in road, with sparkles of serendipity in the air. Soft pastel colors, embracing randomness concept" &
submit "ch10" "Cute cartoon illustration: two people sending paper airplanes back and forth across a gap, with little message envelopes orbiting between them. Soft pastel colors, communication network concept" &
submit "ch11" "Cute cartoon illustration: two people across a chess board with thought bubbles containing tiny nested chess boards inside them, recursive thinking. Soft pastel colors, game theory concept" &
submit "conclusion" "Cute cartoon illustration: two friends walking together on a path, one offering the other a small map labeled 'options'. Warm sunset, soft pastel colors, kindness and consideration concept" &

wait
echo "All submitted"
