#!/bin/bash
for i in {51..100}; do
  SECRET_NAME="MySecret_$i"
  RANDOM_STRING=$(openssl rand -base64 24)
  
  echo "Setting secret: $SECRET_NAME"
  npx sst secret set "$SECRET_NAME" "$RANDOM_STRING" --stage prod
done

echo "All secrets have been set!"
