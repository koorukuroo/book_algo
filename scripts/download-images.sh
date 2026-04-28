#!/bin/bash
# Poll all jobs and download when ready
API_KEY="hf_x2DMaqeoAeTWlDwMVrLPK-LnuA96SNsvB8JJ1-BD-mU"
BASE="http://localhost:8092"
DEST="/Users/kyunghoon/project/project2026/book/site/public/images/chapters"
mkdir -p "$DEST"

while IFS=' ' read -r slug item_id; do
  [ -z "$slug" ] && continue
  if [ -f "$DEST/$slug.png" ]; then
    echo "$slug already exists, skipping"
    continue
  fi
  while true; do
    status=$(curl -s -X GET "$BASE/api/v1/generate/$item_id" -H "X-API-Key: $API_KEY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('status',''))")
    if [ "$status" = "completed" ]; then
      url=$(curl -s -X GET "$BASE/api/v1/generate/$item_id" -H "X-API-Key: $API_KEY" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('result_image_url',''))")
      curl -s -o "$DEST/$slug.png" "$BASE$url"
      echo "$slug DONE"
      break
    elif [ "$status" = "failed" ] || [ "$status" = "error" ]; then
      echo "$slug FAILED"
      break
    fi
    sleep 6
  done
done < /Users/kyunghoon/project/project2026/book/scripts/image-jobs.txt
echo "All done"
