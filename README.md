# Steps to run the application

Make sure node has been installed.

1. Clone the repository

2. Set legacy-peer-deps to true to avoid dependency conflicts:

```
npm config set legacy-peer-deps true
```

3. Install dependencies:

```
npm install
```

4. Run the application:

```
npm run dev
```

# Tech stack used:

Vite, Javascript, React/HTML, MaterialUI, ReactDropzone, React-DND, TailwindCSS

# Approach:

The react application(iAudio) will have 3 major components, namely,

- Import Section: This section is like a file store where we can upload/drag-drop audio files from our system file browser. Files can be added, deleted, and re-used for the playback timeline.

- Timeline: This section is where a user can add/delete/shift audio files based on his/her requirement about how the final audio should be. Files can be added from the parent file store(import section) using the plus button or can directly be dragged from the system file browser. This section can handle a list of audio files which can be shifted(reordered) based on requirement. The audio that is currently being played will be shown with a green - highlight border.

- Audio Player: This is the audio player section with 3 buttons, previous, play/pause and next. The audio player plays audio in order that is governed by the Timeline section.
