import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Restaurant"}>
      <div className="container mx-auto py-8 my-6">
        <div className="bg-white rounded-lg   shadow-lg p-6 md:p-8 lg:p-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">User Information</h2>
              <div className="mb-2">
                <span className="font-semibold">User Name:</span>{" "}
                {auth?.user?.name}
              </div>
              <div className="mb-2">
                <span className="font-semibold">User Email:</span>{" "}
                {auth?.user?.email}
              </div>
              <div className="mb-2">
                <span className="font-semibold">User Number:</span>{" "}
                {auth?.user?.phone}
              </div>
              <div className="mb-2">
                <span className="font-semibold">User Address:</span>{" "}
                {auth?.user?.address}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
