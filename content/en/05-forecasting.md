---
chapter: 5
title: "Forecasting: the Eid warehouse story"
video_chapters: [9, 12]
starts: "33:08"
---

# 5. Forecasting: the Eid warehouse story

> "Abu Rayyan, my warehouse is empty." A Salla merchant at the start of Ramadan, [37:54](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2274s)

## What Salman says

- **The question that started it** ([33:17](https://www.youtube.com/watch?v=0t0UiPQnskk&t=1997s)). Three or four Salla merchants asked whether Salla could tell them which products in their sector, such as perfume or accessories, would sell more next season.
- **What the centre built** ([34:44](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2084s)). Research on two kinds of forecast: **sales** (how much, which products and where) and **inventory** (how much warehouse space to book with a logistics partner). It produced 4 published papers, 2 in international journals and 2 at international conferences ([35:18](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2118s)). It combined merchants' own data, cross-checked against other merchants, with trends from open marketplaces such as Amazon and Noon ([34:19](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2059s)).
- **Consent first** ([36:06](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2166s)). The merchants gave their data with personal, written consent.
- **The heat map nobody understood** ([36:23](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2183s)). In 2022 a merchant was shown a heat map of all 45 to 50 of his products and understood nothing. Salman asked the researcher to show only the **top 3 forecast products** as a simple bar or pie chart ([37:14](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2234s)). The merchant "sat up straight".
- **The result** ([38:28](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2308s)). The forecast said the top product could sell **3 to 4 times** its usual volume for Eid. The merchant ignored the other two, filled his warehouse with the top one, and sold about **12 times** his usual volume. His warehouse was empty before Eid even began.
- **Less marketing, more focus** ([38:52](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2332s)). He normally spread SAR 5,000 to 7,000 of marketing on each of 5 or 6 products. This time he spent about SAR 5,000 to 6,000 on one.
- **The lesson** ([39:33](https://www.youtube.com/watch?v=0t0UiPQnskk&t=2373s)). Research gave "scientific proof", and the merchant's commercial instinct did the rest. Neither alone would have produced the result.
- **Rain equations** ([52:45](https://www.youtube.com/watch?v=0t0UiPQnskk&t=3165s)). Global marketplaces already use well-known forecasting formulas. Salla's twist was to borrow from meteorology. Weather forecasters spend their careers refining models of *how many raindrops fall per square metre*. The team mapped that onto *how many sales to expect per geographic area* ([53:42](https://www.youtube.com/watch?v=0t0UiPQnskk&t=3222s)). The team paired a rainfall-model researcher with data scientists ([54:06](https://www.youtube.com/watch?v=0t0UiPQnskk&t=3246s)).
- **Seven patents left on the table** ([54:22](https://www.youtube.com/watch?v=0t0UiPQnskk&t=3262s)). The 4 papers contained 7 potentially patentable ideas, but the board did not fund the filings.

## The idea, explained

### From pivot tables to probability

Forecasting is the same question at every level of sophistication: *given what happened, what is likely to happen next, and how sure are we?* Each method adds something the one before it lacks.

| Level | Method | What it adds | Tools |
| --- | --- | --- | --- |
| 1 | Last year's number, a moving average | A baseline | Excel, pivot tables |
| 2 | Seasonal models (Holt-Winters, exponential smoothing) | Trend and repeating seasons | Excel, R, Python `statsmodels` |
| 3 | ARIMA and its relatives | Patterns in the noise itself | R `forecast`, Python `statsmodels` |
| 4 | Machine learning (gradient boosting such as LightGBM) | Many drivers at once: price, promotions, weather, holidays, region | Python `lightgbm`, `scikit-learn` |
| 5 | Probabilistic and hierarchical forecasts | A range instead of one number, consistent from product up to region | `statsforecast`, `darts`, custom models |

The best public benchmark is the **M5 competition** of 2020. It used about 42,000 daily sales series from Walmart, broken down from single products up to whole regions. The top entries were machine-learning ensembles, and LightGBM featured prominently. All of them beat the classic statistical benchmarks ([Wikipedia summary](https://en.wikipedia.org/wiki/Makridakis_Competitions); [Makridakis et al., 2022](https://econpapers.repec.org/RePEc:eee:intfor:v:38:y:2022:i:4:p:1346-1364)).

### Why the rain analogy is clever

A rainfall forecast answers three questions at once: **how much, where and when**, as an amount per unit of area. Retail demand has the same shape: units per region per day. Weather science also has mature tools for things retail struggles with. These include spreading a forecast across a map, combining many uncertain signals, and running *ensembles* (many slightly different runs whose spread shows the uncertainty). Borrowing a model from a field that has spent decades on one problem is a classic interdisciplinary move. It is also exactly the kind of new combination a patent can protect.

### Why Saudi forecasting is its own problem

Ramadan and Eid follow the Hijri calendar, which moves about 11 days earlier each Gregorian year. A model that only knows "December" or "Q2" will misread the biggest season of the year. Good Saudi forecasts index time by both calendars.

### From forecast to warehouse

A sales forecast becomes an inventory decision through two simple ideas:

- **Reorder point** = expected demand during the supplier's lead time + **safety stock**.
- **Safety stock** grows with how *uncertain* the forecast is, not only with how big it is.

That is why a range (3 to 4 times normal) is more useful than a single number. The 12-times outcome is a reminder that forecasts describe the data, while people's decisions change it. Concentrating all the marketing on one product helped push it far beyond what was forecast.

## Try it

<div class="widget" data-widget="forecast-playground"></div>

Synthetic data shaped like Salman's story. Try both forecasting methods, then reveal what happened when the merchant put all his stock and marketing behind one product. Then switch views to see why the merchant needed a simpler chart.

## Key terms

Sales forecast · Inventory forecast · Seasonality · Hijri calendar shift · Probabilistic forecast · Ensemble · Safety stock · Reorder point.
