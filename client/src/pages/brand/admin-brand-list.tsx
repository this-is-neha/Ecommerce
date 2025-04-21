import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import PaginationComponent from "../../components/common/table/pagination.component";
import TableActionButton from "../../components/common/table/action-button.component";
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";

export const PER_PAGE_LIMIT = 17;

const AdminBrand = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 4,
    currentPage: 1,
  });

  const getBrandList = async ({ page = 1, limit = PER_PAGE_LIMIT }: any) => {
    try {
      setLoading(true);
      console.log(`Fetching brands for page ${page} with limit ${limit}`); // Log the parameters

      const response: any = await axiosInstance.get("/brand", {
        params: { page, limit },
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });

      console.log('API Response:', response); // Log the entire response

      const totalPages = Math.ceil(response.meta.total / response.meta.limit);
      console.log(`Total Pages: ${totalPages}`); // Log total pages

      setPagination({ totalPages, currentPage: response.meta.page });
      setBrands(response.result);

      console.log('Brands Data:', response.result); // Log the brands data
    } catch (exception) {
      console.error("Error fetching brands:", exception);
      toast.error("Error fetching brands...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrandList({ page: pagination.currentPage, limit: PER_PAGE_LIMIT });
  }, [pagination.currentPage]);

  const deleteBrand = async (id: string) => {
    try {
      setLoading(true);
      console.log(`Deleting brand with ID: ${id}`); // Log the ID of the brand being deleted

      await axiosInstance.delete(`/brand/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });

      toast.success("Brand deleted successfully");
      getBrandList({ page: pagination.currentPage, limit: PER_PAGE_LIMIT });
    } catch (exception) {
      toast.error("Brand cannot be deleted at this moment");
      console.log('Deletion Error:', exception); // Log any error that occurs during deletion
    } finally {
      setLoading(false);
    }
  };

  return (
<>
<HeaderComponent/>
<section>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 lg:gap-16">
          <h1 className="text-6xl font-bold">Brand List</h1>
          <div></div>
          <NavLink
            to="/admin/brand/create"
            className="bg-green-700 mt-3 text-center py-2 text-white rounded w-[200px]"
          >
            Create Brand
          </NavLink>
        </div>

        <div className="rounded-lg border border-gray-200 mt-5">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right bg-black">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Title</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Status</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">Image</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">Loading...</td>
                  </tr>
                ) : (
                  brands.map((brand: any, index: number) => (
                    <tr className="odd:bg-gray-50" key={index}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {brand.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{brand.status}</td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">{brand.image}</td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <TableActionButton
                          editUrl={`/admin/brand/${brand._id}`}
                          rowId={brand._id as string}
                          deleteAction={deleteBrand}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

              
            </table>
          </div>
          {!loading && (
            <PaginationComponent fetchCall={getBrandList} pagination={pagination} />
          )}
        </div>
      </div>
    </section>
<FooterComponent/></>
  );
};

export default AdminBrand;
