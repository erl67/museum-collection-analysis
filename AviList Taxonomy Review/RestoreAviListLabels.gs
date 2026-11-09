/**
 * Restore imported AviList hyperlink labels from the original Excel workbooks.
 *
 * Paste into Code.gs in Apps Script. Add Google Sheets API under Services.
 * Run a preview before running its corresponding restore.
 * Run as an editor of the Google spreadsheets selected for restoration.
 * Every restore puts Changes headers in row 1 if needed. Types also moves
 * Previous Identifications from K to H. Previews do not change the layout.
 *
 * Commit and push the row-1 Excel exports before running this script.
 * SOURCE_REF may name a commit containing these exports. Existing row-7
 * Google imports can be migrated when their records match these exports.
 */
const SOURCE_REF = 'main';
const SOURCE_ROOT = 'https://raw.githubusercontent.com/erl67/museum-collection-analysis/';
const AVI_BOOKS = [
  {
    name: 'Eggs',
    id: '1E7LpFObmTzfDGmwIsvtUQZV9UnkNOrd6t6YgbxsfeOE',
    changesHeaderRow: 1,
    columns: {
      Changes: ['H', 'I'],
      'Affected records': ['Q'],
      Decisions: ['E'],
      References: ['E'],
      'Link index': ['B', 'C'],
    },
  },
  {
    name: 'Fluids',
    id: '1BpUqwXkKgVxwtAtW0CuHJ337PAWfhwzcJWL7nd5artg',
    changesHeaderRow: 1,
    columns: {
      Changes: ['H', 'I'],
      'Affected records': ['A', 'Q'],
      Decisions: ['E'],
      References: ['E'],
      'Link index': ['B', 'C'],
      'Fluid Sheet': ['A'],
    },
  },
  {
    name: 'Types',
    id: '1U4BAHmCsyQsLNlsFFxV7nTNxVMjNMQC5MH-XiK0YEso',
    movePreviousIdentifications: true,
    changesHeaderRow: 1,
    columns: {
      Changes: ['I', 'J', 'Q', 'R'],
      'Affected records': ['A', 'Q'],
      'All names': ['I'],
      Decisions: ['E', 'G', 'H'],
      References: ['A', 'D', 'E'],
      'Read me': ['B'],
      'Type notes': ['A', 'E', 'I'],
      'Link index': ['B', 'C'],
      'Type Sheet': ['N'],
    },
  },
];

function previewAviListLabels() {
  runAviListLabels_(false);
}

function restoreAviListLabels() {
  runAviListLabels_(true);
}

function previewEggsLabels() {
  runAviListLabels_(false, 'Eggs');
}

function restoreEggsLabels() {
  runAviListLabels_(true, 'Eggs');
}

function previewFluidsLabels() {
  runAviListLabels_(false, 'Fluids');
}

function restoreFluidsLabels() {
  runAviListLabels_(true, 'Fluids');
}

function previewTypesLabels() {
  runAviListLabels_(false, 'Types');
}

function restoreTypesLabels() {
  runAviListLabels_(true, 'Types');
}

function runAviListLabels_(apply, name) {
  if (apply && typeof Sheets === 'undefined') {
    throw new Error('Add the Google Sheets API under Services before running the restore.');
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    for (const book of AVI_BOOKS) {
      if (name && book.name !== name) continue;
      console.log(book.name + ': reading the Excel export from GitHub.');
      const data = planAviListLabels_(book, apply);
      if (apply) {
        const result = data.length ? Sheets.Spreadsheets.Values.batchUpdate({
          valueInputOption: 'USER_ENTERED',
          data,
        }, book.id) : null;
        console.log(book.name + ': updated ' + (result?.totalUpdatedCells || 0) + ' cells.');
      }
    }
    if (!apply) console.log('Preview only. No cells were changed.');
  } finally {
    lock.releaseLock();
  }
}

