#!/bin/bash
cd /home/kavia/workspace/code-generation/inventorymaster-pro-91327-c417ef69/inventory_frontend_workspace/inventory_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

