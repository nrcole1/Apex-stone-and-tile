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

---

## Setup Steps (one time, ~30 minutes)

### 1. Create a GitHub Repository
1. Go to github.com and sign in (or create a free account)
2. Click **New repository**
3. Name it `apex-stone-tile`
4. Set it to **Public**, click **Create repository**
5. Upload ALL files from this folder (drag & drop on GitHub works fine)

### 2. Connect GitHub to Netlify
1. Go to app.netlify.com → **Add new site → Import an existing project**
2. Choose **GitHub** and select your `apex-stone-tile` repo
3. Leave build settings blank (no build command needed)
4. Click **Deploy site**
5. In Site Settings → Domain, set your custom domain (apexstoneandtile.netlify.app is already set)

### 3. Enable Netlify Identity
1. In Netlify dashboard → **Identity** tab → click **Enable Identity**
2. Under **Registration**, set to **Invite only** (important!)
3. Under **Services → Git Gateway**, click **Enable Git Gateway**

### 4. Invite Admin Users
1. In Identity tab → click **Invite users**
2. Enter your email + any co-admin emails (up to 2 others)
3. Each person accepts the invite via email and sets a password

### 5. Access the Admin Panel
- Go to: **yoursite.netlify.app/admin**
- Log in with your Netlify Identity credentials
- You'll see panels for: Hero, Stats, About, Contact, Process, Services, Gallery

---

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
