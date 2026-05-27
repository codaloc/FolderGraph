#!/bin/bash

vault="/home/co/Storage/prg/ObsidianDev/ObsidianTesting"
imgdir="$vault/imgs"

declare -A used

while read -r ref; do
    base=$(basename "$ref")
    used["$base"]=1
done < <(
    grep -RhoP '!\[\[\K([^]|]+)' "$vault"
)

find "$imgdir" -type f | while read -r file; do
    base=$(basename "$file")

    if [[ -z ${used["$base"]} ]]; then
        echo "Deleting: $file"
        rm "$file"
    fi
done
