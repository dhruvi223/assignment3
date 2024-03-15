import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Ascending", href: "#", current: true },
  { name: "Descending", href: "#", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "jewellery", label: "Jewellery", checked: false },
      { value: "electronics", label: "Electronics", checked: false },
      { value: "men", label: "Men Clothing", checked: false },
      { value: "women", label: "Women Clothing", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductList({ addToCart }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [product, setProduct] = useState("");
  const [jewellery, setJewellery] = useState("");
  const [electronics, setElectronics] = useState("");
  const [men, setMen] = useState("");
  const [women, setWomen] = useState("");
  const [asce, setAsce] = useState('')
  const [desc, setDesc] = useState('')
  const [search, setSearch] = useState('')
  const [data,setData] = useState('')
  const [pagination, setPagination] = useState('')
  const navigate = useNavigate()

    const handlepagination1 = () => {
        setProduct('')
        fetch(`https://fakestoreapi.com/products?limit=5`)
        .then((response) => response.json())
        .then((json) => {
          setPagination(json);
        });
    }


    const handleback = () => {
        fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((json) => {
          setProduct(json);
        });
    }

// searching

const searchItem = (e) => {
   setSearch(e.target.value)
   const searchTerm = e.target.value;
   setProduct('')
//    if (e.target.value)
   fetch(`https://fakestoreapi.com/products/${searchTerm}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        });

}
//sorting

  const handleSort = (name) => {
     setProduct('')
     setJewellery('')
     setElectronics('')
     setMen('')
     setWomen('')
     if (name == 'Ascending')
     {
        setDesc('')
        fetch("https://fakestoreapi.com/products?sort=asce")
        .then((response) => response.json())
        .then((json) => {
          setAsce(json);
        });
     }
     else if(name == 'Descending'){
        setAsce('')
        fetch("https://fakestoreapi.com/products?sort=desc")
       .then((response) => response.json())
       .then((json) => {
         setDesc(json);
    });
     }
  }






// filtering

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((json) => {
      setProduct(json);
    });

  }, [])

  const handleChange = (value) => (event) => {
    if (event.target.checked == true) {
        setProduct('')
      if (value == "jewellery") {
        fetch("https://fakestoreapi.com/products/category/jewelery")
          .then((response) => response.json())
          .then((json) => {
            setJewellery(json);
          });
      } else if (value == "electronics") {
        fetch("https://fakestoreapi.com/products/category/electronics")
          .then((response) => response.json())
          .then((json) => {
            setElectronics(json);
          });
      } else if (value == "men") {
        fetch(`https://fakestoreapi.com/products/category/men's%20clothing`)
          .then((response) => response.json())
          .then((json) => {
            setMen(json);
          });
      } else if (value == "women") {
        fetch(`https://fakestoreapi.com/products/category/women's%20clothing`)
          .then((response) => response.json())
          .then((json) => {
            setWomen(json);
          });
      }
    } else {

    fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((json) => {
      setProduct(json);
    });
      
      if (value == "jewellery") {
        setJewellery("");
      } else if (value == "electronics") {
        setElectronics("");
      } else if (value == "men") {
        setMen("");
      } else if (value == "women") {
        setWomen("");
      }
    }
  };

  return (
    <div className="bg-white">
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        {filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            onChange={handleChange(
                                              option.value
                                            )}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <button onClick={handleback}>back</button>
                {/* search */}
     
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search"
              onChange={searchItem} />
              <button onClick={handleback}>back</button>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>


                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  onClick={() => handleSort(option.name)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}

                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={handleChange(option.value)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">{/* Your content */}</div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
{/* rendering products */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(product).map((key) => (
            <div key={product[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={product[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product[key].title}</h2>
                  <p>{product[key].category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: product[key].id, image:product[key].image, title: product[key].title, category:product[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

{/* category jewellery */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(jewellery).map((key) => (
            <div key={jewellery[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={jewellery[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{jewellery[key].title}</h2>
                  <p>{jewellery[key].category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: jewellery[key].id, image:jewellery[key].image, title: jewellery[key].title, category:jewellery[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


{/* category electronics */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(electronics).map((key) => (
            <div key={electronics[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={electronics[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{electronics[key].title}</h2>
                  <p>{electronics[key].category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: electronics[key].id, image:electronics[key].image, title: electronics[key].title, category:electronics[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(men).map((key) => (
            <div key={men[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={men[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{men[key].title}</h2>
                  <p>{men[key].category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: men[key].id, image:men[key].image, title: men[key].title, category:men[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(women).map((key) => (
            <div key={women[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={women[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{women[key].title}</h2>
                  <p>{women[key].category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: women[key].id, image:women[key].image, title: women[key].title, category:women[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

{/* ascending order */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(asce).map((key) => (
            <div key={asce[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={asce[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{asce[key].title}</h2>
                  <p>{asce[key].category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: asce[key].id, image:asce[key].image, title: asce[key].title, category: asce[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


{/* descing order */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(desc).map((key) => (
            <div key={desc[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={desc[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{desc[key].title}</h2>
                  <p>{desc[key].category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: desc[key].id, image:desc[key].image, title: desc[key].title, category:desc[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pagination rendering */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Object.keys(pagination).map((key) => (
            <div key={pagination[key].id} className="group relative">
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={pagination[key].image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{pagination[key].title}</h2>
                  <p>{pagination[key].category}</p>
                  <div className="card-actions justify-end">
                    <button onClick={() => addToCart({id: pagination[key].id, image:pagination[key].image, title: pagination[key].title, category:pagination[key].category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

{/* searching */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          
              <div className="card w-50 h-90 bg-base-80 shadow-xl">
                <figure>
                  <img width={90} src={data.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{data.title}</h2>
                  <p>{data.category}</p>
                  <div className="card-actions justify-end">
                  <button onClick={() => addToCart({id: data.id, image:data.image, title: data.title, category:data.category})} className="btn btn-primary">Add to cart</button>
                  </div>
                </div>
              </div>
            
        </div>


      </div>



      {/* pagination */}



      <div className="join">
     <button onClick ={handlepagination1} className="join-item btn">1</button>
      <button className="join-item btn btn-active">2</button>
      <button className="join-item btn">3</button>
     <button className="join-item btn">4</button>
</div>
    </div>
  );
}

export default ProductList;
