# AviList Taxonomy Review

These workbooks compare the bird egg, fluid-preserved specimen, and type catalogues of the Carnegie Museum of Natural History with [**AviList v2026**](https://www.avilist.org/checklist/v2026/). They document direct taxonomic updates and flag determinations that need review.

- [Bird eggs](https://docs.google.com/spreadsheets/d/1E7LpFObmTzfDGmwIsvtUQZV9UnkNOrd6t6YgbxsfeOE/edit?usp=sharing)
- [Fluid-preserved birds](https://docs.google.com/spreadsheets/d/1BpUqwXkKgVxwtAtW0CuHJ337PAWfhwzcJWL7nd5artg/edit?usp=sharing)
- [Holotypes and other type records](https://docs.google.com/spreadsheets/d/1U4BAHmCsyQsLNlsFFxV7nTNxVMjNMQC5MH-XiK0YEso/edit?usp=sharing)

The shared workbooks are also linked from [ericlaslo.com/birds](https://ericlaslo.com/birds/).

## Inputs and scope

- `EggSlipReorganizationProject_FULL.xlsx - Full List.csv` - Egg Sheet export with scientific names, structured genus and epithet fields, families, catalogue numbers, localities, and Howard & Moore numbers.
- `CM_FluidPreserved.xlsx` - Fluid Sheet export with the same core comparison fields plus previous identifications where recorded.
- `CM_Types.xlsx` - Type catalogue export with 58 source fields, including `infraspecificEpithet`, `previousIdentifications`, `typeStatus`, original descriptions, localities, and Remarks.
- `AviList-v2026-20Oct2026-extended-version.xlsx` - Extended checklist published 20 October 2026. It provides accepted names, ranks, families, ranges, Avibase IDs, decision summaries, and a bibliography.

Coverage is counted by catalogue row:

- **Eggs:** 10,189 source data rows; 10,174 with scientific names entered the audit, representing 1,226 distinct name strings.
- **Fluids:** 6,840 source data rows; 6,836 entered the audit, representing 1,514 distinct recorded names or identification labels. Two blank rows and two "No specimen" placeholders remain in the sorted Fluid Sheet tab and are excluded from the audit totals.
- **Types:** all 534 distinct catalogue records entered the audit. The source records identify 520 holotypes and 13 syntypes; one record, E841, has blank `typeStatus` and is explicitly associated with holotype P57348. Repeated current scientific names remain separate catalogue records. All 58 original fields are retained in the final Type Sheet tab, with the original XLSX row appended as a 59th column.

## How the reviews were done

1. Compared the full scientific name, its structured genus and epithet fields, and the recorded family against AviList. A family or structured-field correction can be needed even when the full scientific name matches. The Types review checks `infraspecificEpithet` explicitly, including disagreements with the Scientific Name field.
2. Checked unmatched names against accepted taxa, AviList decisions, and selected supplementary sources. Mappings cover genus transfers, spelling and grammatical agreement, family changes, synonyms, and changes in rank. The catalogue exports contain names from more than one taxonomic treatment. Museum annotations in `previousIdentifications` are distinguished from externally corroborated synonymies.
3. Checked locality for selected species complexes, including cases where an older name is still accepted under narrower species limits. The fluid review also considers historical determinations, captive or missing provenance, tentative identifications, and recorded hybrids. For example, a Vermont fluid specimen filed as *Accipiter gentilis* is a candidate for *Astur atricapillus*, American Goshawk, after the split from Eurasian Goshawk.
4. Cross-checked the original names in the Types catalogue's `typeStatus` against accepted AviList taxa and protonyms, the names under which taxa were originally described. This can reveal a conflict hidden by an otherwise accepted current name. Examples include the types of *Vireo huttoni obscurus* and *Conirostrum leucogenys cyanochroum*, recorded under their respective nominate subspecies, and the Forest Swallow type placed in *Atronanus fuliginosus* through its original name, *Lecythoplastes fuliginosus*.
5. Grouped egg and fluid records by shared outcome. A name can appear in several groups when outcomes differ by locality or source fields. The Types review keeps every catalogue record separate: each Changes entry has one affected record and **Records = 1**, including related specimens, syntypes, and repeated current names.
6. Sorted the reviews by original family, genus, species, and subspecies, retaining original source row numbers. Checked proposed names, families, and identifiers against AviList, reconciled grouped and individual totals, and verified hyperlink destinations. Bibliography entries retain their source provenance, and official deliberations link to the actual GitHub proposal files.

## Results

| Status | Egg records | Fluid records | Type records | Interpretation |
| --- | ---: | ---: | ---: | --- |
| Update | 671 | 631 | 178 | Direct name, structured-field, family, spelling, or rank correction based on the recorded determination. |
| Review | 448 | 140 | 40 | Proposed identification or a conflict to resolve using the specimen, original documentation, locality, or determination history. |
| No change | 9,046 | 5,987 | 315 | Recorded name and family match AviList and the targeted review raised no additional flag. |
| Unresolved | 8 | 78 | 1 | The record identifies a genus or family only, or has an unknown determination. |
| Outside scope | 1 | 0 | 0 | The egg catalogue's *Aepyornis maximus* falls outside this checklist's coverage. |
| **Total reviewed** | **10,174** | **6,836** | **534** | |

The egg **Changes** tab groups **1,128 affected records** into **166 entries**, with family differences highlighted for **134 records** across **21 entries**. The fluid **Changes** tab groups **849 affected records** into **240 entries**, with family differences highlighted for **208 records** across **53 entries**.

The type **Changes** tab contains **219 affected records in 219 individual entries**, with family differences highlighted for **62 records**. Its supporting tabs contain **76 AviList decision summaries** and **150 source and reference entries**. A highlighted family in a Review entry follows the proposed determination and requires the same verification.

## Type names, subspecies, and special cases

Current identification and name-bearing type history are separate fields. A holotype remains the name-bearing type of its original nominal taxon when the current treatment transfers, synonymizes, lumps, or interprets that taxon as a hybrid or intergrade. Preserve the original name in `typeStatus`, the original description, labels, and determination history when updating current taxonomic fields.

The Types workbook reproduces `previousIdentifications` under **Previous Identifications**, in place of a constructed-name column. Historical subspecies epithets are retained in the source. When AviList treats the species as monotypic, an update can use its accepted binomial. For a polytypic species, an unresolved allocation is marked Review and the proposal can stop at species rank. Such an entry leaves the exact subspecies placement open.

The **Type notes** tab documents associations, conflicting determinations, and these special cases. Row numbers below refer to the original `CM_Types.xlsx`, including its header:

- **S16532, original row 10:** the catalogue Remarks identify a juvenile passerine tarsometatarsus mistakenly included with the shearwater sternum S16531 in the description of *Puffinus mcgalli*. The proposal retains **Passeriformes indet.**, with no species or family assignment. S16531 and S16532 remain separate records, and their historical type designations and association are flagged for review.
- **P92997 and P92314, original rows 308 and 317:** these are the holotypes of *Pipra chloromelaena arimensis* and *Pipra chloromelaena*, respectively. The catalogue interprets both as intergrades between *Lepidothrix coronata coronata* and *L. c. caelestipileata*, two accepted subspecies of the same species. Each named form retains its own record and type history. The intergrade formula is retained as a review proposal; it has no single AviList taxon ID.
- **P72471, original row 409:** the holotype of *Pipra anomala* is interpreted in the source Remarks and the AOS SACC hybrid list as *Heterocercus linteatus* × *Pipra aureola*. Both parents are accepted by AviList; the hybrid formula has no single checklist taxon ID.
- **P57348 and E841:** the catalogue links the *Buteo jamaicensis abieticola* holotype and its associated eggs. Their current subspecies placement requires review. E841 retains its blank source `typeStatus`; the association is documented without assigning a new type designation.

## Workbook guide

| Tab | Contents |
| --- | --- |
| **Changes** | Old and accepted or proposed names, families, reasons, evidence keys, affected catalogue numbers, and record scope. The Types workbook includes Previous Identifications next to the reason. Adjacent Wikipedia (old) and Wikipedia (new) columns display **old** and **new**. |
| **Affected records** | Individual rows with original and proposed fields, locality, source row numbers, and catalogue links. E-numbers open egg slips, fluid records open the sorted Fluid Sheet, and type records open Type Sheet. The Types workbook also preserves original `typeStatus` and Remarks here. |
| **All names** | Complete name and family audit, including entries with no detected change. Types retains one row per catalogue record throughout. |
| **Decisions** | Relevant AviList decision summaries, pointers to their source rows, and direct links to the corresponding proposal files in the public `aviantaxonomy/Proposals-Public` GitHub repository. A second proposal has its own Additional deliberation link. |
| **References** | AviList citation, bibliography, and supplementary sources, with DOI or web links where available and source provenance. In Types, A0 identifies AviList, S0 identifies the source catalogue, R keys identify the checklist bibliography, and W keys identify supplementary sources. |
| **Read me** | Scope, statuses, evidence, source preservation, and identifier guidance. |
| **Type notes** | Types workbook only. Individual notes on type identities, associated records, hybrids and intergrades, and conflicting fields, with source text and evidence links. |
| **Link index** | Individual destinations for cells containing several decisions, references, or catalogue records, with return links. |
| **Fluid Sheet** | Fluid workbook only. Selected fields for every source row in taxonomic order, with the original XLSX row and links back to affected records. |
| **Type Sheet** | Final tab of the Types workbook. All 534 source records and all 58 original fields, sorted taxonomically, with Original XLSX row appended and catalogue links back to the review. |

Apply **Update** entries to the corresponding taxonomic fields together, preserving historical determinations and original type names. For **Review**, confirm the identification or locality against the original documentation or specimen before applying a candidate. The locality checks are targeted, and the results reflect the determinations recorded in the supplied exports. AviList provides the accepted checklist placement; historical synonymies without adequate support remain flagged for review. Reproduced decision bibliography does not imply that every cited paper was independently audited against every specimen.

Howard & Moore numbers are retained as historical references. The workbooks list Avibase taxon and species IDs separately where available. The AviList sequence number and worksheet row locate an entry in this specific release. Hybrid formulas and the unidentified bone are not assigned an invented checklist taxon ID.

Wikipedia searches use **genus and species only**, omitting subspecies, for both the old and proposed names. The intraspecific manakin intergrades search *Lepidothrix coronata* once; the intergeneric hybrid's new search includes both parent binomials, and its old search uses the historical name *Pipra anomala*. The unidentified passerine and an unassigned replacement have no corresponding species link. Wikipedia links provide orientation; taxonomic evidence is identified separately.

## Restoring hyperlink labels in Google Sheets

[RestoreAviListLabels.gs](RestoreAviListLabels.gs) reads the matching Excel export from this repository and restores the original visible labels on imported hyperlink formulas. It matches each formula's destination against the Excel source and preserves manually customized labels.

1. Keep the matching `AviList_Eggs_taxonomic_review.xlsx`, `AviList_Fluids_taxonomic_review.xlsx`, or `AviList_Types_taxonomic_review.xlsx` in this folder and commit and push it before running the linker. The script reads `main` by default. For an older imported revision, set `SOURCE_REF` to the commit containing that export.
2. Use the script in Google Apps Script with the Google Sheets API enabled under Services. The three shared spreadsheet IDs are configured in `AVI_BOOKS`; update the corresponding ID if a workbook is imported as a different Google spreadsheet. Run as an editor of the selected spreadsheet.
3. Run the collection's preview and then its matching restore:

   - Eggs: `previewEggsLabels()` → `restoreEggsLabels()`.
   - Fluids: `previewFluidsLabels()` → `restoreFluidsLabels()`.
   - Types: `previewTypesLabels()` → `restoreTypesLabels()`.

The preview leaves cells and columns unchanged. The Types restore recognizes both the original and updated layout. If Previous Identifications is still in K on Changes, it moves that column to H, between the reason and evidence keys, and repairs return links whose destinations shifted. It also handles the Types workbook's All names, Type notes, and Type Sheet navigation. The column move and label restoration can therefore be applied to the existing Types Google Sheet.

## Attribution

AviList Core Team. 2026. *AviList: The Global Avian Checklist*, v2026. The checklist and reproduced decision summaries are licensed under CC BY 4.0. [AviList v2026 DOI](https://doi.org/10.2173/avilist.v2026) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
