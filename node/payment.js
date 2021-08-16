// API: GraphQL
// fetch 
// kodovanie: URLEncode
// url: https://moja.tatrabanka.sk/cgi-bin/e-commerce/start/cardpay
// test-url: https://moja.tatrabanka.sk/cgi-bin/e-commerce/start/example.jsp
// method: GET, POST

/* Povinné parametre

MID: identifikátor obchodníka (máš v maily)
AMT: Suma platby
CURR: Mena v ktorej bude transkacia vykonaná (v našom prípade hodnoty: $EUR, $CZK)
VS: Jednoznačný identifikátor platby (Zatiaľ neviem čo to je, najviac pravdepodobne Order Number)
RURL: Návratová hodnota URL po uskutočnení (Zatiaľ tripex.sk)
IPC: Ip adresa klienta (Implementácia logistiky na získanie ip adresy)
NAME: Meno alebo mailová adresa klienta, nesmie obsahovať diakritiku (Použijem mail)

TIMESTAMP: Časová pečiatka (asi že jak dlho bude existovať pladba (Date.now() + 24 hod), formát: DDMMYYYYHHMISS
( DD-deň, MM-mesiac, YYYY-rok, HHhodina, MI-minúta, SS-sekunda))

HMAC: Autentifikačný kód HMAC zparametrov (Výde mi asi keď zlúčim všetky predošlé premenné dokopy, zašifrujem pomocou sha256 s kľúcom v binárke
neskôr ho už len overím s HMAC ktorý mi poskytla banka, keď sa budú zhodovať tak pladba môže byť uskutočnenám, keď nie tak musím kontaktovať banku za účelom preverenia transkacie

)


*/