React Native News App — Personalized News Feed
----------------------------------------------------------------------------

A cross-platform React Native News Application that displays the latest headlines by category, allows users to browse articles, and manage personalized news preferences.
Built with modern React Hooks, TypeScript, and clean UI principles for a responsive and dynamic experience.

----------------------------------------------------------------------------

Features ->
-----------

1) Top Headlines by Category — Browse news articles by topics like Technology, Sports, Business, and more.

2) Dynamic Category Tabs — Smooth horizontal scrolling bar that resizes dynamically on scroll.

3) User Preferences — Save favorite categories to personalize your news feed experience.

4) Optimized Performance — Lazy loading and optimized FlatList rendering for smooth scrolling.

5) Local Storage — Persistent preferences using AsyncStorage.

6) Modern UI — Clean, minimal design with dynamic animations using Animated API.


-------------------------------------------------------------------------------

Architecture Overview  ->
-------------------------

The app follows a modular architecture ensuring separation of concerns between logic, API, storage, and UI layers.

1) API Layer --> Handles fetching articles by category --> /api/newsApi.ts
2) Components Layer --> Reusable UI components (Cards, Tabs, Bars)  --> /components
3) Screens Layer --> Screen-specific logic and UI (Home, Article, Preferences) --> /screens
4) Storage Layer --> Manages user preferences & local data --> /storage/userPreferences.ts
5) Navigation --> Centralized stack navigation --> /navigation/AppNavigator.tsx

---------------------------------------------------------------------------------

State Management ->
--------------------

Used React Hooks (useState, useEffect) for local state and reactivity.
Preference state is persisted using AsyncStorage for offline access.


---------------------------------------------------------------------------------

Tech Stack ->
-------------

Framework	      -->   React Native (Expo or CLI)
Language	      -->   TypeScript
API	              -->   NewsData.io   
State Management  -->	React Hooks
Storage           -->	AsyncStorage
Navigation        -->	React Navigation (Stack)
UI Animations     -->   React Native Animated API


---------------------------------------------------------------------------------


Challenges Encountered ->
-------------------------

Handling inconsistent API responses (e.g., results undefined for some categories).

Implementing smooth category bar resize animations during scroll.

Persisting preferences while keeping UI reactive.

Managing async storage sync between screens.


-----------------------------------------------------------------------------------

Installation & Setup ->
------------------------

git clone
npm install
npx react-native run-android


------------------------------------------------------------------------------------


