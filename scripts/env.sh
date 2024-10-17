#!/bin/sh
echo "Starting"
[[ -f "/vault/secrets/app.secrets.env" ]] && source /vault/secrets/app.secrets.env;
[[ -f "/vault/secrets/infra.secrets.env" ]] && source /vault/secrets/infra.secrets.env;
echo "Secrets variables loaded"