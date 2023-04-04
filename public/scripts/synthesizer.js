export async function setupSpeechSynthesis() {
    const synth = window.speechSynthesis;
    const routerView = document.getElementById("router-view");

    // Get story list from the API
    const apiStoryList = await fetch('/api/stories');
    const apiStoryListJson = await apiStoryList.json();

    if (routerView.classList.contains("story-state")) {
      const storyList = document.querySelector(".view-list");
      const playButton = document.querySelector("[aria-label='play story knop']");
      const pauseButton = document.querySelector("[aria-label='pause story knop']");

      storyList.addEventListener('click', (e) => {
        const listItem = e.target.closest('.view-list-item');
  
        // Check if synth is speaking
        if (synth.speaking) {
          synth.cancel();
          playButton.classList.toggle("hide");
          pauseButton.classList.toggle("hide");
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
          playButton.classList.toggle("hide");
          pauseButton.classList.toggle("hide");
        } else {
          console.log("Not a story summary");
        }
      });
    }
  }

  window.addEventListener("load", () => {
    setupSpeechSynthesis();
  });