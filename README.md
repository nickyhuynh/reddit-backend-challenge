# reddit-backend-challenge

```
Assumptions:
* Backend will be used for the challenge, so I didn't implement rate limiting, throttling, or other security
  measures.
* By application restart, I'm assuming it means when the dyno becomes inactive and is restored again.
* As per the email, I am rendering the UI from the server through the Jade templating engine.
```
```
Intentional design decisions:
* Sorting only happens when the page is refreshed. 
* The use of a map for an in memory data store. It was necessary to be able to retrieve the correct topic
  based on an ID.
* Use of a templating engine for separation of concerns and a clear MVC design.
* Content types so type of data is clearly identified on both ends.
* Putting scripts at the end of the body for performance.
* Format of the JSON responses is based on Google's JSON style guide: 
  https://google.github.io/styleguide/jsoncstyleguide.xml
```
```
heroku site: https://sheltered-tundra-88756.herokuapp.com/
```
