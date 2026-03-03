insert into products (name, slug, description, short_description, size_tier, cut_type, chewer_level, dog_weight_min, dog_weight_max, price_cents, images, featured, sort_order) values
(
  'Small Whole Elk Antler',
  'small-whole',
  'Perfect for small dogs who love to chew. Our small whole elk antlers are carefully selected for quality and durability. The whole cut provides a longer-lasting chew experience as your dog works to access the nutritious marrow inside. Each antler is naturally shed, sustainably sourced, and cleaned without chemicals.',
  'Ideal for small dogs under 20 lbs. Long-lasting whole antler.',
  'small', 'whole', 'Light to Moderate', 5, 20, 1500,
  ARRAY['/images/placeholder-small-whole.jpg'],
  true, 1
),
(
  'Small Split Elk Antler',
  'small-split',
  'Split down the center to expose the delicious marrow, our small split elk antlers are perfect for puppies, senior dogs, or lighter chewers. The exposed marrow provides instant gratification and keeps dogs engaged. Great as an introduction to elk antler chews.',
  'Split to expose marrow. Great for puppies and light chewers.',
  'small', 'split', 'Light', 5, 20, 1800,
  ARRAY['/images/placeholder-small-split.jpg'],
  false, 2
),
(
  'Medium Whole Elk Antler',
  'medium-whole',
  'Our most popular size! Medium whole elk antlers are ideal for the average-sized dog who enjoys a good chew session. Dense and durable, these antlers will keep your dog occupied for weeks. Each one is hand-inspected to ensure no sharp points or defects.',
  'Our best seller. Perfect for dogs 20-50 lbs.',
  'medium', 'whole', 'Moderate to Heavy', 20, 50, 2200,
  ARRAY['/images/placeholder-medium-whole.jpg'],
  true, 3
),
(
  'Medium Split Elk Antler',
  'medium-split',
  'The medium split elk antler offers the best of both worlds — exposed marrow for immediate enjoyment and enough density for extended chewing. A fantastic choice for moderate chewers or dogs transitioning to antler chews for the first time.',
  'Exposed marrow for moderate chewers. Dogs 20-50 lbs.',
  'medium', 'split', 'Light to Moderate', 20, 50, 2500,
  ARRAY['/images/placeholder-medium-split.jpg'],
  true, 4
),
(
  'Large Whole Elk Antler',
  'large-whole',
  'Built for bigger dogs with serious chewing power. Our large whole elk antlers are thick, dense, and incredibly long-lasting. These premium antlers are perfect for dogs who destroy other chews in minutes. Naturally rich in calcium, phosphorus, and minerals.',
  'Heavy-duty chew for dogs 50-90 lbs.',
  'large', 'whole', 'Heavy to Extreme', 50, 90, 2900,
  ARRAY['/images/placeholder-large-whole.jpg'],
  true, 5
),
(
  'Large Split Elk Antler',
  'large-split',
  'Our large split elk antler gives bigger dogs easy access to the nutritious marrow center while still providing a satisfying chew. Perfect for large breed dogs who are new to antlers or prefer a slightly easier chewing experience.',
  'Split for large breeds. Easy marrow access for dogs 50-90 lbs.',
  'large', 'split', 'Moderate to Heavy', 50, 90, 3200,
  ARRAY['/images/placeholder-large-split.jpg'],
  false, 6
),
(
  'X-Large Whole Elk Antler',
  'x-large-whole',
  'The ultimate chew for the ultimate chewer. Our X-Large whole elk antlers are reserved for the biggest, most powerful chewers. These massive antlers are the thickest and densest we offer, providing weeks or even months of chewing satisfaction for giant breeds.',
  'Monster chew for giant breeds 90+ lbs.',
  'x-large', 'whole', 'Extreme', 90, 200, 3500,
  ARRAY['/images/placeholder-x-large-whole.jpg'],
  false, 7
),
(
  'X-Large Split Elk Antler',
  'x-large-split',
  'Even the biggest dogs deserve easy access to marrow goodness. Our X-Large split elk antler is designed for giant breeds, split to reveal the nutritious center while maintaining the substantial size needed for large jaws. A premium chew for premium pups.',
  'Split for giant breeds. Marrow-exposed for dogs 90+ lbs.',
  'x-large', 'split', 'Heavy to Extreme', 90, 200, 3800,
  ARRAY['/images/placeholder-x-large-split.jpg'],
  false, 8
);
