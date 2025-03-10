# 🔤 Word Generator Web App

A responsive, interactive word generator web application that fetches random English words along with their definitions. Users can generate new words, view definitions, and share the app using a native share feature.

---

## 🚀 Features

- 🎲 **Random Word Generator** (via [Random Word API](https://random-word-api.herokuapp.com))
- 📚 **Word Definition Fetching** (via [Free Dictionary API](https://dictionaryapi.dev/))
- 🔊 **Phonetic Audio Playback**
- 📱 **Responsive Design** for desktop, tablet, and mobile devices
- 📤 **Native Share Button** (using Web Share API)
- 🖼️ Clean and modern UI built with HTML, CSS, and JavaScript

---

## 📂 Project Structure

```
project-folder/
├── css/
│   └── index.css          # Styling and responsive media queries
├── js/
│   └── randomWord.js      # Main JavaScript logic (word fetching, share logic)
├── resources/
│   └── images/
│       └── Github Icon.png # GitHub button icon
├── index.html             # Main HTML file
└── README.md              # Project documentation
```

---

## 💻 How to Use

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Click **"CLICK TO GENERATE WORD"** to fetch a new random word and its meaning.
4. Use the **"SHARE"** button to share the page with others (only works on supported devices).
5. Optional: Click the GitHub icon button (currently a placeholder – you can link this to your repo/profile).

---

## 🔗 APIs Used

- [Random Word API](https://random-word-api.herokuapp.com/)
- [Free Dictionary API](https://dictionaryapi.dev/)

---

## 📱 Responsive Design

Designed to work seamlessly across all screen sizes:
- Desktop
- Tablet
- Mobile (including small phones)

Uses media queries for flexible layouts, button stacking, and fluid sizing.

---

## ✨ Customisation Ideas

- Add **copy-to-clipboard** fallback for unsupported devices.
- Add **social media share buttons** (Facebook, Twitter, LinkedIn).
- Add a **word history panel** to show previously generated words.

---

## 📸 Preview


![Word Generator Demo](resources/images/Word%20generator%20GIF.gif)

---

## ⚙️ Browser Compatibility

| Feature         | Supported                              |
|-----------------|----------------------------------------|
| Random Word API | ✅                                      |
| Dictionary API  | ✅                                      |
| Web Share API   | ✅ Mobile Only / Partially Desktop      |

> Web Share API requires HTTPS and is supported on most modern mobile browsers and a few desktop ones.

---

## 📬 Credits

- Design and Development by Charlie Patterson
- Typography via Adobe Fonts (`greycliff-cf`)

---

## 📄 License

This project is open-source and free to use. Feel free to fork and customise it!