<?php
/*
Plugin Name: Revue de presse embed
Description: Embed d’articles avec zoom, rognage intelligent, shortcode et bloc Gutenberg.
Version: 5.2.1
Author: Frédéric Sarter (Peredovitch)
*/

/* ===== BEGIN: CORE RENDER FUNCTION ===== */
function rp_render($atts) {

    $defaults = array(
        'url'       => '',
        'title'     => '',
        'titre'     => '', // rétrocompatibilité
        'lang'      => 'fr',
        'scale'     => 0.4,
        'offset_x'  => 0,
        'offset_y'  => 0,
        'text'      => '',
        'align'     => 'right',
        'width'     => 320,
        'height'    => 220,
        'gap'       => 0.75,
        'image'     => ''
    );

    $atts = shortcode_atts($defaults, $atts, 'revue_presse');

    $scale  = max(0.1, floatval($atts['scale']));
    $width  = max(1, intval($atts['width']));
    $height = max(1, intval($atts['height']));
    $gap = max(2, intval($atts['gap']));
    

    // UX simplifiée : offsets toujours négatifs
    $offset_x = -abs(intval($atts['offset_x']));
    $offset_y = -abs(intval($atts['offset_y']));

    $align = in_array($atts['align'], array('left', 'right', 'center'), true) ? $atts['align'] : 'right';
    $lang  = sanitize_key($atts['lang']);
    $url   = esc_url($atts['url']);
    $image = esc_url($atts['image']);

    $raw_title = '';
    if (!empty($atts['title'])) {
        $raw_title = $atts['title'];
    } elseif (!empty($atts['titre'])) {
        $raw_title = $atts['titre'];
    } elseif (!empty($url)) {
        $host = parse_url($url, PHP_URL_HOST);
        $raw_title = $host ? $host : '';
    }

    $title = esc_html($raw_title);

    /* ===== BEGIN: LABELS ===== */
    $labels = array(
        'fr' => 'Lire en plein écran sur',
        'en' => 'Read full article on',
        'es' => 'Leer el artículo completo en',
        'de' => 'Artikel vollständig lesen auf',
        'it' => 'Leggi l\'articolo completo su'
    );
    /* ===== END: LABELS ===== */

    $label = !empty($atts['text'])
        ? $atts['text']
        : (isset($labels[$lang]) ? $labels[$lang] : $labels['fr']);

    $label = esc_html($label);

    // Compensation correcte : offset affecté par le scale
    $iframe_width  = ($width / $scale) + (abs($offset_x) / $scale);
    $iframe_height = ($height / $scale) + (abs($offset_y) / $scale);

    /* ===== BEGIN: UNIQUE INSTANCE ID ===== */
    $instance_id = 'rp-' . wp_unique_id();
    /* ===== END: UNIQUE INSTANCE ID */

    ob_start();
    ?>
    <div id="<?php echo esc_attr($instance_id); ?>" class="rp-embed align<?php echo esc_attr($align); ?>">
        <div
            class="rp-viewport"
            <?php if (!empty($image)) : ?>
                style="background-image:url('<?php echo $image; ?>');"
            <?php endif; ?>
        >
            <?php if (!empty($url)) : ?>
                <iframe src="<?php echo $url; ?>" loading="lazy"></iframe>
            <?php endif; ?>
        </div>

        <?php if (!empty($url) && !empty($title)) : ?>
            <div class="rp-caption">
                <?php echo $label; ?>
                <a href="<?php echo $url; ?>" target="_blank" rel="noopener">
                    <?php echo $title; ?>
                </a>
            </div>
        <?php endif; ?>
    </div>

    <style>
    #<?php echo esc_attr($instance_id); ?> {
        width: <?php echo (int) $width; ?>px;
        margin-bottom: 1em;
    }

    #<?php echo esc_attr($instance_id); ?>.alignleft {
        float: left;
        margin-right: <?php echo esc_attr($atts['gap']); ?>em;
    }

    #<?php echo esc_attr($instance_id); ?>.alignright {
        float: right;
        margin-left: <?php echo esc_attr($atts['gap']); ?>em;
    }

    #<?php echo esc_attr($instance_id); ?>.aligncenter {
        display: block;
        margin: 1em auto;
    }

    #<?php echo esc_attr($instance_id); ?> .rp-viewport {
        width: <?php echo (int) $width; ?>px;
        height: <?php echo (int) $height; ?>px;
        overflow: hidden;
        position: relative;
        border: 1px solid #ccc;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }

    #<?php echo esc_attr($instance_id); ?> .rp-viewport iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: <?php echo esc_attr($iframe_width); ?>px !important;
        height: <?php echo esc_attr($iframe_height); ?>px !important;
        transform: translate(<?php echo (int) $offset_x; ?>px, <?php echo (int) $offset_y; ?>px) scale(<?php echo esc_attr($scale); ?>);
        transform-origin: top left;
        border: none;
        max-width: none !important;
    }

    #<?php echo esc_attr($instance_id); ?> .rp-caption {
        font-size: 0.8em;
        line-height: 1.3;
        margin-top: 0.4em;
    }
    </style>
    <?php
    return ob_get_clean();
}
/* ===== END: CORE RENDER FUNCTION */


/* ===== BEGIN: SHORTCODE ===== */
function rp_shortcode($atts) {
    return rp_render($atts);
}
add_shortcode('revue_presse', 'rp_shortcode');
/* ===== END: SHORTCODE */


/* ===== BEGIN: BLOCK REGISTRATION ===== */
function rp_register_block() {

    wp_register_script(
        'rp-block-editor',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-components', 'wp-block-editor'),
        null,
        true
    );

    register_block_type(__DIR__ . '/build', array(
        'editor_script'   => 'rp-block-editor',
        'render_callback' => 'rp_render'
    ));
}
add_action('init', 'rp_register_block');
/* ===== END: BLOCK REGISTRATION */


/* ===== BEGIN: STRICT EDITOR ENQUEUE ===== */
add_action('enqueue_block_editor_assets', function() {
    wp_enqueue_script('rp-block-editor');
});
/* ===== END: STRICT EDITOR ENQUEUE */
