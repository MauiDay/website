(async function () {
    const containerId = "custom-speakers"; // The ID where the speakers will be rendered
    const container = document.getElementById(containerId);
    const sessionizeId = container?.getAttribute("data-sessionize-id");

    if (!container) return;

    if (!sessionizeId) {
      console.error("Sessionize ID not provided!");
      container.innerHTML = "<p class=\"text-white text-md italic\">Sorry, we couldn't retrieve the speaker list at this time. Please try again later.</p>";
      return;
    }

    // Construct the API URL
    const apiUrl = `https://sessionize.com/api/v2/${sessionizeId}/view/all`;

    // Fetch data from Sessionize
    async function fetchSpeakerData() {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) throw new Error("Failed to fetch data");
          return await response.json();
        } catch (err) {
          console.error("Error fetching speakers:", err);
          return null;
        }
      }

      // Render the schedule
    function renderSpeakers(data) {
        if (!container) return;
    
        if (!data || !data.speakers || data.speakers.length === 0) {
          container.innerHTML = "<p class=\"text-white text-md italic\">Speakers have not been announced yet. Please check back soon!</p>";
          return;
        }

        // Render out speakers
        const speakersHTML = data.speakers
            .map(
                (speaker) => `
              <div class="flex flex-col items-center text-white">
                <div class="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img src="${speaker.profilePicture || '/images/default-profile.png'}" 
                       alt="${speaker.fullName}" 
                       class="w-full h-full object-cover" />
                </div>
                <h4 class="font-bold text-lg">${speaker.fullName}</h4>
                <p class="text-sm">${speaker.tagLine || ''}</p>
              </div>
            `
            )
            .join("");

        container.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">${speakersHTML}</div>`;
    }

    const data = await fetchSpeakerData();
    renderSpeakers(data);
})
