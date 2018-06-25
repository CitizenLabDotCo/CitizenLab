// Taken from https://github.com/artf/grapesjs-blocks-basic v0.1.5 and fixed TS errors

const addBlocks = (editor: any, opt: any = {}) => {
  const c = opt;
  const bm = editor.BlockManager;
  const blocks = c.blocks;
  const stylePrefix = c.stylePrefix;
  const flexGrid = c.flexGrid;
  const basicStyle = c.addBasicStyle;
  const clsRow = `${stylePrefix}row`;
  const clsCell = `${stylePrefix}cell`;
  const styleRow = flexGrid ? `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    @media (max-width: 768px) {
      .${clsRow} {
        flex-wrap: wrap;
      }
    }` : `
    .${clsRow} {
      display: table;
      padding: 10px;
      width: 100%;
    }
    @media (max-width: 768px) {
      .${stylePrefix}cell, .${stylePrefix}cell30, .${stylePrefix}cell70 {
        width: 100%;
        display: block;
      }
    }`;
  const styleClm = flexGrid ? `
    .${clsCell} {
      min-height: 75px;
      flex-grow: 1;
      flex-basis: 100%;
    }` : `
    .${clsCell} {
      width: 8%;
      display: table-cell;
      height: 75px;
    }`;
  const styleClm30 = `
  .${stylePrefix}cell30 {
    width: 30%;
  }`;
  const styleClm70 = `
  .${stylePrefix}cell70 {
    width: 70%;
  }`;

  const step = 0.2;
  const minDim = 1;
  const currentUnit = 1;
  const resizerBtm = { minDim, tl: 0, tc: 0, tr: 0, cl: 0, cr: 0, bl: 0, br: 0 };
  const resizerRight: any = { currentUnit, minDim, step, cr: 1, bc: 0, ...resizerBtm };

  // Flex elements do not react on width style change therefore I use
  // 'flex-basis' as keyWidth for the resizer on columns
  if (flexGrid) {
    resizerRight.keyWidth = 'flex-basis';
  }

  const rowAttr = {
    class: clsRow,
    'data-gjs-droppable': `.${clsCell}`,
    'data-gjs-resizable': resizerBtm,
    'data-gjs-name': 'Row',
  };

  const colAttr = {
    class: clsCell,
    'data-gjs-draggable': `.${clsRow}`,
    'data-gjs-resizable': resizerRight,
    'data-gjs-name': 'Cell',
  };

  if (flexGrid) {
    colAttr['data-gjs-unstylable'] = ['width'];
    colAttr['data-gjs-stylable-require'] = ['flex-basis'];
  }

  // Make row and column classes private
  const privateCls = [`.${clsRow}`, `.${clsCell}`];
  editor.on('selector:add', selector =>
    privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1));

  const attrsToString = attrs => {
    const result: any[] = [];

    for (const key in attrs) {
      let value = attrs[key];
      const toParse = value instanceof Array || value instanceof Object;
      value = toParse ? JSON.stringify(value) : value;
      result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`);
    }

    return result.length ? ` ${result.join(' ')}` : '';
  };

  const toAdd = name => blocks.indexOf(name) >= 0;
  const attrsRow = attrsToString(rowAttr);
  const attrsCell = attrsToString(colAttr);

  toAdd('column1') && bm.add('column1', {
    label: c.labelColumn1,
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-b1' },
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''}`
  });

  toAdd('column2') && bm.add('column2', {
    label: c.labelColumn2,
    attributes: { class: 'gjs-fonts gjs-f-b2' },
    category: 'Basic',
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''}`
  });

  toAdd('column3') && bm.add('column3', {
    label: c.labelColumn3,
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-b3' },
    content: `<div ${attrsRow}>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
        <div ${attrsCell}></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
        </style>`
        : ''}`
  });

  toAdd('column3-7') && bm.add('column3-7', {
    label: c.labelColumn37,
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-b37' },
    content: `<div ${attrsRow}>
        <div ${attrsCell} style="${flexGrid ? 'flex-basis' : 'width'}: 30%;"></div>
        <div ${attrsCell} style="${flexGrid ? 'flex-basis' : 'width'}: 70%;"></div>
      </div>
      ${ basicStyle ?
        `<style>
          ${styleRow}
          ${styleClm}
          ${styleClm30}
          ${styleClm70}
        </style>`
        : ''}`
  });

  toAdd('text') && bm.add('text', {
    label: c.labelText,
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-text' },
    content: {
      type: 'text',
      content: 'Insert your text here',
      style: { padding: '10px' },
      activeOnRender: 1
    },
  });

  toAdd('link') && bm.add('link', {
    label: c.labelLink,
    category: 'Basic',
    attributes: { class: 'fa fa-link' },
    content: {
      type: 'link',
      content: 'Link',
      style: { color: '#d983a6' }
    },
  });

  toAdd('image') && bm.add('image', {
    label: c.labelImage,
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-image' },
    content: {
      style: { color: 'black' },
      type: 'image',
      activeOnRender: 1
    },
  });

  toAdd('video') && bm.add('video', {
    label: c.labelVideo,
    category: 'Basic',
    attributes: { class: 'fa fa-youtube-play' },
    content: {
      type: 'video',
      src: 'img/video2.webm',
      style: {
        height: '350px',
        width: '615px',
      }
    },
  });

  toAdd('map') && bm.add('map', {
    label: c.labelMap,
    category: 'Basic',
    attributes: { class: 'fa fa-map-o' },
    content: {
      type: 'map',
      style: { height: '350px' }
    },
  });
};

export default (editor, opts = {}) => {
  const config = {
    blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map'],
    flexGrid: 0,
    stylePrefix: '',
    addBasicStyle: true,
    labelColumn1: '1 Column',
    labelColumn2: '2 Columns',
    labelColumn3: '3 Columns',
    labelColumn37: '2 Columns 3/7',
    labelText: 'Text',
    labelLink: 'Link',
    labelImage: 'Image',
    labelVideo: 'Video',
    labelMap: 'Map',
    ...opts
  };

  addBlocks(editor, config);
};
