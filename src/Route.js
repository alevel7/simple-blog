import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    useRouteError,
    isRouteErrorResponse
} from "react-router-dom";

import Login from "./pages/Login";
import CompanyList from "./pages/CompanyList";
import AddCompany from "./pages/AddCompany";
import EditCompany from "./pages/EditCompany";

function RootBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <div>This page doesn't exist!</div>;
        }

        if (error.status === 401) {
            return <div>You aren't authorized to see this</div>;
        }

        if (error.status === 503) {
            return <div>Looks like our API is down</div>;
        }

        if (error.status === 418) {
            return <div>🫖</div>;
        }
    }

    return <div>Something went wrong</div>;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <RootBoundary />
    },
    {
        path: "/dashboard",
        element: <CompanyList />,
    },
    {
        path: "/addCompany",
        element: <AddCompany />,
    },
    {
        path: "/editCompany/:id",
        element: <EditCompany />,
    },
]);