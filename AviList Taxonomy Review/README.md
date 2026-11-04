# AviList Taxonomy Review

These workbooks compare the bird egg and fluid-preserved specimen catalogues of the Carnegie Museum of Natural History with [**AviList v2026**](https://www.avilist.org/checklist/v2026/). They document direct taxonomic updates and flag determinations that need review.

- Bird eggs — [AviList_Eggs_taxonomic_review.xlsx](AviList_Eggs_taxonomic_review.xlsx)
- Fluid-preserved birds — [AviList_Fluids_taxonomic_review.xlsx](AviList_Fluids_taxonomic_review.xlsx)

## Inputs and scope

- `EggSlipReorganizationProject_FULL.xlsx - Full List.csv` — Egg Sheet export with scientific names, structured genus and epithet fields, families, catalogue numbers, localities, and Howard & Moore numbers.
- `CM_FluidPreserved.xlsx` — Fluid Sheet export with the same core comparison fields plus previous identifications where recorded.
- `AviList-v2026-20Oct2026-extended-version.xlsx` — Extended checklist published 20 October 2026. It provides accepted names, ranks, families, ranges, Avibase IDs, decision summaries, and a bibliography.

The Egg Sheet contained **10,189 data rows**, of which **10,174** had scientific names, representing **1,226 distinct name strings**. The Fluid Sheet contained **6,840 data rows**, of which **6,836** entered the audit, representing **1,514 distinct recorded names or identification labels**. The fluid review retains two blank rows and two “No specimen” placeholders in the sorted Fluid Sheet tab and excludes them from the audit totals. Counts refer to catalogue rows.

## How the reviews were done

1. Compared the full scientific name, its structured genus and epithet fields, and the recorded family against AviList. A family or structured-field correction can be needed even when the full scientific name matches.
2. Checked unmatched names against accepted taxa, AviList decisions, and selected supplementary sources. Mappings cover genus transfers, spelling and grammatical agreement, family changes, synonyms, and changes in rank. The catalogue exports contain names from more than one taxonomic treatment.
3. Checked locality for selected species complexes, including cases where an older name is still accepted under narrower species limits. The fluid review also considers historical determinations, captive or missing provenance, tentative identifications, and recorded hybrids. For example, a Vermont fluid specimen filed as *Accipiter gentilis* is a candidate for *Astur atricapillus*, American Goshawk, after the split from Eurasian Goshawk.
4. Grouped records by shared outcome and sorted by original family, genus, species, and subspecies. A name can appear in several groups when outcomes differ by locality or the source fields. Checked proposed names, families, and identifiers against the checklist and reconciled the grouped and individual counts.

## Results

| Status | Egg records | Fluid records | Interpretation |
| --- | ---: | ---: | --- |
| Update | 671 | 631 | Direct name, structured-field, family, spelling, or rank correction based on the recorded determination. |
| Review | 448 | 140 | Proposed identification or a conflict to resolve using the specimen, original documentation, locality, or determination history. |
| No change | 9,046 | 5,987 | Recorded name and family match AviList and the targeted review raised no additional flag. |
| Unresolved | 8 | 78 | The record identifies a genus or family only, or has an unknown determination. |
| Outside scope | 1 | 0 | The egg catalogue's *Aepyornis maximus* falls outside this checklist's coverage. |
| **Total reviewed** | **10,174** | **6,836** | |

The egg **Changes** tab groups **1,128 affected records** into **166 entries**, with family differences highlighted for **134 records** across **21 entries**. The fluid **Changes** tab groups **849 affected records** into **240 entries**, with family differences highlighted for **208 records** across **53 entries**. A highlighted family in a Review entry follows the proposed determination and requires the same verification.

## Workbook guide

| Tab | Contents |
| --- | --- |
| **Changes** | Old and accepted or proposed names, families, reasons, evidence keys, affected catalogue numbers, and record scope. Wikipedia links use the old scientific name. |
| **Affected records** | Individual rows with original and proposed fields, locality, source row numbers, and catalogue links. E-numbers open egg slips. A-numbers open the sorted Fluid Sheet. |
| **All names** | Complete name and family audit, including entries with no detected change. |
| **Decisions** | Relevant AviList decision summaries and pointers to their source rows. |
| **References** | AviList citation, bibliography, and supplementary sources, with DOI or web links where available. |
| **Read me** | Scope, statuses, and identifier guidance. |
| **Link index** | Individual destinations for cells containing several decisions, references, or catalogue records, with return links. |
| **Fluid Sheet** | Fluid workbook only. Selected fields for every source row in taxonomic order, with the original XLSX row and links back to affected records. |

Apply **Update** entries to the corresponding taxonomic fields together, preserving historical determinations. For **Review**, confirm the identification or locality against the original documentation or specimen before applying a candidate. The locality checks are targeted, and the results reflect the determinations recorded in the supplied exports.

Howard & Moore numbers are retained as historical references. The workbooks list Avibase taxon and species IDs separately where available. The AviList sequence number and worksheet row locate an entry in this specific release.

## Attribution

AviList Core Team. 2026. *AviList: The Global Avian Checklist*, v2026. The checklist and reproduced decision summaries are licensed under CC BY 4.0. [AviList v2026 DOI](https://doi.org/10.2173/avilist.v2026) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
