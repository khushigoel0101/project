import React from 'react'

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = React.useSearchParams({});
    const [filters, setFilters] = React.useState({
        category: '',
        gender: '',
        color: '',
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 10000,
    });

    const [priceRange, setPriceRange] = React.useState([0, 10000]);

    const categories = ["TopWear","BottomWear"];

    const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange", "Gray"];

    const sizes = ["S", "M", "L", "XL", "XXL"];

    const materials = ["Cotton", "Polyester", "Wool", "Silk", "Denim", "Leather", "Linen", "Rayon", "Acrylic", "Nylon"];

    const brands = ["Maison Auréle",
  "Velour Élan",
  "Sable Noir",
  "Lunaria Couture",
  "Château Blanc",
  "Noir de Luxe",
  "Ardent Atelier",
  "Éclat Verité",
  "Valente Vogue",
  "Beaumont & Cie"];

  const genders = ["Men","Women"]

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])

    setFilters({
      category: params.category || '',
      gender: params.gender || '',
      color: params.color || '',
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
  })
  setPriceRange([0, params.maxPrice || 10000])
  }, [searchParams])
  return (
    <div>FilterSidebar</div>
  )
}

export default FilterSidebar