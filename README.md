# RocketLaunchApp

## Task summary

Make an app that would fetch historical information about rocket launches until today and show that information in descending order.

The app must have two tabs: the main tab should show all historical launches, the second tab is for favouries.

On each flight the app should present the following information: name, date, country, status, picture (if available). Upon pressing on the flight card, a web view must open with a link to a web page with information about the flight (if available) or a Wikipedia page about the rocket.

The app should implement a searching feature.

The designs are not specified.

## Instructions

Run `npm install` to install dependencies. If you are going to use an iOS device or simulator, go to `./ios` and run `pod install` before attempting to build the app. All dependencies should already be linked and connected to the project. Proceed by the [official instructions](https://reactnative.dev/docs/environment-setup) (React Native CLI tab) for relevant platforms to set up the environment (if necessary) and run or build the app.

### Troubleshooting

The app is build with use of React Native CLI and should run perfectly well if the official instructions are followed

## Developer notes

I tried my best to explain most of my decisions in the commentaries in the code, so please refer to them for explanations. Here I will briefly describe some of my decision-making.

The app was developed in an iOS environment, using Xcode 11.6 and Xcode's simulator running iPhone 11

### App structure

I followed a fairly standard structure. All source codes are in the `src` folder. Inside the folder you will find:

- `api/api.js`: methods for interacting directly with the API
- `components`: simplest non-primitive components that are used as building blocks in the app
- `store`: everything that has to do with the Redux store
- `views`: structural units or "screens", if you will, the app consists of
- `App.js`: the entry point of the app

I try to make a distinction between "components" (building blocks) and "views" (more complex blocks or units that encapsulate more complex functionality)

### API

**Important:** The API that is provided in the task description is, as its website states, rather old and no longer supported by its creators. I have encountered a frustrating bug within the API that made sorting impossible. For lack of the clarifications I assumed it was part of the task and decided to act as I would in a real business task situation. The website had a link to a more modern API that provided the same information. In a real-world scenario, I would have suggested (or maybe even insisted) on using a newer API, so that is what I did. I am hoping this will not affect the evaluation.

All API calls are made via `fetch()`. More information is in the commentaries within the `api.js` module.

### Redux store

I used **Redux** in this app, along with **Redux Persist** for storing the favourites and **Redux Thunk** for asynchronous calls. As for the structure within the `store` folder, I decided to keep all action creators within one module. The same goes for reducers. My reasoning is that there are few of them and they are rather small. Of course, with extension, this would've been remade with more code splitting, but as I understand, this is not the point of the task.

### Testing

I have provided some basic tests for the app. The tests are made with use of `jest` and `react-native-testing-library`. I have not covered the entire app or some of the more complex components due to the amount of time it requires. The app turned out more complex than I expected and I spent much more time on it than expected and I simply cannot afford spending more time as to not delay the solution for too long. Anyway, I believe the task doesn't require 100% test coverage and the provided tests are there to show my understanding of unit testing, some approaches I would use and my own philosophy regarding to tests.

I would like to note however, that my experience with unit testing is rather limited as I have only started seeing the benefits of them about half a year ago. I am grateful for this task giving me an opportunity to practice and learn something new (I have never written tests for an RN app, only regular React). I implore you to not judge me by the quality of my tests.

## Rewrite

The initial solution had several bugs and it was asked of me to make several changes. These changes are mainly focused on improving the Android experience. The changes are as follows:

**Bugfixes**

- `app.js:16` Changed `Spinner` to `<Spinner />` as specified in redux-persist notes
- `components/LaunchList.js:45` The crash for Favourites was caused due to Favourites not having an `onEndReached` function for `LaunchList` and thus calling `debounce(undefined)`. Added a check before the `debounce` call
- `components/LaunchImage.js:16` Changed `url` to `uri` for the source
- `views/Favourites.js:19` Added `toLowerCase()` transformation to search (Used to compare lowercase name with possibly uppercase or sentence-like search query)

**Visual improvements**

- `components/Header.js:78` Added `padding: 0` to fix the appearance of the input on Android
- `components/LaunchList.js:65` Added some padding to make it look a bit nicer
- `components/Spinner.js:16` Added a `color` property with a blue colour used in the header for better visual consistency
- `views/MainView.js:52` Added a `backgroundColor` to Status Bar for better visuals on Android