function planAviListLabels_(book, apply) {
  const sources = readAviListExcel_(book);
  const spreadsheet = SpreadsheetApp.openById(book.id);
  const tabs = new Map(spreadsheet.getSheets().map(tab => [tab.getName(), tab]));
  const gids = new Map([...tabs].map(([name, tab]) => [name, String(tab.getSheetId())]));
  const data = [];
  const examples = [];
  const skipped = [];

  // Validate every required tab before changing the Changes layout.
  for (const tabName of Object.keys(book.columns)) {
    if (!tabs.has(tabName)) throw new Error(book.name + ': Google Sheets tab missing: ' + tabName);
  }
  const layout = prepareAviListColumnLayout_(book, spreadsheet, Boolean(apply));

  for (const [tabName, columns] of Object.entries(book.columns)) {
    const tab = tabs.get(tabName);
    if (!tab) throw new Error(book.name + ': Google Sheets tab missing: ' + tabName);
    const tabLastRow = tab.getLastRow();
    for (const sourceColumn of columns) {
      // A preview reads the old positions without moving anything.
      const column = layout.legacyColumns && tabName === 'Changes'
        ? legacyAviListChangesColumn_(sourceColumn) : sourceColumn;
      const candidates = sources.get(tabName).filter(link => link.column === sourceColumn)
        .map(link => tabName === 'Changes' ? {...link, row: link.row + layout.rowOffset} : link);
      if (!candidates.length) continue;

      const lastRow = Math.min(tabLastRow, Math.max(...candidates.map(link => link.row)));
      const formulas = lastRow ? tab.getRange(column + '1:' + column + lastRow).getFormulas() : [];
      const updates = Array(lastRow).fill(null); // Sheets API skips nulls.
      let changed = 0;
      let alreadyCorrect = 0;
      let otherLabel = 0;
      let unmatched = 0;
      let externalWithoutFormula = 0;
      let movedTargets = 0;

      for (const link of candidates) {
        const formula = formulas[link.row - 1]?.[0] || '';
        const parsed = parseAviListFormula_(formula);
        const cell = tabName + '!' + column + link.row;
        if (!formula && !link.targetTab) {
          externalWithoutFormula++;
          continue;
        }
        const targetMatches = parsed && matchesAviListTarget_(parsed.url, link, gids, book.id);
        const movedTarget = parsed && !targetMatches
          && matchesLegacyAviListTarget_(parsed.url, link, gids, book);
        if (!parsed || (!targetMatches && !movedTarget)) {
          unmatched++;
          if (skipped.length < 8) skipped.push(cell);
          continue;
        }
        if (parsed.label === link.label && !movedTarget) {
          alreadyCorrect++;
          continue;
        }
        // Sheets' import duplicates the URL as the label. Preserve labels
        // that already contain other text, including manual corrections.
        const customLabel = parsed.label !== null && parsed.label !== parsed.url && parsed.label !== link.label;
        if (customLabel) {
          otherLabel++;
          if (!movedTarget) continue;
        }
        const prefix = movedTarget
          ? '=HYPERLINK("#gid=' + gids.get(link.targetTab) + '&range=' + link.target + '"'
          : parsed.prefix;
        updates[link.row - 1] = prefix + parsed.separator
          + '"' + (customLabel ? parsed.label : link.label).replace(/"/g, '""') + '")';
        changed++;
        if (movedTarget) movedTargets++;
        if (examples.length < 4) examples.push(cell + ' → ' + link.label);
      }
      if (changed) {
        data.push({
          range: "'" + tabName.replace(/'/g, "''") + "'!" + column + '1:' + column + lastRow,
          majorDimension: 'COLUMNS',
          values: [updates],
        });
      }
      console.log(book.name + ' / ' + tabName + ' ' + column + ': ' + changed
        + ' to restore, ' + alreadyCorrect + ' already correct, ' + otherLabel
        + ' other labels kept, ' + unmatched + ' without a matching formula, '
        + externalWithoutFormula + ' external links without formulas left as-is; '
        + movedTargets + ' return links follow the updated Changes layout.');
    }
  }
  for (const example of examples) console.log(book.name + ' example: ' + example);
  if (skipped.length) console.log(book.name + ' unmatched examples: ' + skipped.join(', '));
  return data;
}

function legacyAviListChangesColumn_(column) {
  return ({H: 'K', I: 'H', J: 'I', K: 'J'})[column] || column;
}

function aviListChangesHeaders_(book) {
  return book.movePreviousIdentifications
    ? ['Previous Identifications', 'Evidence keys', 'Affected catalog number', 'Record scope']
    : ['Evidence keys', 'Affected catalog numbers', 'Record scope', 'Original structured name'];
}

function prepareAviListColumnLayout_(book, spreadsheet, apply) {
  if (!book.changesHeaderRow) return {legacyColumns: false, rowOffset: 0};
  const tab = spreadsheet.getSheetByName('Changes');
  if (!tab) throw new Error(book.name + ': Google Sheets tab missing: Changes');
  const normalize = text => String(text).trim().replace(/\s+/g, ' ').toLowerCase();
  const current = aviListChangesHeaders_(book).map(normalize);
  const legacy = ['Evidence keys', 'Affected catalog number', 'Record scope', 'Previous Identifications'].map(normalize);
  const headers = row => tab.getRange('H' + row + ':K' + row).getDisplayValues()[0].map(normalize);
  const matches = (row, expected) => JSON.stringify(headers(row)) === JSON.stringify(expected);
  const headerRow = [1, 7].find(row => matches(row, current)
    || (book.movePreviousIdentifications && matches(row, legacy)));
  if (!headerRow) {
    throw new Error(book.name + ': Changes headers do not match a supported layout in row 1 or 7. No layout changes were made.');
  }
  const legacyColumns = Boolean(book.movePreviousIdentifications && matches(headerRow, legacy));
  const rowOffset = headerRow - 1;
  if (rowOffset) {
    const top = tab.getRange('A1:R6');
    if (top.getValues().some(row => row.some(value => value !== '' && value !== null))
        || top.getFormulas().some(row => row.some(Boolean))) {
      throw new Error(book.name + ': Changes rows 1–6 contain content. They cannot be removed automatically.');
    }
  }
  if (!apply) {
    if (legacyColumns) console.log(book.name + ': restore will move Previous Identifications from K to H.');
    if (rowOffset) console.log(book.name + ': restore will remove six blank rows so Changes headers start in row 1.');
    return {legacyColumns, rowOffset};
  }
  if (legacyColumns) tab.moveColumns(tab.getRange('K:K'), 8);
  if (rowOffset) tab.deleteRows(1, 6);
  if (tab.getFrozenRows() !== 1) tab.setFrozenRows(1);
  SpreadsheetApp.flush();
  if (!matches(1, current)) throw new Error(book.name + ': could not verify the new Changes header layout.');
  if (legacyColumns || rowOffset) console.log(book.name + ': Changes now has headers in row 1'
    + (book.movePreviousIdentifications ? ' and Previous Identifications in H.' : '.'));
  return {legacyColumns: false, rowOffset: 0};
}

function matchesLegacyAviListTarget_(url, link, gids, book) {
  if (!book.changesHeaderRow || link.targetTab !== 'Changes') return false;
  const match = link.target.match(/^([A-Z]+)(\d+)$/);
  if (!match) return false;
  const column = match[1];
  const oldColumn = book.movePreviousIdentifications ? legacyAviListChangesColumn_(column) : column;
  const row = Number(match[2]);
  const targets = new Set([oldColumn + row, column + (row + 6), oldColumn + (row + 6)]);
  return [...targets].some(target => target !== link.target
    && matchesAviListTarget_(url, {...link, target}, gids, book.id));
}

function parseAviListFormula_(formula) {
  const match = formula.match(/^(=HYPERLINK\(\s*"((?:[^"]|"")*)")(?:\s*([,;])\s*"((?:[^"]|"")*)")?\s*\)$/i);
  if (!match) return null;
  return {
    prefix: match[1],
    url: match[2].replace(/""/g, '"'),
    separator: match[3] || ',',
    label: match[4] === undefined ? null : match[4].replace(/""/g, '"'),
  };
}

function matchesAviListTarget_(url, link, gids, bookId) {
  if (!link.targetTab) return url === link.target;
  const hash = url.indexOf('#');
  if (hash < 0) return false;
  const base = url.slice(0, hash);
  const workbookUrl = 'https://docs.google.com/spreadsheets/d/' + bookId;
  if (base && base !== workbookUrl && !base.startsWith(workbookUrl + '/')) return false;

  const fragment = url.slice(hash + 1);
  const gid = fragment.match(/(?:^|&)gid=(\d+)(?:&|$)/)?.[1];
  const range = fragment.match(/(?:^|&)range=((?:%24|\$)?[A-Z]+(?:%24|\$)?\d+)(?:&|$)/i)?.[1];
  return Boolean(gid && gid === gids.get(link.targetTab) && range
    && decodeURIComponent(range).replace(/\$/g, '').toUpperCase() === link.target);
}

function readAviListExcel_(book) {
  const url = SOURCE_ROOT + encodeURIComponent(SOURCE_REF)
    + '/AviList%20Taxonomy%20Review/AviList_' + book.name + '_taxonomic_review.xlsx';
  const response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
  if (response.getResponseCode() !== 200) {
    throw new Error(book.name + ': GitHub returned HTTP ' + response.getResponseCode()
      + '. Check that the matching Excel export is available at ' + url);
  }
  const archive = response.getBlob().setContentType('application/zip');
  const entries = new Map(Utilities.unzip(archive).map(blob => [blob.getName(), blob]));
  const xml = path => {
    const blob = entries.get(path);
    if (!blob) throw new Error(book.name + ': workbook part missing: ' + path);
    return blob.getDataAsString('UTF-8');
  };

  const workbookRels = relationshipTargets_(xml('xl/_rels/workbook.xml.rels'));
  const strings = entries.has('xl/sharedStrings.xml')
    ? Array.from(excelElements_(xml('xl/sharedStrings.xml'), 'si'), item => excelText_(item[2]))
    : [];
  const sources = new Map();

  for (const [, attrs] of excelElements_(xml('xl/workbook.xml'), 'sheet')) {
    const name = excelAttribute_(attrs, 'name');
    if (!Object.prototype.hasOwnProperty.call(book.columns, name)) continue;
    const columns = book.columns[name];
    const target = workbookRels.get(excelAttribute_(attrs, 'id', true));
    if (!target) throw new Error(book.name + ': Excel worksheet path missing: ' + name);
    const path = target.startsWith('/') ? target.slice(1) : 'xl/' + target;
    const worksheet = xml(path);
    const divider = path.lastIndexOf('/') + 1;
    const relPath = path.slice(0, divider) + '_rels/' + path.slice(divider) + '.rels';
    const rels = entries.has(relPath) ? relationshipTargets_(xml(relPath)) : new Map();
    const links = new Map();
    for (const [, attributes] of excelElements_(worksheet, 'hyperlink')) {
      const address = excelAttribute_(attributes, 'ref');
      const ref = address.match(/^([A-Z]+)(\d+)$/);
      if (!ref || !columns.includes(ref[1])) continue;
      const location = excelAttribute_(attributes, 'location');
      const external = rels.get(excelAttribute_(attributes, 'id', true));
      const internal = location || (external?.startsWith('#') ? external.slice(1) : '');
      if (internal) {
        const match = internal.match(/^#?(?:'((?:[^']|'')+)'|([^!]+))!\$?([A-Z]+)\$?(\d+)$/i);
        if (match) {
          links.set(address, {
            column: ref[1], row: Number(ref[2]),
            targetTab: (match[1] || match[2]).replace(/''/g, "'"),
            target: match[3].toUpperCase() + match[4],
          });
        }
      } else if (external) {
        links.set(address, {column: ref[1], row: Number(ref[2]), target: external});
      }
    }

    const labeledLinks = [];
    const headers = new Map();
    const headerCells = ['H', 'I', 'J', 'K'].map(column => column + (book.changesHeaderRow || 7));
    // Scan the workbook XML in JavaScript. Calling XmlService methods for
    // every cell and hyperlink can exceed the Apps Script execution limit.
    for (const [, attributes, contents] of excelElements_(worksheet, 'c')) {
      const address = excelAttribute_(attributes, 'r');
      const link = links.get(address);
      const checkHeader = book.changesHeaderRow && name === 'Changes' && headerCells.includes(address);
      if ((!link && !checkHeader) || !contents) continue;
      const value = decodeExcelXml_(excelElements_(contents, 'v').next().value?.[2] || '');
      const type = excelAttribute_(attributes, 't');
      const label = type === 's' ? (value ? strings[Number(value)] : '')
        : type === 'inlineStr' ? excelText_(contents)
        : value;
      if (checkHeader) headers.set(address, label);
      if (link && label) labeledLinks.push({...link, label});
    }
    if (book.changesHeaderRow && name === 'Changes') {
      const expected = aviListChangesHeaders_(book);
      const actual = ['H', 'I', 'J', 'K'].map(column => headers.get(column + (book.changesHeaderRow || 7)));
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(book.name + ': the GitHub Excel export must have Changes headers in row 1'
          + (book.movePreviousIdentifications ? ' and Previous Identifications in H.' : '.'));
      }
    }
    sources.set(name, labeledLinks);
  }

  for (const tabName of Object.keys(book.columns)) {
    if (!sources.has(tabName)) throw new Error(book.name + ': Excel tab missing: ' + tabName);
  }
  return sources;
}

function relationshipTargets_(xml) {
  return new Map(Array.from(excelElements_(xml, 'Relationship'), ([, attrs]) => [
    excelAttribute_(attrs, 'Id'),
    excelAttribute_(attrs, 'Target'),
  ]));
}

// These XLSX parts contain flat cell, hyperlink, or relationship elements.
// Match their local names with or without an Excel XML namespace prefix.
function excelElements_(xml, name) {
  const qualified = '(?:[\\w.-]+:)?' + name;
  const attributes = "((?:[^>\"']|\"[^\"]*\"|'[^']*')*?)";
  return xml.matchAll(new RegExp('<' + qualified + '(?=\\s|/?>)' + attributes
    + '(?:/>|>([\\s\\S]*?)</' + qualified + '\\s*>)', 'g'));
}

function excelAttribute_(attributes, name, namespaced) {
  const qualified = (namespaced ? '[\\w.-]+:' : '') + name;
  const match = attributes.match(new RegExp('\\s' + qualified + "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)')"));
  return match ? decodeExcelXml_(match[1] ?? match[2]) : '';
}

function excelText_(xml) {
  if (!xml) return '';
  // Exclude pronunciation guides from shared and inline string labels.
  const text = xml.replace(/<(?:[\w.-]+:)?rPh\b[^>]*>[\s\S]*?<\/(?:[\w.-]+:)?rPh>/g, '');
  return Array.from(excelElements_(text, 't'), match => decodeExcelXml_(match[2] || '')).join('');
}

function decodeExcelXml_(text) {
  const entities = {amp: '&', lt: '<', gt: '>', quot: '"', apos: "'"};
  return text.replace(/&(amp|lt|gt|quot|apos|#x[0-9a-fA-F]+|#\d+);/g, (_, entity) => {
    if (entity[0] !== '#') return entities[entity];
    return String.fromCodePoint(entity[1] === 'x'
      ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)));
  });
}
