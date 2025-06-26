#!/bin/bash
cd /home/kavia/workspace/code-generation/inventorymaster-pro-91327-c417ef69/inventory_backend_workspace/inventory_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

