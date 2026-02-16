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
            <div class="mb-4">
              <div class="${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} rounded-lg border border-gray-200 hover:border-brand-extra/40 transition-all duration-300 p-5">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1 text-left">
                    <h3 class="text-brand-dark font-bold font-header text-lg mb-2 text-left">${
                      session.title
                    }</h3>
                    ${speakerDetails.length > 0 ? `
                    <div class="flex items-center gap-2 mt-2 mb-3">
                      ${speakerDetails.map(speaker => 
                        `<img src="${speaker.profilePicture}" alt="${speaker.fullName}" class="w-8 h-8 rounded-full object-cover border-2 border-gray-200" />`
                      ).join('')}
                      <p class="text-brand-extra text-md font-medium">${speakersNames}</p>
                    </div>` : ''}
                    ${session.description ? `
                    <div class="mt-2 text-left">
                      <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 session-preview text-left">${session.description}</p>
                      <button class="text-brand-extra/70 text-xs mt-1 hover:text-brand-extra cursor-pointer select-none hidden session-expand">
                        Read more
                      </button>
                    </div>` : ''}
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-brand-dark text-base font-bold">
                      ${new Date(session.startsAt).toLocaleTimeString("nl-NL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p class="text-gray-500 text-sm">
                      ${duration} min
                    </p>
                  </div>
                </div>
              </div>
            </div>`;
        })
        .join("");
  
      container.innerHTML = `<div class="max-w-3xl mx-auto space-y-4">${scheduleHTML}</div>`;
      
      // Add expand/collapse functionality
      document.querySelectorAll('.session-preview').forEach(p => {
        if (p.scrollHeight > p.clientHeight) {
          const btn = p.parentElement?.querySelector('.session-expand');
          if (btn) {
            btn.classList.remove('hidden');
            btn.addEventListener('click', () => {
              const isClamped = p.classList.contains('line-clamp-3');
              p.classList.toggle('line-clamp-3');
              btn.textContent = isClamped ? 'Show less' : 'Read more';
            });
          }
        }
      });
    }
  
    const data = await fetchData();
    renderSchedule(data);
  })();  