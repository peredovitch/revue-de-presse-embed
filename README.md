# revue-de-presse-embed  
Embed external articles in a compact, readable preview with zoom and smart cropping.  

A minimalist but polished WordPress plugin to nicely and ethically embed press articles (or any web page) in WordPress posts, encouraging outgoing traffic to the original source - usable in press reviews or similar contexts to provide a well-integrated, fine-tuned preview of the quoted piece. The plugin conveniently provides both a shortcode and a Gutenberg block, with ability to adjust margin, width, height, scaling and offset within a 5-language UI (English, French, German, Italian and Spanish) or as shortcode parameters. 

## Overview

**Revue de presse embed** is a lightweight WordPress plugin designed for editorial use.  
It allows you to embed external articles as visual previews directly inside your content, while encouraging users to visit the original source.

Key idea:
> Provide a readable overview — not full readability — to preserve traffic to the source.

## Main features:

* Gutenberg block
* Shortcode support
* Zoom-out preview
* Smart vertical and horizontal cropping
* Left, right or center alignment
* Caption with source link
* Optional fallback image
* Multilingual editor UI (French, English, Spanish, German, Italian)
* Dynamic preview in the editor
* Presets and reset button
  
## 🖼 See the plugin in action (screenshots)  

**How it looks within your published WordPress post:**
 
![Screenshot in lorem ipsum](https://ressources.peredovitch.eu/wp-content/uploads/2026/04/Capture-decran-du-2026-04-15-17-14-31.png)  

**Block UI overview:**

![Block UI overview lorem ipsum screenshot](https://ressources.peredovitch.eu/wp-content/uploads/2026/04/Capture-decran-du-2026-04-15-22-50-44.png) 

**Configure language, URL, title (source link label), fallback image and alternative caption text in the UI:**

![Block UI detail lorem ipsum screenshot](https://ressources.peredovitch.eu/wp-content/uploads/2026/04/Capture-decran-du-2026-04-15-22-52-00.png)  

**Nice and easy settings with a choice of presets, sane defaults and fully adjustable parameters:**  

![Block UI adjustable parameters detail](https://ressources.peredovitch.eu/wp-content/uploads/2026/04/Capture-decran-du-2026-04-15-22-53-27.png)  

**Dynamic and responsive preview as a visual help to fine-tune the settings:**  

![Dynamic preview inside the UI](https://ressources.peredovitch.eu/wp-content/uploads/2026/04/Capture-decran-du-2026-04-15-22-57-33.png)  

## ⚠️ Known limitations  

* Some websites block iframe embedding (X-Frame-Options, CSP)
* Rendering depends on external site layout (not controllable) — if your theme forces its own styling over your plugin settings, you may need to (cautiously) modify your theme's CSS files accordingly: in particular, look out for `!important` flags
* Preview is intentionally limited (editorial choice)

## 📦 Installation

1. Upload the plugin folder to `/wp-content/plugins/` or upload the .zip file through the WordPress admin dashboard
2. Activate the plugin through the WordPress admin
3. Insert the "Revue de presse" block in Gutenberg
4. Or use the shortcode in the classic editor

## 🧩 Usage

**Gutenberg block:**

Add the "Revue de presse" block and configure:

* URL
* Title
* Custom caption text
* Alignment
* Gap / margin
* Width and height
* Scale
* Vertical crop
* Horizontal crop
* Optional fallback image

(Only the source URL is mandatory; all other fields default to sane settings — fallback image, title and alternative caption text are optional)

**Shortcode:**

`[revue_presse url="https://example.com/article" title="Example" image="https://example.com/screenshot.png" lang="fr" scale="0.4" offset_x="40" offset_y="60" align="right" width="320" height="220" gap="O.75"]`

Offsets are interpreted as crop values and always applied as negative internal translations.  

(Only the source URL parameter is mandatory; other parameters are optional or set to sane defaults if void)  

## ❓ Frequently Asked Questions

**Why is the article not fully readable?**

The goal is to provide a visual preview and encourage traffic to the original source.

**Why do some sites fail to display?**

Some websites block iframe embedding through security headers such as X-Frame-Options or Content-Security-Policy.

**What is the fallback image for?**

It provides a background preview if the iframe does not load correctly or is blocked.

**Can I use multiple embeds on the same page?**

Yes. Since version 5.2.1, each embed instance uses isolated styling so multiple blocks or shortcodes can coexist without interfering with one another.  

## 🔧 Technical notes  

* Each embed instance uses isolated CSS
* Fully compatible with multiple embeds per page
* Works in both block editor and classic editor

== Changelog ==

= 5.2.1 =
* Fixed multi-instance rendering conflicts on pages containing several blocks and/or shortcodes
* Added unique instance-based CSS targeting
* Improved robustness for mixed shortcode and block usage
* Kept block attribute schema aligned with editor controls

= 5.2 =
* Restored shortcode support
* Added horizontal crop
* Restored editor preview
* Added fallback image option
* Added multilingual labels: fr, en, es, de, it
* Added explicit code section markers for easier debugging
* Added presets and reset button

= 5.1 =
* Final scale compensation for crop
* Improved UI with sliders
* Safer scale handling

**📄 License**

GPLv2 or later

