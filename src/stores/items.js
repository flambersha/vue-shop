import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useItemStore = defineStore("items", () => {
  const products = ref([
    {
      id:1,
      name: "Miami Jacket",
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel magna at neque dapibus eleifend. Donec pulvinar congue molestie. Nunc eget nibh id nulla consequat malesuada. Sed massa dolor, tincidunt porttitor risus ornare, vestibulum tempor magna. Donec nec leo orci. Sed suscipit tincidunt aliquam. Donec sed cursus mi, interdum commodo lacus. Aenean dui nunc, condimentum tristique porta nec, tristique in ex. Aenean tristique a nibh nec ultrices. Nullam convallis eros a orci viverra vulputate.',
      img: ['https://tommy-europe.scene7.com/is/image/TommyEurope/DW0DW18610_THA_main?$b2c_updp_m_mainImage_1920$', 'https://hips.hearstapps.com/hmg-prod/images/gh-best-online-clothing-stores-65a6c3cb930ac.png?crop=0.489xw:0.978xh;0.256xw,0.00962xh&resize=640:*'],
      available: 4,
      price: 23.99,
      categories: {
        women: ["jackets"],
        color:  ["white:#fff","black:#000", "pink:#ff99ff"],
        size: ["XS", "S"],
      },
    },
    {
      id:2,
      name: "Icy T-shirt",
      desc:'loremp ipsum dolor sit amet',
      img:'',
      available: 19,
      price: 15.99,
      categories: {
        men: ["t-shirts"],
        color: ["white:#fff","black:#000"],
        size: ["M", "L", "XL"],

      },
    },
    {
      id:3,
      name: "Black Pants",
      desc:'loremp ipsum dolor sit amet',
      img:'',
      available: 4,
      price: 123.99,
      categories: {
        men: ["pants"],
        color: ["black:#000"],
        size: ["M", "L", "XL", "XXL"],

      },
    },
    {
      id:4,
      name: "White Top",
      desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel magna at neque dapibus eleifend. Donec pulvinar congue molestie. Nunc eget nibh id nulla consequat malesuada. Sed massa dolor, tincidunt porttitor risus ornare, vestibulum tempor magna. Donec nec leo orci. Sed suscipit tincidunt aliquam. Donec sed cursus mi, interdum commodo lacus. Aenean dui nunc, condimentum tristique porta nec, tristique in ex. Aenean tristique a nibh nec ultrices. Nullam convallis eros a orci viverra vulputate.',
      img:'',
      available: 0,
      price: 52.93,
      categories: {
        women: ["tops"],
        color: ["white:#fff"],
        size: ["S", "M", "L"],

      },
    },
  ]);

  //wishlist
  const wishlist = ref([]);
  const addWish = (id)=>{
    if (wishlist.value.includes(id))
       wishlist.value = wishlist.value.filter(i => i !== id)
    else wishlist.value.push(id);
}

  const categories = computed(() => { //only for front end
    const categoriesMap = new Map();
    const result = {};
    products.value.forEach((product) => {
      for (let [category, values] of Object.entries(product.categories)) {
        
        if (!categoriesMap.has(category))
          categoriesMap.set(category, new Set());
       
        values.forEach((value) => categoriesMap.get(category).add(value));
      }
    });

    categoriesMap.forEach((values, category) => {
      result[category] = Array.from(values);
    });
    return result;
  });
  
  //filtering items
  const selectedFilters = ref([]);
  const filteredItems = computed(()=>{
    if(!selectedFilters.value) return products.value;

    return products.value.filter((product)=>{
        return selectedFilters.value.every((filter)=>{
          
          const [category, item] = filter.split(':');

          if(category == 'color')
            return product.categories.color.some(color => color.split(':')[0] === item.split(':')[0]);
          if(category in product.categories)
            return product.categories[category].includes(item);

          return false;
        })
    })
  })
  //price sorting
  const sortPrice = ref('');
  const sortedItems = computed(()=>{
    if(!sortPrice.value) return filteredItems.value;
    return [...filteredItems.value].sort((a,b)=>
      sortPrice.value === 'ascending' ? a.price - b.price : b.price - a.price);
  })
  //cart component
  const cartValues = ref([]);
  const addToCart = (foundItem, options) =>{
    cartValues.value.push([foundItem, options]);
  }

  //admin decides which items are hidden
const hiddenCategories = ref(['women', 'men', 'kids']);

//sorting categories based on their importance (if specified)
// const sortedCategories = computed(()=>{
//   if(!hiddenCategories.value)
//     return categories.value;
//   return Object.keys(categories.value).sort((a, b) =>{
//       const isAHidden = hiddenCategories.value.includes(a);
//       const isBHidden = hiddenCategories.value.includes(b);

//       return isAHidden ? -1 : 1;
//     })
// })
const sortedCategories = computed(() => {
  if (!hiddenCategories.value) return categories.value;

  return Object.fromEntries(
    Object.entries(categories.value).sort((a, b) => {
      const isAHidden = hiddenCategories.value.includes(a[0]);
      const isBHidden = hiddenCategories.value.includes(b[0]);

      if (isAHidden && !isBHidden) return -1;
      if (!isAHidden && isBHidden) return 1;
      return 0;
    })
  );
});

//navbar search field



  return {
    categories,
    products,
    selectedFilters,
    filteredItems,
    sortPrice,
    sortedItems,
    wishlist,
    addWish,
    addToCart,
    cartValues,
    hiddenCategories,
    sortedCategories,
  };
});
