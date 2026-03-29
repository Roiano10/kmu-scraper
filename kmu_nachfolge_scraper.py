"""
KMU Nachfolge-Finder – Kanton Zürich
=====================================
Dieses Script:
1. Ruft die offizielle Zefix-API ab (alle aktiven Firmen im Kanton ZH)
2. Filtert auf KMU-Grösse (Einzelunternehmen, GmbH, AG mit wenigen Einträgen)
3. Versucht auf Moneyhouse.ch das Geburtsjahr der Inhaber zu finden
4. Exportiert alle Firmen mit Inhaber > 55 Jahre als CSV

Voraussetzungen:
    pip install requests beautifulsoup4 pandas tqdm

Ausführen:
    python kmu_nachfolge_scraper.py
"""

import requests
import pandas as pd
import time
import json
import re
from bs4 import BeautifulSoup
from tqdm import tqdm
from datetime import datetime

# ─────────────────────────────────────────────
# KONFIGURATION
# ─────────────────────────────────────────────
KANTON = "ZH"
MIN_ALTER_INHABER = 55          # Inhaber älter als X Jahre
MAX_FIRMEN_ZEFIX = 500          # Wie viele Firmen von Zefix laden (max. 500 pro Request)
OUTPUT_CSV = "kmu_nachfolge_zh.csv"
AKTUELLES_JAHR = datetime.now().year

ZEFIX_API_URL = "https://www.zefix.admin.ch/ZefixREST/api/v1/firm/search"
MONEYHOUSE_URL = "https://www.moneyhouse.ch/de/company/{uid}"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "de-CH,de;q=0.9",
}

# Rechtsformen, die typischerweise KMU sind
KMU_RECHTSFORMEN = [
    "Einzelunternehmen",
    "GmbH",
    "AG",
    "Kollektivgesellschaft",
    "Kommanditgesellschaft",
]


# ─────────────────────────────────────────────
# 1. ZEFIX API – Firmenliste holen
# ─────────────────────────────────────────────
def lade_firmen_zefix(kanton: str, max_eintraege: int = 500) -> list[dict]:
    """Lädt Firmen aus der Zefix-API für einen bestimmten Kanton."""
    print(f"\n📡 Lade Firmen aus Zefix API (Kanton: {kanton})...")

    payload = {
        "canton": kanton,
        "maxEntries": max_eintraege,
        "activeOnly": True,
    }

    try:
        response = requests.post(ZEFIX_API_URL, json=payload, headers=HEADERS, timeout=30)
        response.raise_for_status()
        daten = response.json()

        firmen = daten.get("list", [])
        print(f"✅ {len(firmen)} Firmen geladen.")
        return firmen

    except requests.exceptions.RequestException as e:
        print(f"❌ Fehler beim Laden der Zefix-Daten: {e}")
        return []


def filtere_kmu(firmen: list[dict]) -> list[dict]:
    """Filtert auf KMU-typische Rechtsformen."""
    gefiltert = []
    for f in firmen:
        rechtsform = f.get("legalForm", {}).get("name", {}).get("de", "")
        if any(rf in rechtsform for rf in KMU_RECHTSFORMEN):
            gefiltert.append(f)

    print(f"🏢 {len(gefiltert)} KMUs nach Rechtsform-Filter.")
    return gefiltert


# ─────────────────────────────────────────────
# 2. ZEFIX Detail – Inhaber / Geschäftsführer
# ─────────────────────────────────────────────
def lade_firmen_detail(uid: str) -> dict:
    """Lädt Detaildaten einer Firma via Zefix API (UID)."""
    url = f"https://www.zefix.admin.ch/ZefixREST/api/v1/firm/{uid}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        return r.json()
    except Exception:
        return {}


def extrahiere_inhaber(detail: dict) -> list[str]:
    """Extrahiert Namen von Inhabern/Geschäftsführern aus Zefix-Detaildaten."""
    personen = []
    for rolle in detail.get("sharesOfMemberships", []):
        name = rolle.get("person", {}).get("name", "")
        if name:
            personen.append(name)
    
    # Fallback: Signatories
    for sig in detail.get("signatories", []):
        name = sig.get("name", "")
        if name and name not in personen:
            personen.append(name)

    return personen


