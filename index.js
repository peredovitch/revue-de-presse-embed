(function(wp) {

if (!wp || !wp.blocks) return;

const { registerBlockType } = wp.blocks;
const { TextControl, SelectControl, RangeControl, Button } = wp.components;
const { useBlockProps } = wp.blockEditor;

const labels = {
  fr: {
    url: "URL",
    title: "Titre",
    scale: "Échelle",
    offsetY: "Rognage vertical",
    offsetX: "Rognage horizontal",
    align: "Alignement",
    text: "Texte",
    lang: "Langue",
    image: "Image de repli",
    width: "Largeur",
    height: "Hauteur",
    preview: "Prévisualisation",
    reset: "Réinitialiser",
    presets: "Préréglages",
    compact: "Compact",
    large: "Large",
    quote: "Citation",
    gap: "Espacement texte"
  },
  en: {
    url: "URL",
    title: "Title",
    scale: "Scale",
    offsetY: "Vertical crop",
    offsetX: "Horizontal crop",
    align: "Alignment",
    text: "Text",
    lang: "Language",
    image: "Fallback image",
    width: "Width",
    height: "Height",
    preview: "Preview",
    reset: "Reset",
    presets: "Presets",
    compact: "Compact",
    large: "Large",
    quote: "Quote",
    gap: "Margin"
  },
  es: {
    url: "URL",
    title: "Título",
    scale: "Escala",
    offsetY: "Recorte vertical",
    offsetX: "Recorte horizontal",
    align: "Alineación",
    text: "Texto",
    lang: "Idioma",
    image: "Imagen alternativa",
    width: "Ancho",
    height: "Alto",
    preview: "Vista previa",
    reset: "Restablecer",
    presets: "Preajustes",
    compact: "Compacto",
    large: "Grande",
    quote: "Cita",
    gap: "Margen"
  },
  de: {
    url: "URL",
    title: "Titel",
    scale: "Skalierung",
    offsetY: "Vertikaler Zuschnitt",
    offsetX: "Horizontaler Zuschnitt",
    align: "Ausrichtung",
    text: "Text",
    lang: "Sprache",
    image: "Fallback-Bild",
    width: "Breite",
    height: "Höhe",
    preview: "Vorschau",
    reset: "Zurücksetzen",
    presets: "Voreinstellungen",
    compact: "Kompakt",
    large: "Groß",
    quote: "Zitat",
    gap: "Marge"
  },
  it: {
    url: "URL",
    title: "Titolo",
    scale: "Scala",
    offsetY: "Ritaglio verticale",
    offsetX: "Ritaglio orizzontale",
    align: "Allineamento",
    text: "Testo",
    lang: "Lingua",
    image: "Immagine alternativa",
    width: "Larghezza",
    height: "Altezza",
    preview: "Anteprima",
    reset: "Reimposta",
    presets: "Preset",
    compact: "Compatto",
    large: "Grande",
    quote: "Citazione",
    gap: "Margine"
  }
};

registerBlockType('rp/embed', {
  edit: ({ attributes, setAttributes }) => {
    const t = labels[attributes.lang] || labels.fr;

    const blockProps = useBlockProps({
      className: attributes.align ? `align${attributes.align}` : ''
    });

    const cropX = Math.abs(attributes.offset_x || 0);
    const cropY = Math.abs(attributes.offset_y || 0);
    const scale = Math.max(0.1, attributes.scale || 0.4);

    const previewWidth = 800 + (cropX / scale);
    const previewHeight = 600 + (cropY / scale);

    const applyPreset = (preset) => {
      if (preset === 'compact') {
        setAttributes({
          preset: 'compact',
          width: 260,
          height: 160,
          scale: 0.4,
          offset_x: 0,
          offset_y: 0
        });
      }

      if (preset === 'large') {
        setAttributes({
          preset: 'large',
          width: 420,
          height: 280,
          scale: 0.5,
          offset_x: 0,
          offset_y: 0
        });
      }

      if (preset === 'quote') {
        setAttributes({
          preset: 'quote',
          width: 320,
          height: 180,
          scale: 0.3,
          offset_x: 0,
          offset_y: -60
        });
      }
    };

    return wp.element.createElement('div', blockProps,

      wp.element.createElement(SelectControl, {
        label: t.lang,
        value: attributes.lang,
        options: [
          { label: 'Français', value: 'fr' },
          { label: 'English', value: 'en' },
          { label: 'Español', value: 'es' },
          { label: 'Deutsch', value: 'de' },
          { label: 'Italiano', value: 'it' }
        ],
        onChange: (val) => setAttributes({ lang: val })
      }),

      wp.element.createElement(TextControl, {
        label: t.url,
        value: attributes.url,
        onChange: (val) => setAttributes({ url: val })
      }),

      wp.element.createElement(TextControl, {
        label: t.title,
        value: attributes.title,
        onChange: (val) => setAttributes({ title: val })
      }),

      wp.element.createElement(TextControl, {
        label: t.text,
        value: attributes.text,
        onChange: (val) => setAttributes({ text: val })
      }),

      wp.element.createElement(TextControl, {
        label: t.image,
        value: attributes.image,
        onChange: (val) => setAttributes({ image: val })
      }),

      wp.element.createElement(SelectControl, {
        label: t.align,
        value: attributes.align,
        options: [
          { label: 'Right', value: 'right' },
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' }
        ],
        onChange: (val) => setAttributes({ align: val })
      }),

      wp.element.createElement(
        'div',
        { style: { marginTop: '10px', marginBottom: '16px' } },
        wp.element.createElement('strong', null, t.presets),
        wp.element.createElement(
          'div',
          { style: { display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' } },

          wp.element.createElement(Button, {
            isSecondary: attributes.preset !== 'compact',
            isPrimary: attributes.preset === 'compact',
            onClick: () => applyPreset('compact')
          }, t.compact),

          wp.element.createElement(Button, {
            isSecondary: attributes.preset !== 'large',
            isPrimary: attributes.preset === 'large',
            onClick: () => applyPreset('large')
          }, t.large),

          wp.element.createElement(Button, {
            isSecondary: attributes.preset !== 'quote',
            isPrimary: attributes.preset === 'quote',
            onClick: () => applyPreset('quote')
          }, t.quote)
        )
      ),

        wp.element.createElement(RangeControl, {
        label: t.gap,
        value: attributes.gap || 0.75,
        min: 0,
        max: 2,
        step: 0.05,
        onChange: (val) => setAttributes({ gap: val })
}),      

        wp.element.createElement(RangeControl, {
        label: t.width,
        value: attributes.width || 320,
        min: 180,
        max: 800,
        step: 10,
        onChange: (val) => setAttributes({ width: val, preset: '' })
      }),

      wp.element.createElement(RangeControl, {
        label: t.height,
        value: attributes.height || 220,
        min: 120,
        max: 800,
        step: 10,
        onChange: (val) => setAttributes({ height: val, preset: '' })
      }),

      wp.element.createElement(RangeControl, {
        label: t.scale,
        value: attributes.scale || 0.4,
        min: 0.1,
        max: 1,
        step: 0.1,
        onChange: (val) => setAttributes({ scale: val, preset: '' })
      }),

      wp.element.createElement(RangeControl, {
        label: t.offsetY,
        value: cropY,
        min: 0,
        max: 400,
        step: 5,
        onChange: (val) => setAttributes({ offset_y: -val, preset: '' })
      }),

      wp.element.createElement(RangeControl, {
        label: t.offsetX,
        value: cropX,
        min: 0,
        max: 400,
        step: 5,
        onChange: (val) => setAttributes({ offset_x: -val, preset: '' })
      }),

      wp.element.createElement(Button, {
        isSecondary: true,
        style: { marginTop: '10px' },
        onClick: () => {
          setAttributes({
            preset: '',
            scale: 0.4,
            offset_x: 0,
            offset_y: 0,
            align: 'right',
            text: '',
            image: '',
            width: 320,
            height: 220
          });
        }
      }, t.reset),

      attributes.url && wp.element.createElement(
        'div',
        { style: { marginTop: '12px' } },
        wp.element.createElement('strong', null, t.preview),
        wp.element.createElement(
          'div',
          {
            style: {
              width: `${attributes.width || 320}px`,
              height: `${attributes.height || 220}px`,
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid #ccc',
              marginTop: '6px',
              backgroundImage: attributes.image ? `url(${attributes.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }
          },
          wp.element.createElement('iframe', {
            src: attributes.url,
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${previewWidth}px`,
              height: `${previewHeight}px`,
              transform: `translate(${-cropX}px, ${-cropY}px) scale(${scale})`,
              transformOrigin: 'top left',
              border: 'none',
              maxWidth: 'none',
              pointerEvents: 'none'
            }
          })
        )
      )
    );
  },

  save: () => null
});

})(window.wp);
