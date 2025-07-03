#!/bin/bash
cd /home/kavia/workspace/code-generation/authoredai-119774-119793/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

