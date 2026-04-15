=== Revue de presse embed ===
Contributors: peredovitch
Tags: iframe, embed, presse, media, preview, gutenberg, shortcode
Requires at least: 6.0
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 5.2.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Embed external articles in a compact, readable preview with zoom, smart cropping and source link.

== Description ==

Revue de presse embed helps editors insert external articles into a post as compact previews.

Main features:

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

This plugin is designed for editorial use such as press reviews and source roundups.

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the WordPress admin
3. Insert the "Revue de presse" block in Gutenberg
4. Or use the shortcode in the classic editor

== Usage ==

= Gutenberg block =

Add the "Revue de presse" block and configure:

* URL
* Title
* Custom caption text
* Alignment
* Width and height
* Scale
* Vertical crop
* Horizontal crop
* Optional fallback image

= Shortcode =

`[revue_presse url="https://example.com/article" title="Example" lang="fr" scale="0.4" offset_x="40" offset_y="60" align="right" width="320" height="220"]`

Offsets are interpreted as crop values and always applied as negative internal translations.

== Frequently Asked Questions ==

= Why is the article not fully readable? =

The goal is to provide a visual preview and encourage traffic to the original source.

= Why do some sites fail to display? =

Some websites block iframe embedding through security headers such as X-Frame-Options or Content-Security-Policy.

= What is the fallback image for? =

It provides a background preview if the iframe does not load correctly or is blocked.

= Can I use multiple embeds on the same page? =

Yes. Since version 5.2.1, each embed instance uses isolated styling so multiple blocks or shortcodes can coexist without interfering with one another.

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

== License ==

GPLv2 or later
