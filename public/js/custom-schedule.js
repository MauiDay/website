(async function () {
    const containerId = "custom-schedule"; // The ID where the schedule will be rendered
    const container = document.getElementById(containerId);
    const sessionizeId = container?.getAttribute("data-sessionize-id");

    if (!container) return;

    if (!sessionizeId) {
      console.error("Sessionize ID not provided!");
      container.innerHTML = "<p class=\"text-brand-dark text-md italic\">Sorry, we couldn't retrieve the schedule at this time. Please try again later.</p>";
      return;
    }

    // Construct the API URL
    const apiUrl = `https://sessionize.com/api/v2/${sessionizeId}/view/all`;

    // Fetch data from Sessionize
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
      } catch (err) {
        console.error("Error fetching schedule:", err);
        return null;
      }
    }
  
    // Render the schedule
    function renderSchedule(data) {
      if (!container) return;
  
      if (!data || !data.sessions || data.sessions.length === 0) {
        container.innerHTML = "<p class=\"text-brand-dark text-md italic\">Sessions have not been announced yet. Please check back soon!</p>";
        return;
      }
  
      const scheduleHTML = data.sessions
        .map((session, index) => {
          // Fetch speaker details
          const speakerDetails = session.speakers
            .map((speakerId) =>
              data.speakers.find((speaker) => speaker.id === speakerId)
            )
            .filter(Boolean);
  
          const speakerImages = speakerDetails
            .map(
              (speaker) =>
                `<img src="${speaker.profilePicture}" alt="${speaker.fullName}" class="object-cover rounded-full flex-shrink-0 w-8 h-8" />`
            )
            .join("");
  
          const speakersNames = speakerDetails
            .map((speaker) => speaker.fullName)
            .join(", ");
  
          const duration = Math.floor(
            (new Date(session.endsAt).getTime() -
              new Date(session.startsAt).getTime()) /
              (1000 * 60)
          );
  
          return `
            <div class="flex gap-4 flex-row px-4 md:px-16 items-stretch ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }">
              <div class="flex-shrink-0 md:block hidden py-8 w-32 mt-1 text-right">
                <p class="text-gray-600 font-medium text-sm">${new Date(
                  session.startsAt
                ).toLocaleTimeString("nl-NL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${new Date(session.endsAt).toLocaleTimeString("nl-NL", {
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
                <p class="text-gray-500 text-sm">${duration}min</p>
              </div>
              <div class="flex-shrink-0 bg-transparent w-[2px]"></div>
              <div class="flex-shrink-0 py-8 flex-1 text-left">
                <div class="flex-shrink-0 md:hidden block text-left">
                  <p class="text-gray-600 font-medium text-sm">${new Date(
                    session.startsAt
                  ).toLocaleTimeString("nl-NL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - ${new Date(session.endsAt).toLocaleTimeString("nl-NL", {
            hour: "2-digit",
            minute: "2-digit",
          })} (${duration}min)</p>
                </div>
                <h4 class="mt-0 mb-2 font-semibold text-lg text-brand-dark">${
                  session.title
                }</h4>
                <p class="text-base md:block hidden text-sm text-gray-600 leading-6 space-y-4">
                  ${session.description}
                </p>
                <div class="flex items-center flex-row gap-3 mt-4">
                  ${speakerImages}
                  <div>
                    <p class="leading-5 text-brand-dark font-medium text-md">${speakersNames}</p>
                  </div>
                </div>
              </div>
            </div>`;
        })
        .join("");
  
      container.innerHTML = `<div class="max-w-4xl mx-auto px-4 text-center">${scheduleHTML}</div>`;
    }
  
    const data = await fetchData();
    renderSchedule(data);
  })();  