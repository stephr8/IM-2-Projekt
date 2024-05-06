<?php

//$nr = $_GET['n'];

//if (!empty($nr)) {
    
    //$url = "https://api.publibike.ch/v1/public/stations/$nr";
    $url = "https://api.publibike.ch/v1/public/partner/stations";
    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    echo $response;
//}
   
?>