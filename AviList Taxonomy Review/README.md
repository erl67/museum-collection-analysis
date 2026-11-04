# AviList Taxonomy Review

This review compares the bird egg collection catalogue of the Carnegie Museum of Natural History with **AviList v2026**. The workbook identifies names and families that can be brought into line with AviList and records where a taxonomic split, conflicting fields, or uncertain provenance requires a closer look. [Download the review workbook](AviList_taxonomic_review.xlsx).

## Inputs and scope

| Input | Role |
| --- | --- |
| `EggSlipReorganizationProject_FULL.xlsx - Full List.csv` | Egg Sheet export containing the catalogue's scientific names, separate genus and epithet fields, families, catalogue numbers, localities, and historical Howard & Moore numbers. |
| `AviList-v2026-20Oct2026-extended-version.xlsx` | Extended checklist dated 20 October 2026, used for accepted names, ranks, families, Avibase IDs, and decision summaries. |

The Egg Sheet export contained **10,189 data rows**. The review covered **10,174 rows with scientific names**, representing **1,226 distinct name strings**. Fifteen rows without a scientific name were excluded. All counts below refer to catalogue records.

## How the review was done

1. Matched the full scientific name to AviList and compared family placement separately. Compared the full name against the name assembled from the Egg Sheet's genus, specific epithet, and infraspecific epithet fields to identify conflicts.
2. Investigated unmatched names using candidate epithets, family placement, AviList decision summaries, and selected supplementary sources. The resulting mappings cover genus transfers, spelling and grammatical agreement, family changes, synonyms, and changes in rank.
3. Checked locality for selected species complexes, including cases where AviList still accepts an old name with a narrower range or circumscription. Where the locality suggested a different species, the workbook records a candidate for review. For example, U.S. records under *Tyto alba* were flagged for comparison with *Tyto furcata*.
4. Grouped records that shared an outcome and sorted the summary by original family and scientific name. An old name can appear in several groups when the proposed outcome depends on locality or conflicting fields. Checked the proposed names, families, and identifiers against the checklist and reconciled summary counts to the affected catalogue rows.

## Results

| Status | Catalogue records | Interpretation |
| --- | ---: | --- |
| Update | 671 | Direct name, genus, family, spelling, or rank correction based on the recorded identification. |
| Review | 448 | Proposed identification or a conflict to resolve using the original slip, locality, or determination history. |
| No change | 9,046 | The recorded name and family match AviList and the review raised no additional flag. |
| Unresolved | 8 | The identification reaches genus or family only. |
| Outside scope | 1 | *Aepyornis maximus* falls outside the supplied checklist's coverage. |
| **Total reviewed** | **10,174** | |

The **Changes** tab groups the **1,128 affected records** into **166 entries**. The **AviList family** column highlights differences from the original family, covering **134 records** across **21 entries**.

## Workbook guide

| Tab | Contents |
| --- | --- |
| **Changes** | Grouped comparison of old and accepted or proposed names, families, reasons, evidence keys, affected catalogue numbers, and record scope. Wikipedia links use the old scientific names for orientation. |
| **Affected records** | Individual catalogue rows behind the grouped results, with original and proposed fields, localities, source row numbers, and links to egg slips. |
| **All names** | Full name and family audit, including entries with no detected change. |
| **Decisions** | Relevant AviList decision summaries and pointers to their locations in the source checklist. |
| **References** | AviList citation, bibliography entries, and supplementary sources with DOI or web links where available. |
| **Read me** | Scope, status definitions, interpretation, and identifier guidance. |
| **Link index** | Individual destinations for cells containing several decisions, references, or egg slips, with links back to the originating entry. |

Use **Update** for direct nomenclatural corrections and check **Review** against the specimen documentation before accepting a proposed identification. The review used targeted locality checks and the determinations recorded in the export. The starting catalogue mixes taxonomic treatments, so interpret the results as a comparison of this particular Egg Sheet export with AviList v2026.

The workbook retains Howard & Moore numbers as historical references and lists Avibase IDs at taxon and species rank where available. The AviList sequence number and worksheet row locate an entry in the specific checklist release.

## Attribution

AviList Core Team. 2026. *AviList: The Global Avian Checklist*, v2026. The checklist and its reproduced decision summaries are licensed under CC BY 4.0. [AviList v2026 DOI](https://doi.org/10.2173/avilist.v2026) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
