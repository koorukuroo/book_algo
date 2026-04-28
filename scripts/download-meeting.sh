#!/bin/bash
API_KEY="hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
BASE="http://localhost:8092"
DEST="/Users/kyunghoon/project/project2026/book/site/public/images/meeting"
mkdir -p "$DEST"

declare -a JOBS=("club d4daa721838e" "mission ce14745faf76")

for job in "${JOBS[@]}"; do
  read -r slug item_id <<< "$job"
  if [ -f "$DEST/$slug.jpg" ]; then
    echo "$slug exists"
    continue
  fi
  while true; do
    status=$(curl -s "$BASE/api/v1/generate/$item_id" -H "X-API-Key: $API_KEY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status',''))")
    if [ "$status" = "completed" ]; then
      url=$(curl -s "$BASE/api/v1/generate/$item_id" -H "X-API-Key: $API_KEY" | python3 -c "import sys,json; print(json.load(sys.stdin).get('result_image_url',''))")
      if [ -n "$url" ]; then
        curl -s -o "$DEST/$slug.png" "$BASE$url"
        echo "$slug DL"
      fi
      break
    elif [ "$status" = "failed" ] || [ "$status" = "error" ]; then
      echo "$slug FAILED"
      break
    fi
    sleep 6
  done
done

cd "$DEST"
for f in *.png; do
  [ -e "$f" ] || continue
  sips -Z 1600 -s format jpeg -s formatOptions 82 "$f" --out "${f%.png}.jpg" >/dev/null 2>&1
  rm "$f"
done
ls -la "$DEST"
