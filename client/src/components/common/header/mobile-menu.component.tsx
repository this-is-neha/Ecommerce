import { 
  Dialog,
  DialogPanel,
  } from "@headlessui/react";
import { NavLink } from "react-router-dom";

interface MobileMenuProps {
mobileMenuOpen: boolean;
setMobileMenuOpen: any;
categories: Category[];
loadingCategories: boolean;
}

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen, categories, loadingCategories }: MobileMenuProps) => {
return (
  <>
    <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-lime-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <NavLink
                to="/categories"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Categories
              </NavLink>

              {/* Display categories */}
              {loadingCategories ? (
                <p>Loading categories...</p>
              ) : (
                categories.length > 0 ? (
                  categories.map((category) => (
                    <NavLink
                      key={category._id}
                      to={`/category/${category._id}`}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {category.title}
                    </NavLink>
                  ))
                ) : (
                  <p>No categories available</p>
                )
              )}

              <NavLink
                to="/product-list"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Features
              </NavLink>

              <NavLink
                to="/policy"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Policy
              </NavLink>

              <NavLink
                to="/about-us"
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                About Us
              </NavLink>
            </div>
            <div className="py-6">
              <NavLink
                to="/login"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
              >
                Log in
              </NavLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </>
);
};

export default MobileMenu;
