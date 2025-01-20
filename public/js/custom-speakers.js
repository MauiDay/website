(async function () {
    const speakerContainerId = "custom-speakers"; // The ID where the speakers will be rendered
    const speakerContainer = document.getElementById(containerId);
    const speakerSessionizeId = container?.getAttribute("data-sessionize-id");

    if (!speakerContainer) return;

    if (!speakerSessionizeId) {
      console.error("Sessionize ID not provided!");
      container.innerHTML = "<p class=\"text-white text-md italic\">Sorry, we couldn't retrieve the speaker list at this time. Please try again later.</p>";
      return;
    }

    // Construct the API URL
    const speakerApiUrl = `https://sessionize.com/api/v2/${speakerSessionizeId}/view/all`;

    // Fetch data from Sessionize
    async function fetchData() {
        try {
          const response = await fetch(speakerApiUrl);
          if (!response.ok) throw new Error("Failed to fetch data");
          return await response.json();
        } catch (err) {
          console.error("Error fetching speakers:", err);
          return null;
        }
      }

      // Render the schedule
    function renderSpeakers(data) {
        if (!speakerContainer) return;
    
        if (!data || !data.speakers || data.speakers.length === 0) {
          speakerContainer.innerHTML = "<p class=\"text-white text-md italic\">Speakers have not been announced yet. Please check back soon!</p>";
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

        speakerContainer.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">${speakersHTML}</div>`;
    }

    const data = await fetchData();
    renderSpeakers(data);
})