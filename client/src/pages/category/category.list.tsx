import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios.config";
import PaginationComponent from "../../components/common/table/pagination.component";
import TableActionButton from "../../components/common/table/action-button.component";
import React from "react";
import { FooterComponent, HeaderComponent } from "../../components/common";
export const PER_PAGE_LIMIT = 28;


const AdminCategoryList = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    totalPages: 6,
    currentPage: 2,
  });

  const getCategoryList = async ({ page = 1, limit = PER_PAGE_LIMIT }: any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/category", {
        params: {
          page: page,
          limit: limit,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });

      console.log(response);

      const totalPages = Math.ceil(response.meta.total / response.meta.limit);
      setPagination({
        totalPages: totalPages,
        currentPage: response.meta.page,
      });
      setCategories(response.result);
    } catch (exception) {
      console.error("Error fetching Category:", exception);
      toast.error("Error fetching Category...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryList({ page: 1, limit: PER_PAGE_LIMIT });
  }, []);


  

  const deleteCategory = async (id: string) => {
    try {
      setLoading(true);
      console.log(`Deleting Category with ID: ${id}`); 

      await axiosInstance.delete(`/category/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") },
      });

      toast.success("Brand deleted successfully");
      getCategoryList({ page: pagination.currentPage, limit: PER_PAGE_LIMIT });
    } catch (exception) {
      toast.error("Category cannot be deleted at this moment");
      console.log('Deletion Error:', exception); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <HeaderComponent/>
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-16 lg:gap-18">
          <h1 className="text-6xl font-bold">Category List</h1>
          <div></div>
          <NavLink
            to="/admin/category/create"
            className="bg-green-700 mt-16 text-center py-1 text-white rounded w-[200px]"
          >
            Create Category
          </NavLink>
        </div>

        <div className="rounded-lg border border-gray-200 mt-5">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right bg-black">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                    Section
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                    Image
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                    Parent ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-white"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5}>Loading...</td>
                  </tr>
                ) : (
                  categories.length > 0 ? (
                    categories.map((category: any, index: number) => (
                      <tr className="odd:bg-gray-50" key={index}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {category.title}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {category.status}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {category.section}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {category.image}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {category.parentId}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <TableActionButton
                            editUrl={`/admin/category/${category._id}`}
                            rowId={category._id as string}
                            deleteAction={deleteCategory}
                          />
                        </td>


                       
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No categories found</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          {!loading && (
            <PaginationComponent fetchCall={getCategoryList} pagination={pagination} />
          )}
        </div>
      </div>
    </section>
    <FooterComponent/>
    </>
  );
};

export default AdminCategoryList;

