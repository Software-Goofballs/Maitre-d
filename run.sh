#!/usr/bin/bash
git pull
git add menu-memory/memory.json
git commit -m "Save Memory"
git push 
npm ci
node deploy-commands.js
node index.js