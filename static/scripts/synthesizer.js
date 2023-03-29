import storyApi from "../models/storyApi.js";

export async function setupSpeechSynthesis() {
    const synth = window.speechSynthesis;
    const routerView = document.getElementById("router-view");

    // Get story list from the API
    const apiStoryList = await storyApi.getStories();

    if (routerView.classList.contains("story-state")) {
      const storyList = document.querySelector(".view-list");
      storyList.addEventListener('click', (e) => {
        const listItem = e.target.closest('.view-list-item');
  
        // Check if synth is speaking
        if (synth.speaking) {
          synth.cancel();
          return;
        }
  
        if (listItem) {
          const listItems = Array.from(storyList.children);
          let index = listItems.indexOf(listItem) + 1;
          index = index.toString();
        
          const story = apiStoryList.find((story) => {
            return story.id === index;
          });

          console.log(story)
            
          const summaryUtterance = new SpeechSynthesisUtterance(story.summary);
  
          summaryUtterance.onend = (event) => {
            console.log("SpeechSynthesisUtterance.onend");
          };
  
          summaryUtterance.onerror = (event) => {
            console.error("SpeechSynthesisUtterance.onerror" + " " + event.error);
          };
  
          synth.speak(summaryUtterance);
        } else {
          console.log("Not a story summary");
        }
      });
    }
  }