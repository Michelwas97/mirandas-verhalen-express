# Miranda's Verhalen

translate to english

Op de single webpage "Miranda's Verhalen" maak ik een concept web app die de verhalen van schrijfster Laila de Miranda door middel van de [Web speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) uitspreekt zodat kinderen makkelijker en beter in contact kunnen komen met literatuur in een digitale wereld waarbij dat bijna niet meer het geval is.

## Assignment

1. Refactor client side javascript with api into serverside javascript using express and node.js
2. convert website into a progressive web app using a manifest to make it downloadable.
3. Add a service worker to make the PWA accessible when there is no internet connection.
4. Add critical rendering paths to optimize performance

---

## Project Process
### Week 1

For the first week I first initiated npm inside my project to create a package.json, then I continued to install node.js, express, ejs and a developer tool called Nodemon. This tool makes sure I don't have to refresh the server each time I make a change inside the project.

Quickly I found out that the speech API that I chose is clientside only, therefore I had to add a different API to still be able to meet the assignment requirements. The API that I used for the serverside javascript is called Opensheet. With the opensheet API I am able to get the data from google spreadsheets on serverside and then manipulate that data to my usecase, which is using the speech api to actually vocalize the story summary.

After implementing the opensheet api logic with a fetch I started on refactoring the code into express node.js and ejs. For (REASON FOR MVC HERE) I used the mvc code pattern (Model, View and Controllers). With the finished API logic I setup a route for the home page (as this is the only page that has information for the api) and also immediately set up a controller which gets the information from the API model. In the home controller I get the data from the API and return that data inside the res.render. By doing this I make the fetched data accessible on the home page.

After doing this I created a ejs loop which creates story list items for each item in the array storyData. Then I need to verify if clicked list item is matched with the right ID. By using the event.target.closest() I can solve the problem of matching the list item index with the story.id. During this process I ran into the problem of matching strings with numbers, it took me quite a while to actually figure this out but by consulting a classmate we figured it out, we fixed it using index.toString(). After after we fixed this issue the synthesizer functionality finally worked. 

The next challenge at hand was making the web app actually downloadable. For this we need a manifest.json file which needs to be in the public folder which is used in express. After adding the manifest.json file the last thing to do is to add it in de head like this.
![Manifest link in head](./public/images/documentation-images/Screenshot%202023-04-06%20at%2014.13.50.png)

[Live demo](bandicoot-underclothes.cyclic.app/)

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
