#!/bin/bash
echo "🚀 Publicando HUB-CURVISTA en Netlify..."
echo "-----------------------------------------"
git add .
git commit -m "🚀 Actualización automática del Hub Curvista"
git push
echo "-----------------------------------------"
echo "✅ Listo. Revisa Netlify para ver el nuevo deploy."
echo "🌐 Abriendo portal en navegador..."
open "https://hub-curvista.netlify.app/?v=$(date +%s)"
