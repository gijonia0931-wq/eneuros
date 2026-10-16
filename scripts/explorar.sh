set -x
I=https://servicios.ine.es/wstempus/js/ES
curl -sS "$I/OPERACIONES_DISPONIBLES" | jq -c '.[] | select((.Nombre|test("alquil|Arrendam|Consumo";"i")) or (.Codigo|test("IPC|IRAV";"i")))' 
curl -sS "$I/TABLAS_OPERACION/IPC" | jq -c '.[] | {Id,Nombre,Ultima_Modificacion,FechaRef_fin}' | tail -40
curl -sS "$I/TABLAS_OPERACION/IRAV" | head -c 3000; echo
curl -sS "$I/DATOS_SERIE/IPC251856?nult=2"; echo
curl -sS "https://data-api.ecb.europa.eu/service/data/FM/M.U2.EUR.RT.MM.EURIBOR1YD_.HSTA?lastNObservations=3&format=csvdata"; echo
curl -sS "https://app.bde.es/bierest/resources/srdatosapp/listaSeries?idioma=es&series=D_1NBAF472&rango=12M" | head -c 2000; echo
curl -sS -o carb.json -w "%{http_code} %{size_download}\n" "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
jq -c '{Fecha, ResultadoConsulta, n:(.ListaEESSPrecio|length), first:.ListaEESSPrecio[0]}' carb.json
