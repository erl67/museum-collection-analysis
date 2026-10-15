# Museum Collection Analysis

Jupyter notebooks and visualizations for exploring natural history collection data, beginning with the bird egg collection at the Carnegie Museum of Natural History in Pittsburgh.

The notebooks use **pandas**, **matplotlib**, and **NumPy** to examine when specimens were collected, who collected them, and where they originated. Saved graphs can be viewed without running the notebooks; rerunning an analysis requires the source collection CSV.

## Analyses

| Notebook | Analysis |
| --- | --- |
| `Brandt_eggs_by_year.ipynb` | Annual egg totals for records whose collector field contains “Brandt.” |
| `Brandt_eggs_by_day.ipynb` | Daily egg totals for Brandt, with collection dates assembled from the CSV's year, month, and day fields. |
| `Brandt_eggs_smoothed_monthly.ipynb` | Monthly egg totals for Brandt, displayed with a centered 12-month moving average. |
| `Egg_collection_smoothed_monthly.ipynb` | Monthly egg totals across all collectors, displayed with the same moving average. |
| `Eggs_by_collector.ipynb` | Collector rankings with name normalization, an editable alias table, and handling for named co-collectors. |
| `Egg_collection_location_heatmap.ipynb` | Egg-weighted geographic heat maps, using decimal coordinates first and approximate locality, county, or state/province fallbacks when necessary. |

The annual and daily notebooks preserve earlier views of the time series. The monthly notebooks provide a smoother view of long-term collecting patterns.

## Files

Notebooks and their outputs can be kept together in the repository's top-level folder. Existing output subfolders can also be retained; the analysis does not depend on a particular repository layout.

| File type | Purpose |
| --- | --- |
| `.ipynb` | Analysis code, explanations, and editable settings. |
| `.png` | Saved graphs and maps. |
| Derived `.csv` | Collector totals, name audits, location audits, and unresolved records, where produced by a notebook. |
| `.json` | Heat-map run settings, coverage totals, and the source-file checksum. |

The original collection export is an input dataset. It may remain outside this repository; it is not required to view the saved figures.

## Running the notebooks

Install Python and the required packages:

```powershell
python -m pip install jupyterlab pandas matplotlib numpy
```

From the project folder, start JupyterLab:

```powershell
python -m jupyterlab
```

Open a notebook, check its input and output settings, then run all cells from the beginning.

### Input and output paths

The notebooks were originally configured to read this export:

```python
CSV_PATH = Path(r"G:\My Drive\Egg Slip Scanning\EggSlipReorganizationProject_FULL.xlsx - Full List.csv")
```

The collector and heat-map notebooks save outputs to:

```python
OUTPUT_DIR = Path(r"G:\My Drive\Egg Slip Scanning\scripts\graphs")
```

The older time-series notebooks use `OUTPUT_PATH` and save the graph beside the input CSV. Update these settings if files move or if figures should be written directly into the local Git checkout. Moving a notebook does not automatically change its hard-coded output path.

For example, when Jupyter is started in the repository's top-level folder, an output folder inside the checkout can be configured as:

```python
OUTPUT_DIR = Path.cwd() / "figures"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
```

For a time-series notebook, also set its `OUTPUT_PATH` to the desired filename inside that folder. This path example is a configuration change to make locally, not a shared setting already used by every notebook.

## Counting and interpretation

### Egg totals

Egg totals sum `Individual Count`. One catalogue row is not assumed to represent one egg. Records without a usable egg count are excluded from egg-weighted results; relevant exclusions are reported by the notebooks. Historical date fields are interpreted explicitly, including exports where `date collected m/d/y` contains only the day of the month.

### Time series

Monthly analyses include records with a usable year and month even when the day is missing. Months without matching records are filled with zero between the first and last usable collection months. The centered moving average smooths those monthly totals; its units remain eggs per month, not eggs per year. Edge averages can use fewer months. Change `SMOOTH_MONTHS` to adjust the smoothing window.

### Collector names

The collector notebook normalizes common name-order and punctuation differences and applies an editable list of aliases. Similar-looking names are listed for review rather than automatically merged. Alias decisions should be checked against specimen documentation as the data are refined.

Where multiple collectors are named on one record, the full egg count is credited to each named person. Collector-credit totals can therefore exceed the number of physical eggs. Brandt-only time-series notebooks use a text filter, while the collector ranking uses its separate name-cleaning rules.

### Geographic heat maps

The location hierarchy is:

1. A usable original latitude/longitude pair.
2. A matching locality in original-coordinate records, or an offline town/locality reference point.
3. A county approximation.
4. A state/province approximation.

Country and administrative context constrain matching. Unresolved locations remain unmapped; country-only centroids are not substituted. Original coordinate pairs are checked for usable values and geographic range, rather than independently re-georeferenced.

Fallback positions are **approximate**, not verified specimen georeferences. A town reference point does not reconstruct directions, distances, ranches, or other sub-locality details. County and state/province estimates use broader display smoothing. Every resolution is recorded in the location audit.

Heat-map colors show egg-weighted collecting concentration on a latitude/longitude grid with logarithmic color scaling. They do not measure wild bird abundance or eggs per square kilometre. Captive records are included by default and can be excluded with `INCLUDE_CAPTIVE = False`. Set `INCLUDE_APPROXIMATE = False` to view original-coordinate records alone.

The heat-map notebook embeds a compact offline reference snapshot. New text-only locations in later CSV exports may require additional verified coordinates or reference entries. `LOCATION_OVERRIDES` provides a place to add those verified matches. Each heat-map run saves a SHA-256 checksum of the input CSV with its summary so results can be tied to a particular export.

## Data and geographic references

Collection records come from the Carnegie Museum of Natural History bird egg collection export. These are exploratory analyses of the available records, and results can change as counts, collector identities, dates, and locations are corrected.

The heat map uses:

- [Natural Earth](https://www.naturalearthdata.com/) — public-domain map outlines and administrative reference points.
- [GeoNames](https://www.geonames.org/export/) — town/locality reference data, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- [US Census Bureau Gazetteer Files](https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html) — 2025 county internal points.

Collection-data permissions are separate from the licenses for these geographic references. Sharing a notebook does not by itself grant permission to redistribute its source collection records. Location audits and embedded reference keys can also contain collection locality text.

## Related projects

- `museum-scanner` — the related scanning project.
- [`museum-transcription`](https://github.com/erl67/museum-transcription) — the related transcription project.

