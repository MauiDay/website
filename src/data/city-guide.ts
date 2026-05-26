export interface CityGuideItem {
  id: string;
  name: string;
  imageUrl: string;
  locationName: string;
  address: string;
  shortDescription: string;
  description: string;
  mapUrl: string;
  tips?: string[];
  actionLinks?: {
    label: string;
    url: string;
  }[];
}

export interface CityGuideCategory {
  id: string;
  label: string;
  description?: string;
  view?: "map" | "transport" | "links";
  items: CityGuideItem[];
}

export interface CityGuideQuickFact {
  label: string;
  value: string;
}

export interface CityGuide {
  city: string;
  intro: string;
  quickFacts?: CityGuideQuickFact[];
  categories: CityGuideCategory[];
}

export const krakowGuide: CityGuide = {
  city: "Kraków",
  intro:
    "Conference-friendly guide with local highlights: must-see places, food, nightlife, transport, day trips, and useful travel apps.",
  quickFacts: [
    { label: "Currency", value: "Polish Złoty (PLN)" },
    { label: "Language", value: "Polish (English is common in city center)" },
    { label: "Timezone", value: "CET / CEST" },
    { label: "Emergency", value: "112 (general), 999 (ambulance), 997 (police)" },
    { label: "Walkability", value: "Most key sights are within 20–30 min walk" },
    { label: "Tips", value: "Card payments are common, keep some cash for markets" }
  ],
  categories: [
    {
      id: "must-see",
      label: "Must-See Places",
      view: "map",
      description: "Core attractions optimized for a short city stay.",
      items: [
        {
          id: "main-market-square",
          name: "Rynek Główny (Main Market Square)",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Old Town",
          address: "Rynek Główny, Kraków",
          shortDescription: "Historic central square with Cloth Hall and St. Mary’s Basilica.",
          description:
            "The heart of the city and the best starting point for visitors. Visit in daytime and at night for a different atmosphere.",
          mapUrl: "https://maps.google.com/?q=Rynek+Glowny+Krakow",
          tips: ["Look for the hourly hejnał trumpet call", "Great place to start walking routes"]
        },
        {
          id: "wawel-castle",
          name: "Wawel Castle & Cathedral",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Wawel Hill",
          address: "Wawel 5, Kraków",
          shortDescription: "Poland’s royal landmark overlooking the Vistula river.",
          description:
            "Explore castle areas, cathedral surroundings, and dragon monument nearby. One of the most iconic spots in Kraków.",
          mapUrl: "https://maps.google.com/?q=Wawel+Royal+Castle+Krakow",
          tips: ["Plan 2–3 hours for a full visit", "Book selected interiors in advance in high season"]
        },
        {
          id: "kazimierz",
          name: "Kazimierz District",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Jewish Quarter",
          address: "Szeroka / Plac Nowy area, Kraków",
          shortDescription: "Historic district with cafes, bars, synagogues, and local food.",
          description:
            "One of the most atmospheric areas in the city, ideal for late afternoon walk, dinner, and evening social spots.",
          mapUrl: "https://maps.google.com/?q=Plac+Nowy+Krakow",
          tips: ["Try zapiekanka at Plac Nowy", "Great area for post-conference evenings"]
        },
        {
          id: "schindler-factory",
          name: "Schindler’s Factory Museum",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Podgórze",
          address: "Lipowa 4, Kraków",
          shortDescription: "Powerful museum focused on Kraków under Nazi occupation.",
          description:
            "A highly regarded historical museum. Recommended if you want deeper WWII context during your stay.",
          mapUrl: "https://maps.google.com/?q=Schindlers+Factory+Museum+Krakow",
          tips: ["Book tickets early", "Can sell out on weekends"]
        }
      ]
    },
    {
      id: "food",
      label: "Food & Drink",
      view: "map",
      description: "Popular recommendations for Polish and local Kraków food.",
      items: [
        {
          id: "starka",
          name: "Starka",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Kazimierz",
          address: "ul. Józefa 14, Kraków",
          shortDescription: "Excellent traditional Polish cuisine in Kazimierz.",
          description:
            "Strong choice for conference dinners and introducing visitors to classic Polish dishes in a comfortable setting.",
          mapUrl: "https://maps.google.com/?q=Starka+Jozefa+14+Krakow",
          tips: ["Book in advance", "Great base for Kazimierz evening plans"]
        },
        {
          id: "pod-nosem",
          name: "Pod Nosem",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Old Town / Wawel area",
          address: "Kanonicza 22, Kraków",
          shortDescription: "Known for pierogi and classic Polish menu in historic surroundings.",
          description:
            "Excellent option near Wawel after sightseeing. Good for attendees who want a traditional dinner without long travel.",
          mapUrl: "https://maps.google.com/?q=Pod+Nosem+Kanonicza+22+Krakow",
          tips: ["Try pierogi and żurek", "Convenient after Wawel visit"]
        },
        {
          id: "bar-mleczny-centralny",
          name: "Bar Mleczny Centralny",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Old Town",
          address: "ul. św. Tomasza 24, Kraków",
          shortDescription: "Authentic and budget-friendly Polish milk bar experience.",
          description:
            "No-frills local canteen style food at very affordable prices. Great for quick lunch between conference activities.",
          mapUrl: "https://maps.google.com/?q=Bar+Mleczny+Centralny+Krakow",
          tips: ["Bring cash as backup", "Order at counter and find a seat"]
        },
        {
          id: "plac-nowy-food",
          name: "Plac Nowy (Street Food)",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Kazimierz",
          address: "Plac Nowy, Kraków",
          shortDescription: "Famous local street-food spot, especially for zapiekanki.",
          description:
            "Ideal for casual evening food and a social atmosphere. Popular with both locals and visitors.",
          mapUrl: "https://maps.google.com/?q=Plac+Nowy+Krakow",
          tips: ["Best known for zapiekanka", "Usually lively in the evening"]
        }
      ]
    },
    {
      id: "nightlife",
      label: "Nightlife",
      view: "map",
      description: "Popular evening areas and venues in Kraków.",
      items: [
        {
          id: "alchemia",
          name: "Alchemia",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Kazimierz",
          address: "ul. Estery 5, Kraków",
          shortDescription: "Iconic Kazimierz bar with atmospheric interiors.",
          description:
            "A classic first stop for Kraków nightlife with a local and creative vibe, especially around Plac Nowy area.",
          mapUrl: "https://maps.google.com/?q=Alchemia+Estery+5+Krakow",
          tips: ["Nightlife peaks after 22:00", "Keep belongings secure in crowded areas"]
        },
        {
          id: "singer",
          name: "Singer",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Kazimierz",
          address: "ul. Estery 20, Kraków",
          shortDescription: "Busy and atmospheric venue near Plac Nowy.",
          description:
            "One of the best-known evening spots in the district, good for starting or continuing bar-hopping in Kazimierz.",
          mapUrl: "https://maps.google.com/?q=Singer+Estery+20+Krakow",
          tips: ["Very popular on weekends", "Pair with nearby late food options"]
        },
        {
          id: "jazz-u-muniaka",
          name: "Jazz Club U Muniaka",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Old Town",
          address: "ul. Floriańska 3, Kraków",
          shortDescription: "Legendary live-jazz venue in central Kraków.",
          description:
            "Great option for attendees who prefer live music and a more relaxed evening format than clubs.",
          mapUrl: "https://maps.google.com/?q=Jazz+Club+U+Muniaka+Krakow",
          tips: ["Check lineup for the evening", "Arrive earlier for better seating"]
        }
      ]
    },
    {
      id: "transport",
      label: "Public Transportation",
      view: "transport",
      description: "How to move around Kraków quickly during the conference.",
      items: [
        {
          id: "jakdojade",
          name: "jakdojade App",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Kraków public transport",
          address: "City-wide app for trams, buses and tickets",
          shortDescription: "The easiest way to plan routes and buy public transport tickets in Kraków.",
          description:
            "Install jakdojade for real-time tram and bus routes, stop-to-stop navigation, and in-app ticket purchases. It is the most practical option if you are moving between the venue, city center, and evening spots.",
          mapUrl: "https://jakdojade.pl/krakow",
          tips: [
            "Set start and destination points directly in the app",
            "You can buy many local tickets without using ticket machines",
            "Use it for live departures and quick route alternatives"
          ],
          actionLinks: [
            {
              label: "Google Play",
              url: "https://play.google.com/store/apps/details?id=com.citynav.jakdojade.pl.android"
            },
            {
              label: "App Store",
              url: "https://apps.apple.com/pl/search?term=jakdojade"
            }
          ]
        },
        {
          id: "airport-train",
          name: "Airport Train to Kraków Główny",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Kraków Airport → Kraków Główny",
          address: "Kraków Airport (KRK) to Kraków Główny station",
          shortDescription: "Fast train connection from the airport to the main station in the city center.",
          description:
            "From Kraków Airport, take the train to Kraków Główny. From Kraków Główny station, the conference venue (Politechnika Krakowska, Warszawska 24) is about a 10-minute walk.",
          mapUrl:
            "https://www.google.com/maps/dir/?api=1&origin=Krak%C3%B3w%20Lotnisko&destination=Krak%C3%B3w%20G%C5%82%C3%B3wny%2C%20Krak%C3%B3w&travelmode=transit",
          tips: [
            "Follow airport signs for the train platform",
            "Kraków Główny is a central hub for onward tram and bus travel",
            "If carrying luggage, allow a little extra walking time"
          ]
        },
        {
          id: "kotlownia-venue",
          name: "Find Kotłownia on campus",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Politechnika Krakowska campus",
          address: "Kotłownia, ul. Warszawska 24, Kraków",
          shortDescription: "The conference takes place in the Kotłownia building on the PK campus.",
          description:
            "Once you reach the Politechnika Krakowska entrance at Warszawska 24, head into the campus and look for the Kotłownia building. The map link below opens the exact location.",
          mapUrl: "https://www.google.com/maps?q=Kot%C5%82ownia+Politechnika+Krakowska+Warszawska+24+Krak%C3%B3w",
          tips: [
            "Enter the campus from the Warszawska 24 gate",
            "Watch for MAUI Day signage once inside the campus",
            "Allow a few extra minutes on first arrival"
          ]
        }
      ]
    },
    {
      id: "day-trips",
      label: "Day Trips",
      view: "map",
      description: "Top short trips from Kraków if you have an extra day.",
      items: [
        {
          id: "wieliczka-salt-mine",
          name: "Wieliczka Salt Mine",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Wieliczka",
          address: "Daniłowicza 10, Wieliczka",
          shortDescription: "UNESCO underground salt mine, around 30–40 minutes from Kraków.",
          description:
            "One of the most popular and unique attractions near Kraków, known for underground chapels and salt-carved interiors.",
          mapUrl: "https://maps.google.com/?q=Wieliczka+Salt+Mine",
          tips: ["Book online in advance", "Plan around 3–4 hours total including travel"]
        },
        {
          id: "auschwitz-birkenau",
          name: "Auschwitz-Birkenau Memorial",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Oświęcim",
          address: "Więźniów Oświęcimia 20, Oświęcim",
          shortDescription: "Historic memorial site, typically a full-day visit from Kraków.",
          description:
            "A deeply important and educational site. Best approached with advance planning and guided entry where possible.",
          mapUrl: "https://maps.google.com/?q=Auschwitz+Birkenau+Memorial",
          tips: ["Book timed tickets early", "Allow enough travel and reflection time"]
        },
        {
          id: "zakopane",
          name: "Zakopane & Tatra Mountains",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Zakopane",
          address: "Zakopane, Poland",
          shortDescription: "Mountain destination around 2 hours away by bus.",
          description:
            "A strong option for nature views, regional food, and a complete change of pace from city sightseeing.",
          mapUrl: "https://maps.google.com/?q=Zakopane+Poland",
          tips: ["Best for a full-day plan", "Expect cooler weather in the mountains"]
        }
      ]
    },
    {
      id: "useful-apps",
      label: "Useful Apps & Websites",
      view: "links",
      description: "Quick links for moving around and planning activities.",
      items: [
        {
          id: "finebite",
          name: "Finebite",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Food discovery",
          address: "Mobile app",
          shortDescription: "Discover restaurants and get deals, including up to 50% off at many places.",
          description: "Useful for finding restaurants, planning where to eat, and unlocking discounts (often up to 50% off) on selected venues.",
          mapUrl: "https://www.google.com/search?q=finebite+app",
          actionLinks: [
            {
              label: "Google Play",
              url: "https://play.google.com/store/search?q=finebite&c=apps"
            },
            {
              label: "App Store",
              url: "https://apps.apple.com/us/app/finebite/id894593031"
            }
          ]
        },
        {
          id: "visit-krakow",
          name: "Visit Kraków",
          imageUrl: "/images/editions/krakow26.png",
          locationName: "Official tourism",
          address: "visitkrakow.com",
          shortDescription: "Official tourism site with events and up-to-date city info.",
          description: "Helpful for opening hours, current events, and city updates.",
          mapUrl: "https://visitkrakow.com/"
        }
      ]
    }
  ]
};