# ─────────────────────────────────────────────
# 3. MONEYHOUSE – Geburtsjahr der Inhaber
# ─────────────────────────────────────────────
def suche_geburtsjahr_moneyhouse(firmenname: str, uid: str) -> int | None:
    """
    Versucht auf Moneyhouse.ch das Geburtsjahr des Inhabers zu finden.
    Gibt das Geburtsjahr zurück (int) oder None wenn nicht gefunden.
    """
    # Moneyhouse-URL mit UID aufrufen
    uid_clean = uid.replace("-", "")
    url = f"https://www.moneyhouse.ch/de/company/{uid_clean}"

    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        if r.status_code != 200:
            return None

        soup = BeautifulSoup(r.text, "html.parser")

        # Geburtsjahr sucht nach Mustern wie "1958" oder "geb. 1958" oder "Jahrgang 1958"
        text = soup.get_text(" ", strip=True)
        treffer = re.findall(r'\b(19[3-9]\d|20[0-1]\d)\b', text)

        if treffer:
            # Nimm das häufigste gefundene Jahr (wahrscheinlichstes Geburtsjahr)
            from collections import Counter
            haeufig = Counter(treffer).most_common(1)[0][0]
            return int(haeufig)

    except Exception:
        pass

    return None


# ─────────────────────────────────────────────
# 4. HAUPTPROGRAMM
# ─────────────────────────────────────────────
def main():
    print("=" * 55)
    print("  KMU Nachfolge-Finder – Kanton Zürich")
    print("=" * 55)

    # Schritt 1: Firmenliste laden
    firmen = lade_firmen_zefix(KANTON, MAX_FIRMEN_ZEFIX)
    if not firmen:
        print("Keine Firmendaten erhalten. Script wird beendet.")
        return

    # Schritt 2: KMU filtern
    kmus = filtere_kmu(firmen)

    # Schritt 3: Details + Moneyhouse scrapen
    print(f"\n🔍 Analysiere {len(kmus)} KMUs (Details + Moneyhouse)...")
    ergebnisse = []

    for firma in tqdm(kmus[:MAX_FIRMEN_ZEFIX], desc="Firmen verarbeiten"):
        uid = firma.get("uid", "")
        name = firma.get("name", "")
        rechtsform = firma.get("legalForm", {}).get("name", {}).get("de", "")
        ort = firma.get("legalSeat", "")
        
        # Zefix-Detail für Inhaber
        detail = lade_firmen_detail(uid)
        inhaber = extrahiere_inhaber(detail)
        inhaber_str = ", ".join(inhaber) if inhaber else "Unbekannt"

        # Moneyhouse für Geburtsjahr
        geburtsjahr = suche_geburtsjahr_moneyhouse(name, uid)
        alter = (AKTUELLES_JAHR - geburtsjahr) if geburtsjahr else None

        eintrag = {
            "Firmenname": name,
            "UID": uid,
            "Rechtsform": rechtsform,
            "Ort": ort,
            "Inhaber": inhaber_str,
            "Geburtsjahr": geburtsjahr,
            "Alter (ca.)": alter,
            "Nachfolge wahrscheinlich": "✅ Ja" if alter and alter >= MIN_ALTER_INHABER else (
                "❓ Unbekannt" if alter is None else "Nein"
            ),
            "Zefix-Link": f"https://www.zefix.admin.ch/de/search/entity/list/firm/{uid}",
            "Moneyhouse-Link": f"https://www.moneyhouse.ch/de/company/{uid.replace('-', '')}",
        }
        ergebnisse.append(eintrag)

        # Höfliche Pause (kein Overloading)
        time.sleep(0.8)

    # Schritt 4: Export
    df = pd.DataFrame(ergebnisse)

    # Sortierung: Nachfolge-Kandidaten zuerst
    df["_sort"] = df["Alter (ca.)"].fillna(0)
    df = df.sort_values("_sort", ascending=False).drop(columns=["_sort"])

    df.to_csv(OUTPUT_CSV, index=False, encoding="utf-8-sig")

    # Zusammenfassung
    total = len(df)
    nachfolge = len(df[df["Nachfolge wahrscheinlich"] == "✅ Ja"])
    unbekannt = len(df[df["Nachfolge wahrscheinlich"] == "❓ Unbekannt"])

    print("\n" + "=" * 55)
    print(f"✅ Fertig! {total} KMUs analysiert.")
    print(f"   → {nachfolge} mit wahrscheinlichem Nachfolgebedarf (>{MIN_ALTER_INHABER} Jahre)")
    print(f"   → {unbekannt} ohne Altersangabe")
    print(f"\n📁 Gespeichert als: {OUTPUT_CSV}")
    print("=" * 55)


if __name__ == "__main__":
    main()
    
