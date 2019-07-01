export const categories = [
    "Genus",
    "Species",
    "Plnt", // pic. eventually, "Plnt Lf", "Plnt Flör", "Plnt Fruit"
    "Water Frequency",
    "Soil Type",
    "Soil pH",
    "Hardiness Zone"
  ];

export const sortTypes = [
  "ABC",
  "Most Water",
  "Least Water",
  "Most Sun",
  "Least Sun",
  "Newly Added"
]

const schema = {
  id: 0,
  genus: '',
  species: '',
  common_name: '',
  variety: '',
  water_freq: 0,
  hardiness: [],
  soil: [],
  companions: [],
  sun: 0,
  image: '', // eventually be array
  edible_parts: []
}

