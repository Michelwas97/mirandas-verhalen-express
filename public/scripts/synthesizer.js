export async function setupSpeechSynthesis() {
    const synth = window.speechSynthesis;
    const routerView = document.getElementById("router-view");

    // Get story list from the API
    const apiStoryList = await fetch('/api/stories');
    const apiStoryListJson = await apiStoryList.json();

    const summaries = document.querySelectorAll(".view-summary");
    const playButtons = document.querySelectorAll("[aria-label='play story knop']");
    const pauseButtons = document.querySelectorAll("[aria-label='pause story knop']");

    summaries.forEach((summary) => {
      summary.classList.add("hide");
    });

    playButtons.forEach((playButton) => {
      playButton.classList.add("show");
    });

    pauseButtons.forEach((pauseButton) => {
      pauseButton.classList.add("hide");
    });

    if (routerView.classList.contains("story-state")) {
      const storyList = document.querySelector(".view-list");

      storyList.addEventListener('click', (e) => {
        const listItem = e.target.closest('.view-list-item');
        const playButton = listItem.querySelector("[aria-label='play story knop']");
        const pauseButton = listItem.querySelector("[aria-label='pause story knop']");
        
        // Check if synth is speaking
        if (synth.speaking) {
          synth.cancel();
          playButton.classList.remove("hide");
          playButton.classList.add("show");
          pauseButton.classList.remove("show");
          pauseButton.classList.add("hide");
          return;
        }
  
        if (listItem) {
          const listItems = Array.from(storyList.children);
          let index = listItems.indexOf(listItem) + 1;
          index = index.toString();
        
          const story = apiStoryListJson.find((story) => {
            return story.id === index;
          });

          const summaryUtterance = new SpeechSynthesisUtterance(story.summary);
  
          summaryUtterance.onend = (event) => {
            console.log("SpeechSynthesisUtterance.onend");
          };
  
          summaryUtterance.onerror = (event) => {
            console.error("SpeechSynthesisUtterance.onerror" + " " + event.error);
          };
  
          synth.speak(summaryUtterance);
          playButton.classList.remove("show");
          playButton.classList.add("hide");
          pauseButton.classList.remove("hide");
          pauseButton.classList.add("show");
        } else {
          console.log("Not a story summary");
        }
      });
    }
  }

  window.addEventListener("load", () => {
    var online = navigator.onLine;

    if (online) {
      setupSpeechSynthesis();
    }
  });