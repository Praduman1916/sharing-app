
---

````markdown

# Link Sharing App – Frontend Only

This is a frontend-only Link Sharing App built with **Next.js**.  
The app allows users to add, edit, delete, and reorder links like GitHub, LinkedIn, YouTube, Facebook, and Frontend Mentor.  
It also shows a live preview of links inside a mobile mockup. By clicking on any link, it opens in a new tab.


---

##  Tech Stack

- Next.js (App Router)
- Tailwind CSS
- React Hooks
- @dnd-kit for drag & drop

---

##  Features

- Add, edit, or remove links
- Drag and drop to reorder
- Mobile preview on the left
- Responsive layout for all devices
- Simple validation on URLs
- Follows Figma design closely

---

##  Getting Started

### 1. Clone the project

```bash
git clone https://github.com/Praduman1916/sharing-app.git
cd sharing-app
````

### 2. Install dependencies

```bash
npm install

```

### 3. Run the app

```bash
npm run dev

```

The app will be available at `http://localhost:3000`

---

##  Project Structure

```
/public
  /images         → All icons and illustrations
/components
  /ui             → Header, LinkEditor,EditableLinkCard, SortableCard,MobilePreview.
  /lib            → Static platform options
/app
  /page.tsx       → Main Dashboard page
```

---

##  Notes

* Only the frontend part is done.
* No database or API setup.
* No login or authentication yet.
* All data is stored temporarily in state.

---
```
