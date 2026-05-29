# Apex Stone & Tile — Website + CMS Setup

## Folder Structure
```
apex-site/
├── index.html          ← Main website
├── netlify.toml        ← Netlify config
├── admin/
│   ├── index.html      ← CMS login page (yoursite.netlify.app/admin)
│   └── config.yml      ← CMS field definitions
├── _data/
│   ├── hero.json       ← Hero section content
│   ├── stats.json      ← Stats bar numbers
│   ├── about.json      ← About section
│   ├── contact.json    ← Phone, email, address, hours
│   ├── process.json    ← How It Works steps
│   ├── services/       ← One JSON file per service
│   └── gallery/        ← One JSON file per gallery image
└── images/
    └── uploads/        ← CMS uploads land here (auto-created)
```

## Using the Admin Panel

### Updating Images
- Go to **Gallery** or **Hero Section** in the admin
- Click an item → click the image field → upload a photo
- Hit **Save** — the site rebuilds in ~30 seconds

### Adding/Editing Services
- Go to **Services** in the admin
- Edit any service name, icon, or description
- Toggle **Active** off to hide a service without deleting it
- Add new services with the **New Service** button

### Updating Contact Info
- Go to **Site Settings → Contact Info**
- Edit phone, email, address, hours
- Hit **Save**

---

## How It All Works
1. You edit something in the admin panel
2. Decap CMS saves the change to GitHub (as a JSON file update)
3. GitHub notifies Netlify of the change
4. Netlify rebuilds and re-deploys the site (~30 seconds)
5. Changes are live
