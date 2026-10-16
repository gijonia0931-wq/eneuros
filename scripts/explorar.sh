I=https://servicios.ine.es/wstempus/js/ES
for t in $(curl -sS "$I/TABLAS_OPERACION/IPC" | jq -r '.[] | select(.Nombre|test("general";"i")) | select(.Nombre|test("nacional";"i")) | .Id'); do
  echo "== tabla $t"
  curl -sS "$I/SERIES_TABLA/$t" | jq -r '.[] | select(.Nombre|test("general";"i")) | select(.Nombre|test("anual";"i")) | "\(.COD) | \(.Nombre)"' | head -5
done
echo "== DATOS_TABLA IPC (nult=1) general anual"
for t in 25333 76144 78680 76135; do echo "-- $t"; curl -sS "$I/DATOS_TABLA/$t?nult=1" | jq -c '.[] | select(.Nombre|test("general";"i")) | select(.Nombre|test("anual";"i")) | {COD,Nombre,d:.Data}' | head -3; done
echo "== IRAV 72975"
curl -sS "$I/SERIES_TABLA/72975" | jq -c '.[] | {COD,Nombre,FK_Periodicidad}' | head -20
curl -sS "$I/DATOS_TABLA/72975?nult=2" | jq -c '.[] | {COD,Nombre,d:.Data}' | head -10
